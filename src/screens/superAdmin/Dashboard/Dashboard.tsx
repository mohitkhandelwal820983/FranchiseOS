import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardHeader from './components/DashboardHeader';
import WelcomeCard from './components/WelcomeCard';
import SectionHeader from './components/SectionHeader';
import PlatformOverview from './components/PlatformOverview';
import SystemHealth from './components/SystemHealth';
import RevenueCard from './components/RevenueCard';
import AttentionToday from './components/AttentionToday';
import RecentCompanies from './components/RecentCompanies';
import BroadcastMessage from './components/BroadcastMessage';

import { dashboardData } from './constants/dashboardData';
import { C } from './constants/dashboardTheme';
import { makeStyles } from './styles';
import { getSuperAdminDashboard } from '../../../api/superadmin/dashboard.api';
import { showErrorToast } from '../../../utils/toast';

type DashboardDataType = typeof dashboardData;

const DashboardScreen = () => {
  const styles = useMemo(() => makeStyles(), []);

  const [data, setData] = useState<DashboardDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadDashboardData = useCallback(async () => {
    try {
      setError('');

      const response = await getSuperAdminDashboard();

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load dashboard data';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={C.navy} />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: C.navy,
          }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', marginTop: 12 }}>
            Loading dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={C.navy} />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: C.navy,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {error || 'Something went wrong'}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              loadDashboardData();
            }}
            style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: C.navy, fontWeight: '700' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />

      <DashboardHeader
        styles={styles}
        notificationCount={data.notificationCount}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WelcomeCard
          styles={styles}
          adminName={data.adminName}
          date={data.date}
        />

        <SectionHeader
          styles={styles}
          title="Platform Overview"
          action="View All"
        />

        <PlatformOverview
          styles={styles}
          total={data.overview.total}
          smallCards={data.overview.smallCards}
        />

        <SystemHealth styles={styles} items={data.health} />

        <RevenueCard
          styles={styles}
          amount={data.revenue.amount}
          items={data.revenue.items}
        />

        <AttentionToday styles={styles} items={data.attention} />

        <SectionHeader styles={styles} title="Recent Companies" action="All" />

        <RecentCompanies styles={styles} companies={data.recentCompanies} />

        <BroadcastMessage styles={styles} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
