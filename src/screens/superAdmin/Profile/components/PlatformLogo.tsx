import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';
import {Card} from './Card';

export const PlatformLogo = () => {
  return (
    <Card title="Platform Logo">
      <View style={styles.logoBox}>
        <Text style={styles.logoMark}>F</Text>
        <Text style={styles.logoText}>FranchiseOS</Text>
      </View>
      <Text style={styles.tapText}>Tap to change logo</Text>
      <View style={styles.outlineBtn}>
        <Text style={styles.outlineBtnText}>Upload New Logo</Text>
      </View>
    </Card>
  );
};
