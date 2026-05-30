import React, {useState} from 'react';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import AppInput from '../../../components/common/AppInput';
import AppButton from '../../../components/common/AppButton';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();

  const [emailOrPhone, setEmailOrPhone] =
    useState('');

  const onSendOtp = () => {
    if (!emailOrPhone.trim()) {
      Alert.alert(
        'Validation',
        'Please enter Email or Mobile Number',
      );
      return;
    }

    navigation.navigate(
      'OtpVerification',
      {
        emailOrPhone,
      },
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor="#0D3696"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled">

          {/* Header */}

          <View style={styles.topSection}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }>
              <Ionicons
                name="arrow-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.logoRow}>
              <View style={styles.logoBox}>
                <Text
                  style={
                    styles.logoLetter
                  }>
                  F
                </Text>
              </View>

              <Text
                style={styles.logoText}>
                FranchiseOS
              </Text>
            </View>
          </View>

          {/* Card */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              Forgot Password?
            </Text>

            <Text style={styles.subTitle}>
              Enter your registered
              mobile number or email
              and we will send you an
              OTP
            </Text>

            <View
              style={{
                marginTop: 30,
              }}>
              <AppInput
                placeholder="Mobile Number or Email"
                value={emailOrPhone}
                onChangeText={
                  setEmailOrPhone
                }
                leftIcon="call-outline"
              />

              <View
                style={{
                  height: 25,
                }}
              />

              <AppButton
                title="Send OTP"
                onPress={onSendOtp}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },

  topSection: {
    height: 250,
    backgroundColor: '#0D3696',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  logoLetter: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D3696',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,

    marginTop: -70,

    borderRadius: 18,

    paddingHorizontal: 24,
    paddingVertical: 30,

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
    textAlign: 'center',
  },

  subTitle: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
  },
});