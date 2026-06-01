import React from 'react';
import {Text, View} from 'react-native';
import {Menu, Upload} from 'lucide-react-native';
import {styles} from '../styles';

export const BillingHeader = () => {
  return (
    <View style={styles.header}>
      <Menu color="#FFFFFF" size={32} strokeWidth={2.2} />
      <Text style={styles.headerTitle}>Billing</Text>
      <Upload color="#FFFFFF" size={30} strokeWidth={2.1} />
    </View>
  );
};
