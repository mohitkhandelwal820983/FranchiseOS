import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Placeholder component
const StockistDashboard = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stockist Dashboard</Text>
  </View>
);

const StockistNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StockistDashboard" component={StockistDashboard} />
    </Stack.Navigator>
  );
};

export default StockistNavigator;
