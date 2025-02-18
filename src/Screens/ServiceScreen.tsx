import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceScreen = () => {
    const [odometer, setOdometer] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [place, setPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="calendar"
                            size={20}
                            color="gray"
                            style={styles.icon}
                        />
                        <TextInput
                            placeholder="17/02/2025"
                            style={styles.input}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="time"
                            size={20}
                            color="gray"
                            style={styles.icon}
                        />
                        <TextInput
                            placeholder="19:16"
                            style={styles.input}
                            editable={false}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="speedometer"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Odometer (km)"
                        value={odometer}
                        onChangeText={setOdometer}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
                <Text style={styles.hint}>Last odometer: 34444</Text>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="construct"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Type of service"
                        value={serviceType}
                        onChangeText={setServiceType}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="location"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Place"
                        value={place}
                        onChangeText={setPlace}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="person"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Driver"
                        value={driver}
                        onChangeText={setDriver}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="cash"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Payment method"
                        value={paymentMethod}
                        onChangeText={setPaymentMethod}
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.attachFile}>
                    <Text style={styles.attachText}>+ Attach file</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    style={[styles.input, styles.notesInput]}
                    multiline
                />

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    content: { padding: 15 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, color: "black" },
    hint: { fontSize: 12, color: "gray", marginLeft: 10, marginBottom: 5 },
    attachFile: { marginVertical: 10 },
    attachText: { color: "#4942CD", fontSize: 16, fontWeight: "bold" },
    notesInput: { height: 80, textAlignVertical: "top" },
    saveButton: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 42,
        backgroundColor: "#4942CD",
        borderRadius: 12,
    },
    saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ServiceScreen;

// loginButton: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     height: 42,
//     backgroundColor: "#4942CD",
//     borderRadius: 12,
// },
// pressedLoginButton: {
//     backgroundColor: "#625be7",
//     width: "100%",
//     height: 42,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 12,
// },
