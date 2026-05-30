import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Placeholder component
const CompanyDashboard = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Company Dashboard</Text>
  </View>
);

const CompanyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CompanyDashboard" component={CompanyDashboard} />
    </Stack.Navigator>
  );
};

export default CompanyNavigator;
