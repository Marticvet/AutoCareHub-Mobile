import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddVehicleForm = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Vehicle</Text>
            <Text style={styles.label}>Make:</Text>
            <TextInput style={styles.input} placeholder="Toyota" />
            <Text style={styles.label}>Model:</Text>
            <TextInput style={styles.input} placeholder="Corolla" />
            <Button title="Save" color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    label: {
        marginTop: 15,
        color: '#555',
    },
    input: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

export default AddVehicleForm;
