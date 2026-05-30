import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textGray,
  },
});

export default AuthHeader;
