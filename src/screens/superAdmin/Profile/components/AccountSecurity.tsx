import React from 'react';
import {Text, View} from 'react-native';
import {securityItems} from '../constants/profileData';
import {styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';
import {Toggle} from './Toggle';

export const AccountSecurity = () => {
  return (
    <Card title="Account Security">
      {securityItems.map((item, index) => (
        <View key={item.id} style={[styles.itemRow, index === securityItems.length - 1 && styles.lastRow]}>
          <View style={styles.rowIcon}>
            <Icon name={item.icon} size={18} />
          </View>
          <View style={styles.itemTextWrap}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {!!item.subtitle && <Text style={[styles.itemSubtitle, item.enabled && {color: '#0B8E2A'}]}>{item.subtitle}</Text>}
          </View>
          {!!item.value && <Text style={styles.itemValue}>{item.value}</Text>}
          {item.type === 'switch' ? <Toggle enabled={item.enabled} /> : <Icon name="chevron" size={17} />}
        </View>
      ))}
    </Card>
  );
};
