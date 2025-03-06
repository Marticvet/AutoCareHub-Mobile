import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
import { useAuth } from "../providers/AuthProvider";

const DATA = [
    {
        title: "User's settings",
        data: ["Pizza", "Burger", "Risotto"],
    },
    {
        title: "Vehicles's settings",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
        title: "Preferences",
        data: ["Water", "Coke", "Beer"],
    },
    {
        title: "Settings",
        data: ["Cheese Cake", "Ice Cream"],
    },
    {
        title: "Contacts",
        data: ["Cheese Cake", "Ice Cream"],
    },
];

function OptionsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
    },
});

export default OptionsScreen;
