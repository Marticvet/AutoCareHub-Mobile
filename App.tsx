import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard } from "react-native";
import { CommonActions } from "@react-navigation/native";
// types.ts
export type RootStackParamList = {
    Login: undefined; // No params for the Login screen
    Register: undefined; // No params for the Register screen
    HomeScreen: undefined; // No params for the HomeScreen screen
    SettingsScreen: undefined; // No params for the SettingsScreen screen
};

import AuthProvider, { useAuth } from "./src/providers/AuthProvider";
import { supabase } from "./src/lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import AddVehicleScreen from "./src/Screens/AddVehicleScreen/AddVehicleScreen";
import VehicleDetailScreen from "./src/Screens/VehicleDetailScreen/VehicleDetailScreen";

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
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return session?.access_token ? <AuthNavigator /> : <NonAuthNavigator />;
}

function LogoutButton() {
    async function logoutHandler() {
        await supabase.auth.signOut();
    }

    return (
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoutButton: {
        marginRight: 15, // Add spacing to the right
    },
    logoutText: {
        color: "blue", // Customize the button text color
        fontSize: 16,
    },
});

export default App;
