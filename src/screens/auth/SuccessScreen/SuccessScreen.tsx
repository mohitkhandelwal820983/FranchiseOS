import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✓</Text>
      <Text style={styles.title}>Success</Text>
      <Text style={styles.message}>Your action was successful</Text>
      <AppButton label="Continue" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    color: colors.success,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 24,
  },
});

export default SuccessScreen;
