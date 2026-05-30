import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OTPInput from '../../../components/auth/OTPInput';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';

const OtpVerificationScreen = () => {
  const handleOTPComplete = (otp: string) => {
    console.log('OTP:', otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <OTPInput onOTPComplete={handleOTPComplete} />
      <AppButton label="Verify" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 24,
  },
});

export default OtpVerificationScreen;
