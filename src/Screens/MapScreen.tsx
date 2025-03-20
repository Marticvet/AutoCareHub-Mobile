import React, { useEffect, useState, useRef } from "react";
import { Alert, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
} from "expo-location";
import { getAddress } from "../utils/location";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen({ route }: any) {
    // const {selectedLocation, setSelectedLocation, pickedLocation, setPickedLocation} = route.params;
    const { setPlace, setLocationName } = route.params;

    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [pickedLocation, setPickedLocation] = useState<string | null>(null);

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();

    const isFocused = useIsFocused();
    const mapRef = useRef<MapView>(null); // Reference for map actions

    useEffect(() => {
        getLocationHandler();
    }, []);

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        try {
            const location = await getCurrentPositionAsync();
            const newLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            setSelectedLocation(newLocation);
            setPlace(newLocation);
            await handleLocation(newLocation.latitude, newLocation.longitude);

            // Move camera to user's location
            mapRef.current?.animateToRegion({
                ...newLocation,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        } catch (error) {
            Alert.alert("Error", "Failed to fetch current location");
            console.error(error);
        }
    }

    async function handleLocation(lat: number, lng: number) {
        try {
            const address = await getAddress(lat, lng);
            console.log("Address fetched:", address);
            setPickedLocation(address);
            setLocationName(address);
        } catch (error) {
            console.error("Error fetching address:", error);
            setPickedLocation(null);
            setLocationName("");
        }
    }

    function selectLocationHandler(event: any) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ latitude: lat, longitude: lng });
        setPlace({ latitude: lat, longitude: lng });

        // Move camera to new selected location
        mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
        });

        // Fetch address immediately
        handleLocation(lat, lng);
    }

    async function verifyPermissions() {
        if (locationPermissionInformation?.status === "granted") {
            return true;
        }

        const permissionResponse = await requestPermission();
        if (!permissionResponse.granted) {
            Alert.alert(
                "Insufficient Permissions!",
                "You need to grant location permissions."
            );
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                // provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 51.12,
                    longitude: 8.89,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onPress={selectLocationHandler}
            >
                {selectedLocation && pickedLocation && (
                    <Marker
                        draggable
                        onDragEnd={selectLocationHandler}
                        title={pickedLocation}
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                    />
                )}
            </MapView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {/* Get My Location Button */}
                <TouchableOpacity
                    style={styles.locateButton}
                    onPress={getLocationHandler}
                >
                    <Ionicons name="locate" size={28} color="white" />
                </TouchableOpacity>

                {/* Confirm Location Button */}
                {/* <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() =>
                        Alert.alert(
                            "Location Set!",
                            pickedLocation || "Unknown"
                        )
                    }
                >
                    <Text style={styles.buttonText}>Set Location</Text>
                </TouchableOpacity> */}

                {/* Get My Location Button */}
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={getLocationHandler}
                >
                    <Text style={styles.buttonText}>Get My Location</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 30,
        alignItems: "center",
        // flex: 1,
        marginHorizontal: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    locateButton: {
        position: "absolute",
        bottom: 30, // Adjusted for better visibility
        right: 20, // Aligned to bottom-right
        backgroundColor: "#007AFF",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
