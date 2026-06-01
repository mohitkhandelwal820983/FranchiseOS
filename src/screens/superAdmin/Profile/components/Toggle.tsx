import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles';

export const Toggle = ({enabled}: {enabled?: boolean}) => {
  return (
    <View style={[styles.switch, enabled ? styles.switchOn : styles.switchOff]}>
      <View style={styles.switchKnob} />
    </View>
  );
};
