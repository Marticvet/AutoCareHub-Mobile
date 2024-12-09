import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const years = [
    1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961,
    1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973,
    1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985,
    1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024,
];

const API_BASE_URL = "https://www.carqueryapi.com/api/0.3/";

interface Brands {
    make_country: string;
    make_display: string;
    make_id: string;
    make_is_common: string;
}

interface Models {
    model_name: string | null;
}

function AddVehicleScreen() {
    const [selectedVehicleBrand, setSelectedVehicleBrand] =
        useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(2024);

    const [brands, setBrands] = useState<Brands[]>([]);
    const [models, setModels] = useState<Models[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        async function fetchBrands() {
            const response = await fetch(`${API_BASE_URL}?cmd=getMakes`);
            const data = await response.json();
            const filteredData = data.Makes.filter((brand: Brands) => {
                if (Number(brand.make_is_common) > 0) return brand;
            });
            setBrands(filteredData);
        }

        fetchBrands();
    }, []);

    useEffect(() => {
        async function fetchModels() {
            const response = await fetch(
                `${API_BASE_URL}?cmd=getModels&make=${selectedVehicleBrand}`
            );

            const data = await response.json();
            setModels(data.Models || []);
        }

        if (selectedVehicleBrand) {
            fetchModels();
        }
    }, [selectedVehicleBrand]);

    const handlePickerChange = (field: string, value: string) => {
        if (field === "brand") {
            setSelectedVehicleBrand(value);
        } else if (field === "model") {
            setSelectedModel(value);
        } else if (field === "year") {
            setSelectedYear(Number(value));
        }
    };

    const handleTapOutside = () => {
        setIsPickerVisible(false);
        Keyboard.dismiss(); // Close keyboard when tapping outside
    };

    return (
        <TouchableWithoutFeedback onPress={handleTapOutside}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Vehicle Name/Model */}
                <Text style={styles.label}>Vehicle Brand:</Text>

                {/* Brand Picker */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedVehicleBrand}
                        onValueChange={(value) =>
                            handlePickerChange("brand", value)
                        }
                    >
                        {brands.map((item: Brands) => (
                            <Picker.Item
                                key={item.make_id}
                                label={item.make_display}
                                value={item.make_display}
                            />
                        ))}
                    </Picker>
                </View>

                {/* Model Selection */}
                <Text style={styles.label}>Model:</Text>
                <Picker
                    selectedValue={selectedModel}
                    onValueChange={(value) =>
                        handlePickerChange("model", value)
                    }
                >
                    {models.map((item: Models) => (
                        <Picker.Item
                            key={item.model_name || ""}
                            label={item.model_name || "Select Model"}
                            value={item.model_name}
                        />
                    ))}
                </Picker>

                {/* Model Selection */}
                <Text style={styles.label}>Year:</Text>
                <Picker
                    selectedValue={selectedYear.toString()} // Ensure it's a string
                    onValueChange={(value) =>
                        handlePickerChange("year", value.toString())
                    } // Convert value to string
                >
                    {years.map((item: number) => (
                        <Picker.Item
                            label={item.toString()} // Label is a string
                            key={item}
                            value={item.toString()} // Value should be a string
                        />
                    ))}
                </Picker>

                {/* Additional Inputs 
                <Text style={styles.label}>Vehicle License Plate:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter License Plate"
                />

                <Text style={styles.label}>Year of Manufacture:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Year"
                    keyboardType="numeric"
                />

                Submit Button 
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.buttonText}>Save Vehicle</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
        color: "#333",
    },
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
    },
    pickerContainer: {
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
    },
    pickerButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
});

export default AddVehicleScreen;
