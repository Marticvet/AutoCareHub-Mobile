import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../providers/authentication";
import { UsersService } from "../../services/users.service";
import { useNavigation } from "@react-navigation/native";

type IconType = "car" | "calendar" | "bag-add-outline" | "cloud-upload-outline";

const quickActions: { id: string; name: string; icon: IconType }[] = [
    { id: "1", name: "Add Vehicle", icon: "car" },
    { id: "2", name: "Schedule Maintenance", icon: "calendar" },
    { id: "3", name: "Add Expense", icon: "bag-add-outline" },
    { id: "4", name: "Upload Document", icon: "cloud-upload-outline" },
];

function HomeScreen() {
    const navigation = useNavigation();
    const { authState } = useAuth();
    const { firstName } = authState;

    function quickActionHandler(buttonTxt: string) {
        if (buttonTxt === "Add Vehicle") {
            // @ts-ignore
            navigation.navigate("AddVehicleScreen");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Welcome Back, {firstName}!
                </Text>
                <Text style={styles.headerSubtitle}>
                    Keep track of your car's health
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                />
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsContainer}>
                {quickActions.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        style={styles.quickAction}
                        activeOpacity={0.65}
                        onPress={() => quickActionHandler(action.name)}
                    >
                        
                        <Ionicons name={action.icon} size={24} color="#fff" />
                        <Text style={styles.quickActionText}>
                            {action.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Items */}
            <Text style={styles.sectionTitle}>Your Vehicles</Text>
            {/* <FlatList
                data={quickActions}
                renderItem={quickActions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
        paddingTop: 60,
        paddingHorizontal: 25

    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#555",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 10,
        height: 40,
        elevation: 2,
        shadowColor: "#000",
        marginBottom: 20,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        color: "#333",
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
    },
    quickActionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        flexWrap: "wrap",
        marginVertical: 10,
    },
    quickAction: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        paddingVertical: 5,
        borderRadius: 8,
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    quickActionText: {
        marginTop: 8,
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    listContainer: {
        paddingVertical: 10,
    },
    listItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
        shadowColor: "#ccc",
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    listItemDate: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
});

export default HomeScreen;
