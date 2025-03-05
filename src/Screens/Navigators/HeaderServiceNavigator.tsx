import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import ServiceExpenseScreen from "../ServiceExpenseScreen";
import ReminderScreen from "../ReminderScreen";
import ReportsScreen from "../ReportsScreen";

const Tab = createMaterialTopTabNavigator();

export const HeaderServiceNavigator = () => {
    const route = useRoute();
    const params = route.params as { screen?: string } | undefined;
    const initialScreen = params?.screen || "ServiceExpenseScreen"; // Default tab

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.innerContainer}>
                <Tab.Navigator
                    initialRouteName={initialScreen}
                    screenOptions={{
                        tabBarStyle: { backgroundColor: "#E8E8E8" },
                        tabBarActiveTintColor: "#00AFCF",
                        tabBarInactiveTintColor: "gray",
                        tabBarIndicatorStyle: { backgroundColor: "#00AFCF" },
                        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                    }}
                >
                    <Tab.Screen name="ServiceExpenseScreen" component={ServiceExpenseScreen} />
                    <Tab.Screen name="ReminderScreen" component={ReminderScreen} />
                    <Tab.Screen name="ReportsScreen" component={ReportsScreen} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: StatusBar.currentHeight || 0 },
    innerContainer: { flex: 1 },
});

export default HeaderServiceNavigator;
