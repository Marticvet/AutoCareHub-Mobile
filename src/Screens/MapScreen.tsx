import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const INITIAL_REGION = {
    latitude: 50.13,
    longitude: 8.88,
    latitudeDelta: 0.000009, // Corrected spelling
    longitudeDelta: 0.000014,
};


export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
