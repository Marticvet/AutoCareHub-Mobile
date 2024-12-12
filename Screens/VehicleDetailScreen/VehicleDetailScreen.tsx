import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../providers/authentication";
import { VehicleService } from "../../services/vehicle.service";
import { useFocusEffect } from "@react-navigation/native";

interface Vehicle {
    user_id: number;
    vehicle_brand: string;
    vehicle_car_type: string;
    vehicle_id: number;
    vehicle_identification_number: string;
    vehicle_license_plate: string;
    vehicle_model: string;
    vehicle_model_year: number;
    vehicle_year_of_manufacture: number;
}

const VehicleDetailScreen = ({ route }: any) => {
    const { vehicleId } = route.params;
    const { authState } = useAuth();
    const { userId } = authState;
    const [vehicle, setVehicle] = useState({
        user_id: 0,
        vehicle_brand: "",
        vehicle_car_type: "",
        vehicle_id: 0,
        vehicle_identification_number: "",
        vehicle_license_plate: "",
        vehicle_model: "",
        vehicle_model_year: 0,
        vehicle_year_of_manufacture: 0,
    });

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const vehicleService = new VehicleService();

            (async () => {
                const response = await vehicleService.getVehiclesById(
                    userId,
                    vehicleId
                );

                if (response) {
                    setVehicle(response[0]);
                }
            })();
        }, [vehicleId])
    );

    if (vehicle.vehicle_id === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vehicle Details</Text>
            <View style={styles.vehicleContainer}>
                <Text style={styles.vehicle}>
                    Vehicle Brand: {vehicle.vehicle_brand}
                </Text>
                <Text style={styles.vehicle}>
                    Vehicle Type: {vehicle.vehicle_car_type}
                </Text>
                <Text style={styles.vehicle}>
                    Vehicle License Plate: {vehicle.vehicle_license_plate}
                </Text>
                <Text style={styles.vehicle}>
                    Vehicle Model: {vehicle.vehicle_model}
                </Text>
                <Text style={styles.vehicle}>
                    Vehicle Model Year: {vehicle.vehicle_model_year}
                </Text>
                <Text style={styles.vehicle}>
                    Vehicle Year Of Manufacture:{" "}
                    {vehicle.vehicle_year_of_manufacture}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    vehicleInfo: {
        marginTop: 15,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
    },
    infoItem: {
        fontSize: 16,
        color: "#777",
    },
    vehicleContainer: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: "white",
        height: 160,
        marginVertical: 15,
        // flexDirection: 'row',
        // width: '99%',
        width: "100%",
        shadowColor: "black",
        // borderWidth: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    vehicle: {
        height: 25,
    },
});

export default VehicleDetailScreen;
