import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
  },
});

export default EmptyState;
