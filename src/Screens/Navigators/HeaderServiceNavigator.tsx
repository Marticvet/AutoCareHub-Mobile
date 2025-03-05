import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ServiceExpenseScreen from "../ServiceExpenseScreen";
import ReminderScreen from "../ReminderScreen";
import ReportsScreen from "../ReportsScreen";

const Tab = createMaterialTopTabNavigator();

export const HeaderServiceNavigator = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // Extract the screen parameter from the route
    const params = route.params as { screen?: string } | undefined;
    const screen = params?.screen || "ServiceExpenseScreen"; // Default fallback

    // useEffect(() => {
    //     if (screen) {
    //         navigation.navigate(screen as never); // Ensure correct navigation type
    //     }
    // }, [screen]);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.innerContainer}>
                <Tab.Navigator
                    initialRouteName={screen} // Set initial screen dynamically
                    screenOptions={{
                        tabBarStyle: { backgroundColor: "#E8E8E8" },
                        tabBarActiveTintColor: "#00AFCF",
                        tabBarInactiveTintColor: "gray",
                        tabBarIndicatorStyle: { backgroundColor: "#00AFCF" },
                        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                    }}
                >
                    <Tab.Screen
                        name="ServiceExpenseScreen"
                        component={ServiceExpenseScreen}
                        options={{ title: "Service Expenses" }}
                    />
                    <Tab.Screen
                        name="ReminderScreen"
                        component={ReminderScreen}
                        options={{ title: "Reminders" }}
                    />
                    <Tab.Screen
                        name="ReportsScreen"
                        component={ReportsScreen}
                        options={{ title: "Reports" }}
                    />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    innerContainer: { flex: 1 },
});

export default HeaderServiceNavigator;
