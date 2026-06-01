import React from 'react';
import { Text, View } from 'react-native';
import { Filter, Search } from 'lucide-react-native';
import { colors, ms, styles } from '../styles';

const SearchFilterBar = () => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.searchLeft}>
        <Search size={ms(20)} color="#252543" strokeWidth={2} />
        <Text style={styles.searchText}>Search company name or owner</Text>
      </View>
      <View style={styles.filterBox}>
        <Filter size={ms(20)} color="#252543" strokeWidth={2} />
      </View>
    </View>
  );
};

export default SearchFilterBar;
