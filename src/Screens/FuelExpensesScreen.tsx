import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "../providers/ProfileDataProvider";
import { DateType } from "react-native-ui-datepicker";
import { Fuel_Expenses } from "../../types/fuel_expenses";
import { parseMMDDYYYY } from "../utils/parseMMDDYYYY";
import { Ionicons } from "@expo/vector-icons";
import { DateTimePickerModal } from "./DateTimePickerModal";
import { BarChart } from "react-native-chart-kit";

// Get screen width
const screenWidth = Dimensions.get("window").width;

// Chart configuration (styling)
const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2, // Show values with 2 decimal places
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue bars
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
    barPercentage: 0.6, // Increase bar width
    fillShadowGradient: "#2196F3", // Blue bar color
    fillShadowGradientOpacity: 1,
};

export const FuelExpensesScreen = () => {
    const { fuelExpenses } = useContext(ProfileContext);

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
    // Get a date object for the current time

    oneMonthAgo.setDate(1); // Prevent day overflow
    oneMonthAgo.setMonth(now.getMonth() - 1);

    oneMonthAgo.setDate(Math.min(now.getDate(), lastDayOfPrevMonth));

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

    const [filteredFuelExpenses, setFilteredFuelExpenses] = useState<
        Fuel_Expenses[]
    >([]);

    useEffect(() => {
        if (fuelExpenses) {
            setChartData([]);
            setFilteredFuelExpenses([]);
            setTotalCost(0);

            // @ts-ignore
            const start = parseMMDDYYYY(selectedDate);
            // @ts-ignore
            const end = parseMMDDYYYY(selectedDueDate);

            const fuelTotalCost = fuelExpenses
                .filter((entry: Fuel_Expenses) => {
                    // @ts-ignore
                    const entryDate = new Date(entry.date);
                    return entryDate >= start && entryDate <= end;
                })
                .map((entry: Fuel_Expenses) => {
                    return { date: entry.date, total_cost: entry.total_cost };
                });

            setFilteredFuelExpenses(fuelTotalCost);

            // .reduce(
            //     // @ts-ignore
            //     (accumulator, currentValue) =>
            //         accumulator + Number(currentValue.total_cost),
            //     0
            // );
        }
    }, [selectedDate, selectedDueDate]);

    // Memoized chart data
    const chartData = useMemo(
        () => ({
            labels: filteredFuelExpenses.map(
                (entry) =>
                    // @ts-ignore
                    new Date(entry.date).toLocaleDateString("en-GB") // or use your locale
            ),
            datasets: [
                {
                    data: filteredFuelExpenses.map((entry) =>
                        Number(entry.total_cost || 0)
                    ),
                },
            ],
        }),
        [filteredFuelExpenses]
    );

    return (
        <View
            style={{
                padding: 20,
                backgroundColor: "#FFF",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 10,
                elevation: 5,
            }}
        >
            {/* Title */}
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                }}
            >
                Fuel Expenses Overview
            </Text>

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
                            {selectedDueDate?.toString() || "dd/mm/yyyy"}
                        </Text>
                    </Pressable>
                </View>

                <DateTimePickerModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedDateTime={selectedDateTime}
                    setSelectedDateTime={setSelectedDateTime}
                    setSelectedDate={setSelectedDate}
                    insuranceExpenseScreen={true}
                    setSelectedDueDate={setSelectedDueDate}
                    setIsValidUntilButtonPressed={setIsValidUntilButtonPressed}
                    isValidUntilButtonPressed={isValidUntilButtonPressed}
                    selectedDate={selectedDate}
                    selectedDueDate={selectedDueDate}
                />
            </View>

            {/* Bar Chart */}
            <BarChart
                data={chartData}
                width={screenWidth - 40}
                height={350}
                yAxisLabel="€"
                chartConfig={chartConfig}
                showBarTops={true}
                verticalLabelRotation={30} // Rotate labels to prevent overlap
                style={{
                    borderRadius: 16,
                    marginVertical: 10,
                    elevation: 3, // Slight shadow effect
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});
