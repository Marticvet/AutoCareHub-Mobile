import { createStackNavigator } from "@react-navigation/stack";
import QueryProvider from "../../providers/QueryProvider";
import SidebarNavigator from "./SidebarNavigator";
import AddVehicleScreen from "../AddVehicleScreen";
import VehicleDetailScreen from "../VehicleDetailScreen";
import ReportsScreen from "../ReportsScreen";
import ServiceScreen from "../ServiceExpensesScreen";
import ReminderScreen from "../ReminderScreen";

const AppStack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <QueryProvider>
            <AppStack.Navigator
                initialRouteName="HomeDrawer"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#212640",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                {/* Wrap HomeScreen inside DrawerNavigator */}
                <AppStack.Screen
                    name="HomeDrawer" // Renamed to avoid conflict
                    component={SidebarNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <AppStack.Screen
                    name="AddVehicleScreen"
                    component={AddVehicleScreen}
                    options={{ title: "Add Vehicle" }}
                />
                <AppStack.Screen
                    name="GetVehicleById"
                    component={VehicleDetailScreen}
                    options={{ title: "Your Vehicle" }}
                />
                <AppStack.Screen
                    name="ReportsScreen"
                    component={ReportsScreen}
                    options={{
                        title: "Reports",
                    }}
                />
                <AppStack.Screen
                    name="ServiceScreen"
                    component={ServiceScreen}
                    options={{
                        title: "Service",
                    }}
                />
                <AppStack.Screen
                    name="ReminderScreen"
                    component={ReminderScreen}
                    options={{
                        title: "Reminder",
                    }}
                />
            </AppStack.Navigator>
        </QueryProvider>
    );
}
