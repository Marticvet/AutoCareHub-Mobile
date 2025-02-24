import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../HomeScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function SidebarNavigator() {
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
