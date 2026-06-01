import React from 'react';
import { Text, View } from 'react-native';
import { statusTabs } from '../constants/companiesData';
import { styles } from '../styles';

const widths: Record<string, string> = {
  All: '16.5%',
  Active: '18%',
  Pending: '18.5%',
  Inactive: '18.5%',
  Suspended: '18.5%',
};

const StatusTabs = () => {
  return (
    <View style={styles.tabsRow}>
      {statusTabs.map(tab => {
        const active = tab === 'All';
        return (
          <View
            key={tab}
            style={[
              styles.statusChip,
              { width: widths[tab] as any },
              active && styles.statusChipActive,
            ]}>
            <Text style={[styles.statusChipText, active && styles.statusChipTextActive]}>
              {tab}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default StatusTabs;
