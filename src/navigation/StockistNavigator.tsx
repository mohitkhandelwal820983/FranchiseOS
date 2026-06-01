import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Package, Boxes, Users, User} from 'lucide-react-native';

import StockistDashboard from '../screens/stockist/StockistDashboard';
import StockistOrderScreen from '../screens/stockist/StockistOrderScreen';
import PlaceNewOrderScreen from '../screens/stockist/PlaceNewOrderScreen';
import StockistInventoryScreen from '../screens/stockist/StockistInventoryScreen';
import StockistProfileScreen from '../screens/stockist/StockistProfileScreen';
import StockistDealerScreen from '../screens/stockist/StockistDealerScreen';

const Tab = createBottomTabNavigator();
const OrderStack = createNativeStackNavigator();

const StockistOrderStack = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="StockistOrdersMain" component={StockistOrderScreen} />
      <OrderStack.Screen name="PlaceNewOrder" component={PlaceNewOrderScreen} />
    </OrderStack.Navigator>
  );
};

const StockistNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="StockistDashboard"
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
        name="StockistDashboard"
        component={StockistDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="StockistInventory"
        component={StockistInventoryScreen}
        options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: ({color, size}) => <Boxes color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="StockistOrders"
        component={StockistOrderStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => <Package color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="StockistDealers"
        component={StockistDealerScreen}
        options={{
          tabBarLabel: 'Dealers',
          tabBarIcon: ({color, size}) => <Users color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="StockistProfile"
        component={StockistProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default StockistNavigator;