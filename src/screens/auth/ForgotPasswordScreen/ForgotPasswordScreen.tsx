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
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import AppInput from '../../../components/common/AppInput';
import AppButton from '../../../components/common/AppButton';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();

  const [emailOrPhone, setEmailOrPhone] =
    useState('');

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const onSendOtp = () => {
    if (!emailOrPhone.trim()) {
      Alert.alert(
        'Validation',
        'Please enter Email or Mobile Number',
      );
      return;
    }

    setOtpSent(true);
  };

  const onVerifyOtp = () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      Alert.alert(
        'Validation',
        'Please enter valid OTP',
      );
      return;
    }

    Alert.alert(
      'Success',
      'OTP Verified Successfully',
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
                marginTop: 25,
              }}>
              <AppInput
                placeholder="Mobile Number or Email"
                value={emailOrPhone}
                onChangeText={
                  setEmailOrPhone
                }
                leftIcon="person"
              />

              <View
                style={{
                  height: 20,
                }}
              />

              <AppButton
                title="Send OTP"
                onPress={onSendOtp}
              />

              {otpSent && (
                <>
                  <View
                    style={{
                      height: 40,
                    }}
                  />

                  <View
                    style={
                      styles.otpContainer
                    }>
                    {otp.map(
                      (
                        digit,
                        index,
                      ) => (
                        <TextInput
                          key={index}
                          value={digit}
                          maxLength={1}
                          keyboardType="number-pad"
                          style={
                            styles.otpInput
                          }
                          onChangeText={text => {
                            const newOtp =
                              [...otp];

                            newOtp[
                              index
                            ] = text;

                            setOtp(
                              newOtp,
                            );
                          }}
                        />
                      ),
                    )}
                  </View>

                  <View
                    style={
                      styles.resendRow
                    }>
                    <Text
                      style={
                        styles.timerText
                      }>
                      Resend OTP in
                      0:45
                    </Text>

                    <TouchableOpacity>
                      <Text
                        style={
                          styles.resendText
                        }>
                        Resend OTP
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      height: 35,
                    }}
                  />

                  <AppButton
                    title="Verify OTP"
                    onPress={
                      onVerifyOtp
                    }
                  />

                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                    }}
                    onPress={() =>
                      navigation.navigate(
                        'Login',
                      )
                    }>
                    <Text
                      style={
                        styles.backText
                      }>
                      Remember
                      password?
                      {' '}
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </>
              )}
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
    height: 220,
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
    marginTop: -60,
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

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  otpInput: {
    width: 42,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  timerText: {
    fontSize: 13,
    color: '#6B7280',
  },

  resendText: {
    fontSize: 13,
    color: '#A1A1AA',
  },

  backText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
});