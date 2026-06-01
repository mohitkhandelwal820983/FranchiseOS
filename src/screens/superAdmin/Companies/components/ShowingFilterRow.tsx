import React from 'react';
import { Text, View } from 'react-native';
import { Settings } from 'lucide-react-native';
import { colors, ms, styles } from '../styles';

const ShowingFilterRow = () => {
  return (
    <View style={styles.showingRow}>
      <Text style={styles.showingText}>Showing 24 Companies</Text>
      <View style={styles.filterTextWrap}>
        <Text style={styles.filterText}>Filter</Text>
        <Settings size={ms(18)} color={colors.blue} strokeWidth={2.4} />
      </View>
    </View>
  );
};

export default ShowingFilterRow;
