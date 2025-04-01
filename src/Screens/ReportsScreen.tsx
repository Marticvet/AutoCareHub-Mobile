import React, { useContext, useEffect, useReducer, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    Pressable,
    Dimensions,
} from "react-native";
import { ProfileContext } from "../providers/ProfileDataProvider";
import { Fuel_Expenses } from "../../types/fuel_expenses";
import { DateTimePickerModal } from "./DateTimePickerModal";
import { DateType } from "react-native-ui-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { parseMMDDYYYY } from "../utils/parseMMDDYYYY";
import { PieChart } from "react-native-chart-kit";
import { Insurance_Expenses } from "../../types/insurance_expenses";

// Get screen width
const screenWidth = Dimensions.get("window").width;

// Chart configuration (styling)
const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2, // Show values with 2 decimal places
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue bars
    labelColor: (opacity = 1) => `rgba(177, 80, 80, ${opacity})`, // rgb(177, 80, 80) labels
    barPercentage: 0.6, // Increase bar width
    fillShadowGradient: "#2196F3", // Blue bar color
    fillShadowGradientOpacity: 1,
};

const pieColors = {
    fuel: "#2196F3", // Blue
    service: "#FF9800", // Orange
    insurance: "#E91E63", // Pink
    other: "#4CAF50", // Green
};

const normalizeToLocalDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const ReportsScreen = () => {
    const { userProfile, expenses, fuelExpenses } = useContext(ProfileContext);

    // Get a date object for the current time
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setDate(1); // Prevent day overflow
    oneMonthAgo.setMonth(now.getMonth() - 1);

    // Optional: set back the day to what it was, if valid
    const lastDayOfPrevMonth = new Date(
        oneMonthAgo.getFullYear(),
        oneMonthAgo.getMonth() + 1,
        0
    ).getDate();
    oneMonthAgo.setDate(Math.min(now.getDate(), lastDayOfPrevMonth));

    const dueDate = new Date();
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale; // Auto-detect user locale

    // Format Date (User's Locale)
    const formattedDate = oneMonthAgo.toLocaleDateString(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // Format Date (User's Locale)
    const formattedDueDate = dueDate.toLocaleDateString(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const [isValidUntilButtonPressed, setIsValidUntilButtonPressed] =
        useState(false);
    const [selectedDate, setSelectedDate] = useState<DateType>(formattedDate);
    const [selectedDueDate, setSelectedDueDate] =
        useState<DateType>(formattedDueDate);

    const [selectedDateTime, setSelectedDateTime] = useState<DateType>();
    const [modalVisible, setModalVisible] = useState(false);

    const [chartdata, setChartData] = useState<any[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        if (expenses) {
            setChartData([]);
            setTotalCost(0);

            // @ts-ignore
            const start = parseMMDDYYYY(selectedDate);
            // @ts-ignore
            const end = parseMMDDYYYY(selectedDueDate);

            expenses.forEach((element) => {
                if (element.fuel_expenses) {
                    const fuelTotalCost = element.fuel_expenses
                        .filter((entry: Fuel_Expenses) => {
                            // @ts-ignore
                            const entryDate = new Date(entry.date);
                            return entryDate >= start && entryDate <= end;
                        })
                        .reduce(
                            // @ts-ignore
                            (accumulator, currentValue) =>
                                accumulator + Number(currentValue.total_cost),
                            0
                        );

                    if (fuelTotalCost > 0) {
                        setTotalCost(
                            (oldState) => (oldState += fuelTotalCost)
                        );

                        setChartData((oldArray) => [
                            ...oldArray,
                            {
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                                name: "Fuel",
                                cost: fuelTotalCost,
                                color: pieColors.fuel,
                            },
                        ]);
                    }
                }

                if (element.service_expenses) {
                    const serviceTotalCost = element.service_expenses
                        .filter((entry: Service_Expenses) => {
                            // @ts-ignore
                            const entryDate = new Date(entry.date);
                            return entryDate >= start && entryDate <= end;
                        })
                        .reduce(
                            // @ts-ignore
                            (accumulator, currentValue) =>
                                accumulator + Number(currentValue.cost),
                            0
                        );

                    if (serviceTotalCost > 0) {
                        setTotalCost(
                            (oldState) => (oldState += serviceTotalCost)
                        );

                        setChartData((oldArray) => [
                            ...oldArray,
                            {
                                legendFontColor: "#b47373",
                                legendFontSize: 15,
                                name: "Service",
                                cost: serviceTotalCost,
                                color: pieColors.service,
                            },
                        ]);
                    }
                }

                if (element.insurance_expenses) {
                    const insuranceCost = element.insurance_expenses
                        .filter((entry: Insurance_Expenses) => {
                            const entryDate = normalizeToLocalDate(
                                // @ts-ignore
                                new Date(entry.valid_from)
                            );
                            return entryDate >= start && entryDate <= end;
                        })
                        .reduce(
                            // @ts-ignore
                            (accumulator, currentValue) =>
                                accumulator + Number(currentValue.cost),
                            0
                        );

                    if (insuranceCost > 0) {
                        setTotalCost(
                            (oldState) => (oldState += insuranceCost)
                        );

                        setChartData((oldArray) => [
                            ...oldArray,
                            {
                                legendFontColor: "#b47373",
                                legendFontSize: 15,
                                name: "Service",
                                cost: insuranceCost,
                                color: pieColors.insurance,
                            },
                        ]);
                    }
                }
            });
        }
    }, [selectedDate, selectedDueDate]);

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
                    {/* Date & Time Inputs */}
                    <View style={styles.dateTimeWrapper}>
                        {/* First Date-Time Picker */}
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>Start Date</Text>
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true);
                                    setIsValidUntilButtonPressed(false);
                                }}
                                style={({ pressed }) =>
                                    pressed
                                        ? styles.PressedDateTimeInputContainer
                                        : styles.dateTimeInputContainer
                                }
                            >
                                <Ionicons
                                    name="calendar"
                                    size={20}
                                    color="#6c6b6b"
                                    style={styles.icon}
                                />
                                <Text style={styles.dateTimeText}>
                                    {selectedDate?.toString() || "dd/mm/yyyy"}
                                </Text>
                            </Pressable>
                        </View>

                        {/* Second Date-Time Picker */}
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>End Date</Text>
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true);
                                    setIsValidUntilButtonPressed(true);
                                }}
                                style={({ pressed }) =>
                                    pressed
                                        ? styles.PressedDateTimeInputContainer
                                        : styles.dateTimeInputContainer
                                }
                            >
                                <Ionicons
                                    name="calendar"
                                    size={20}
                                    color="#6c6b6b"
                                    style={styles.icon}
                                />
                                <Text style={styles.dateTimeText}>
                                    {selectedDueDate?.toString() ||
                                        "dd/mm/yyyy"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.chartContainer}>
                        {chartdata.length > 0 ? (
                            <PieChart
                                data={chartdata}
                                width={screenWidth}
                                height={260}
                                chartConfig={chartConfig}
                                accessor={"cost"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                center={[10, 0]}
                                absolute
                            />
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Ionicons
                                    name="information-circle-outline"
                                    size={40}
                                    color="#aaa"
                                />
                                <Text style={styles.chartPlaceholderText}>
                                    No expense data available for the selected
                                    range.
                                </Text>
                            </View>
                        )}
                    </View>

                    <DateTimePickerModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        selectedDateTime={selectedDateTime}
                        setSelectedDateTime={setSelectedDateTime}
                        setSelectedDate={setSelectedDate}
                        insuranceExpenseScreen={true}
                        setSelectedDueDate={setSelectedDueDate}
                        setIsValidUntilButtonPressed={
                            setIsValidUntilButtonPressed
                        }
                        isValidUntilButtonPressed={isValidUntilButtonPressed}
                        selectedDate={selectedDate}
                        selectedDueDate={selectedDueDate}
                    />

                    {/* Balance Section */}
                    <View style={styles.sections}>
                        <Text style={styles.sectionTitle}>Balance</Text>

                        <View style={styles.innerSection}>
                            <View style={styles.column}>
                                <Text style={styles.redText}>Total price</Text>
                                <Text style={[styles.columnRightWithBorder]}>
                                    {totalCost.toFixed(2)} €
                                </Text>
                            </View>

                            <View style={styles.column}>
                                <Text>By day</Text>
                                <Text style={[styles.columnRightWithBorder]}>
                                    {/* {serviceTotalCost.toFixed(2)} € */}
                                </Text>
                            </View>
                            <View style={styles.column}>
                                <Text>By km</Text>
                                <Text style={[styles.columnRightWithBorder]}>
                                    {/* {insuranceCost.toFixed(2)} € */}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Cost Section */}
                    <View style={styles.sections}>
                        <Text style={styles.sectionTitle}>Cost</Text>

                        <View style={styles.innerSection}>
                            <View style={styles.column}>
                                <Text style={styles.redText}>Total</Text>
                                <Text style={[styles.columnRightWithBorder]}>
                                    67,65 €
                                </Text>
                            </View>

                            <View style={styles.column}>
                                <Text>By day</Text>
                                <Text style={[styles.columnRightWithBorder]}>
                                    -12,00 €
                                </Text>
                            </View>
                            <View style={styles.column}>
                                <Text>By km</Text>
                                <Text>0,00 €</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    innerKeyboardContainer: {
        padding: 16,
    },
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 16,
    },
    topBar: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#00AFCF",
        padding: 10,
    },
    time: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    icons: {
        flexDirection: "column",
        alignItems: "center",
    },
    batteryText: {
        color: "white",
        marginLeft: 4,
    },
    header: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "#00AFCF",
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    tabs: {
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#E8E8E8",
        paddingVertical: 10,
    },
    tab: {
        paddingVertical: 5,
    },
    tabText: {
        color: "gray",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#00AFCF",
    },
    activeTabText: {
        color: "#00AFCF",
    },
    content: {
        padding: 15,
    },
    dateRange: {
        textAlign: "center",
        color: "gray",
        marginBottom: 10,
    },
    sections: {
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#00AFCF",
    },
    column: {
        flex: 1,
        height: 54,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 4,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#c4c0c0",
    },
    redText: {
        color: "red",
    },
    greenText: {
        color: "green",
    },
    innerSection: {
        marginTop: 8,
        flexDirection: "row",
        flexGrow: 1,
    },
    columnRightWithBorder: {
        borderRightWidth: 1,
        borderRightColor: "#c4c0c0",
        paddingHorizontal: 24,
    },

    /// date picker

    dateTimeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        gap: 16, // Ensures spacing between elements
    },
    dateTimeContainer: {
        flex: 1, // Ensures both take equal space
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 5, // Spacing between label and button
    },
    dateTimeInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#DDD",
        width: "100%",
    },
    PressedDateTimeInputContainer: {
        flexDirection: "row",
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#DDD",
        width: "100%",
    },
    icon: {
        marginRight: 10,
    },
    dateTimeText: {
        fontSize: 16,
        color: "#555",
        marginLeft: 8,
    },

    // chart
    chartPlaceholder: {
        height: 360,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 16,
    },

    chartPlaceholderText: {
        marginTop: 12,
        fontSize: 16,
        color: "#777",
        textAlign: "center",
    },
    chartContainer: {
        width: "100%",
    },
});

export default ReportsScreen;
