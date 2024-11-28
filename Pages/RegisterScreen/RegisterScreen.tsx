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

interface RegisterFormInterface {
    username: string;
    password: string;
    confirmPassword: string;
}

function RegisterScreen() {
    const navigation = useNavigation();
    const [registerForm, setRegisterForm] = useState<RegisterFormInterface>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    function submitRegisterFormHandler() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const isEmailValid = emailRegex.test(registerForm.username);
        const isPasswordValid = passwordRegex.test(registerForm.password);
        const isConfirmedPasswordValid = passwordRegex.test(registerForm.confirmPassword);

        if (isEmailValid && isPasswordValid && isConfirmedPasswordValid) {
            console.log("Register Successful!");
            // Proceed with register actions
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
            setRegisterForm({
                username: "",
                password: "",
                confirmPassword: "",
            });
        }
    }

    function registerFormHandler(field: string, value: string) {
        setRegisterForm((oldState) => {
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
                    { name: "Login" }, // replace 'Register' with your registration screen name
                ],
            })
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.welcome}>Welcome in AutoCare-Hub!</Text> */}
            <View style={styles.registerInsideContainer}>
                <View style={styles.registerWithContainer}>
                    <View style={styles.registerTextContainer}>
                        <Text style={styles.registerText}>Register With</Text>
                    </View>
                    <View style={styles.registerIcons}>
                        <View style={styles.registerIcon}>
                            <Entypo name="facebook" size={24} color="black" />
                        </View>

                        <View style={styles.registerIcon}>
                            <AntDesign name="google" size={24} color="black" />
                        </View>

                        <View style={styles.registerIcon}>
                            <AntDesign name="apple1" size={24} color="black" />
                        </View>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.text}>or</Text>
                        <View style={styles.line} />
                    </View>
                </View>

                <View style={styles.registerForm}>
                    <View style={styles.registerInformationContainer}>
                        <Text style={styles.registerTextLabel}>Email Adress:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your username"
                            placeholderTextColor="#aaa"
                            onChangeText={(value) =>
                                registerFormHandler("username", value)
                            }
                            value={registerForm.username}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.registerInformationContainer}>
                        <Text style={styles.registerTextLabel}>Password:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#aaa"
                            onChangeText={(value) =>
                                registerFormHandler("password", value)
                            }
                            value={registerForm.password}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.registerInformationContainer}>
                        <Text style={styles.registerTextLabel}>Confirm Password:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm your password"
                            placeholderTextColor="#aaa"
                            onChangeText={(value) =>
                                registerFormHandler("confirmPassword", value)
                            }
                            value={registerForm.confirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={submitRegisterFormHandler}
                            style={({ pressed }) =>
                                pressed
                                    ? styles.pressedRegisterButton
                                    : styles.registerButton
                            }
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </Pressable>

                        <View style={styles.registerOptionContainer}>
                            <Text
                                style={styles.registerInnerText}
                                onPress={navigateCreateAcountHandler}
                            >
                                Do you have account?
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
    registerInsideContainer: {
        borderRadius: 12,
        height: "80%",
        flex: 1,
        width: "85%",
    },
    registerForm: {
        flex: 1,
    },
    registerWithContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "35%",
        paddingHorizontal: 12,
    },
    registerIcons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 8,
    },
    registerIcon: {
        width: 68,
        height: 48,
        // borderColor: "red",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    registerTextContainer: {
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    registerText: {
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
    registerInformationContainer: {
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    registerTextLabel: {
        fontSize: 16,
        marginBottom: 6,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 24,
    },
    registerButton: {
        backgroundColor: "#4FD15B",
        width: "80%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },
    pressedRegisterButton: {
        backgroundColor: "#7ad784",
        width: "80%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },
    registerButtonText: {
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

export default RegisterScreen;
