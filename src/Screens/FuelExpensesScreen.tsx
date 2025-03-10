import { View, Text } from "react-native";
import { ProfileContext } from "../providers/ProfileDataProvider";
import { useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const FuelExpensesScreen = () => {
    const { userProfile, selectedVehicle, fuelExpenses, expenses } =
        useContext(ProfileContext);

        // console.log(expenses, `expenses`);
        


    return (
        <View>
            <Text>Fuel expesnes</Text>
        </View>
    );
};
