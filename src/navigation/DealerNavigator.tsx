import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Package,
  Users,
  IndianRupee,
  User,
} from 'lucide-react-native';
import DealerDashboardScreen from '../screens/dealer/DealerDashboard';
import DealerOrderScreen from '../screens/dealer/DealerOrderScreen';
import DealerCustomerScreen from '../screens/dealer/DealerCustomerScreen';
import DealerPaymentScreen from '../screens/dealer/DealerPaymentScreen';
import DealerProfileScreen from '../screens/dealer/DealerProfileScreen';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  color: string;
  size: number;
};

const DashboardIcon = ({color, size}: TabIconProps) => (
  <Home color={color} size={size} />
);
const OrdersIcon = ({color, size}: TabIconProps) => (
  <Package color={color} size={size} />
);
const CustomersIcon = ({color, size}: TabIconProps) => (
  <Users color={color} size={size} />
);
const PaymentsIcon = ({color, size}: TabIconProps) => (
  <IndianRupee color={color} size={size} />
);
const ProfileIcon = ({color, size}: TabIconProps) => (
  <User color={color} size={size} />
);



const DealerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="DealerDashboard"
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
        name="DealerDashboard"
        component={DealerDashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: DashboardIcon,
        }}
      />

      <Tab.Screen
        name="DealerOrders"
        component={DealerOrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: OrdersIcon,
        }}
      />

      <Tab.Screen
        name="DealerCustomers"
        component={DealerCustomerScreen}
        options={{
          tabBarLabel: 'Customers',
          tabBarIcon: CustomersIcon,
        }}
      />

      <Tab.Screen
        name="DealerPayments"
        component={DealerPaymentScreen}
        options={{
          tabBarLabel: 'Payments',
          tabBarIcon: PaymentsIcon,
        }}
      />

      <Tab.Screen
        name="DealerProfile"
        component={DealerProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default DealerNavigator;

