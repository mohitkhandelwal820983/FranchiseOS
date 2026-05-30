import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen/ForgotPasswordScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen/OtpVerificationScreen';


const Stack =
createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={
          ForgotPasswordScreen
        }
      />
       <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;