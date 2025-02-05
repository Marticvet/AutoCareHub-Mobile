import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
} from "@react-navigation/stack";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
// types.ts
export type RootStackParamList = {
    Login: undefined; // No params for the Login screen
    Register: undefined; // No params for the Register screen
    HomeScreen: undefined; // No params for the HomeScreen screen
    SettingsScreen: undefined; // No params for the SettingsScreen screen
};

import { AuthProvider, useAuth } from "./src/providers/AuthProvider";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import AddVehicleScreen from "./src/Screens/AddVehicleScreen/AddVehicleScreen";
import VehicleDetailScreen from "./src/Screens/VehicleDetailScreen/VehicleDetailScreen";
import QueryProvider from "./src/providers/QueryProvider";
import { Loader } from "./src/Screens/Loader/Loader";

const App = () => (
    <AuthProvider>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    </AuthProvider>
);

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

function RootNavigator() {
    const { session, loading } = useAuth();

    if (loading === true) {
        return <Loader />;
    }

    return session?.access_token ? <AuthNavigator /> : <NonAuthNavigator />;
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
                            headerRight: () => <LogoutButton />,
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
