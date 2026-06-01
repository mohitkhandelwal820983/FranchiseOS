import React, {useMemo} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import DashboardHeader from './components/DashboardHeader';
import WelcomeCard from './components/WelcomeCard';
import SectionHeader from './components/SectionHeader';
import PlatformOverview from './components/PlatformOverview';
import SystemHealth from './components/SystemHealth';
import RevenueCard from './components/RevenueCard';
import AttentionToday from './components/AttentionToday';
import RecentCompanies from './components/RecentCompanies';
import BroadcastMessage from './components/BroadcastMessage';
// import BottomNavigation from './components/BottomNavigation';
import {dashboardData} from './constants/dashboardData';
import {C} from './constants/dashboardTheme';
import {makeStyles} from './styles';

const DashboardScreen = () => {
  const styles = useMemo(() => makeStyles(), []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />

      <DashboardHeader
        styles={styles}
        notificationCount={dashboardData.notificationCount}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}>
        <WelcomeCard
          styles={styles}
          adminName={dashboardData.adminName}
          date={dashboardData.date}
        />

        <SectionHeader styles={styles} title="Platform Overview" action="View All" />
        

        <PlatformOverview
          styles={styles}
          total={dashboardData.overview.total}
          smallCards={dashboardData.overview.smallCards}
        />

        <View style={styles.twoColumnRow}>
          <SystemHealth styles={styles} items={dashboardData.health} />
          <RevenueCard styles={styles} amount={dashboardData.revenue.amount} items={dashboardData.revenue.items} />
        </View>

        <AttentionToday styles={styles} items={dashboardData.attention} />

        <SectionHeader styles={styles} title="Recent Companies" action="All" />

        <RecentCompanies styles={styles} companies={dashboardData.recentCompanies} />

        <BroadcastMessage styles={styles} />
      </ScrollView>

      {/* <BottomNavigation styles={styles} /> */}
    </SafeAreaView>
  );
};

export default DashboardScreen;
