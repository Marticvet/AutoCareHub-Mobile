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
} from "react-native";
import {
    Entypo,
    FontAwesome5,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import { ProfileContext } from "../providers/ProfileDataProvider";
import { DateType } from "react-native-ui-datepicker";
import { DateTimePickerModal } from "./DateTimePickerModal";

const ServiceScreen = () => {
    const [odometer, setOdometer] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [place, setPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedDateTime, setSelectedDateTime] = useState<DateType>(); // Stores both Date & Time
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

    function submitSaveHandler() {
        const serviceExpensesInputs = {
            date: selectedDate,
            odometer,
            serviceType,
            place,
            driver,
            paymentMethod,
            notes,
        };
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
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

                    <DateTimePickerModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        selectedDateTime={selectedDateTime}
                        setSelectedDateTime={setSelectedDateTime}
                        setSelectedDate={setSelectedDate}
                        setSelectedTime={setSelectedTime}
                    />

                    {/* Odometer Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="speedometer"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />

                        <View style={styles.innerInputContainer}>
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
                    </View>

                    {/* Last Odometer */}
                    <View style={styles.hintContainer}>
                        <Text style={styles.hint}>
                            Last odometer:{" "}
                            {selectedVehicle?.current_mileage || "N/A"} km
                        </Text>
                    </View>

                    {/* Type of Service Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="construct"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                        <View style={styles.innerInputContainer}>
                            <TextInput
                                // ref={fuelTypeRef}
                                placeholder="Type of service"
                                // value={fuelType}
                                // onChangeText={setFuelType}
                                keyboardType="default"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    fuelTypeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Gas station Input */}
                    <View style={styles.inputContainer}>
                        <Entypo
                            name="location-pin"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />

                        <View style={styles.innerInputContainer}>
                            <TextInput
                                ref={placeRef}
                                placeholder="Place"
                                value={place}
                                onChangeText={setPlace}
                                keyboardType="default"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    placeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Payment method Input */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            name="payments"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                        <View style={styles.innerInputContainer}>
                            <TextInput
                                ref={paymentMethodRef}
                                placeholder="Payment method"
                                value={paymentMethod}
                                onChangeText={setPaymentMethod}
                                keyboardType="default"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    paymentMethodRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Attatch File input */}
                    {/* <View style={styles.inputContainer}>
                        <MaterialIcons
                            name="attach-file"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                        <View
                            style={[
                                styles.innerInputContainer,
                                { borderBottomWidth: 0 },
                            ]}
                        >
                            <Pressable style={styles.attachFile}>
                                <Text style={styles.attachText}>
                                    Attach file
                                </Text>
                            </Pressable>
                        </View>
                    </View> */}

                    {/* Payment method Input */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            name="notes"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                        <View style={styles.innerInputContainer}>
                            <TextInput
                                ref={notesRef}
                                placeholder="Notes"
                                value={notes}
                                onChangeText={setNotes}
                                returnKeyType="done"
                                style={[styles.input, styles.notesInput]}
                                multiline
                            />
                        </View>
                    </View>

                    {/* Save Button */}
                    <Pressable
                        style={({ pressed }) =>
                            pressed ? styles.pressableButton : styles.saveButton
                        }
                        // onPress={submitSaveHandler}
                    >
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 150,
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 6,
    },
    dateTimeInputContainer: {
        flexDirection: "row",
        width: "48%",
        height: 48,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        marginBottom: 12,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    innerInputContainer: {
        flexDirection: "row",
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingLeft: 12,
        marginLeft: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        marginBottom: 12,
    },

    fuelInputsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        marginBottom: 12,
        gap: 10, // Ensures equal spacing between inputs
    },
    icon: {
        marginRight: 10,
    },
    input: {
        fontSize: 16,
        color: "black",
        width: 300,
        height: 48, // Set explicit height
    },
    hintContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    hint: {
        fontSize: 12,
        color: "gray",
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 12,
    },
    textSwitch: {
        fontSize: 14,
        color: "#454343",
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
        width: 300,
        textAlignVertical: "top",
        borderRadius: 8,
    },
    saveButton: {
        marginTop: 24,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // height: 48,
        backgroundColor: "#4942CD",
        borderRadius: 12,
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    innerKeyboardContainer: {
        padding: 16,
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
        height: 48,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        marginBottom: 12,
    },
    pressableButton: {
        marginTop: 24,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 12,
        backgroundColor: "#625be7",
    },
});

export default ServiceScreen;
