import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { AuthProvider, useAuth } from "./src/providers/AuthProvider";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import AddVehicleScreen from "./src/Screens/AddVehicleScreen";
import VehicleDetailScreen from "./src/Screens/VehicleDetailScreen";
import QueryProvider from "./src/providers/QueryProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ReportsScreen from "./src/Screens/ReportsScreen";
import ServiceScreen from "./src/Screens/ServiceExpensesScreen";
import ReminderScreen from "./src/Screens/ReminderScreen";
import { useState } from "react";
import { ProfileDataProvider } from "./src/providers/ProfileDataProvider";

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
    <QueryProvider>
      <AuthProvider>
        <ProfileDataProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ProfileDataProvider>
      </AuthProvider>
    </QueryProvider>
  );

function RootNavigator() {
    const { session } = useAuth();

    return session?.access_token ? <AppTabs /> : <NonAuthNavigator />;
}

// 📌 **Bottom Tab Navigator for Logged-in Users**
function AppTabs() {
    const navigation = useNavigation();
    const { logout } = useAuth(); // Get logout function from AuthProvider
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelection = (screen: string) => {
        setModalVisible(false);
        // @ts-ignore
        navigation.navigate(screen);
    };
    return (
        <View style={{ flex: 1, position: "relative" }}>
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

                {/* ✅ Floating Action Button (FAB) in the Center */}
                <Tab.Screen
                    name="Plus"
                    component={HomeScreen} // Dummy component
                    options={{
                        tabBarButton: () => (
                            <TouchableOpacity
                                style={styles.fabButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Ionicons name="add" size={32} color="white" />
                            </TouchableOpacity>
                        ),
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault(); // Prevent navigation
                            setModalVisible(true);
                        },
                    }}
                />

                <Tab.Screen
                    name="ReminderScreen"
                    component={ReminderScreen}
                    options={{
                        title: "Reminders",
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
                    component={LogoutButton} // ✅ Use a named component
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

            {/* ✅ Modal for Selecting Actions */}

            {/* ✅ Modal for Selecting Actions */}
            {modalVisible && (
                <View style={styles.modalWrapper}>
                    <Modal
                        transparent
                        visible={modalVisible}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity
                            style={styles.overlay}
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                {[
                                    {
                                        title: "Fuel Expenses",
                                        screen: "FuelExpensesScreen",
                                    },
                                    {
                                        title: "Insurance Expenses",
                                        screen: "InsuranceExpensesScreen",
                                    },
                                    {
                                        title: "Oil Expenses",
                                        screen: "OilExpensesScreen",
                                    },
                                    {
                                        title: "Service Expenses",
                                        screen: "ServiceExpensesScreen",
                                    },
                                    {
                                        title: "Service Reminders",
                                        screen: "ServiceRemindersScreen",
                                    },
                                    {
                                        title: "Car Expenses",
                                        screen: "CarExpensesScreen",
                                    },
                                    {
                                        title: "Reports",
                                        screen: "ReportsScreen",
                                    },
                                    {
                                        title: "Reminder",
                                        screen: "ReminderScreen",
                                    },
                                ].map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() =>
                                            handleSelection(item.screen)
                                        }
                                    >
                                        <Text style={styles.optionText}>
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )}
        </View>
    );
}

function SidebarNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: { backgroundColor: "#212640", width: 280 },
                drawerActiveTintColor: "#ffffff",
                drawerInactiveTintColor: "#888",
                headerShown: true, // Show header only in HomeScreen
                drawerType: "slide", // ✅ Pushes screen to the right
                headerTintColor: "#ffffff",
                headerStyle: { backgroundColor: "#212640" },
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Home",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Notifications"
                component={() => null}
                options={({ navigation }) => ({
                    title: "Notifications",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Profile"
                component={() => null}
                options={({ navigation }) => ({
                    title: "Profile",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={() => null}
                options={({ navigation }) => ({
                    title: "Settings",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Drawer.Navigator>
    );
}

function LogoutButton() {
    return null;
    // return (
    //     <TouchableOpacity style={styles.logoutButton} onPress={logout}>
    //         <Text style={styles.logoutText}>Logout</Text>
    //     </TouchableOpacity>
    // );
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

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 15, // Add spacing to the right
    },
    logoutText: {
        color: "blue", // Customize the button text color
        fontSize: 16,
    },

    fabButton: {
        width: 60, // Slightly larger for better UI
        height: 60,
        borderRadius: 30,
        backgroundColor: "#00AFCF",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute", // Ensures proper positioning
        bottom: 10, // Keeps it above the tab bar
        alignSelf: "center", // Centers the button horizontally
        zIndex: 10, // Ensures it's above other elements
        elevation: 5, // Gives a shadow effect (Android)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        transform: [{ translateY: -10 }], // Moves up for a floating effect
    },

    modalWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        position: "absolute",
        bottom: 85,
        width: "90%",
        maxHeight: "70%",
        backgroundColor: "#212640",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 110,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
    },

    option: {
        width: "100%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
        alignItems: "center",
    },

    optionText: {
        fontSize: 18,
        color: "#fff",
    },

    cancelButton: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#fff",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginTop: 10,
        borderRadius: 10,
    },

    cancelText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    // option: {
    //     padding: 15,
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#ddd",
    // },
    // optionText: {
    //     fontSize: 18,
    // },
    // cancelButton: {
    //     padding: 15,
    //     marginTop: 24,
    //     backgroundColor: "#ddd",
    //     borderRadius: 8,
    //     width: "100%",
    //     height: 50,
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     textAlign: 'center',
    // },
    // cancelText: {
    //     textAlign: "center",
    //     fontSize: 16,
    // },
    // overlay: {
    //     flex: 1,
    //     backgroundColor: "rgba(0,0,0,0.5)",
    //     justifyContent: "center", // Centers the modal vertically
    //     alignItems: "center", // Centers the modal horizontally
    // },
    // modalWrapper: {
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    //     top: 0,
    //     left: 0,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     zIndex: 100, // Ensures it's above everything else
    // },
    // modalContainer: {
    //     position: "absolute",
    //     bottom: 85, // Ensures it's above the bottom tab bar
    //     width: "90%", // Responsive width
    //     maxHeight: "70%", // Prevents modal from being too large
    //     backgroundColor: "#212640",
    //     padding: 20,
    //     borderRadius: 16,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     zIndex: 110, // Higher than the modalWrapper to stay on top
    //     elevation: 10,
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 5,
    // },
});

export default App;
