import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from '../constants/routes';

// Placeholder imports - replace with actual screens
// import Dashboard from '../screens/superAdmin/Dashboard';
// import Companies from '../screens/superAdmin/Companies';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={routes.SUPER_ADMIN_DASHBOARD} component={Dashboard} /> */}
    </Stack.Navigator>
  );
};

const CompaniesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={routes.COMPANIES} component={Companies} /> */}
    </Stack.Navigator>
  );
};

const SuperAdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Companies" component={CompaniesStack} />
    </Tab.Navigator>
  );
};

export default SuperAdminNavigator;
