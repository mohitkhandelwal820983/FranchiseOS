import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from './Icon';
import {styles} from '../styles';

export const ProfileHero = () => {
  return (
    <View style={styles.hero}>
      <View style={styles.avatarWrap}>
        <Text style={styles.avatarText}>SA</Text>
        <View style={styles.camera}>
          <Icon name="camera" size={18} color="#003BFF" />
        </View>
      </View>
      <Text style={styles.heroName}>Rajesh Kumar</Text>
      <Text style={styles.heroRole}>Super Administrator</Text>
      <View style={styles.heroChip}>
        <Text style={styles.heroChipText}>FranchiseOS Platform</Text>
      </View>
      <Text style={styles.heroMember}>Member since January 2023</Text>
    </View>
  );
};
