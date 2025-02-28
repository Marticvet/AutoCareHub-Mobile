import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
    useMemo,
} from "react";
import { useAuth } from "./AuthProvider";
import { useProfile } from "../api/profiles";
import { Profile } from "../../types/profile";
import { VehicleData } from "../../types/vehicle";
import { useVehicle, useVehicleList } from "../api/vehicles";

interface ProfileContextData {
    userProfile: Profile | null;
    selectedVehicle: VehicleData | null;
    vehicles?: VehicleData[];
    isProfileLoading: boolean;
    isVehiclesLoading: boolean;
    errorProfile?: any;
    errorVehicles?: any;
    setSelectedVehicle: (vehicle: VehicleData | null) => void; // updated type here
}

const ProfileContext = createContext<ProfileContextData>({
    userProfile: null,
    selectedVehicle: null,
    vehicles: [],
    isProfileLoading: false,
    isVehiclesLoading: false,
    setSelectedVehicle: () => {},
});

const ProfileDataProvider = ({ children }: PropsWithChildren) => {
    // Get profile from AuthProvider
    const { profile } = useAuth();
    // Derive userId directly from profile, if available
    const [userId, setUserId] = useState<string>("");
    const [userProfile, setUserProfile] = useState<Profile | null>(null);
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);

    useEffect(() => {
        if (profile) {
            setUserId(profile?.id);
        }
    }, [profile]);

    const {
        data: userProfileData,
        isLoading: isProfileLoading,
        error: errorProfile,
    } = useProfile(userId ? userId : "");

    const {
        data: vehicleList,
        isLoading: isVehiclesLoading,
        error: errorVehicles,
    } = useVehicleList(userId ? userId : "");
    // const vehicles: VehicleData[] | undefined = vehicleList;

    useEffect(() => {
        if(userProfile && userId && vehicleList){
            setVehicles(vehicleList);
        }

    }, [profile, userProfile, vehicleList]);
    
    // Manage selected vehicle state as a full VehicleData object
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
        null
    );

    useEffect(() => {
        if (userProfileData) {
            setUserProfile(userProfileData);
        }
    }, [profile, userProfileData]);

    // When profile or vehicles update, find the matching vehicle
    // ✅ Fetch vehicle only when `userId` and vehicleId is available
    const { data: vehicleData, isLoading, error } = useVehicle(
        userId || "",
        userProfile?.selected_vehicle_id || ""
    );
    const vehicle: VehicleData = vehicleData;

    useEffect(() => {
        if(vehicleData){
            setSelectedVehicle(vehicle);
        }
    }, [profile, userProfile, vehicleData]);    

    // Memoize context value to optimize performance
    const contextValue = useMemo(
        () => ({
            userProfile: userProfile || null,
            selectedVehicle,
            vehicles,
            isProfileLoading,
            isVehiclesLoading,
            errorProfile,
            errorVehicles,
            setSelectedVehicle,
        }),
        [
            userProfile,
            selectedVehicle,
            vehicles,
            isProfileLoading,
            isVehiclesLoading,
            errorProfile,
            errorVehicles,
        ]
    );

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileDataProvider };
