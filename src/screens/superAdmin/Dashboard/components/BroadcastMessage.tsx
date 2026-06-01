import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Megaphone} from 'lucide-react-native';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
};

const BroadcastMessage = ({styles}: Props) => {
  return (
    <View style={styles.broadcastCard}>
      <Text style={styles.broadcastTitle}>Broadcast Message</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.broadcastButton}>
        <Megaphone color={C.linkBlue} size={s(25)} strokeWidth={2.2} />
        <Text style={styles.broadcastText}>Send Announcement to All Companies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BroadcastMessage;
