import React, { useContext, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileContext } from "../providers/ProfileDataProvider";

const ServiceScreen = () => {
    const [odometer, setOdometer] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [place, setPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    // Retrieve the values provided by ProfileDataProvider
    const { selectedVehicle } = useContext(ProfileContext);

    // References for each input field to manage focus
    const odometerRef = useRef(null);
    const serviceTypeRef = useRef(null);
    const placeRef = useRef(null);
    const driverRef = useRef(null);
    const paymentMethodRef = useRef(null);
    const notesRef = useRef(null);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.innerKeyboardContainer}>
                        {/* Date & Time Inputs */}
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeInputContainer}>
                                <Ionicons
                                    name="calendar"
                                    size={20}
                                    color="gray"
                                    style={styles.icon}
                                />
                                <TextInput
                                    placeholder="17/02/2025"
                                    style={styles.dateTimeInputField}
                                    editable={false}
                                    selectTextOnFocus={false}
                                />
                            </View>
                            <View style={styles.dateTimeInputContainer}>
                                <Ionicons
                                    name="time"
                                    size={20}
                                    color="gray"
                                    style={styles.icon}
                                />
                                <TextInput
                                    placeholder="19:16"
                                    style={styles.dateTimeInputField}
                                    editable={false}
                                    selectTextOnFocus={false}
                                />
                            </View>
                        </View>

                        {/* Odometer Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="speedometer"
                                size={20}
                                color="gray"
                                style={styles.icon}
                            />
                            <TextInput
                                ref={odometerRef}
                                placeholder="Odometer (km)"
                                value={odometer}
                                onChangeText={setOdometer}
                                keyboardType="numeric"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    serviceTypeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>
                        <Text style={styles.hint}>
                            Last odometer:{" "}
                            {selectedVehicle?.current_mileage || "N/A"} km
                        </Text>

                        {/* Service Type Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="construct"
                                size={20}
                                color="gray"
                                style={styles.icon}
                            />
                            <TextInput
                                ref={serviceTypeRef}
                                placeholder="Type of service"
                                value={serviceType}
                                onChangeText={setServiceType}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    placeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>

                        {/* Place Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="location"
                                size={20}
                                color="gray"
                                style={styles.icon}
                            />
                            <TextInput
                                ref={placeRef}
                                placeholder="Place"
                                value={place}
                                onChangeText={setPlace}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    driverRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>

                        {/* Driver Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person"
                                size={20}
                                color="gray"
                                style={styles.icon}
                            />
                            <TextInput
                                ref={driverRef}
                                placeholder="Driver"
                                value={driver}
                                onChangeText={setDriver}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    paymentMethodRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>

                        {/* Payment Method Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="cash"
                                size={20}
                                color="gray"
                                style={styles.icon}
                            />
                            <TextInput
                                ref={paymentMethodRef}
                                placeholder="Payment method"
                                value={paymentMethod}
                                onChangeText={setPaymentMethod}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    notesRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>

                        {/* Attach File Button */}
                        {/* <TouchableOpacity style={styles.attachFile}>
                            <Text style={styles.attachText}>+ Attach file</Text>
                        </TouchableOpacity> */}

                        {/* Notes Input */}
                        <TextInput
                            ref={notesRef}
                            placeholder="Notes"
                            value={notes}
                            onChangeText={setNotes}
                            returnKeyType="done"
                            style={[styles.input, styles.notesInput]}
                            multiline
                        />

                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    dateTimeInputContainer: {
        flexDirection: "row",
        width: "48%",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
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
    notesInput: {
        height: 80,
        textAlignVertical: "top",
        backgroundColor: "white",
        width: "100%",
    },
    saveButton: {
        marginTop: 16,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 42,
        backgroundColor: "#4942CD",
        borderRadius: 12,
    },
    saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
    dateTimeInputField: {
        flex: 1,
        fontSize: 16,
        color: "gray",
    },
    innerKeyboardContainer: {
        // flex: 1,
        padding: 16,
    },
});

export default ServiceScreen;
