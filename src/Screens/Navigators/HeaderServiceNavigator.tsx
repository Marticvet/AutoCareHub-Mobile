// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import { SafeAreaView, StyleSheet, View } from "react-native";
// import ServiceExpensesScreen from "../ServiceExpensesScreen";
// import ReminderScreen from "../ReminderScreen";
// import ReportsScreen from "../ReportsScreen";

// const Tab = createMaterialTopTabNavigator();

// export const HeaderServiceNavigator = () => {
//     const route = useRoute();
//     const navigation = useNavigation();

//     // Extract the screen parameter from the route
//     const params = route.params as { screen?: string } | undefined;
//     const screen = params?.screen || "ServiceExpensesScreen"; // Default fallback

//     // Dynamically navigate to the correct tab when the screen parameter changes
//     useEffect(() => {
//         if (screen) {
//             // navigation.navigate(screen);
//         }
//     }, [screen]);

//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <View style={styles.innerContainer}>
//                 <Tab.Navigator
//                     initialRouteName="ReportsScreen" // Default initial route
//                     screenOptions={{
//                         tabBarStyle: { backgroundColor: "#E8E8E8" },
//                         tabBarActiveTintColor: "#00AFCF",
//                         tabBarInactiveTintColor: "gray",
//                         tabBarIndicatorStyle: { backgroundColor: "#00AFCF" },
//                         tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
//                     }}
//                 >
//                     <Tab.Screen
//                         name="ServiceExpensesScreen"
//                         component={ServiceExpensesScreen}
//                     />
//                     <Tab.Screen
//                         name="ReminderScreen"
//                         component={ReminderScreen}
//                     />
//                     <Tab.Screen
//                         name="ReportsScreen"
//                         component={ReportsScreen}
//                     />
//                 </Tab.Navigator>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     safeContainer: { flex: 1, backgroundColor: "#FFFFFF" },
//     innerContainer: { flex: 1 },
// });

// export default HeaderServiceNavigator;
