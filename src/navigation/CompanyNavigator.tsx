import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Globe2,
  Package,
  IndianRupee,
  User,
} from 'lucide-react-native';

import CompanyDashboardScreen from '../screens/company/CompanyDashboard';
import NetworkScreen from '../screens/company/NetworkScreen';
import NetworkDetailScreen from '../screens/company/NetworkDetailScreen';
import OrdersScreen from '../screens/company/OrderScreen';
import FinanceScreen from '../screens/company/FinanceScreen';
import ProfileScreen from '../screens/company/ProfileScreen';

const Tab = createBottomTabNavigator();
const NetworkStack = createNativeStackNavigator();

type TabIconProps = {
  color: string;
  size: number;
};

const HomeIcon = ({color, size}: TabIconProps) => (
  <Home color={color} size={size} />
);
const NetworkIcon = ({color, size}: TabIconProps) => (
  <Globe2 color={color} size={size} />
);
const OrdersIcon = ({color, size}: TabIconProps) => (
  <Package color={color} size={size} />
);
const FinanceIcon = ({color, size}: TabIconProps) => (
  <IndianRupee color={color} size={size} />
);
const ProfileIcon = ({color, size}: TabIconProps) => (
  <User color={color} size={size} />
);

const NetworkStackScreen = () => {
  return (
    <NetworkStack.Navigator screenOptions={{headerShown: false}}>
      <NetworkStack.Screen name="NetworkMain" component={NetworkScreen} />
      <NetworkStack.Screen name="NetworkDetail" component={NetworkDetailScreen} />
    </NetworkStack.Navigator>
  );
};

const CompanyNavigator = () => {
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
        name="CompanyDashboard"
        component={CompanyDashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name="CompanyNetwork"
        component={NetworkStackScreen}
        options={{
          tabBarLabel: 'Network',
          tabBarIcon: NetworkIcon,
        }}
      />

      <Tab.Screen
        name="CompanyOrders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: OrdersIcon,
        }}
      />

      <Tab.Screen
        name="CompanyFinance"
        component={FinanceScreen}
        options={{
          tabBarLabel: 'Finance',
          tabBarIcon: FinanceIcon,
        }}
      />

      <Tab.Screen
        name="CompanyProfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default CompanyNavigator;