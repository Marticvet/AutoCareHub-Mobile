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
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";

interface RegisterFormInterface {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

// {
//     username: "ddasdas@gmsada.com",
//     firstName: "Marton",
//     lastName: "Cvet",
//     password: "123",
//     confirmPassword: "123",
// }
function RegisterScreen() {
    // const { authState, login, logout } = useAuth();
    const navigation = useNavigation();
    const [registerForm, setRegisterForm] = useState<RegisterFormInterface>({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    async function submitRegisterFormHandler() {
        const { username, password, firstName, lastName } = registerForm;

        const {
            error,
            data: { user },
        } = await supabase.auth.signUp({
            email: "martigiant@gmail.com",
            password: "Marticvet",
            // phone: "017656723368",
        });

        if (error) Alert.alert(error.message);

        if (user !== null) {
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    email: "martigiant@gmail.com",
                    username: "Marticvet",
                    first_name: "Martin",
                    last_name: "Tsvetanov",
                    phone_number: "0176567233",
                    selected_vehicle_id: "",
                    avatar_url: "avatar_url",
                })
                .eq("id", user.id);

            if (profileError) {
                console.log("profile error: " + profileError.message);
            } else {
                console.log("Profile inserted successfully!");
            }
        }

        //     setRegisterForm({
        //         username: "",
        //         firstName: "",
        //         lastName: "",
        //         password: "",
        //         confirmPassword: "",
        // });

        // // Reset form and show alert
        // setRegisterForm({
        //     username: "",
        //     firstName: "",
        //     lastName: "",
        //     password: "",
        //     confirmPassword: "",
        // });
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
        <View style={styles.appContainer}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.scrollContent}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            {/* <Text style={styles.welcome}>Welcome in AutoCare-Hub!</Text> */}
                            <View style={styles.registerInsideContainer}>
                                <View style={styles.registerWithContainer}>
                                    <View style={styles.registerTextContainer}>
                                        <Text style={styles.registerText}>
                                            Register With
                                        </Text>
                                    </View>
                                    <View style={styles.registerIcons}>
                                        <View style={styles.registerIcon}>
                                            <Entypo
                                                name="facebook"
                                                size={24}
                                                color="black"
                                            />
                                        </View>

                                        <View style={styles.registerIcon}>
                                            <AntDesign
                                                name="google"
                                                size={24}
                                                color="black"
                                            />
                                        </View>

                                        <View style={styles.registerIcon}>
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

                                <View style={styles.registerForm}>
                                    <View
                                        style={
                                            styles.registerInformationContainer
                                        }
                                    >
                                        <Text style={styles.registerTextLabel}>
                                            Email Adress:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#aaa"
                                            onChangeText={(value) =>
                                                registerFormHandler(
                                                    "username",
                                                    value
                                                )
                                            }
                                            value={registerForm.username}
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                        />
                                    </View>

                                    <View
                                        style={
                                            styles.registerInformationContainer
                                        }
                                    >
                                        <Text style={styles.registerTextLabel}>
                                            First Name:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Enter your first name"
                                            placeholderTextColor="#aaa"
                                            onChangeText={(value) =>
                                                registerFormHandler(
                                                    "firstName",
                                                    value
                                                )
                                            }
                                            value={registerForm.firstName}
                                            autoCorrect={false}
                                        />
                                    </View>

                                    <View
                                        style={
                                            styles.registerInformationContainer
                                        }
                                    >
                                        <Text style={styles.registerTextLabel}>
                                            Last Name:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Enter your last name"
                                            placeholderTextColor="#aaa"
                                            onChangeText={(value) =>
                                                registerFormHandler(
                                                    "lastName",
                                                    value
                                                )
                                            }
                                            value={registerForm.lastName}
                                            autoCorrect={false}
                                        />
                                    </View>

                                    <View
                                        style={
                                            styles.registerInformationContainer
                                        }
                                    >
                                        <Text style={styles.registerTextLabel}>
                                            Password:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Enter your password"
                                            placeholderTextColor="#aaa"
                                            onChangeText={(value) =>
                                                registerFormHandler(
                                                    "password",
                                                    value
                                                )
                                            }
                                            value={registerForm.password}
                                            secureTextEntry
                                        />
                                    </View>

                                    <View
                                        style={
                                            styles.registerInformationContainer
                                        }
                                    >
                                        <Text style={styles.registerTextLabel}>
                                            Confirm Password:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Confirm your password"
                                            placeholderTextColor="#aaa"
                                            onChangeText={(value) =>
                                                registerFormHandler(
                                                    "confirmPassword",
                                                    value
                                                )
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
                                            <Text
                                                style={
                                                    styles.registerButtonText
                                                }
                                            >
                                                Register
                                            </Text>
                                        </Pressable>

                                        <View
                                            style={
                                                styles.registerOptionContainer
                                            }
                                        >
                                            <Text
                                                style={styles.registerInnerText}
                                                onPress={
                                                    navigateCreateAcountHandler
                                                }
                                            >
                                                Do you have account?
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    keyboardView: {
        height: "90%",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 80,
        height: "100%",
        backgroundColor: "white",
    },
    scrollContent: {
        flex: 1,
        height: "100%",
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
        minHeight: 38,
        paddingHorizontal: 10,
        textAlignVertical: "center",
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
