import React, { useContext, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileContext } from "../providers/ProfileDataProvider";
import DateTimePicker, {
    DateType,
    getDefaultStyles,
} from "react-native-ui-datepicker";

const ServiceScreen = () => {
    const [odometer, setOdometer] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [place, setPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedDateTime, setSelectedDateTime] = useState<DateType>(); // Stores both Date & Time
    const defaultStyles = getDefaultStyles();

    const [modalVisible, setModalVisible] = useState(false);

    // Retrieve the values provided by ProfileDataProvider
    const { selectedVehicle } = useContext(ProfileContext);

    // References for each input field to manage focus
    const odometerRef = useRef(null);
    const serviceTypeRef = useRef(null);
    const placeRef = useRef(null);
    const driverRef = useRef(null);
    const paymentMethodRef = useRef(null);
    const notesRef = useRef(null);

    const date = new Date(); // Get current date & time
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale; // Auto-detect user locale

    // Format Date (User's Locale)
    const formattedDate = date.toLocaleDateString(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // Format Time (User's Locale)
    const formattedTime = date.toLocaleTimeString(userLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const [selectedDate, setSelectedDate] = useState<DateType>(formattedDate);
    const [selectedTime, setSelectedTime] = useState<DateType>(formattedTime);

    const handleDateChange = ({ date }: { date?: DateType }) => {
        setSelectedDateTime(date);

        // Automatically adapt to user's locale and timezone
        // @ts-ignore
        const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        // @ts-ignore
        const formattedTime = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        setSelectedDate(formattedDate);
        setSelectedTime(formattedTime);
        // setModalVisible(false); // Close modal after selection if needed
    };

    function submitSaveHandler(){
        const serviceExpensesInputs = {
            date: selectedDate,
            odometer,
            serviceType,
            place,
            driver,
            paymentMethod,
            notes,
        }
   
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                            <Pressable
                                onPress={() => setModalVisible(true)}
                                style={({ pressed }) =>
                                    pressed
                                        ? styles.PressedDateTimeInputContainer
                                        : styles.dateTimeInputContainer
                                }
                            >
                                <Ionicons
                                    name="calendar"
                                    size={20}
                                    color="gray"
                                    style={styles.icon}
                                />
                                <Text style={styles.dateTimeText}>
                                    {selectedDate?.toString() || "dd/mm/yyyy"}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setModalVisible(true)}
                                style={({ pressed }) =>
                                    pressed
                                        ? styles.PressedDateTimeInputContainer
                                        : styles.dateTimeInputContainer
                                }
                            >
                                <Ionicons
                                    name="calendar"
                                    size={20}
                                    color="gray"
                                    style={styles.icon}
                                />
                                <Text style={styles.dateTimeText}>
                                    {selectedTime?.toString() || "00:00"}
                                </Text>
                            </Pressable>
                        </View>

                        {/* Modal for Calendar */}
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContainer}>
                                    <DateTimePicker
                                        mode="single"
                                        date={selectedDateTime}
                                        onChange={handleDateChange}
                                        timePicker={true} // ✅ Enables both Date & Time selection
                                        styles={{
                                            ...defaultStyles,
                                            today: {
                                                borderColor: "#00AFCF",
                                                borderWidth: 2,
                                            },
                                            selected: {
                                                backgroundColor: "#00AFCF",
                                            },
                                            selected_label: { color: "white" },
                                            header: {
                                                // color: "white",
                                                width: 300,
                                            },
                                        }}
                                    />

                                    <View style={styles.modalButtonsContainer}>
                                        {/* confirm button */}
                                        <Pressable
                                            style={styles.confirmButton}
                                            onPress={() =>
                                                setModalVisible(false)
                                            }
                                        >
                                            <Text
                                                style={styles.confirmButtonText}
                                            >
                                                Confirm
                                            </Text>
                                        </Pressable>

                                        {/* close button */}
                                        <Pressable
                                            style={styles.closeButton}
                                            onPress={() =>
                                                setModalVisible(false)
                                            }
                                        >
                                            <Text
                                                style={styles.closeButtonText}
                                            >
                                                Close
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>

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
                        {/* <Pressable style={styles.attachFile}>
                            <Text style={styles.attachText}>+ Attach file</Text>
                        </Pressable> */}

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
                        <Pressable style={styles.saveButton} onPress={submitSaveHandler}>
                            <Text style={styles.saveButtonText}>SAVE</Text>
                        </Pressable>
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
        height: 64,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        marginBottom: 12,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "black",
        height: 42,
    },
    hint: {
        fontSize: 12,
        color: "gray",
        marginLeft: 10,
        marginBottom: 5,
    },
    attachFile: {
        marginVertical: 10,
    },
    attachText: {
        color: "#4942CD",
        fontSize: 16,
        fontWeight: "bold",
    },
    notesInput: {
        height: 80,
        textAlignVertical: "top",
        backgroundColor: "white",
        width: "100%",
        borderRadius: 8,
        padding: 8,
    },
    saveButton: {
        marginTop: 24,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 42,
        backgroundColor: "#4942CD",
        borderRadius: 12,
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    dateTimeInputField: {
        flex: 1,
        fontSize: 16,
        color: "gray",
    },
    innerKeyboardContainer: {
        padding: 16,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        height: "50%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },

    modalButtonsContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    confirmButton: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: "#00AFCF",
        borderRadius: 8,
    },

    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: "#00AFCF",
        borderRadius: 8,
    },

    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    dateTimeText: {
        width: "100%",
        flex: 1,
        fontSize: 16,
        color: "black",
    },

    PressedDateTimeInputContainer: {
        flexDirection: "row",
        width: "48%",
        height: 64,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        marginBottom: 12,
    },
});

export default ServiceScreen;
