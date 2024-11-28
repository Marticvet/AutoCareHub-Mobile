import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VehicleDetail = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vehicle Details</Text>
            <View style={styles.vehicleInfo}>
                <Text style={styles.subtitle}>Basic Info</Text>
                <Text style={styles.infoItem}>Make: Toyota</Text>
                <Text style={styles.infoItem}>Model: Corolla</Text>
                <Text style={styles.infoItem}>Mileage: 120,000 km</Text>
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
        fontWeight: 'bold',
        color: '#333',
    },
    vehicleInfo: {
        marginTop: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
    },
    infoItem: {
        fontSize: 16,
        color: '#777',
    },
});

export default VehicleDetail;
