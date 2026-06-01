import React from 'react';
import {Text, View} from 'react-native';
import {CheckCircle} from 'lucide-react-native';
import {HealthItem} from '../constants/dashboardData';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
  items: HealthItem[];
};

const SystemHealth = ({styles, items}: Props) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>System Health</Text>
        <View style={styles.healthBadge}>
          <Text style={styles.healthBadgeText}>Healthy</Text>
        </View>
      </View>

      {items.map(item => (
        <HealthRow key={item.label} styles={styles} item={item} />
      ))}

      <View style={styles.cleanRow}>
        <CheckCircle color={C.green} fill={C.green} size={s(16)} strokeWidth={2.2} />
        <Text style={styles.cleanText}>Clean</Text>
      </View>
    </View>
  );
};

const HealthRow = ({styles, item}: {styles: any; item: HealthItem}) => {
  const color = item.color === 'green' ? C.green : C.blue;

  return (
    <View style={styles.healthRow}>
      <Text style={styles.healthLabel}>{item.label}</Text>
      <View style={styles.healthTrack}>
        <View style={[styles.healthFill, {backgroundColor: color, width: `${item.progress}%`}]} />
      </View>
      <Text style={[styles.healthValue, {color}]}>{item.value}</Text>
    </View>
  );
};

export default SystemHealth;
