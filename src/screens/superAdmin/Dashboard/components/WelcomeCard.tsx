import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  styles: any;
  adminName: string;
  date: string;
};

const WelcomeCard = ({styles, adminName, date}: Props) => {
  return (
    <View style={styles.welcomeCard}>
      <Text style={styles.welcomeTitle}>Welcome back, {adminName} 👋</Text>
      <Text style={styles.welcomeDate}>{date}</Text>
    </View>
  );
};

export default WelcomeCard;
