import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors, size, textSize} from '../../theme';
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gift,
  Heart,
  LineChart,
  Menu,
  ShoppingCart,
  Store,
  TrendingUp,
  User,
  Users,
} from 'lucide-react-native';
import {getCompanyDashboard} from '../../api/company/dashboard.api';

import type {
  AttentionItem,
  CompanyDashboardData,
  OrderItem,
  RevenueData,
  SnapshotItem,
} from '../../api/mock/company/companyDashboard.mock';
import { showErrorToast } from '../../utils/toast';

const {width: SCREEN_WIDTH} = Dimensions.get('window');





const DashboardHeader = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={size(30)} strokeWidth={2.7} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellBox}>
        <Bell color={colors.white} size={size(28)} strokeWidth={2.2} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{data.notificationCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeLeftLine} />

      <View style={styles.welcomeContent}>
        <View style={styles.welcomeTextArea}>
          <Text style={styles.welcomeTitle} numberOfLines={1}>
            Welcome back, {data.companyName} 👋
          </Text>
          <Text style={styles.welcomeSubtitle} numberOfLines={1}>
            {data.welcomeSubtitle}
          </Text>
        </View>

        <View style={styles.dateRow}>
          <CalendarDays color="#5D6078" size={size(15)} strokeWidth={2} />
          <Text style={styles.dateText} numberOfLines={1}>
            {data.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const SnapshotIcon = ({item}: {item: SnapshotItem}) => {
  return (
    <View style={[styles.snapshotIconBox, {backgroundColor: item.bgColor}]}>
      {item.icon === 'users' && (
        <Users
          color={item.color}
          size={size(38)}
          fill={item.color}
          strokeWidth={0}
        />
      )}
      {item.icon === 'store' && (
        <Store color={item.color} size={size(36)} strokeWidth={2.4} />
      )}
      {item.icon === 'activity' && (
        <LineChart color={item.color} size={size(34)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const SnapshotCard = ({item}: {item: SnapshotItem}) => {
  return (
    <View style={styles.snapshotCard}>
      <SnapshotIcon item={item} />

      <View style={styles.snapshotInfo}>
        <Text style={styles.snapshotTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.snapshotValue, {color: item.color}]} numberOfLines={1}>
          {item.value}
        </Text>
        <Text style={styles.snapshotSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const NetworkSnapshot = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.snapshotSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Network Snapshot</Text>
        <Text style={styles.viewAllBlue}>View All</Text>
      </View>

      <View style={styles.snapshotGrid}>
        {data.snapshots.map(item => (
          <SnapshotCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const RevenueCard = ({data}: {data: RevenueData}) => {
  return (
    <View style={styles.revenueCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {data.title}
        </Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.monthButton}>
          <Text style={styles.monthText}>{data.filter}</Text>
          <ChevronDown color="#111327" size={size(14)} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.revenueAmount} numberOfLines={1}>
        {data.amount}
      </Text>

      <View style={styles.growthRow}>
        <TrendingUp color="#138A36" size={size(15)} strokeWidth={2.4} />
        <Text style={styles.growthPercent}>{data.growth}</Text>
        <Text style={styles.growthLabel}>{data.growthLabel}</Text>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: `${data.progress}%`}]} />
        </View>
        <Text style={styles.progressPercent}>{data.progressLabel}</Text>
      </View>

      <Text style={styles.achievedText} numberOfLines={1}>
        {data.achievedLabel}
      </Text>

      <View style={styles.revenueStatsRow}>
        <View style={[styles.revenueMiniCard, styles.collectedCard]}>
          <Text style={styles.collectedLabel}>Collected</Text>
          <Text style={styles.collectedValue}>{data.collected}</Text>
        </View>

        <View style={[styles.revenueMiniCard, styles.outstandingCard]}>
          <Text style={styles.outstandingLabel}>Outstanding</Text>
          <Text style={styles.outstandingValue}>{data.outstanding}</Text>
        </View>

        <View style={[styles.revenueMiniCard, styles.targetCard]}>
          <Text style={styles.targetLabel}>Target</Text>
          <Text style={styles.targetValue}>{data.target}</Text>
        </View>
      </View>
    </View>
  );
};

const OrderIcon = ({item}: {item: OrderItem}) => {
  if (item.icon === 'cart') {
    return <ShoppingCart color={item.color} size={size(33)} strokeWidth={2.3} />;
  }

  if (item.icon === 'clock') {
    return <Clock3 color={item.color} size={size(33)} strokeWidth={2.3} />;
  }

  return <CheckCircle2 color={item.color} size={size(33)} strokeWidth={2.3} />;
};

const OrdersCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.ordersCard}>
      <Text style={styles.cardTitle}>Today's Orders</Text>

      <View style={styles.orderStatsRow}>
        {data.orders.map(item => (
          <View
            key={item.id}
            style={[
              styles.orderBox,
              {
                backgroundColor: item.bgColor,
                borderColor: item.borderColor,
              },
            ]}>
            <OrderIcon item={item} />
            <Text style={[styles.orderValue, {color: item.color}]}>
              {item.value}
            </Text>
            <Text style={styles.orderLabel}>{item.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderMessageBox}>
        <Text style={styles.celebrationIcon}>🎉</Text>
        <View>
          <Text style={styles.orderMessageTitle}>{data.orderMessageTitle}</Text>
          <Text style={styles.orderMessageText}>{data.orderMessageSubtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const AttentionIcon = ({item}: {item: AttentionItem}) => {
  if (item.icon === 'warning') {
    return <AlertTriangle color={item.color} size={size(28)} strokeWidth={2.2} />;
  }

  if (item.icon === 'clock') {
    return <Clock3 color={item.color} size={size(28)} strokeWidth={2.2} />;
  }

  if (item.icon === 'user') {
    return <User color={item.color} size={size(28)} strokeWidth={2.2} />;
  }

  return <Gift color={item.color} size={size(28)} strokeWidth={2.2} />;
};

const NeedsAttentionCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.needsCard}>
      <View style={styles.needsCardHeader}>
        <Text style={styles.cardTitle}>Needs Attention</Text>
        <View style={styles.needsCountBadge}>
          <Text style={styles.needsCountText}>{data.needsAttentionCount}</Text>
        </View>
      </View>

      {data.needsAttention.map((item, index) => (
        <View key={item.id} style={styles.attentionRow}>
          <View style={[styles.attentionLine, {backgroundColor: item.color}]} />

          <View style={styles.attentionIconWrap}>
            <AttentionIcon item={item} />
          </View>

          <View style={styles.attentionTextWrap}>
            <Text style={styles.attentionTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.attentionSubtitle, {color: item.color}]} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.attentionButton}>
            <Text style={styles.attentionButtonText} numberOfLines={1}>
              {item.buttonLabel}
            </Text>
          </TouchableOpacity>

          {index !== data.needsAttention.length - 1 && (
            <View style={styles.attentionDivider} />
          )}
        </View>
      ))}
    </View>
  );
};

const NetworkLeadersCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.leadersCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.cardTitle}>Network Leaders</Text>
        <Text style={styles.viewAllBlue}>View All</Text>
      </View>

      {data.networkLeaders.map(item => (
        <View key={item.id} style={styles.leaderRow}>
          <View style={styles.rankContainer}>
            <View
              style={[
                styles.rankCircle,
                {backgroundColor: item.rankColor || 'transparent'},
              ]}>
              <Text
                style={[
                  styles.rankText,
                  {color: item.rankColor ? colors.white : colors.text},
                ]}>
                {item.rank}
              </Text>
            </View>
          </View>

          <View style={[styles.leaderAvatar, {backgroundColor: item.color}]}>
            <Text style={styles.leaderAvatarText}>{item.shortName}</Text>
          </View>

          <View style={styles.leaderInfo}>
            <Text style={styles.leaderName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.leaderZone} numberOfLines={1}>
              {item.zone}
            </Text>
          </View>

          <View style={styles.leaderAmountBox}>
            <Text style={[styles.leaderAmount, {color: item.amountColor}]}>
              {item.amount}
            </Text>
            <Text style={styles.leaderGrowth}>↑ {item.growth}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const NeedsYourAttentionCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.yourAttentionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.cardTitle}>Needs Your Attention</Text>
        <Text style={styles.viewAllRed}>View All →</Text>
      </View>

      {data.yourAttention.map(item => (
        <View key={item.id} style={styles.yourAttentionRow}>
          <View style={[styles.bigDot, {backgroundColor: item.color}]} />

          <View style={styles.yourAttentionInfo}>
            <Text style={styles.yourAttentionTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.yourAttentionSubtitle, {color: item.color}]} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>

          <Text style={styles.viewText}>View</Text>
        </View>
      ))}

      <View style={styles.supportBox}>
        <Heart color="#EA1111" size={size(18)} strokeWidth={2} />
        <Text style={styles.supportText} numberOfLines={1}>
          {data.supportMessage}
        </Text>
      </View>
    </View>
  );
};

const NetworkActivityCard = ({data}: {data: CompanyDashboardData}) => {
  return (
    <View style={styles.activityCard}>
      <Text style={styles.cardTitle}>Network Activity</Text>

      {data.activities.map(item => (
        <View key={item.id} style={styles.activityRow}>
          <View style={[styles.smallDot, {backgroundColor: item.color}]} />
          <Text style={styles.activityTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      ))}

      <View style={styles.activityMessageBox}>
        <LineChart color={colors.secondary} size={size(20)} strokeWidth={2.2} />
        <Text style={styles.activityMessageText} numberOfLines={1}>
          {data.activityMessage}
        </Text>
      </View>
    </View>
  );
};



const DashboardScreen = () => {
  const [dashboardData, setDashboardData] =
    useState<CompanyDashboardData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadDashboard = useCallback(async () => {
  try {
    setError('');

    const response = await getCompanyDashboard();

    setDashboardData(response);
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Unable to load company dashboard';

    showErrorToast(errorMessage);

    setError(errorMessage);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboard();
  }, [loadDashboard]);

  const handleRetry = () => {
    setLoading(true);
    loadDashboard();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.secondary} />
      </SafeAreaView>
    );
  }

  if (error || !dashboardData) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Text
          style={{
            color: colors.primary,
            fontSize: textSize(18),
            fontWeight: '700',
            marginBottom: size(18),
            textAlign: 'center',
          }}>
          {error || 'Something went wrong'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleRetry}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: size(28),
            paddingVertical: size(14),
            borderRadius: size(8),
          }}>
          <Text style={{color: colors.white, fontSize: textSize(14), fontWeight: '800'}}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <DashboardHeader data={dashboardData} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WelcomeCard data={dashboardData} />

        <NetworkSnapshot data={dashboardData} />

        <View style={styles.twoColumnRow}>
          <RevenueCard data={dashboardData.revenue} />
          <OrdersCard data={dashboardData} />
        </View>

        <View style={styles.twoColumnRow}>
          <NeedsAttentionCard data={dashboardData} />
          <NetworkLeadersCard data={dashboardData} />
        </View>

        <View style={styles.twoColumnRow}>
          <NeedsYourAttentionCard data={dashboardData} />
          <NetworkActivityCard data={dashboardData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const PAGE_PADDING = size(24);
const CARD_GAP = size(14);
const COLUMN_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const SNAPSHOT_CARD_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - size(28)) / 3;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: size(82),
    backgroundColor: colors.primary,
    paddingHorizontal: size(30),
    paddingTop: size(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: textSize(29),
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bellBox: {
    width: size(36),
    height: size(36),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -size(8),
    top: -size(8),
    width: size(24),
    height: size(24),
    borderRadius: size(12),
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: textSize(12),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(26),
    paddingBottom: size(120),
  },
  welcomeCard: {
    minHeight: size(132),
    backgroundColor: colors.white,
    borderRadius: size(12),
    marginBottom: size(30),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: size(16),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 4,
  },
  welcomeLeftLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: size(3),
    backgroundColor: colors.success,
  },
  welcomeContent: {
    flex: 1,
    paddingHorizontal: size(28),
    paddingVertical: size(28),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  welcomeTextArea: {
    width: size(520),
    paddingRight: size(10),
  },
  welcomeTitle: {
    color: colors.text,
    fontSize: textSize(25),
    lineHeight: size(32),
    fontWeight: '800',
  },
  welcomeSubtitle: {
    marginTop: size(13),
    color: colors.successDark,
    fontSize: textSize(16),
    lineHeight: size(22),
    fontWeight: '600',
  },
  dateRow: {
    marginTop: size(28),
    width: size(220),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dateText: {
    marginLeft: size(9),
    color: colors.mutedText,
    fontSize: textSize(15),
    fontWeight: '500',
  },
  snapshotSection: {
    marginBottom: size(22),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: size(14),
  },
  sectionTitle: {
    color: colors.text,
    fontSize: textSize(20),
    fontWeight: '800',
  },
  viewAllBlue: {
    color: colors.linkBlue,
    fontSize: textSize(16),
    fontWeight: '700',
  },
  viewAllRed: {
    color: colors.danger,
    fontSize: textSize(16),
    fontWeight: '700',
  },
  snapshotGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snapshotCard: {
    width: SNAPSHOT_CARD_WIDTH,
    minHeight: size(158),
    backgroundColor: colors.white,
    borderRadius: size(13),
    paddingHorizontal: size(16),
    paddingVertical: size(28),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  snapshotIconBox: {
    width: size(72),
    height: size(72),
    borderRadius: size(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  snapshotInfo: {
    flex: 1,
  },
  snapshotTitle: {
    color: colors.mutedText,
    fontSize: textSize(15),
    fontWeight: '700',
    marginBottom: size(13),
  },
  snapshotValue: {
    fontSize: textSize(35),
    lineHeight: size(39),
    fontWeight: '900',
    letterSpacing: size(5),
  },
  snapshotSubtitle: {
    marginTop: size(12),
    color: colors.mutedText,
    fontSize: textSize(15),
    fontWeight: '500',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(20),
  },
  revenueCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  ordersCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  needsCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    paddingTop: size(18),
    paddingBottom: size(6),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  leadersCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  yourAttentionCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  activityCard: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(14),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(15),
    shadowOffset: {width: 0, height: size(7)},
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.text,
    fontSize: textSize(18),
    fontWeight: '800',
  },
  monthButton: {
    minWidth: size(92),
    height: size(38),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(6),
    paddingHorizontal: size(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthText: {
    color: colors.text,
    fontSize: textSize(15),
    fontWeight: '500',
  },
  revenueAmount: {
    marginTop: size(30),
    color: colors.black,
    fontSize: textSize(38),
    fontWeight: '900',
    letterSpacing: size(1),
  },
  growthRow: {
    marginTop: size(17),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthPercent: {
    marginLeft: size(5),
    color: colors.success,
    fontSize: textSize(16),
    fontWeight: '800',
  },
  growthLabel: {
    marginLeft: size(8),
    color: colors.mutedText,
    fontSize: textSize(16),
    fontWeight: '500',
  },
  progressRow: {
    marginTop: size(34),
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: size(8),
    borderRadius: size(7),
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: size(8),
    borderRadius: size(7),
    backgroundColor: colors.secondary,
  },
  progressPercent: {
    marginLeft: size(14),
    color: colors.mutedText,
    fontSize: textSize(16),
    fontWeight: '600',
  },
  achievedText: {
    marginTop: size(18),
    textAlign: 'center',
    color: colors.mutedText,
    fontSize: textSize(15),
    fontWeight: '600',
  },
  revenueStatsRow: {
    marginTop: size(33),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueMiniCard: {
    width: '31%',
    borderWidth: 1,
    borderRadius: size(8),
    paddingVertical: size(12),
    alignItems: 'center',
  },
  collectedCard: {
    backgroundColor: '#F5FFF7',
    borderColor: '#B8E7C3',
  },
  outstandingCard: {
    backgroundColor: '#FFF8F2',
    borderColor: '#FFDABF',
  },
  targetCard: {
    backgroundColor: '#F7F8FF',
    borderColor: '#BCC8FF',
  },
  collectedLabel: {
    color: colors.success,
    fontSize: textSize(13),
    fontWeight: '600',
  },
  outstandingLabel: {
    color: colors.warningDark,
    fontSize: textSize(13),
    fontWeight: '600',
  },
  targetLabel: {
    color: colors.secondary,
    fontSize: textSize(13),
    fontWeight: '600',
  },
  collectedValue: {
    marginTop: size(6),
    color: colors.success,
    fontSize: textSize(24),
    fontWeight: '900',
  },
  outstandingValue: {
    marginTop: size(6),
    color: colors.warningDark,
    fontSize: textSize(24),
    fontWeight: '900',
  },
  targetValue: {
    marginTop: size(6),
    color: colors.secondary,
    fontSize: textSize(24),
    fontWeight: '900',
  },
  orderStatsRow: {
    marginTop: size(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderBox: {
    width: '31%',
    minHeight: size(148),
    borderWidth: 1,
    borderRadius: size(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(15),
  },
  orderValue: {
    marginTop: size(16),
    fontSize: textSize(34),
    fontWeight: '900',
  },
  orderLabel: {
    marginTop: size(5),
    color: colors.mutedText,
    fontSize: textSize(15),
    fontWeight: '600',
  },
  orderMessageBox: {
    marginTop: size(32),
    backgroundColor: '#F2FFF2',
    borderRadius: size(7),
    minHeight: size(74),
    paddingHorizontal: size(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  celebrationIcon: {
    fontSize: textSize(34),
    marginRight: size(16),
  },
  orderMessageTitle: {
    color: '#11802D',
    fontSize: textSize(15),
    fontWeight: '800',
  },
  orderMessageText: {
    color: colors.text,
    fontSize: textSize(14),
    fontWeight: '500',
    marginTop: size(7),
  },
  needsCardHeader: {
    paddingHorizontal: size(18),
    marginBottom: size(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  needsCountBadge: {
    width: size(26),
    height: size(26),
    borderRadius: size(13),
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needsCountText: {
    color: colors.white,
    fontSize: textSize(12),
    fontWeight: '800',
  },
  attentionRow: {
    minHeight: size(79),
    paddingHorizontal: size(18),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  attentionLine: {
    position: 'absolute',
    left: 0,
    top: size(8),
    bottom: size(8),
    width: size(3),
    borderTopRightRadius: size(3),
    borderBottomRightRadius: size(3),
  },
  attentionIconWrap: {
    width: size(43),
    alignItems: 'center',
  },
  attentionTextWrap: {
    flex: 1,
    paddingLeft: size(10),
  },
  attentionTitle: {
    color: colors.text,
    fontSize: textSize(14),
    fontWeight: '800',
  },
  attentionSubtitle: {
    marginTop: size(7),
    fontSize: textSize(13),
    fontWeight: '700',
  },
  attentionButton: {
    minWidth: size(96),
    height: size(32),
    borderWidth: 1,
    borderColor: '#8EA3FF',
    borderRadius: size(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size(8),
  },
  attentionButtonText: {
    color: '#0026E6',
    fontSize: textSize(12),
    fontWeight: '800',
  },
  attentionDivider: {
    position: 'absolute',
    left: size(18),
    right: size(18),
    bottom: 0,
    height: 1,
    backgroundColor: colors.divider,
  },
  leaderRow: {
    minHeight: size(57),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rankContainer: {
    width: size(28),
    alignItems: 'center',
  },
  rankCircle: {
    width: size(26),
    height: size(26),
    borderRadius: size(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: textSize(12),
    fontWeight: '800',
  },
  leaderAvatar: {
    marginLeft: size(12),
    width: size(39),
    height: size(39),
    borderRadius: size(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderAvatarText: {
    color: colors.white,
    fontSize: textSize(15),
    fontWeight: '800',
  },
  leaderInfo: {
    flex: 1,
    marginLeft: size(14),
  },
  leaderName: {
    color: colors.text,
    fontSize: textSize(14),
    fontWeight: '800',
  },
  leaderZone: {
    color: colors.mutedText,
    fontSize: textSize(13),
    marginTop: size(5),
    fontWeight: '500',
  },
  leaderAmountBox: {
    alignItems: 'flex-end',
  },
  leaderAmount: {
    fontSize: textSize(14),
    fontWeight: '900',
  },
  leaderGrowth: {
    color: colors.success,
    marginTop: size(7),
    fontSize: textSize(13),
    fontWeight: '700',
  },
  yourAttentionRow: {
    minHeight: size(72),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  bigDot: {
    width: size(12),
    height: size(12),
    borderRadius: size(6),
    marginRight: size(15),
  },
  yourAttentionInfo: {
    flex: 1,
  },
  yourAttentionTitle: {
    color: colors.text,
    fontSize: textSize(16),
    fontWeight: '800',
  },
  yourAttentionSubtitle: {
    marginTop: size(7),
    fontSize: textSize(14),
    fontWeight: '600',
  },
  viewText: {
    color: '#0026E6',
    fontSize: textSize(16),
    fontWeight: '700',
  },
  supportBox: {
    marginTop: size(22),
    backgroundColor: '#FFF5EC',
    borderRadius: size(6),
    minHeight: size(50),
    paddingHorizontal: size(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    marginLeft: size(10),
    color: colors.warningDark,
    fontSize: textSize(14),
    fontWeight: '700',
  },
  activityRow: {
    minHeight: size(48),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  smallDot: {
    width: size(8),
    height: size(8),
    borderRadius: size(4),
    marginRight: size(18),
  },
  activityTitle: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(14),
    fontWeight: '600',
  },
  activityTime: {
    color: colors.mutedText,
    fontSize: textSize(12),
    fontWeight: '500',
  },
  activityMessageBox: {
    marginTop: size(16),
    backgroundColor: '#F1F6FF',
    borderRadius: size(6),
    minHeight: size(46),
    paddingHorizontal: size(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityMessageText: {
    marginLeft: size(10),
    color: colors.text,
    fontSize: textSize(14),
    fontWeight: '700',
  },
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: size(104),
    backgroundColor: colors.white,
    borderTopLeftRadius: size(22),
    borderTopRightRadius: size(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: size(16),
    paddingTop: size(13),
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: size(16),
    shadowOffset: {width: 0, height: -size(6)},
    elevation: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    marginTop: size(7),
    fontSize: textSize(13),
    fontWeight: '700',
  },
});