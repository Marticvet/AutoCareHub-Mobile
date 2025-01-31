import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native";
import AddVehicleScreen from "../AddVehicleScreen/AddVehicleScreen";
import { useAuth } from "../../providers/AuthProvider";
import { useVehicle } from "../../api/vehicles";
import { Loader } from "../Loader/Loader";

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
    const { profile } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);

    // ✅ Wait for `profile.id` before setting userId
    useEffect(() => {
        if (profile?.id) {
            setUserId(profile.id);
        }
    }, [profile]);

    // ✅ Fetch vehicle only when `userId` and vehicleId is available
    const {
        data,
        isLoading,
        error,
    } = useVehicle(userId || "", vehicleId);
    const vehicle: Vehicle = data;
    const [modalVisible, setModalVisible] = useState(false);

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        Alert.alert("Error", error.message);
        console.error("Supabase Fetch Error:", error);
        return; // Prevent further execution
    }

    function editVehicleDetaisHandler() {
        setModalVisible(!modalVisible);
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
                <AddVehicleScreen
                    {...{ modalVisible, setModalVisible, vehicle }}
                />
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
