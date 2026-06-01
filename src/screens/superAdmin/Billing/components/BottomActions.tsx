import React from 'react';
import {Text, View} from 'react-native';
import {Download, Send} from 'lucide-react-native';
import {styles} from '../styles';

export const BottomActions = () => {
  return (
    <View style={styles.actionsRow}>
      <View style={styles.actionButton}>
        <Download color="#001F63" size={17} />
        <Text style={styles.actionButtonText}>Export Billing Report</Text>
      </View>
      <View style={[styles.actionButton, styles.actionButtonDark]}>
        <Send color="#FFFFFF" size={17} />
        <Text style={[styles.actionButtonText, styles.actionButtonTextDark]}>Send All Reminders</Text>
      </View>
    </View>
  );
};
