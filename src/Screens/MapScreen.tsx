import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, TextInput, FlatList, TouchableOpacity, Text, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const mapRef = useRef<MapView>(null);

    // Get user's current location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission to access location was denied");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);

            // Move the map to the user's location
            if (mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        })();
    }, []);

    // Fetch locations from OpenStreetMap
    const searchLocation = async (query) => {
        setSearchQuery(query);
        if (query.length < 3) return; // Prevent unnecessary API calls

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    // Handle location selection
    const selectLocation = (place) => {
        const { lat, lon, display_name } = place;
        setSearchQuery(display_name);
        setSearchResults([]);

        // Move the map to the selected location
        mapRef.current?.animateToRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        // Drop a marker at the selected location
        setLocation({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        });
    };

    // Center the map on user's current location
    const locateUser = async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        if (!currentLocation) {
            Alert.alert("Location not available.");
            return;
        }
        setLocation(currentLocation.coords);

        mapRef.current?.animateToRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search for a place..."
                    value={searchQuery}
                    onChangeText={searchLocation}
                />
                {/* Search Results List */}
                {searchResults.length > 0 && (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.place_id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.resultItem} onPress={() => selectLocation(item)}>
                                <Text style={styles.resultText}>{item.display_name}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.resultsList}
                    />
                )}
            </View>

            {/* Locate Me Button */}
            <TouchableOpacity style={styles.locateButton} onPress={locateUser}>
                <Text style={styles.locateButtonText}>📍 Locate Me</Text>
            </TouchableOpacity>

            {/* Map */}
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined} // Google Maps on Android, Apple Maps on iOS
                showsUserLocation
                followsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude: 50.13,
                    longitude: 8.88,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {/* User's Selected Location Marker */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Selected Location"
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    
    searchContainer: {
        position: "absolute",
        top: 40,
        left: 20,
        right: 20,
        zIndex: 1,
    },
    searchBox: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    resultsList: {
        backgroundColor: "white",
        maxHeight: 200,
        borderRadius: 8,
        marginTop: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    resultText: {
        fontSize: 16,
    },
    
    locateButton: {
        position: "absolute",
        bottom: 40,
        right: 20,
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    locateButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
