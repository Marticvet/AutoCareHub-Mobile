import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { useAuth } from "../../providers/authentication";
import { VehicleService } from "../../services/vehicle.service";
import { useFocusEffect } from "@react-navigation/native";
import AddVehicleScreen from "../AddVehicleScreen/AddVehicleScreen";

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

const carTypesByShape: { name: string; type: number }[] = [
    { name: "Sedan", type: 1 },
    { name: "Hatchback", type: 2 },
    { name: "SUV", type: 3 },
    { name: "Convertible", type: 4 },
    { name: "Station Wagon", type: 5 },
    { name: "Pickup Truck", type: 6 },
    { name: "Van", type: 7 },
    { name: "Crossover", type: 8 },
    { name: "Sports Car", type: 9 },
    { name: "Luxury Car", type: 10 },
    { name: "Roadster", type: 11 },
    { name: "Off-Road Vehicle", type: 12 },
    { name: "Compact Car", type: 13 },
    { name: "Supercar", type: 14 },
    { name: "Electric Vehicle", type: 15 },
    { name: "Liftback", type: 16 },
    { name: "Targa", type: 17 },
    { name: "Ute (Utility Vehicle)", type: 18 },
    { name: "Campervan", type: 19 },
    { name: "Panel Van", type: 20 },
    { name: "Coupe", type: 21 },
    { name: "Minivan", type: 22 },
    { name: "Microcar", type: 23 },
];

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
    const [modalVisible, setModalVisible] = useState(false);

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

    function editVehicleDetaisHandler() {
        setModalVisible(!modalVisible);

        const vehicleService = new VehicleService();

        (async () => {
            const response = await vehicleService.editVehiclesById(
                userId,
                vehicleId,
                {
                    ...vehicle,
                    vehicle_car_type:
                        carTypesByShape.findIndex(
                            (carType) =>
                                carType.name === vehicle.vehicle_car_type
                        ) + 1,
                }
            );

            if (response) {
                setVehicle(response);
                setModalVisible(!modalVisible);
            }
        })();
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

            <View style={styles.detailsButtonContainer}>
                <Text style={styles.detailButton}>Add Details</Text>
                <Text
                    style={styles.detailButton}
                    onPress={editVehicleDetaisHandler}
                >
                    Edit Details
                </Text>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <AddVehicleScreen {...{modalVisible, setModalVisible, vehicle}}/>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
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
    detailsButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    detailButton: {
        width: "45%",
        height: 40,
        backgroundColor: "white",
        marginHorizontal: 16,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 8,
    },
    modalContainer: {
        width: "90%",
        height: "90%",
        padding: 16,
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    detailButtonText: { color: "white", fontWeight: "bold" },
    closeButton: {
        padding: 10,
        backgroundColor: "#ff4d4d",
        marginTop: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: { color: "white", fontWeight: "bold" },
});

export default VehicleDetailScreen;
