import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import SuperAdminNavigator from './SuperAdminNavigator';
import CompanyNavigator from './CompanyNavigator';
import StockistNavigator from './StockistNavigator';
import DealerNavigator from './DealerNavigator';
import {navigationRef} from './navigationService';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />

        <Stack.Screen name="SuperAdminTabs" component={SuperAdminNavigator} />

        <Stack.Screen name="CompanyTabs" component={CompanyNavigator} />

        <Stack.Screen name="StockistTabs" component={StockistNavigator} />

        <Stack.Screen name="DealerTabs" component={DealerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;