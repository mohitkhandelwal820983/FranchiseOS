import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Building2, CreditCard, Home, User} from 'lucide-react-native';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
};

const tabs = [
  {label: 'Home', icon: Home, active: true},
  {label: 'Companies', icon: Building2, active: false},
  {label: 'Billing', icon: CreditCard, active: false},
  {label: 'Profile', icon: User, active: false},
];

const BottomNavigation = ({styles}: Props) => {
  return (
    <View style={styles.nav}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <TouchableOpacity key={tab.label} style={styles.tab} activeOpacity={0.8}>
            <Icon
              color={tab.active ? C.linkBlue : '#747489'}
              fill={tab.active ? C.linkBlue : tab.label === 'Profile' ? '#747489' : 'transparent'}
              size={s(32)}
              strokeWidth={2.3}
            />
            <Text style={[styles.tabLabel, tab.active && styles.tabActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
