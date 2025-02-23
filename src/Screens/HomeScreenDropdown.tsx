// HomeScreenDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

interface HomeScreenDropdownProps {
  data: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const HomeScreenDropdown: React.FC<HomeScreenDropdownProps> = ({
  data,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    onValueChange(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.HomeScreenDropdown}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.HomeScreenDropdownItem} onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
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
  container: {
    width: '100%',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeScreenDropdown: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    maxHeight: 300,
    elevation: 5,
  },
  HomeScreenDropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreenDropdown;
