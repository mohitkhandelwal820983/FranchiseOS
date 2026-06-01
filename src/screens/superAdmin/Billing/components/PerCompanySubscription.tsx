import React from 'react';
import {Text, View} from 'react-native';
import {CheckCircle} from 'lucide-react-native';
import {subscriptions} from '../constants/billingData';
import {styles, COLORS} from '../styles';

const badgeStyle = (status: string) => {
  if (status === 'Paid') return {backgroundColor: '#EAF8EE', borderColor: '#CBEBD3', color: COLORS.green};
  if (status === 'Overdue') return {backgroundColor: '#FFF0F0', borderColor: '#F6C4C8', color: COLORS.red};
  return {backgroundColor: '#FFF4EA', borderColor: '#F5D2B7', color: COLORS.orange};
};

export const PerCompanySubscription = () => {
  return (
    <View style={styles.listCard}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Per Company Subscription</Text>
        <Text style={styles.listLink}>View All</Text>
      </View>
      {subscriptions.map(item => {
        const badge = badgeStyle(item.status);
        return (
          <View key={item.name} style={styles.subRow}>
            <View style={[styles.avatar, {backgroundColor: item.color}]}>
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
            <View style={styles.rowMain}>
              <Text style={styles.rowName}>{item.name}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
              <Text style={[styles.rowDate, item.status === 'Overdue' && styles.redText, item.status === 'Trial' && styles.orangeText]}>{item.date}</Text>
            </View>
            <View style={styles.statusWrap}>
              <View style={[styles.statusBadge, {backgroundColor: badge.backgroundColor, borderColor: badge.borderColor, borderWidth: 1}]}>
                <Text style={[styles.statusText, {color: badge.color}]}>{item.status} {item.status === 'Paid' ? <CheckCircle size={11} color={COLORS.green} fill={COLORS.green} /> : null}</Text>
              </View>
              {item.action ? (
                <View style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>{item.action}</Text>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};
