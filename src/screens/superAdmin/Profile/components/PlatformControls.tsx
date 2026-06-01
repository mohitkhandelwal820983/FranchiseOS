import React from 'react';
import {Text, View} from 'react-native';
import {platformControls} from '../constants/profileData';
import {styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';

export const PlatformControls = () => {
  return (
    <Card title="Platform Controls" danger>
      <Text style={styles.dangerNote}>⚠ Use only in emergency situations</Text>
      {platformControls.map((item, index) => (
        <View key={item.id} style={[styles.itemRow, index === platformControls.length - 1 && styles.lastRow]}>
          <View style={[styles.miniAvatar, {backgroundColor: `${item.color}16`, width: 31, height: 31, borderRadius: 4}]}>
            <Icon name={item.icon} size={17} color={item.color} />
          </View>
          <View style={styles.itemTextWrap}>
            <Text style={[styles.itemTitle, {color: item.color}]}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>
          <View style={[styles.actionBtn, {borderColor: item.color}]}>
            <Text style={[styles.actionBtnText, {color: item.color}]}>{item.action}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
};
