import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
} from "expo-location";
import { getAddress } from "../utils/location";
import { useIsFocused } from "@react-navigation/native";

export default function MapScreen() {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        getLocationHandler();
    }, []);

    const region = {
        latitude: 50.12,
        longitude: 8.89,
        latitudeDelta: 0.005, // Closer zoom
        longitudeDelta: 0.005,
    };

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
            await handleLocation(newLocation.latitude, newLocation.longitude);
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
        } catch (error) {
            console.error("Error fetching address:", error);
            setPickedLocation(null);
        }
    }

    function selectLocationHandler(event: any) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ latitude: lat, longitude: lng });

        // Immediately fetch the new address
        handleLocation(lat, lng);
    }

    async function verifyPermissions() {
        if (locationPermissionInformation?.status === "granted") {
            return true;
        }

        const permissionResponse = await requestPermission();
        if (!permissionResponse.granted) {
            Alert.alert("Insufficient Permissions!", "You need to grant location permissions.");
            return false;
        }

        return true;
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {selectedLocation && pickedLocation && (
                <Marker
                    title={pickedLocation}
                    coordinate={{
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                    }}
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});
