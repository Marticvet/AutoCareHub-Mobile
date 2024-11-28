import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { UsersService } from "../../services/users.service";
import { useAuth } from "../../providers/authentication";

interface LoginFormInterface {
    username: string;
    password: string;
}

function LoginScreen() {
    const { authState, login, logout } = useAuth();
    const navigation = useNavigation();
    const [loginForm, setLoginForm] = useState<LoginFormInterface>({
        username: "martigiant@gmail.com",
        password: "Marticvet",
    });

    async function submitLoginFormHandler() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const isEmailValid = emailRegex.test(loginForm.username);
        const isPasswordValid = passwordRegex.test(loginForm.password);

        if (true) {
            const userService = new UsersService();
            const { username, password } = loginForm;

            try {
                const userService = new UsersService();
                const response = await userService.loginUser({
                    username,
                    password,
                });

                if (!response) {
                    window.alert("Invalid username or password");
                    return;
                }
                const { token, firstName, lastName, userId } = response;
                await login(token, firstName, lastName, userId); // Call the login function
                console.log("User logged in successfully");
            } catch (error) {
                console.error("Error during login:", error);
            }

            // Reset the navigation stack and navigate to the HomePage screen
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0, // this will set the first screen in the stack (only HomePage screen)
            //         routes: [
            //             { name: "HomePage" }, // replace 'HomePage' with your registration screen name
            //         ],
            //     })
            // );

            // setLoginForm({
            //     username: "",
            //     password: "",
            // });
        } else {
            // Generate an appropriate error message
            const errorMessage = !isEmailValid
                ? "Please enter a valid username address."
                : "Password must include at least 8 characters, an uppercase letter, a number, and a special character.";

            Alert.alert("Validation Error", errorMessage, [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed"),
                },
            ]);

            // Reset form and show alert
            setLoginForm({
                username: "",
                password: "",
            });
        }
    }

    function loginFormHandler(field: string, value: string) {
        setLoginForm((oldState) => {
            return {
                ...oldState,
                [field]: value,
            };
        });
    }

    function navigateCreateAcountHandler() {
        // Reset the navigation stack and navigate to the Register screen
        navigation.dispatch(
            CommonActions.reset({
                index: 0, // this will set the first screen in the stack (only Register screen)
                routes: [
                    { name: "Register" }, // replace 'Register' with your registration screen name
                ],
            })
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.welcome}>Welcome in AutoCare-Hub!</Text> */}
            <View style={styles.loginInsideContainer}>
                <View style={styles.loginWithContainer}>
                    <View style={styles.loginTextContainer}>
                        <Text style={styles.loginText}>Login With</Text>
                    </View>
                    <View style={styles.loginIcons}>
                        <View style={styles.loginIcon}>
                            <Entypo name="facebook" size={24} color="black" />
                        </View>

                        <View style={styles.loginIcon}>
                            <AntDesign name="google" size={24} color="black" />
                        </View>

                        <View style={styles.loginIcon}>
                            <AntDesign name="apple1" size={24} color="black" />
                        </View>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.text}>or</Text>
                        <View style={styles.line} />
                    </View>
                </View>

                <View style={styles.loginForm}>
                    <View style={styles.loginInformationContainer}>
                        <Text style={styles.loginTextLabel}>Email Adress:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your username"
                            placeholderTextColor="#aaa"
                            onChangeText={(value) =>
                                loginFormHandler("username", value)
                            }
                            value={loginForm.username}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.loginInformationContainer}>
                        <Text style={styles.loginTextLabel}>Password:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#aaa"
                            onChangeText={(value) =>
                                loginFormHandler("password", value)
                            }
                            value={loginForm.password}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={submitLoginFormHandler}
                            style={({ pressed }) =>
                                pressed
                                    ? styles.pressedLoginButton
                                    : styles.loginButton
                            }
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </Pressable>

                        <View style={styles.registerOptionContainer}>
                            <Text style={styles.registerOuterText}>
                                Don't have account?
                            </Text>
                            <Text
                                style={styles.registerInnerText}
                                onPress={navigateCreateAcountHandler}
                            >
                                Create acount
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
    },
    welcome: {
        fontSize: 24,
        paddingBottom: 18,
    },
    loginInsideContainer: {
        borderRadius: 12,
        height: "80%",
        flex: 1,
        width: "85%",
    },
    loginForm: {
        flex: 1,
    },
    loginWithContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "35%",
        paddingHorizontal: 12,
    },
    loginIcons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 8,
    },
    loginIcon: {
        width: 68,
        height: 48,
        // borderColor: "red",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    loginTextContainer: {
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    loginText: {
        fontSize: 24,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16, // Adjust for spacing
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc", // Adjust for line color
        marginHorizontal: 8, // Adjust spacing around "or"
    },
    text: {
        fontSize: 16,
        color: "#888", // Adjust for text color
    },
    textInput: {
        borderWidth: 1,
        borderColor: "lightgrey",
        height: 38,
        paddingHorizontal: 10,
        marginBottom: 12,
        fontSize: 16,
        borderRadius: 8,
    },
    loginInformationContainer: {
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    loginTextLabel: {
        fontSize: 16,
        marginBottom: 6,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 24,
    },
    loginButton: {
        backgroundColor: "#4FD15B",
        width: "80%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },
    pressedLoginButton: {
        backgroundColor: "#7ad784",
        width: "80%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },
    loginButtonText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
    },
    registerOptionContainer: {
        alignItems: "center",
        justifyContent: "space-around",
        width: "75%",
        flexDirection: "row",
        marginTop: 16,
    },
    registerOuterText: {
        fontSize: 16,
    },
    registerInnerText: {
        fontSize: 16,
        color: "#64D673",
    },
});

export default LoginScreen;
