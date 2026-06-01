import React from 'react';
import { Text, View } from 'react-native';
import { dateTabs } from '../constants/companiesData';
import { styles } from '../styles';

const widths: Record<string, string> = {
  'This Month': '22.5%',
  'Last Month': '21.5%',
  'Last 3 Months': '25%',
  'Custom Range': '25.5%',
};

const DateTabs = () => {
  return (
    <View style={styles.tabsRow}>
      {dateTabs.map(tab => {
        const active = tab === 'This Month';
        return (
          <View
            key={tab}
            style={[
              styles.dateChip,
              { width: widths[tab] as any },
              active && styles.dateChipActive,
            ]}>
            <Text style={[styles.dateChipText, active && styles.dateChipTextActive]}>
              {tab}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default DateTabs;
