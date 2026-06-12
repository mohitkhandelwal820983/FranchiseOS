import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  LayoutDashboard,
  Building2,
  CreditCard,
  User,
} from 'lucide-react-native';

import Dashboard from '../screens/superAdmin/Dashboard/Dashboard';
import Companies from '../screens/superAdmin/Companies/Companies';
import Billing from '../screens/superAdmin/Billing/Billing';
import Profile from '../screens/superAdmin/Profile/Profile';


const Tab = createBottomTabNavigator();

type TabIconProps = {
  color: string;
  size: number;
};

const DashboardIcon = ({color, size}: TabIconProps) => (
  <LayoutDashboard color={color} size={size} />
);
const CompaniesIcon = ({color, size}: TabIconProps) => (
  <Building2 color={color} size={size} />
);
const BillingIcon = ({color, size}: TabIconProps) => (
  <CreditCard color={color} size={size} />
);
const ProfileIcon = ({color, size}: TabIconProps) => (
  <User color={color} size={size} />
);

const SuperAdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1557F5',
        tabBarInactiveTintColor: '#6B6B7A',
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: {width: 0, height: -2},
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: DashboardIcon,
        }}
      />

      <Tab.Screen
        name="Companies"
        component={Companies}
        options={{
          tabBarLabel: 'Companies',
          tabBarIcon: CompaniesIcon,
        }}
      />

      <Tab.Screen
        name="Billing"
        component={Billing}
        options={{
          tabBarLabel: 'Billing',
          tabBarIcon: BillingIcon,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />

    </Tab.Navigator>
  );
};

export default SuperAdminNavigator;