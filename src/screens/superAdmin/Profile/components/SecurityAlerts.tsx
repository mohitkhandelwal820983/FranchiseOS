import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';

export const SecurityAlerts = () => {
  return (
    <Card title="Security Alerts">
      <View style={styles.alertBox}>
        <Icon name="alert" size={23} color={COLORS.orange} />
        <View style={styles.alertTextWrap}>
          <Text style={styles.alertTitle}>3 failed login attempts detected</Text>
          <Text style={styles.alertSubtitle}>From IP: 203.x.x.x — 2 days ago</Text>
        </View>
        <View style={[styles.actionBtn, {borderColor: COLORS.red, paddingHorizontal: 8}]}>
          <Text style={[styles.actionBtnText, {color: COLORS.red}]}>Block this IP</Text>
        </View>
      </View>
    </Card>
  );
};
