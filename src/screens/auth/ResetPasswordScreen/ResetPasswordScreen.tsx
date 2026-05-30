import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <AppButton label="Reset" onPress={() => {}} />
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

export default ResetPasswordScreen;
