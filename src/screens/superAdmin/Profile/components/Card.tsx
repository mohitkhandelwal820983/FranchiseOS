import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {styles} from '../styles';

type Props = {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  full?: boolean;
  danger?: boolean;
  style?: ViewStyle;
};

export const Card = ({title, children, right, full, danger, style}: Props) => {
  return (
    <View style={[full ? styles.cardFull : styles.card, danger && styles.redSide, style]}>
      <View style={styles.titleRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        {right}
      </View>
      {children}
    </View>
  );
};
