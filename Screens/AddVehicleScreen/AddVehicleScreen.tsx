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
    KeyboardAvoidingView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import CustomPicker from "./CustomPicker";
import { VehicleService } from "../../services/vehicle.service";

const years = [
    // 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961,
    // 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973,
    // 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

const carTypesByShape: {name: string, type: number}[] = [
    { name: "Sedan", type: 1 },
    { name: "Hatchback", type: 2 },
    { name: "SUV", type: 3 },
    { name: "Convertible", type: 4 },
    { name: "Station Wagon", type: 5 },
    { name: "Pickup Truck", type: 6 },
    { name: "Van", type: 7 },
    { name: "Crossover", type: 8 },
    { name: "Sports Car", type: 9 },
    { name: "Luxury Car", type: 10},
    { name: "Roadster", type: 11 },
    { name: "Off-Road Vehicle", type: 12 },
    { name: "Compact Car", type: 13 },
    { name: "Supercar", type: 14 },
    { name: "Electric Vehicle", type: 15 },
    { name: "Liftback", type: 16 },
    { name: "Targa", type: 17 },
    { name: "Ute (Utility Vehicle)", type: 18 },
    { name: "Campervan", type: 19 },
    { name: "Panel Van", type: 20 },
    { name: "Coupe", type: 21 },
    { name: "Minivan", type: 22 },
    { name: "Microcar", type: 23 }
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

interface VehicleData {
    vehicleBrand: string;
    vehicleModel: string;
    vehicleModelYear: number;
    vehicleCarType: number;
    vehicleLicensePlate: string;
    vehicleYearOfManufacture: string;
    vehicleIdentificationNumber: string;
}

function AddVehicleScreen() {
    const [selectedVehicleBrand, setSelectedVehicleBrand] =
        useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const [selectedCarType, setSelectedCarType] = useState<string>(
        carTypesByShape[0].name
    );
    const [vehicleLicensePlate, setVehicleLicensePlate] = useState<string>("");
    const [yearOfManufacture, setYearOfManufacture] = useState<string>("");
    const [vehicleIdentificationNumber, setVehicleIdentificationNumber] =
        useState<string>("");

    // const addVehicleData: VehicleData = {
    //     vehicleBrand: selectedVehicleBrand,
    //     vehicleModel: selectedModel,
    //     vehicleModelYear: selectedYear,
    //     vehicleCarType:   carTypesByShape.findIndex(carType => carType.name === selectedCarType),
    //     vehicleLicensePlate: vehicleLicensePlate,
    //     vehicleYearOfManufacture: yearOfManufacture,
    //     vehicleIdentificationNumber: vehicleIdentificationNumber,
    // };

    const addVehicleData: VehicleData = {
        vehicleBrand: "BMW",
        vehicleCarType: 1,
        vehicleIdentificationNumber: "",
        vehicleLicensePlate: "HU-MT7927",
        vehicleModel: "330",
        vehicleModelYear: 2024,
        vehicleYearOfManufacture: "2023",
    };

    const [brands, setBrands] = useState<Brands[]>([]);
    const [models, setModels] = useState<Models[]>([]);

    useEffect(() => {
        async function fetchBrands() {
            const response = await fetch(`${API_BASE_URL}?cmd=getMakes`);
            const data = await response.json();
            const filteredData = data.Makes.filter((brand: Brands) => {
                if (Number(brand.make_is_common) > 0) return brand;
            });

            setBrands(filteredData);
            setSelectedVehicleBrand(filteredData[0].make_display ?? "");
            setSelectedYear(2024);
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
            setSelectedModel(data.Models[0].model_name ?? "");
        }

        if (selectedVehicleBrand && selectedYear) {
            fetchModels();
        }
    }, [selectedVehicleBrand]);

    const handlePickerChange = (field: string, value: string) => {
        if (field === "brand") {
            setSelectedVehicleBrand(value);
            setSelectedYear(2024);
        } else if (field === "model") {
            setSelectedYear(2024);
            setSelectedModel(value);
        } else if (field === "year") {
            setSelectedYear(Number(value));
        } else if (field === "carType") {
            setSelectedCarType(value);
        } else if (field === "vehicleLicense") {
            setVehicleLicensePlate(value);
        } else if (field === "yearOfManufacture") {
            setYearOfManufacture(value);
        } else if (field === "vin") {
            setVehicleIdentificationNumber(value);
        }
    };

    const addVehicleHandler = async () => {
        const vehicleService = new VehicleService();

        const response = await vehicleService.create(addVehicleData);

        console.log(response, `response`);
    };

    return (
        <TouchableWithoutFeedback>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Vehicle Name/Model */}

                    {/* Brand Picker */}
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerWrapper}>
                            <CustomPicker
                                items={brands.map(
                                    (brand) => brand.make_display
                                )}
                                selectedValue={selectedVehicleBrand}
                                onValueChange={(value) =>
                                    handlePickerChange("brand", value)
                                }
                                label="Vehicle Brand"
                            />
                        </View>
                    </View>

                    {/* Model Selection */}
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerWrapper}>
                            <CustomPicker
                                items={models.map(
                                    (model) => model.model_name || "Unknown"
                                )}
                                selectedValue={selectedModel}
                                onValueChange={(value) =>
                                    handlePickerChange("model", value)
                                }
                                label="Model"
                            />
                        </View>
                    </View>

                    {/* Model Selection */}
                    <View style={styles.pickerContainer}>
                        {/* <Text style={styles.label}>Year:</Text> */}
                        <View style={styles.pickerWrapper}>
                            <CustomPicker
                                items={years
                                    .reverse()
                                    .map((year) => year.toString())}
                                selectedValue={selectedYear.toString()}
                                onValueChange={(value) =>
                                    handlePickerChange("year", value)
                                }
                                label="Year"
                            />
                        </View>
                    </View>

                    {/* Vehicle Type: Dropdown or options like car, motorcycle, truck, etc */}
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerWrapper}>
                            <CustomPicker
                                items={carTypesByShape.map(carType => carType.name)}
                                selectedValue={selectedCarType}
                                onValueChange={(value) =>
                                    handlePickerChange("carType", value)
                                }
                                label="Vehicle Type"
                            />
                        </View>
                    </View>

                    {/* Additional Inputs  */}
                    <View style={styles.additionalInputsContainer}>
                        <Text style={styles.label}>Vehicle License Plate:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter License Plate"
                            onChangeText={(value) =>
                                handlePickerChange("vehicleLicense", value)
                            }
                        />
                        <Text style={styles.label}>Year of Manufacture:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a Year Of Manufacturing"
                            keyboardType="numeric"
                            onChangeText={(value) =>
                                handlePickerChange("yearOfManufacture", value)
                            }
                        />

                        <Text style={styles.label}>
                            Vehicle Identification Number (VIN): (Optional)
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Vehicle Identification Number (VIN)"
                            onChangeText={(value) =>
                                handlePickerChange("vin", value)
                            }
                        />
                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            activeOpacity={0.65}
                            onPress={addVehicleHandler}
                        >
                            <Text style={styles.buttonText}>Save Vehicle</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
        paddingHorizontal: 25,
        paddingBottom: 50,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
        color: "#333",
    },
    input: {
        height: 45,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderColor: "#2d2a2a5e",
        borderBottomWidth: 1,
        color: "#333", // Text color inside the picker
    },
    pickerContainer: {
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    saveButton: {
        backgroundColor: "#4FD15B",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    additionalInputsContainer: {
        marginVertical: 25,
        marginTop: 10,
    },
    pickerWrapper: {
        backgroundColor: "#fff",
        borderColor: "#2d2a2a5e",
        overflow: "hidden", // Ensures rounded corners
        borderBottomWidth: 1,
    },
    pickerMenu: {
        height: 50,
        color: "#333", // Text color inside the picker
    },
});

export default AddVehicleScreen;
