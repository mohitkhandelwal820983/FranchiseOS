import React from 'react';
import {Text, View} from 'react-native';
import {Menu, Edit3} from 'lucide-react-native';
import {styles} from '../styles';

export const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <Menu size={28} color="#FFFFFF" strokeWidth={2.5} />
      <Text style={styles.headerTitle}>My Profile</Text>
      <Edit3 size={26} color="#FFFFFF" strokeWidth={2.4} />
    </View>
  );
};
