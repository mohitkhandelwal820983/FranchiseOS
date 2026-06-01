import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  styles: any;
  title: string;
  action: string;
};

const SectionHeader = ({styles, title, action}: Props) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
};

export default SectionHeader;
