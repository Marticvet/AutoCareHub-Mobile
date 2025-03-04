import React, { useState } from "react";
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
} from "@expo/vector-icons";

const ReminderScreen = () => {
    const [expenseType, setExpenseType] = useState("");
    const [odometer, setOdometer] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isKmChecked, setIsKmChecked] = useState(true);
    const [isDateChecked, setIsDateChecked] = useState(false);
    const [isOneTime, setIsOneTime] = useState(true);

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

                    <Pressable
                        style={[
                            styles.switchButton,
                            !showServiceReminderContainer &&
                                styles.activeButton,
                        ]}
                        onPress={() => setShowServiceReminderContainer(false)}
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
                            showServiceReminderContainer && styles.activeButton,
                        ]}
                        onPress={() => setShowServiceReminderContainer(true)}
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

                {/* Switch one time/ repeat */}
                <View style={styles.inputContainer}>
                    <View style={styles.innerInputContainer}>
                        <TextInput
                            // ref={odometerRef}
                            placeholder="Type of service"
                            value={odometer}
                            onChangeText={setOdometer}
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                // @ts-ignore
                                serviceTypeRef.current?.focus()
                            }
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Switch Container */}
                <View style={styles.switchContainer}>
                    <Fontisto
                        name="bell-alt"
                        size={24}
                        color="gray"
                        style={styles.icon}
                    />

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

                <View style={styles.repeaterSelectContainer}>
                    <View style={styles.repetearSelectInputContainer}>
                        <Text>ebanie</Text>

                        <TextInput style={styles.repetearSelectInput} placeholder="Odometer (km)"/>
                    </View>

                    <View style={styles.repetearSelectInputContainer}>
                        <Text>ebanie</Text>
                        <TextInput style={styles.repetearSelectInput} placeholder="Date"/>
                    </View>
                </View>
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
        marginVertical: 10,
    },
    switchButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 5,
        marginHorizontal: 5,
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
    repeaterSelectContainer: {
        marginTop: 12,
        height: 160,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    repetearSelectInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',

    },
    repetearSelectInput: {
        height: 48,
        width: 180,
        fontSize: 16,
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    }
});

export default ReminderScreen;
