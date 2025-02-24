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
import { useVehicleList } from "../api/vehicles";

interface ProfileContextData {
    userProfile: Profile | null;
    selectedVehicle: string;
    vehicles?: VehicleData[];
    isProfileLoading: boolean;
    isVehiclesLoading: boolean;
    errorProfile?: any;
    errorVehicles?: any;
    setSelectedVehicle: (vehicle: string) => void;
}

const ProfileContext = createContext<ProfileContextData>({
    userProfile: null,
    selectedVehicle: "",
    vehicles: [],
    isProfileLoading: false,
    isVehiclesLoading: false,
    setSelectedVehicle: () => {},
});

const ProfileDataProvider = ({ children }: PropsWithChildren) => {
    // Get profile from AuthProvider
    const { profile } = useAuth();
    // Derive userId directly from profile, if available
    const userId = profile?.id || "";
    
    const {
        data: userProfile,
        isLoading: isProfileLoading,
        error: errorProfile,
      } = useProfile(userId ? userId : null);
      
      const {
        data: vehicleList,
        isLoading: isVehiclesLoading,
        error: errorVehicles,
      } = useVehicleList(userId ? userId : null);
    const vehicles: VehicleData[] | undefined = vehicleList;

    // Manage selected vehicle state
    const [selectedVehicle, setSelectedVehicle] = useState<string>("");

    // Update selected vehicle when the profile changes
    useEffect(() => {
        if (profile) {
            setSelectedVehicle(profile.selected_vehicle_id);
        }
    }, [profile]);

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
