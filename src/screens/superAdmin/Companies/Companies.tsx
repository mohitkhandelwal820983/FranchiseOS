import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { styles } from './styles';
import CompaniesHeader from './components/CompaniesHeader';
import SearchFilterBar from './components/SearchFilterBar';
import StatusTabs from './components/StatusTabs';
import DateTabs from './components/DateTabs';
import SortControls from './components/SortControls';
import ShowingFilterRow from './components/ShowingFilterRow';
import CompanyList from './components/CompanyList';

const Companies = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001F63" />
      <CompaniesHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <SearchFilterBar />
        <StatusTabs />
        <DateTabs />
        <SortControls />
        <ShowingFilterRow />
        <CompanyList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Companies;
