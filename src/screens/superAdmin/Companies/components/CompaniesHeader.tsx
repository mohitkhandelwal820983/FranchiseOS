import React from 'react';
import { Text, View } from 'react-native';
import { Menu, Plus } from 'lucide-react-native';
import { colors, ms, styles } from '../styles';

const CompaniesHeader = () => {
  return (
    <View style={styles.header}>
      <Menu size={ms(24)} color="#FFFFFF" strokeWidth={2.8} />
      <Text style={styles.headerTitle}>Companies</Text>
      <Plus size={ms(29)} color="#FFFFFF" strokeWidth={2.2} />
    </View>
  );
};

export default CompaniesHeader;
