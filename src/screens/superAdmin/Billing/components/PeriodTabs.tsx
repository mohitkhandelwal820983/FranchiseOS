import React from 'react';
import {Text, View} from 'react-native';
import {periods} from '../constants/billingData';
import {styles} from '../styles';

export const PeriodTabs = () => {
  return (
    <View style={styles.periodRow}>
      {periods.map(item => {
        const active = item === 'Month';
        return (
          <View key={item} style={[styles.periodButton, active && styles.periodButtonActive]}>
            <Text style={[styles.periodText, active && styles.periodTextActive]}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};
