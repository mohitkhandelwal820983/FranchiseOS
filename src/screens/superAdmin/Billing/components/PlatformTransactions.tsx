import React from 'react';
import {Text, View} from 'react-native';
import {AlertTriangle, CheckCircle, Clock3} from 'lucide-react-native';
import {transactions} from '../constants/billingData';
import {styles, COLORS} from '../styles';

const iconFor = (type: string) => {
  if (type === 'paid') return <CheckCircle color={COLORS.green} size={22} strokeWidth={2.1} />;
  if (type === 'overdue') return <AlertTriangle color={COLORS.red} size={22} strokeWidth={2.1} />;
  return <Clock3 color={COLORS.orange} size={22} strokeWidth={2.1} />;
};

const badgeStyle = (type: string) => {
  if (type === 'paid') return {backgroundColor: '#EAF8EE', borderColor: '#CBEBD3', color: COLORS.green};
  if (type === 'overdue') return {backgroundColor: '#FFF0F0', borderColor: '#F6C4C8', color: COLORS.red};
  return {backgroundColor: '#FFF4EA', borderColor: '#F5D2B7', color: COLORS.orange};
};

export const PlatformTransactions = () => {
  return (
    <View style={styles.listCard}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Platform Fee Transactions</Text>
        <Text style={styles.listLink}>View All</Text>
      </View>
      {transactions.map(item => {
        const badge = badgeStyle(item.type);
        return (
          <View key={item.name} style={styles.txRow}>
            <View style={styles.txIcon}>{iconFor(item.type)}</View>
            <View style={styles.txCompany}>
              <Text style={styles.rowName}>{item.name}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <Text style={[styles.txDate, item.type === 'overdue' && styles.redText, item.type === 'due' && styles.orangeText]}>{item.date}</Text>
            <Text style={[styles.txAmount, item.type === 'paid' ? {color: COLORS.green} : item.type === 'overdue' ? styles.redText : styles.orangeText]}>{item.amount}</Text>
            <View style={styles.txStatus}>
              <View style={[styles.statusBadge, {backgroundColor: badge.backgroundColor, borderColor: badge.borderColor, borderWidth: 1, minWidth: 72}]}>
                <Text style={[styles.statusText, {color: badge.color}]}>{item.status}</Text>
              </View>
              {item.action ? <View style={styles.outlineButton}><Text style={styles.outlineButtonText}>{item.action}</Text></View> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};
