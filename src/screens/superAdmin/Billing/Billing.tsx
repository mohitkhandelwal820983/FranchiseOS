import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {styles} from './styles';
import {BillingHeader} from './components/BillingHeader';
import {InfoBanner} from './components/InfoBanner';
import {PeriodTabs} from './components/PeriodTabs';
import {SummaryStats} from './components/SummaryStats';
import {PlanManagement} from './components/PlanManagement';
import {TrendChart} from './components/TrendChart';
import {PerCompanySubscription} from './components/PerCompanySubscription';
import {PlatformTransactions} from './components/PlatformTransactions';
import {BottomActions} from './components/BottomActions';

const Billing = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001F63" />
      <BillingHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <InfoBanner />
        <PeriodTabs />
        <SummaryStats />
        <View style={styles.twoColumn}>
          <PlanManagement />
          <TrendChart />
        </View>
        <PerCompanySubscription />
        <PlatformTransactions />
        <BottomActions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;
