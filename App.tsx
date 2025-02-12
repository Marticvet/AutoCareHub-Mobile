import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { AuthProvider, useAuth } from "./src/providers/AuthProvider";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import AddVehicleScreen from "./src/Screens/AddVehicleScreen/AddVehicleScreen";
import VehicleDetailScreen from "./src/Screens/VehicleDetailScreen/VehicleDetailScreen";
import QueryProvider from "./src/providers/QueryProvider";
import { Loader } from "./src/Screens/Loader/Loader";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeDashboard from "./src/Screens/HomeDashboard/HomeDashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

const App = () => (
    <AuthProvider>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    </AuthProvider>
);

function RootNavigator() {
    const { session, loading } = useAuth();

    if (loading === true) {
        return <Loader />;
    }

    return session?.access_token ? <AppTabs /> : <NonAuthNavigator />;
}

// 📌 **Bottom Tab Navigator for Logged-in Users**
function AppTabs() {
    const { logout } = useAuth(); // Get logout function from AuthProvider

    return (
        <QueryProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: "#212640" },
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#888",
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={AuthNavigator} // Use AuthNavigator for Home Navigation
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="AddVehicleScreen"
                    component={AddVehicleScreen}
                    options={{
                        title: "Add Vehicle",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="car-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                {/* Logout Button (Not a Screen, Just a Clickable Tab) */}
                <Tab.Screen
                    name="Logout"
                    component={() => null} // Don't render a screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="log-out-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault(); // Prevent navigation
                            logout(); // Call the logout function
                        },
                    })}
                />
            </Tab.Navigator>
        </QueryProvider>
    );
}

function LogoutButton() {
    const { logout } = useAuth(); // ✅ Get logout from AuthProvider

    return (
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    );
}

function NonAuthNavigator() {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false, // Hide header during reset
                gestureEnabled: false, // Disable gestures if they interfere
            }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

function AuthNavigator() {
    const { session } = useAuth();

    if (session?.access_token) {
        return (
            <QueryProvider>
                <AppStack.Navigator initialRouteName="HomeScreen">
                    <AppStack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            // headerRight: () => <LogoutButton />,
                            // headerShown: false,
                            title: "Home",
                        }}
                    />
                    <AppStack.Screen
                        name="AddVehicleScreen"
                        component={AddVehicleScreen}
                        options={{
                            title: "Add Vehicle",
                        }}
                    />
                    <AppStack.Screen
                        name="GetVehicleById"
                        component={VehicleDetailScreen}
                        options={{
                            title: "Your Vehicle",
                        }}
                    />
                </AppStack.Navigator>
            </QueryProvider>
        );
    }

    return (
        <AppStack.Navigator initialRouteName="Login">
            <AppStack.Screen name="Login" component={LoginScreen} />
            <AppStack.Screen name="Register" component={RegisterScreen} />
        </AppStack.Navigator>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 15, // Add spacing to the right
    },
    logoutText: {
        color: "blue", // Customize the button text color
        fontSize: 16,
    },
});

export default App;
