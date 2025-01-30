import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

type IconType = "car" | "calendar" | "bag-add-outline" | "cloud-upload-outline";

const quickActions: { id: string; name: string; icon: IconType }[] = [
    { id: "1", name: "Add Vehicle", icon: "car" },
    { id: "2", name: "Schedule Maintenance", icon: "calendar" },
    { id: "3", name: "Add Expense", icon: "bag-add-outline" },
    { id: "4", name: "Upload Document", icon: "cloud-upload-outline" },
];

interface UserVehicles {
    user_id: number;
    vehicle_brand: string;
    vehicle_car_type: string;
    id: number;
    vehicle_identification_number: string;
    vehicle_license_plate: string;
    vehicle_model: string;
    vehicle_model_year: number;
    vehicle_year_of_manufacture: number;
    currentMileage: number;
}

function HomeScreen() {
    const navigation = useNavigation();
    const [userVehicles, setUserVehicles] = useState<UserVehicles[]>([]);
    const {profile} = useAuth();
    const {id} = profile;

    function quickActionHandler(buttonTxt: string, vehicleId: number | null) {
        if (buttonTxt === "Add Vehicle") {
            // @ts-ignore
            navigation.navigate("AddVehicleScreen");
        } else if (buttonTxt === "Get Vehicle By Id") {
            // @ts-ignore
            navigation.navigate("GetVehicleById", {
                vehicleId: vehicleId,
            });
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            (async () => {
                try {
                    const { data, error } = await supabase
                        .from("vehicles")
                        .select("*")
                        .eq("user_id", id); // Filter by user_id

                    if (error) {
                        Alert.alert("Error", error.message);
                        console.error("Supabase Fetch Error:", error);
                        return; // Prevent further execution
                    }

                    if (setUserVehicles) {
                        setUserVehicles(data);
                    } else {
                        console.warn("setUserVehicles is not defined");
                    }
                } catch (err) {
                    console.error("Unexpected Error:", err);
                    // @ts-ignore
                    Alert.alert("Unexpected Error", err.message);
                }
            })();
        }, [])
    );

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            nestedScrollEnabled={true}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Welcome Back, {"firstName"}!
                </Text>
                <Text style={styles.headerSubtitle}>
                    Keep track of your car's health
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                />
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsContainer}>
                {quickActions.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        style={styles.quickAction}
                        activeOpacity={0.65}
                        onPress={() => quickActionHandler(action.name, null)}
                    >
                        <Ionicons name={action.icon} size={24} color="#fff" />
                        <Text style={styles.quickActionText}>
                            {action.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Items */}
            <Text style={styles.sectionTitle}>Your Vehicles</Text>
            <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                contentContainerStyle={styles.vehicleContainerScrollView}
            >
                {userVehicles.length > 0 && (
                    <FlatList
                        style={styles.vehiclesContainer}
                        data={userVehicles}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        quickActionHandler(
                                            "Get Vehicle By Id",
                                            item.id
                                        )
                                    }
                                >
                                    <View style={styles.vehicleContainer}>
                                        <Text style={styles.vehicle}>
                                            Vehicle Brand: {item.vehicle_brand}
                                        </Text>
                                        <Text style={styles.vehicle}>
                                            Vehicle Type:{" "}
                                            {item.vehicle_car_type}
                                        </Text>
                                        <Text style={styles.vehicle}>
                                            Vehicle License Plate:{" "}
                                            {item.vehicle_license_plate}
                                        </Text>
                                        <Text style={styles.vehicle}>
                                            Vehicle Model: {item.vehicle_model}
                                        </Text>
                                        <Text style={styles.vehicle}>
                                            Vehicle Model Year:{" "}
                                            {item.vehicle_model_year}
                                        </Text>
                                        <Text style={styles.vehicle}>
                                            Vehicle Year Of Manufacture:{" "}
                                            {item.vehicle_year_of_manufacture}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={true}
                    />
                )}
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
        paddingTop: 60,
        paddingHorizontal: 25,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#555",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 10,
        height: 40,
        elevation: 2,
        shadowColor: "#000",
        marginBottom: 20,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        color: "#333",
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
    },
    quickActionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        flexWrap: "wrap",
        marginVertical: 10,
    },
    quickAction: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        paddingVertical: 5,
        borderRadius: 8,
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    quickActionText: {
        marginTop: 8,
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
    listContainer: {
        paddingVertical: 10,
    },
    listItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
        shadowColor: "#ccc",
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    listItemDate: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    vehicleContainerScrollView: {
        width: "100%",
        flex: 1,
    },
    vehiclesContainer: {
        width: "100%",
        flex: 1,
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

export default HomeScreen;
