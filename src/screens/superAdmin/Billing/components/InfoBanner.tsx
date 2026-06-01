import React from 'react';
import {Text, View} from 'react-native';
import {Info} from 'lucide-react-native';
import {styles} from '../styles';

export const InfoBanner = () => {
  return (
    <View style={styles.infoBanner}>
      <Info color="#FFFFFF" size={28} strokeWidth={2.1} />
      <Text style={styles.infoText}>
        This shows FranchiseOS platform subscription revenue only.{'\n'}
        Company business revenue is private and not visible here.
      </Text>
    </View>
  );
};
