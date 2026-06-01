import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type SnapshotItem = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'users' | 'store' | 'activity';
  color: string;
  bgColor: string;
};

type RevenueData = {
  title: string;
  filter: string;
  amount: string;
  growth: string;
  growthLabel: string;
  progress: number;
  progressLabel: string;
  achievedLabel: string;
  collected: string;
  outstanding: string;
  target: string;
};

type OrderItem = {
  id: string;
  title: string;
  value: string;
  icon: 'cart' | 'clock' | 'check';
  color: string;
  bgColor: string;
  borderColor: string;
};

type AttentionItem = {
  id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  icon: 'warning' | 'clock' | 'user' | 'gift';
  color: string;
};

type NetworkLeader = {
  id: string;
  rank: string;
  shortName: string;
  name: string;
  zone: string;
  amount: string;
  growth: string;
  color: string;
  rankColor?: string;
  amountColor: string;
};

type YourAttentionItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
};

type ActivityItem = {
  id: string;
  title: string;
  time: string;
  color: string;
};

type BottomTabItem = {
  id: string;
  label: string;
  icon: 'home' | 'network' | 'orders' | 'finance' | 'profile';
  active: boolean;
};

type DashboardData = {
  companyName: string;
  date: string;
  notificationCount: string;
  welcomeSubtitle: string;
  snapshots: SnapshotItem[];
  revenue: RevenueData;
  orders: OrderItem[];
  orderMessageTitle: string;
  orderMessageSubtitle: string;
  needsAttentionCount: string;
  needsAttention: AttentionItem[];
  networkLeaders: NetworkLeader[];
  yourAttention: YourAttentionItem[];
  supportMessage: string;
  activities: ActivityItem[];
  activityMessage: string;
  bottomTabs: BottomTabItem[];
};

const mockDashboardData: DashboardData = {
  companyName: 'Reliance Industries',
  date: 'Thursday, 21 May 2026',
  notificationCount: '8',
  welcomeSubtitle: 'Your network is performing well today! 🚀',
  snapshots: [
    {
      id: '1',
      title: 'Total Stockists',
      value: '12',
      subtitle: 'In your network',
      icon: 'users',
      color: '#7B22EA',
      bgColor: '#F1E4FF',
    },
    {
      id: '2',
      title: 'Total Dealers',
      value: '96',
      subtitle: 'Across all zones',
      icon: 'store',
      color: '#1557F5',
      bgColor: '#EAF0FF',
    },
    {
      id: '3',
      title: 'Active Today',
      value: '34',
      subtitle: 'Franchises logged in',
      icon: 'activity',
      color: '#F06419',
      bgColor: '#FFF1E8',
    },
  ],
  revenue: {
    title: 'Network Revenue MTD',
    filter: 'Month',
    amount: '₹48,00,000',
    growth: '18%',
    growthLabel: 'vs last month',
    progress: 80,
    progressLabel: '80%',
    achievedLabel: '₹48L achieved of ₹60L target',
    collected: '₹38L',
    outstanding: '₹10L',
    target: '₹60L',
  },
  orders: [
    {
      id: '1',
      title: 'Total',
      value: '34',
      icon: 'cart',
      color: '#1557F5',
      bgColor: '#F3F6FF',
      borderColor: '#B8C8FF',
    },
    {
      id: '2',
      title: 'Pending',
      value: '8',
      icon: 'clock',
      color: '#F06419',
      bgColor: '#FFF8F1',
      borderColor: '#FFD9BD',
    },
    {
      id: '3',
      title: 'Delivered',
      value: '26',
      icon: 'check',
      color: '#138A36',
      bgColor: '#F0FFF4',
      borderColor: '#BDE9C9',
    },
  ],
  orderMessageTitle: 'Great momentum!',
  orderMessageSubtitle: "Keep it up! You're doing great. 😊",
  needsAttentionCount: '4',
  needsAttention: [
    {
      id: '1',
      title: '8 orders pending approval',
      subtitle: 'Waiting 2+ hours',
      buttonLabel: 'Approve Now',
      icon: 'warning',
      color: '#EA1111',
    },
    {
      id: '2',
      title: '3 Dealers payment overdue',
      subtitle: 'Past due date',
      buttonLabel: 'Send Reminder',
      icon: 'clock',
      color: '#F06419',
    },
    {
      id: '3',
      title: '2 franchise onboarding pending',
      subtitle: 'Submitted yesterday',
      buttonLabel: 'Review Now',
      icon: 'user',
      color: '#F06419',
    },
    {
      id: '4',
      title: '4 incentive rewards to approve',
      subtitle: 'Franchises qualified',
      buttonLabel: 'Review Rewards',
      icon: 'gift',
      color: '#1557F5',
    },
  ],
  networkLeaders: [
    {
      id: '1',
      rank: '1',
      shortName: 'SA',
      name: 'Stockist A',
      zone: 'Mumbai Zone A',
      amount: '₹24,00,000',
      growth: '22%',
      color: '#061B66',
      rankColor: '#F3AD16',
      amountColor: '#138A36',
    },
    {
      id: '2',
      rank: '2',
      shortName: 'SB',
      name: 'Stockist B',
      zone: 'Delhi Zone B',
      amount: '₹18,00,000',
      growth: '15%',
      color: '#7B22EA',
      rankColor: '#C5CAD3',
      amountColor: '#138A36',
    },
    {
      id: '3',
      rank: '3',
      shortName: 'D1',
      name: 'Dealer 1 (Direct)',
      zone: 'Pune',
      amount: '₹6,00,000',
      growth: '8%',
      color: '#1557F5',
      rankColor: '#C8732D',
      amountColor: '#138A36',
    },
    {
      id: '4',
      rank: '4',
      shortName: 'SC',
      name: 'Stockist C',
      zone: 'Chennai Zone C',
      amount: '₹3,80,000',
      growth: '3%',
      color: '#138A36',
      amountColor: '#1557F5',
    },
    {
      id: '5',
      rank: '5',
      shortName: 'D5',
      name: 'Dealer 5',
      zone: 'Nashik',
      amount: '₹4,20,000',
      growth: '5%',
      color: '#F06419',
      amountColor: '#1557F5',
    },
  ],
  yourAttention: [
    {
      id: '1',
      title: 'Dealer 4 — Mumbai',
      subtitle: '0 orders in 14 days',
      color: '#EA1111',
    },
    {
      id: '2',
      title: 'Stockist C — Chennai',
      subtitle: 'Below 60% target',
      color: '#EA1111',
    },
    {
      id: '3',
      title: 'Dealer 7 — Pune',
      subtitle: 'Payment overdue 8 days',
      color: '#F06419',
    },
  ],
  supportMessage: 'Support them to keep your network strong!',
  activities: [
    {
      id: '1',
      title: 'Stockist A placed order ₹2,40,000',
      time: '2 hours ago',
      color: '#138A36',
    },
    {
      id: '2',
      title: 'Dealer 3 payment received ₹45,000',
      time: '4 hours ago',
      color: '#138A36',
    },
    {
      id: '3',
      title: 'New dealer onboarding request',
      time: '5 hours ago',
      color: '#1557F5',
    },
    {
      id: '4',
      title: 'Incentive qualified — Dealer 1',
      time: '6 hours ago',
      color: '#7B22EA',
    },
    {
      id: '5',
      title: 'Dealer 7 payment overdue flagged',
      time: '8 hours ago',
      color: '#F06419',
    },
  ],
  activityMessage: 'Stay proactive. Your network is growing! 😃',
  bottomTabs: [
    {id: '1', label: 'Home', icon: 'home', active: true},
    {id: '2', label: 'Network', icon: 'network', active: false},
    {id: '3', label: 'Orders', icon: 'orders', active: false},
    {id: '4', label: 'Finance', icon: 'finance', active: false},
    {id: '5', label: 'Profile', icon: 'profile', active: false},
  ],
};

const mockDashboardApi = async (): Promise<DashboardData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDashboardData), 300);
  });
};

const DashboardHeader = ({data}: {data: DashboardData}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(30)} strokeWidth={2.7} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellBox}>
        <Bell color="#FFFFFF" size={rs(28)} strokeWidth={2.2} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{data.notificationCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({data}: {data: DashboardData}) => {
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
          <CalendarDays color="#5D6078" size={rs(15)} strokeWidth={2} />
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
          size={rs(38)}
          fill={item.color}
          strokeWidth={0}
        />
      )}
      {item.icon === 'store' && (
        <Store color={item.color} size={rs(36)} strokeWidth={2.4} />
      )}
      {item.icon === 'activity' && (
        <LineChart color={item.color} size={rs(34)} strokeWidth={2.4} />
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

const NetworkSnapshot = ({data}: {data: DashboardData}) => {
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
          <ChevronDown color="#111327" size={rs(14)} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.revenueAmount} numberOfLines={1}>
        {data.amount}
      </Text>

      <View style={styles.growthRow}>
        <TrendingUp color="#138A36" size={rs(15)} strokeWidth={2.4} />
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
    return <ShoppingCart color={item.color} size={rs(33)} strokeWidth={2.3} />;
  }

  if (item.icon === 'clock') {
    return <Clock3 color={item.color} size={rs(33)} strokeWidth={2.3} />;
  }

  return <CheckCircle2 color={item.color} size={rs(33)} strokeWidth={2.3} />;
};

const OrdersCard = ({data}: {data: DashboardData}) => {
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
    return <AlertTriangle color={item.color} size={rs(28)} strokeWidth={2.2} />;
  }

  if (item.icon === 'clock') {
    return <Clock3 color={item.color} size={rs(28)} strokeWidth={2.2} />;
  }

  if (item.icon === 'user') {
    return <User color={item.color} size={rs(28)} strokeWidth={2.2} />;
  }

  return <Gift color={item.color} size={rs(28)} strokeWidth={2.2} />;
};

const NeedsAttentionCard = ({data}: {data: DashboardData}) => {
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

const NetworkLeadersCard = ({data}: {data: DashboardData}) => {
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
                  {color: item.rankColor ? '#FFFFFF' : '#111327'},
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

const NeedsYourAttentionCard = ({data}: {data: DashboardData}) => {
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
        <Heart color="#EA1111" size={rs(18)} strokeWidth={2} />
        <Text style={styles.supportText} numberOfLines={1}>
          {data.supportMessage}
        </Text>
      </View>
    </View>
  );
};

const NetworkActivityCard = ({data}: {data: DashboardData}) => {
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
        <LineChart color="#1557F5" size={rs(20)} strokeWidth={2.2} />
        <Text style={styles.activityMessageText} numberOfLines={1}>
          {data.activityMessage}
        </Text>
      </View>
    </View>
  );
};



const DashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    mockDashboardApi().then(response => {
      setDashboardData(response);
    });
  }, []);

  if (!dashboardData) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#1557F5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <DashboardHeader data={dashboardData} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
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

const PAGE_PADDING = rs(24);
const CARD_GAP = rs(14);
const COLUMN_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const SNAPSHOT_CARD_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - rs(28)) / 3;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(82),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(30),
    paddingTop: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(29),
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bellBox: {
    width: rs(36),
    height: rs(36),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -rs(8),
    top: -rs(8),
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: '#EA1111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(26),
    paddingBottom: rs(120),
  },
  welcomeCard: {
    minHeight: rs(132),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(12),
    marginBottom: rs(30),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: rs(16),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 4,
  },
  welcomeLeftLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
    backgroundColor: '#138A36',
  },
  welcomeContent: {
    flex: 1,
    paddingHorizontal: rs(28),
    paddingVertical: rs(28),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  welcomeTextArea: {
    width: rs(520),
    paddingRight: rs(10),
  },
  welcomeTitle: {
    color: '#111327',
    fontSize: rs(25),
    lineHeight: rs(32),
    fontWeight: '800',
  },
  welcomeSubtitle: {
    marginTop: rs(13),
    color: '#006D1D',
    fontSize: rs(16),
    lineHeight: rs(22),
    fontWeight: '600',
  },
  dateRow: {
    marginTop: rs(28),
    width: rs(220),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dateText: {
    marginLeft: rs(9),
    color: '#55576F',
    fontSize: rs(15),
    fontWeight: '500',
  },
  snapshotSection: {
    marginBottom: rs(22),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(14),
  },
  sectionTitle: {
    color: '#121429',
    fontSize: rs(20),
    fontWeight: '800',
  },
  viewAllBlue: {
    color: '#001DDE',
    fontSize: rs(16),
    fontWeight: '700',
  },
  viewAllRed: {
    color: '#E00000',
    fontSize: rs(16),
    fontWeight: '700',
  },
  snapshotGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snapshotCard: {
    width: SNAPSHOT_CARD_WIDTH,
    minHeight: rs(158),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(13),
    paddingHorizontal: rs(16),
    paddingVertical: rs(28),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  snapshotIconBox: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  snapshotInfo: {
    flex: 1,
  },
  snapshotTitle: {
    color: '#52546D',
    fontSize: rs(15),
    fontWeight: '700',
    marginBottom: rs(13),
  },
  snapshotValue: {
    fontSize: rs(35),
    lineHeight: rs(39),
    fontWeight: '900',
    letterSpacing: rs(5),
  },
  snapshotSubtitle: {
    marginTop: rs(12),
    color: '#52546D',
    fontSize: rs(15),
    fontWeight: '500',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(20),
  },
  revenueCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  ordersCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  needsCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    paddingTop: rs(18),
    paddingBottom: rs(6),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  leadersCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  yourAttentionCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  activityCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(14),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(15),
    shadowOffset: {width: 0, height: rs(7)},
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#121429',
    fontSize: rs(18),
    fontWeight: '800',
  },
  monthButton: {
    minWidth: rs(92),
    height: rs(38),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    paddingHorizontal: rs(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthText: {
    color: '#151729',
    fontSize: rs(15),
    fontWeight: '500',
  },
  revenueAmount: {
    marginTop: rs(30),
    color: '#080912',
    fontSize: rs(38),
    fontWeight: '900',
    letterSpacing: rs(1),
  },
  growthRow: {
    marginTop: rs(17),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthPercent: {
    marginLeft: rs(5),
    color: '#138A36',
    fontSize: rs(16),
    fontWeight: '800',
  },
  growthLabel: {
    marginLeft: rs(8),
    color: '#46495F',
    fontSize: rs(16),
    fontWeight: '500',
  },
  progressRow: {
    marginTop: rs(34),
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: rs(8),
    borderRadius: rs(7),
    backgroundColor: '#E5E7EF',
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(8),
    borderRadius: rs(7),
    backgroundColor: '#173CFF',
  },
  progressPercent: {
    marginLeft: rs(14),
    color: '#484A60',
    fontSize: rs(16),
    fontWeight: '600',
  },
  achievedText: {
    marginTop: rs(18),
    textAlign: 'center',
    color: '#55576F',
    fontSize: rs(15),
    fontWeight: '600',
  },
  revenueStatsRow: {
    marginTop: rs(33),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueMiniCard: {
    width: '31%',
    borderWidth: 1,
    borderRadius: rs(8),
    paddingVertical: rs(12),
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
    color: '#138A36',
    fontSize: rs(13),
    fontWeight: '600',
  },
  outstandingLabel: {
    color: '#E75200',
    fontSize: rs(13),
    fontWeight: '600',
  },
  targetLabel: {
    color: '#173CFF',
    fontSize: rs(13),
    fontWeight: '600',
  },
  collectedValue: {
    marginTop: rs(6),
    color: '#138A36',
    fontSize: rs(24),
    fontWeight: '900',
  },
  outstandingValue: {
    marginTop: rs(6),
    color: '#E75200',
    fontSize: rs(24),
    fontWeight: '900',
  },
  targetValue: {
    marginTop: rs(6),
    color: '#173CFF',
    fontSize: rs(24),
    fontWeight: '900',
  },
  orderStatsRow: {
    marginTop: rs(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderBox: {
    width: '31%',
    minHeight: rs(148),
    borderWidth: 1,
    borderRadius: rs(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rs(15),
  },
  orderValue: {
    marginTop: rs(16),
    fontSize: rs(34),
    fontWeight: '900',
  },
  orderLabel: {
    marginTop: rs(5),
    color: '#55576F',
    fontSize: rs(15),
    fontWeight: '600',
  },
  orderMessageBox: {
    marginTop: rs(32),
    backgroundColor: '#F2FFF2',
    borderRadius: rs(7),
    minHeight: rs(74),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  celebrationIcon: {
    fontSize: rs(34),
    marginRight: rs(16),
  },
  orderMessageTitle: {
    color: '#11802D',
    fontSize: rs(15),
    fontWeight: '800',
  },
  orderMessageText: {
    color: '#14172A',
    fontSize: rs(14),
    fontWeight: '500',
    marginTop: rs(7),
  },
  needsCardHeader: {
    paddingHorizontal: rs(18),
    marginBottom: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  needsCountBadge: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    backgroundColor: '#EA1111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  needsCountText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '800',
  },
  attentionRow: {
    minHeight: rs(79),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  attentionLine: {
    position: 'absolute',
    left: 0,
    top: rs(8),
    bottom: rs(8),
    width: rs(3),
    borderTopRightRadius: rs(3),
    borderBottomRightRadius: rs(3),
  },
  attentionIconWrap: {
    width: rs(43),
    alignItems: 'center',
  },
  attentionTextWrap: {
    flex: 1,
    paddingLeft: rs(10),
  },
  attentionTitle: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
  },
  attentionSubtitle: {
    marginTop: rs(7),
    fontSize: rs(13),
    fontWeight: '700',
  },
  attentionButton: {
    minWidth: rs(96),
    height: rs(32),
    borderWidth: 1,
    borderColor: '#8EA3FF',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  attentionButtonText: {
    color: '#0026E6',
    fontSize: rs(12),
    fontWeight: '800',
  },
  attentionDivider: {
    position: 'absolute',
    left: rs(18),
    right: rs(18),
    bottom: 0,
    height: 1,
    backgroundColor: '#EEEFF4',
  },
  leaderRow: {
    minHeight: rs(57),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEFF4',
  },
  rankContainer: {
    width: rs(28),
    alignItems: 'center',
  },
  rankCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: rs(12),
    fontWeight: '800',
  },
  leaderAvatar: {
    marginLeft: rs(12),
    width: rs(39),
    height: rs(39),
    borderRadius: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderAvatarText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '800',
  },
  leaderInfo: {
    flex: 1,
    marginLeft: rs(14),
  },
  leaderName: {
    color: '#15172A',
    fontSize: rs(14),
    fontWeight: '800',
  },
  leaderZone: {
    color: '#5B5E75',
    fontSize: rs(13),
    marginTop: rs(5),
    fontWeight: '500',
  },
  leaderAmountBox: {
    alignItems: 'flex-end',
  },
  leaderAmount: {
    fontSize: rs(14),
    fontWeight: '900',
  },
  leaderGrowth: {
    color: '#138A36',
    marginTop: rs(7),
    fontSize: rs(13),
    fontWeight: '700',
  },
  yourAttentionRow: {
    minHeight: rs(72),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEFF4',
  },
  bigDot: {
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    marginRight: rs(15),
  },
  yourAttentionInfo: {
    flex: 1,
  },
  yourAttentionTitle: {
    color: '#15172A',
    fontSize: rs(16),
    fontWeight: '800',
  },
  yourAttentionSubtitle: {
    marginTop: rs(7),
    fontSize: rs(14),
    fontWeight: '600',
  },
  viewText: {
    color: '#0026E6',
    fontSize: rs(16),
    fontWeight: '700',
  },
  supportBox: {
    marginTop: rs(22),
    backgroundColor: '#FFF5EC',
    borderRadius: rs(6),
    minHeight: rs(50),
    paddingHorizontal: rs(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    marginLeft: rs(10),
    color: '#D73900',
    fontSize: rs(14),
    fontWeight: '700',
  },
  activityRow: {
    minHeight: rs(48),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEFF4',
  },
  smallDot: {
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    marginRight: rs(18),
  },
  activityTitle: {
    flex: 1,
    color: '#2B2D43',
    fontSize: rs(14),
    fontWeight: '600',
  },
  activityTime: {
    color: '#55576F',
    fontSize: rs(12),
    fontWeight: '500',
  },
  activityMessageBox: {
    marginTop: rs(16),
    backgroundColor: '#F1F6FF',
    borderRadius: rs(6),
    minHeight: rs(46),
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityMessageText: {
    marginLeft: rs(10),
    color: '#1F2B57',
    fontSize: rs(14),
    fontWeight: '700',
  },
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: rs(104),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(22),
    borderTopRightRadius: rs(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: rs(16),
    paddingTop: rs(13),
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: rs(16),
    shadowOffset: {width: 0, height: -rs(6)},
    elevation: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    marginTop: rs(7),
    fontSize: rs(13),
    fontWeight: '700',
  },
});