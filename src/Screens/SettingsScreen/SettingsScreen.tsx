import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { useAuth } from "../../providers/authentication";
import { UsersService } from "../../services/users.service";

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
        <TouchableOpacity
            // style={styles.logoutButton}
            onPress={logoutHandler}
        >
            <Text
            //  style={styles.logoutText}
            >Logout</Text>
        </TouchableOpacity>
    );
}

function SettingsScreen() {

    return(
        <View>
            <Text> ebanie</Text>
        </View>
    )
}

export default SettingsScreen;