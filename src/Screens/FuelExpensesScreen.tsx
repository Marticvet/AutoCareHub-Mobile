import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useContext, useMemo, useState } from "react";
import { ProfileContext } from "../providers/ProfileDataProvider";
import { LineChart } from "react-native-chart-kit";

// Get screen width
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const FuelExpensesScreen = () => {
  const { fuelExpenses } = useContext(ProfileContext);
  const [selectedFuelType, setSelectedFuelType] = useState(null);

  // If data is loading
  if (!fuelExpenses) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#555" }}>Loading fuel expenses...</Text>
      </View>
    );
  }

  // If no data
  if (fuelExpenses.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#555" }}>No fuel expenses recorded yet.</Text>
      </View>
    );
  }

  // Get unique fuel types
  const fuelTypes = [...new Set(fuelExpenses.map((expense) => expense.fuel_type))];

  // Filtered fuel expenses based on selected fuel type
  const filteredFuelExpenses = selectedFuelType
    ? fuelExpenses.filter((expense) => expense.fuel_type === selectedFuelType)
    : fuelExpenses;

  // Format dates for X-Axis
  const formattedLabels = filteredFuelExpenses.map((expense) =>
    expense.date
      ? new Date(expense.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      : "Unknown"
  );

  // Get total cost data
  const totalCosts = filteredFuelExpenses.map((expense) => expense.total_cost || 0);

  // Memoized chart data
  const chartData = useMemo(() => ({
    labels: formattedLabels,
    datasets: [{ data: totalCosts }],
  }), [filteredFuelExpenses]);

  // Chart configuration (styling)
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2, // Show values with 2 decimal places
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue line
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
    propsForDots: {
      r: "7", // Bigger dots
      strokeWidth: "3",
      stroke: "#2196F3", // Blue border for dots
      fill: "#2196F3", // Blue fill for dots
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // Makes the grid lines dashed
      stroke: "#E0E0E0", // Light gray grid
    },
    propsForVerticalLines: {
      strokeDasharray: "", // Makes the grid lines dashed
      stroke: "#E0E0E0", // Light gray grid
    },
    propsForLabels: {
      fontSize: 14,
      fontWeight: "600",
    },
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#FFF", borderRadius: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 10, elevation: 5 }}>
      
      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#333" }}>
        Fuel Expenses Over Time
      </Text>
      <Text style={{ fontSize: 14, textAlign: "center", color: "#666", marginBottom: 10 }}>
        Track your fuel costs month by month
      </Text>

      {/* Fuel Type Filter Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15 }}>
        <TouchableOpacity
          onPress={() => setSelectedFuelType(null)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 15,
            backgroundColor: selectedFuelType === null ? "#2196F3" : "#DDD",
            marginRight: 5,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: selectedFuelType === null ? "#FFF" : "#000", fontWeight: "bold" }}>All</Text>
        </TouchableOpacity>

        {fuelTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedFuelType(type)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 15,
              backgroundColor: selectedFuelType === type ? "#2196F3" : "#DDD",
              marginRight: 5,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: selectedFuelType === type ? "#FFF" : "#000", fontWeight: "bold" }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Line Chart */}
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={400}
        chartConfig={chartConfig}
        bezier // Smooth curved line
        yAxisLabel="€"
        yAxisSuffix=""
        withVerticalLabels
        withHorizontalLabels
        withDots={true} // Show dots at data points
        style={{
          borderRadius: 16,
          marginVertical: 10,
          elevation: 3, // Slight shadow effect
        }}
      />
    </View>
  );
};
