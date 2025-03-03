import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReminderScreen = () => {
    const [expenseType, setExpenseType] = useState("");
    const [odometer, setOdometer] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isKmChecked, setIsKmChecked] = useState(true);
    const [isDateChecked, setIsDateChecked] = useState(false);
    const [isOneTime, setIsOneTime] = useState(true);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.switchContainer}>
                    <Pressable
                        style={[
                            styles.switchButton,
                            isOneTime && styles.activeButton,
                        ]}
                        onPress={() => setIsOneTime(true)}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                isOneTime && styles.activeText,
                            ]}
                        >
                            Just one time
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.switchButton,
                            !isOneTime && styles.activeButton,
                        ]}
                        onPress={() => setIsOneTime(false)}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                !isOneTime && styles.activeText,
                            ]}
                        >
                            Repeat every
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="card"
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Type of expense"
                        value={expenseType}
                        onChangeText={setExpenseType}
                        style={styles.input}
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <Pressable
                        onPress={() => setIsKmChecked(!isKmChecked)}
                        style={styles.checkbox}
                    >
                        {isKmChecked && (
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color="white"
                            />
                        )}
                    </Pressable>
                    <Text style={styles.checkboxText}>km</Text>
                    <TextInput
                        placeholder="Odometer (km)"
                        value={odometer}
                        onChangeText={setOdometer}
                        style={styles.inputInline}
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <Pressable
                        onPress={() => setIsDateChecked(!isDateChecked)}
                        style={styles.checkbox}
                    >
                        {isDateChecked && (
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color="white"
                            />
                        )}
                    </Pressable>
                    <Text style={styles.checkboxText}>Date</Text>
                    <TextInput
                        placeholder="Date"
                        value={date}
                        onChangeText={setDate}
                        style={styles.inputInline}
                    />
                </View>

                <TextInput
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    style={[styles.input, styles.notesInput]}
                    multiline
                />

                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>SAVE</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    content: { padding: 15 },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    switchButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeButton: { backgroundColor: "#4942CD" },
    switchText: { color: "gray", fontSize: 16 },
    activeText: { color: "white" },
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#4942CD",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "white",
    },
    inputInline: {
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        flex: 1,
        marginLeft: 10,
        paddingBottom: 5,
    },
    checkboxText: { fontSize: 16, color: "black" },
    notesInput: { height: 80, textAlignVertical: "top" },
    saveButton: {
        backgroundColor: "#4942CD",
        padding: 15,
        alignItems: "center",
        borderRadius: 30,
        marginTop: 20,
    },
    saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ReminderScreen;
