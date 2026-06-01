import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AlertTriangle, Clock, CreditCard, Headphones} from 'lucide-react-native';
import {AttentionItem} from '../constants/dashboardData';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
  items: AttentionItem[];
};

const AttentionToday = ({styles, items}: Props) => {
  return (
    <View style={styles.attentionCard}>
      <View style={styles.attentionHeader}>
        <Text style={styles.attentionTitle}>Needs Your Attention Today</Text>
        <View style={styles.attentionBadge}>
          <Text style={styles.attentionBadgeText}>4</Text>
        </View>
      </View>

      {items.map(item => (
        <AttentionRow key={item.title} styles={styles} item={item} />
      ))}
    </View>
  );
};

const AttentionRow = ({styles, item}: {styles: any; item: AttentionItem}) => {
  return (
    <View style={styles.attentionRow}>
      <View style={[styles.attentionColorBar, {backgroundColor: item.color}]} />

      <View style={[styles.attentionIconCircle, {backgroundColor: item.color}]}>
        {renderIcon(item)}
      </View>

      <View style={styles.attentionTextBox}>
        <Text style={styles.attentionItemTitle}>{item.title}</Text>
        <Text style={[styles.attentionItemSub, item.color === C.red && styles.redText]}>{item.subtitle}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.attentionButton}>
        <Text style={styles.attentionButtonText}>{item.action}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderIcon = (item: AttentionItem) => {
  const color = C.white;
  switch (item.icon) {
    case 'alert':
      return <AlertTriangle color={color} fill={color} size={s(23)} strokeWidth={2.2} />;
    case 'clock':
      return <Clock color={color} size={s(23)} strokeWidth={2.4} />;
    case 'card':
      return <CreditCard color={color} size={s(23)} strokeWidth={2.2} />;
    case 'headset':
      return <Headphones color={color} size={s(24)} strokeWidth={2.3} />;
    default:
      return null;
  }
};

export default AttentionToday;
