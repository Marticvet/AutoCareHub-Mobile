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
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import { AuthProvider, useAuth } from "./providers/authentication";
import { UsersService } from "./services/users.service";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard } from "react-native";
import { CommonActions } from "@react-navigation/native";
import SettingsScreen from "./Screens/SettingsScreen/SettingsScreen";
import AddVehicleScreen from "./Screens/AddVehicleScreen/AddVehicleScreen";
import VehicleDetailScreen from "./Screens/VehicleDetailScreen/VehicleDetailScreen";
// types.ts
export type RootStackParamList = {
    Login: undefined; // No params for the Login screen
    Register: undefined; // No params for the Register screen
    HomeScreen: undefined; // No params for the HomeScreen screen
    SettingsScreen: undefined; // No params for the SettingsScreen screen
};

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
    const { authState } = useAuth();

    if (authState.loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return authState.isLoggedIn ? <AuthNavigator /> : <NonAuthNavigator />;
}

function LogoutButton() {
    const { logout } = useAuth();

    async function logoutHandler() {
        const userService = new UsersService();

        try {
            const response = await userService.logoutUser();
            if (response && response.status === 200) {
                logout();
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
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
    const { authState } = useAuth();

    if (authState.isLoggedIn) {
        return (
            <AppStack.Navigator initialRouteName="HomeScreen">
                <AppStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerRight: () => <LogoutButton />,
                        // headerShown: false,
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
