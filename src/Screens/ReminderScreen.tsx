import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
} from "react-native";
import {
    FontAwesome5,
    FontAwesome6,
    Fontisto,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ReminderScreen = () => {
    const [expenseType, setExpenseType] = useState("");
    const [serviceType, setServiceType] = useState("");

    const [isKmChecked, setIsKmChecked] = useState(true);
    const [isDateChecked, setIsDateChecked] = useState(false);
    const [isOneTime, setIsOneTime] = useState(true);

    const [notes, setNotes] = useState("");

    // References for each input field to manage focus
    const serviceTypeRef = useRef(null);
    const notesRef = useRef(null);

    const [showServiceReminderContainer, setShowServiceReminderContainer] =
        useState(false);
    const [selectRepeaterSwitch, setSelectRepeaterSwitch] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                {/* Switch Container */}
                <View style={styles.switchContainer}>
                    {showServiceReminderContainer === false ? (
                        <FontAwesome6
                            name="money-bills"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                    ) : (
                        <FontAwesome5
                            name="oil-can"
                            size={24}
                            color="gray"
                            style={styles.icon}
                        />
                    )}

                    <View style={styles.switchButtonContainer}>
                        <Pressable
                            style={[
                                styles.switchButton,
                                !showServiceReminderContainer &&
                                    styles.activeButton,
                            ]}
                            onPress={() =>
                                setShowServiceReminderContainer(false)
                            }
                        >
                            <Text
                                style={[
                                    styles.switchText,
                                    !showServiceReminderContainer &&
                                        styles.activeText,
                                ]}
                            >
                                Expense
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.switchButton,
                                showServiceReminderContainer &&
                                    styles.activeButton,
                            ]}
                            onPress={() =>
                                setShowServiceReminderContainer(true)
                            }
                        >
                            <Text
                                style={[
                                    styles.switchText,
                                    showServiceReminderContainer &&
                                        styles.activeText,
                                ]}
                            >
                                Service
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Type of Service / Expense Input*/}
                <View style={[styles.inputContainer, styles.inputTypeContainerCustom]}>
                    <View style={styles.innerInputContainer}>
                        {!showServiceReminderContainer ? (
                            <TextInput
                                ref={serviceTypeRef}
                                placeholder="Type of service"
                                value={serviceType}
                                onChangeText={setServiceType}
                                keyboardType="default"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    serviceTypeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        ) : (
                            <TextInput
                                // ref={odometerRef}
                                placeholder="Type of expense"
                                value={expenseType}
                                onChangeText={setExpenseType}
                                keyboardType="default"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    // @ts-ignore
                                    serviceTypeRef.current?.focus()
                                }
                                style={styles.input}
                            />
                        )}
                    </View>
                </View>

                {/* Switch one time/ repeat */}
                <View style={styles.switchContainer}>
                    <Fontisto
                        name="bell-alt"
                        size={24}
                        color="gray"
                        style={styles.icon}
                    />

                    <View style={styles.switchButtonContainer}>
                        <Pressable
                            style={[
                                styles.switchButton,
                                !selectRepeaterSwitch && styles.activeButton,
                            ]}
                            onPress={() => setSelectRepeaterSwitch(false)}
                        >
                            <Text
                                style={[
                                    styles.switchText,
                                    !selectRepeaterSwitch && styles.activeText,
                                ]}
                            >
                                Just one time
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.switchButton,
                                selectRepeaterSwitch && styles.activeButton,
                            ]}
                            onPress={() => setSelectRepeaterSwitch(true)}
                        >
                            <Text
                                style={[
                                    styles.switchText,
                                    selectRepeaterSwitch && styles.activeText,
                                ]}
                            >
                                Repeat
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.repeaterSelectContainer}>
                    {/* Odometer Checkbox & Input */}
                    <View style={styles.repetearSelectInputContainer}>
                        <BouncyCheckbox
                            isChecked={isKmChecked}
                            size={25}
                            fillColor="#4942CD"
                            unFillColor="#FFFFFF"
                            iconStyle={{
                                borderColor: "#4942CD",
                                borderWidth: 2,
                                borderRadius: 5,
                            }}
                            innerIconStyle={{
                                borderWidth: 2,
                                borderRadius: 5,
                            }}
                            onPress={(isChecked: boolean) =>
                                setIsKmChecked(isChecked)
                            }
                        />
                        <TextInput
                            style={styles.repetearSelectInput}
                            placeholder="Odometer (km)"
                            placeholderTextColor="#888"
                        />
                    </View>

                    {/* Date Checkbox & Input */}
                    <View style={styles.repetearSelectInputContainer}>
                        <BouncyCheckbox
                            isChecked={isDateChecked}
                            size={25}
                            fillColor="#4942CD"
                            unFillColor="#FFFFFF"
                            iconStyle={{
                                borderColor: "#4942CD",
                                borderWidth: 2,
                                borderRadius: 5,
                            }}
                            innerIconStyle={{
                                borderWidth: 2,
                                borderRadius: 5,
                            }}
                            onPress={(isChecked: boolean) =>
                                setIsDateChecked(isChecked)
                            }
                        />
                        <TextInput
                            style={styles.repetearSelectInput}
                            placeholder="Date"
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>

                {/* Note Input */}
                <View style={styles.inputContainer}>
                    <MaterialIcons
                        name="notes"
                        size={24}
                        color="gray"
                        style={styles.icon}
                    />
                    <View style={styles.innerInputContainer}>
                        <TextInput
                            // ref={notesRef}
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 15,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    switchButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 0.5,
    },
    switchButtonContainer: {
        flex: 1,
        flexDirection: "row",
    },
    activeButton: {
        backgroundColor: "#4942CD",
    },
    switchText: {
        color: "gray",
        fontSize: 16,
    },
    activeText: {
        color: "white",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        marginBottom: 12,
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
    input: {
        fontSize: 16,
        color: "black",
        width: 300,
        height: 48, // Set explicit height
    },
    icon: {
        marginRight: 10,
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
    pressableButton: {
        marginTop: 24,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 12,
        backgroundColor: "#625be7",
    },
    inputTypeContainerCustom: {
        paddingLeft: 24,
    },
    // repeaterSelectContainer: {
    //     marginTop: 12,
    //     height: 160,
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingHorizontal: 15, // Prevent elements from touching edges
    // },
    // repetearSelectInputContainer: {
    //     // flex: 1,
    //     // flexDirection: "row",
    //     // alignItems: "center",
    //     // justifyContent: "space-between",
    //     // width: "100%",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "flex-start", // Align to left
    //     width: "100%", // Ensures it stays within screen
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     backgroundColor: "#F5F5F5",
    //     borderRadius: 8,
    //     marginBottom: 10,
    // },
    // repetearSelectInput: {
    //     height: 48,
    //     width: 180,
    //     fontSize: 16,
    //     color: "black",
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#DDD",
    //     marginLeft: 10, // Ensures proper spacing between checkbox and input
    // },
    repeaterSelectContainer: {
        marginVertical: 12,
        marginBottom: 24,
        width: "100%",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingHorizontal: 15,
        // backgroundColor: "#F5F5F5",
    },
    repetearSelectInputContainer: {
        flexDirection: "row",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    repetearSelectInput: {
        // width: "60%", // Ensures input stays visible
        minWidth: 150, // Prevents shrinking to 0
        fontSize: 16,
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
});

export default ReminderScreen;
