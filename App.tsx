// App.tsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./src/providers/AuthProvider";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import QueryProvider from "./src/providers/QueryProvider";
import { ProfileDataProvider } from "./src/providers/ProfileDataProvider";

// Navigators & Global Screens
import SidebarNavigator from "./src/Screens/Navigators/SidebarNavigator";
import BottomNavigator from "./src/Screens/Navigators/BottomNavigator";
import ServiceExpensesScreen from "./src/Screens/ServiceExpensesScreen";
import ReminderScreen from "./src/Screens/ReminderScreen";
import ReportsScreen from "./src/Screens/ReportsScreen";
import ServiceScreen from "./src/Screens/ServiceExpensesScreen";
import { FuelExpensesScreen } from "./src/Screens/FuelExpensesScreen";

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

const MyTheme = {
    dark: true,
    colors: {
        primary: "white",
        background: "white",
        card: "rgb(20, 20, 20)",
        text: "rgb(255, 255, 255)",
        border: "rgb(50, 50, 50)",
        notification: "rgb(255, 69, 58)",
    },
    fonts: {
        regular: { fontFamily: "System", fontWeight: "400" }, // Corrected
        medium: { fontFamily: "System", fontWeight: "500" }, // Corrected
        bold: { fontFamily: "System", fontWeight: "700" }, // Corrected
        heavy: { fontFamily: "System", fontWeight: "800" }, // Corrected
    },
};

function App() {
    return (
        <QueryProvider>
            <AuthProvider>
                <ProfileDataProvider>
                    <NavigationContainer
                        // @ts-ignore
                        theme={MyTheme}
                    >
                        <RootNavigator />
                    </NavigationContainer>
                </ProfileDataProvider>
            </AuthProvider>
        </QueryProvider>
    );
}

function RootNavigator() {
    const { session } = useAuth();

    // If not authenticated, show the non-auth stack.
    if (!session?.access_token) {
        return <NonAuthNavigator />;
    }

    // When authenticated, use a global RootStack:
    // - "MainApp" contains your SidebarNavigator wrapping the BottomNavigator.
    // - "ServiceExpensesScreen" (and any other global screens) is declared here.
    return (
        <RootStack.Navigator
            screenOptions={{
                // headerShown: false,
                headerStyle: {
                    backgroundColor: "#212640",
                },
            }}
        >
            <RootStack.Screen
                name="MainApp"
                component={MainAppNavigator}
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="ServiceExpensesScreen"
                component={ServiceExpensesScreen}
                options={{ title: "Service Expense" }}
            />
            <RootStack.Screen
                name="ReminderScreen"
                component={ReminderScreen}
                options={{ title: "Reminder" }}
            />
            <RootStack.Screen
                name="ReportsScreen"
                component={ReportsScreen}
                options={{ title: "Reports" }}
            />
            <RootStack.Screen
                name="ServiceScreen"
                component={ServiceScreen}
                options={{ title: "Service" }}
            />
            <RootStack.Screen
                name="FuelExpensesScreen"
                component={FuelExpensesScreen}
                options={{ title: "Fuel Expense" }}
            />
            {/* Add more global screens here if needed */}
        </RootStack.Navigator>
    );
}

function MainAppNavigator() {
    // Wrap your bottom tabs with your drawer so that the drawer is available globally.
    return (
        <SidebarNavigator>
            <BottomNavigator />
        </SidebarNavigator>
    );
}

function NonAuthNavigator() {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

export default App;
