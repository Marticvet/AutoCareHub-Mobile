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
    setSelectedVehicle: (vehicle: VehicleData | null) => void;
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
    const { profile } = useAuth();
    const userId = profile?.id || ""; // ✅ Ensure userId is set correctly

    const [userProfile, setUserProfile] = useState<Profile | null>(null);
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
        null
    );

    // Fetch profile data
    const {
        data: userProfileData,
        isLoading: isProfileLoading,
        error: errorProfile,
    } = useProfile(userId);

    // Fetch vehicle list
    const {
        data: vehicleList,
        isLoading: isVehiclesLoading,
        error: errorVehicles,
    } = useVehicleList(userId);

    // Fetch selected vehicle
    const { data: vehicleData } = useVehicle(
        userId,
        userProfile?.selected_vehicle_id || ""
    );

    // ✅ Load userProfile when API call completes
    useEffect(() => {
        if (userProfileData) {
            setUserProfile(userProfileData);
        }
    }, [userProfileData]);

    // ✅ Load vehicles when API call completes
    useEffect(() => {
        if (vehicleList && vehicleList.length > 0) {
            setVehicles(vehicleList);
        }
    }, [vehicleList]);

    // ✅ Set selected vehicle when `vehicleData` is fetched
    useEffect(() => {
        if (vehicleData) {
            setSelectedVehicle(vehicleData);
        }
    }, [vehicleData]);

    // Memoize context value to optimize performance
    const contextValue = useMemo(
        () => ({
            userProfile,
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
