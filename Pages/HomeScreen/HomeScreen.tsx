// HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const cars = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2020 },
  { id: '2', make: 'Honda', model: 'Civic', year: 2021 },
  // More car data here
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CarDetails', { car: item })}
          >
            <Text>{item.make} {item.model}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
