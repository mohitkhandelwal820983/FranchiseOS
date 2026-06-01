import React from 'react';
import {Text, View} from 'react-native';
import {CheckCircle2} from 'lucide-react-native';
import {adminDetails} from '../constants/profileData';
import {COLORS, styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';

export const AdminDetails = () => {
  return (
    <Card title="Admin Details" right={<Icon name="edit" size={18} />}>
      {adminDetails.map((item, index) => (
        <View key={item.id} style={[styles.row, index === adminDetails.length - 1 && styles.lastRow]}>
          <View style={styles.rowIcon}>
            <Icon name={item.icon} size={16} color="#303449" />
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={[styles.value, item.highlight && styles.highlight]} numberOfLines={1}>{item.value}</Text>
          {item.verified && <Text style={styles.note}>Verified</Text>}
          {item.verified && <CheckCircle2 size={12} color={COLORS.green} fill={COLORS.green} />}
        </View>
      ))}
    </Card>
  );
};
