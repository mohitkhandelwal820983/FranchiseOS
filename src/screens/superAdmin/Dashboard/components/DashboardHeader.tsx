import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Bell, Menu} from 'lucide-react-native';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
  notificationCount: number;
};

const DashboardHeader = ({styles, notificationCount}: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
        <Menu color={C.white} size={s(38)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.notificationBox}>
        <Bell color={C.white} size={s(36)} strokeWidth={2.4} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;
