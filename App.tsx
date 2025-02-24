import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./src/providers/AuthProvider";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import QueryProvider from "./src/providers/QueryProvider";
import { ProfileDataProvider } from "./src/providers/ProfileDataProvider";
import AppTabs from "./src/Screens/Navigators/AppTabs";

const AuthStack = createStackNavigator();

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

export default App;
