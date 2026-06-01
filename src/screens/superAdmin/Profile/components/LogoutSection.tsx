import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, styles} from '../styles';
import {Icon} from './Icon';

export const LogoutSection = () => {
  return (
    <>
      <View style={styles.logout}>
        <Icon name="logout" size={18} color={COLORS.red} />
        <Text style={styles.logoutText}>Logout</Text>
      </View>
      <Text style={styles.version}>FranchiseOS v1.0 — Super Admin</Text>
    </>
  );
};
