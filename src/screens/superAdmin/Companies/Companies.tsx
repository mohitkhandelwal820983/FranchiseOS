import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../constants/colors';

const CompaniesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Companies</Text>
        <Text style={styles.subtitle}>Manage all companies</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 16,
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

export default CompaniesScreen;
