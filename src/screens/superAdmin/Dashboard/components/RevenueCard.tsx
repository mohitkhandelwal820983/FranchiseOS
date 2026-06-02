import React from 'react';
import {Text, View} from 'react-native';
import {Info} from 'lucide-react-native';
import {RevenueMiniItem} from '../constants/dashboardData';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
  amount: string;
  items: RevenueMiniItem[];
};

const RevenueCard = ({styles, amount, items}: Props) => {
  return (
    <View style={[styles.halfCard,{marginTop:16}]}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Your Platform Revenue</Text>
        <Info color={C.linkBlue} size={s(24)} strokeWidth={2.2} />
      </View>

      <Text style={styles.revenueInfoText}>ⓘ This is FranchiseOS earnings only —{`\n`}   not company business revenue</Text>

      <Text style={styles.revenueLabel}>Total Subscriptions MTD</Text>
      <Text style={styles.revenueAmount}>{amount}</Text>

      <View style={styles.revenueStatsRow}>
        {items.map(item => (
          <RevenueMiniBox key={item.label} styles={styles} item={item} />
        ))}
      </View>
    </View>
  );
};

const RevenueMiniBox = ({styles, item}: {styles: any; item: RevenueMiniItem}) => {
  const colors = getColors(item.type);

  return (
    <View style={[styles.revenueMiniBox, {backgroundColor: colors.bg, borderColor: colors.border}]}>
      <Text style={[styles.revenueMiniLabel, {color: colors.text}]}>{item.label}</Text>
      <Text style={[styles.revenueMiniValue, {color: colors.text}]}>{item.value}</Text>
    </View>
  );
};

const getColors = (type: RevenueMiniItem['type']) => {
  switch (type) {
    case 'collected':
      return {bg: '#F1FFF4', border: '#BEE8C7', text: C.green};
    case 'due':
      return {bg: '#FFF7EF', border: '#FFD1AA', text: '#EA3A00'};
    case 'overdue':
      return {bg: '#FFF6F6', border: '#FFC7C7', text: C.red};
    default:
      return {bg: C.white, border: C.border, text: C.text};
  }
};

export default RevenueCard;
