import React from 'react';
import { Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { sortItems } from '../constants/companiesData';
import { colors, ms, styles } from '../styles';

const SortControls = () => {
  return (
    <View style={styles.sortRow}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      {sortItems.map((item, index) => (
        <View
          key={item}
          style={[
            styles.sortButton,
            {
              width: index === 0 ? ms(86) : index === 1 ? ms(94) : ms(82),
              marginRight: index === sortItems.length - 1 ? 0 : ms(9),
            },
          ]}>
          <Text style={styles.sortButtonText}>{item}</Text>
          <ChevronDown size={ms(13)} color={colors.text} strokeWidth={2.4} />
        </View>
      ))}
    </View>
  );
};

export default SortControls;
