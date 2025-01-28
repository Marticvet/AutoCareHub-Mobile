import React, { useState } from "react";
import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

interface CustomPickerProps {
    items: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    label: string;
}

const CustomPicker = ({
    items,
    selectedValue,
    onValueChange,
    label,
}: CustomPickerProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSelect = (value: string) => {
        onValueChange(value);
        setIsModalVisible(false);
    };

    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.label}>{label}:</Text>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.pickerText}>
                    {selectedValue || "Select"}
                </Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent>
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.modalText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    pickerButton: {
        height: 45,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    pickerText: {
        color: "#555",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
        height: 400,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalText: {
        fontSize: 16,
    },
});

export default CustomPicker;
