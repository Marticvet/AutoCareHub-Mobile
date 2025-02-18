import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReportsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabs}>
                {["GENERAL", "REFUELING", "EXPENSE", "INCOME", "SERVICE"].map(
                    (tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tab,
                                index === 0 && styles.activeTab,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    index === 0 && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.dateRange}>
                    2 entries (16/01/2025 - 16/01/2025)
                </Text>

                {/* Balance Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Balance</Text>
                    <View style={styles.row}>
                        <Text style={styles.redText}>Total</Text>
                        <Text>55,650 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By day</Text>
                        <Text>-12,000 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By km</Text>
                        <Text>-0,273 €</Text>
                    </View>
                </View>

                {/* Cost Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cost</Text>
                    <View style={styles.row}>
                        <Text style={styles.redText}>Total</Text>
                        <Text>67,650 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By day</Text>
                        <Text>0,000 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By km</Text>
                        <Text>0,000 €</Text>
                    </View>
                </View>

                {/* Income Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Income</Text>
                    <View style={styles.row}>
                        <Text style={styles.greenText}>Total</Text>
                        <Text>12,000 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By day</Text>
                        <Text>12,000 €</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>By km</Text>
                        <Text>0,273 €</Text>
                    </View>
                </View>

                {/* Distance Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Distance</Text>
                    <View style={styles.row}>
                        <Text>Total</Text>
                        <Text>44 km</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Daily average</Text>
                        <Text>44 km</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#00AFCF",
        padding: 10,
    },
    time: { color: "white", fontSize: 16, fontWeight: "bold" },
    icons: { flexDirection: "row", alignItems: "center" },
    batteryText: { color: "white", marginLeft: 4 },
    header: { alignItems: "center", padding: 10, backgroundColor: "#00AFCF" },
    headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#E8E8E8",
        paddingVertical: 10,
    },
    tab: { paddingVertical: 5 },
    tabText: { color: "gray" },
    activeTab: { borderBottomWidth: 2, borderBottomColor: "#00AFCF" },
    activeTabText: { color: "#00AFCF" },
    content: { padding: 15 },
    dateRange: { textAlign: "center", color: "gray", marginBottom: 10 },
    section: {
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#00AFCF",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
    },
    redText: { color: "red" },
    greenText: { color: "green" },
});

export default ReportsScreen;
