import React from 'react';
import {Text, View} from 'react-native';
import {AlertTriangle, BarChart3, Clock3, Coins} from 'lucide-react-native';
import {summaryStats} from '../constants/billingData';
import {styles, COLORS} from '../styles';

const renderIcon = (type: string, color: string) => {
  if (type === 'clock') return <Clock3 color={color} size={29} strokeWidth={2.1} />;
  if (type === 'warning') return <AlertTriangle color={color} size={31} strokeWidth={2.1} />;
  if (type === 'chart') return <BarChart3 color={color} size={31} strokeWidth={2.1} />;
  return <Coins color={color} size={30} strokeWidth={2.1} />;
};

export const SummaryStats = () => {
  return (
    <View style={styles.statsGrid}>
      {summaryStats.map(item => (
        <View key={item.title} style={styles.statCard}>
          <View style={[styles.iconCircle, {backgroundColor: item.bg}]}>{renderIcon(item.type, item.color)}</View>
          <View style={styles.statTextWrap}>
            <Text style={styles.statLabel}>{item.title}</Text>
            <Text style={[styles.statValue, {color: item.color === COLORS.green ? COLORS.text : item.color}]}>{item.value}</Text>
            <Text style={[styles.statSub, item.color === COLORS.red && styles.redText, item.color === COLORS.orange && styles.orangeText]}>{item.subtitle}</Text>
            {item.note ? <Text style={styles.statNote}>{item.note}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
};
