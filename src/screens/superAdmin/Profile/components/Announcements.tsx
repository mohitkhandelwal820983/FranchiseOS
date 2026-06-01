import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';

export const Announcements = () => {
  return (
    <Card title="Platform Announcements">
      <View style={styles.broadcastBtn}>
        <Icon name="megaphone" size={17} color="#003BFF" />
        <Text style={styles.broadcastText}>Send Broadcast</Text>
      </View>
      <View style={[styles.itemRow, styles.lastRow, {marginTop: 8}]}>
        <View style={styles.itemTextWrap}>
          <Text style={styles.itemTitle}>Announcement History</Text>
          <Text style={styles.itemSubtitle}>3 announcements sent this month</Text>
        </View>
        <Icon name="chevron" size={16} />
      </View>
    </Card>
  );
};
