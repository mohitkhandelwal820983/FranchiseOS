import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppInput from '../../../components/common/AppInput';
import AppButton from '../../../components/common/AppButton';
import { login } from '../../../api/auth.api';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter Email or Phone Number');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation', 'Please enter Password');
      return;
    }

    try {
      setLoading(true);

      const response = await login(email.trim(), password);

      console.log('Login Success', response);

      Alert.alert('Success', 'Login Successful', [
        {
          text: 'OK',
          onPress: () => navigation.replace('SuperAdminTabs'),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.message || 'Invalid Email/Phone or Password',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#0D3696" barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.topSection}>
            <View style={styles.logoRow}>
              <View style={styles.logoBox}>
                <Text style={styles.logoLetter}>F</Text>
              </View>

              <Text style={styles.logoText}>FranchiseOS</Text>
            </View>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>

            <View
              style={{
                marginTop: 35,
              }}
            >
              <AppInput
                placeholder="Email or Phone Number"
                value={email}
                onChangeText={setEmail}
                leftIcon="person-outline"
              />

              <View
                style={{
                  height: 18,
                }}
              />

              <AppInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureText}
                leftIcon="lock-closed-outline"
                rightIcon={secureText ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setSecureText(!secureText)}
              />

              <TouchableOpacity
                onPress={() => {
                  console.log('Forgot Password Pressed');
                  navigation.navigate('ForgotPassword');
                }}
              >
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>

              <View
                style={{
                  height: 35,
                }}
              />

              <AppButton
                title={loading ? 'Please Wait...' : 'Login'}
                onPress={onLogin}
              />

              <View style={styles.divider} />

              <Text style={styles.footerText}>
                First time? Contact your admin
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },

  topSection: {
    height: 340,
    backgroundColor: '#0D3696',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logoLetter: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0D3696',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,

    marginTop: -100,

    borderRadius: 18,

    paddingHorizontal: 24,
    paddingVertical: 32,

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  forgotText: {
    marginTop: 18,
    color: '#1E4FB8',
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    marginTop: 55,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  footerText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#111827',
  },
});
