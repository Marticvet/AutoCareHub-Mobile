import { Ionicons } from "@expo/vector-icons";
import { useContext, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
    Pressable,
} from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { DateTimePickerModal } from "./DateTimePickerModal";

export const FuelExpensesScreen = () => {
    const [selectedDateTime, setSelectedDateTime] = useState<DateType>();
    const [modalVisible, setModalVisible] = useState(false);

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

                        <DateTimePickerModal
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            selectedDateTime={selectedDateTime}
                            setSelectedDateTime={setSelectedDateTime}
                            setSelectedDate={setSelectedDate}
                            setSelectedTime={setSelectedTime}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
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
        height: 28,
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
