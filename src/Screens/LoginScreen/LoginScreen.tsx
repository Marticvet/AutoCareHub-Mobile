import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";

interface LoginFormInterface {
    username: string;
    password: string;
}

function LoginScreen() {
    const navigation = useNavigation();
    const [loginForm, setLoginForm] = useState<LoginFormInterface>({
        username: "martigiant2@gmail.com",
        password: "Marticvet",
    });

    async function submitLoginFormHandler() {
        const { username, password } = loginForm;

        const { error, data } = await supabase.auth.signInWithPassword({
            email: username,
            password
            // email: "martigiant@gmail.com",
            // password: "Marticvet",
        });

        if (error) Alert.alert(error.message);

        setLoginForm({
            username: "",
            password: "",
        });
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.loginInsideContainer}>
                        <View style={styles.loginWithContainer}>
                            <View style={styles.loginTextContainer}>
                                <Text style={styles.loginText}>Login With</Text>
                            </View>
                            <View style={styles.loginIcons}>
                                <View style={styles.loginIcon}>
                                    <Entypo
                                        name="facebook"
                                        size={24}
                                        color="black"
                                    />
                                </View>

                                <View style={styles.loginIcon}>
                                    <AntDesign
                                        name="google"
                                        size={24}
                                        color="black"
                                    />
                                </View>

                                <View style={styles.loginIcon}>
                                    <AntDesign
                                        name="apple1"
                                        size={24}
                                        color="black"
                                    />
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
                                <Text style={styles.loginTextLabel}>
                                    Email Adress:
                                </Text>
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
                                <Text style={styles.loginTextLabel}>
                                    Password:
                                </Text>
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
                                    <Text style={styles.loginButtonText}>
                                        Login
                                    </Text>
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

                    {/* </KeyboardAvoidingView> */}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
