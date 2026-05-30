import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<any>();

// Placeholder component
const DealerDashboard = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dealer Dashboard</Text>
  </View>
);

const DealerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DealerDashboard" component={DealerDashboard} />
    </Stack.Navigator>
  );
};

export default DealerNavigator;
