import { View ,Text} from "react-native";
import { ProfileContext } from "../providers/ProfileDataProvider";import { useContext } from "react";
;

export const FuelExpensesScreen = () => {
    const { userProfile, selectedVehicle, fuelExpenses } = useContext(ProfileContext);

    console.log(fuelExpenses);
    
        

    return (
        <View>
            <Text>dadads</Text>
        </View>
    );
};

