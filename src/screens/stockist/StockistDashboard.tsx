import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertTriangle,
  Bell,
  Box,
  Building2,
  ClipboardList,
  CreditCard,
  FilePlus2,
  Gift,
  Menu,
  TrendingUp,
  Truck,
  UserPlus,
  Users,
} from 'lucide-react-native';
import {
  DealerItem,
  InventoryItem,
  OverviewCard,
  PriorityAction,
  ProductItem,
  QuickAction,
  RecentOrder,
  StockistDashboardData,
} from '../../api/mock/stockist/stockistDashboard.mock';
import { getStockistDashboard } from '../../api/stockist/stockistDashboard.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size as rs, textSize as fs } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const DashboardHeader = ({ data }: { data: StockistDashboardData }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellBox}>
        <Bell color={colors.white} size={rs(30)} strokeWidth={2.3} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{data.notifications}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({ data }: { data: StockistDashboardData }) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.leftBlueLine} />

      <View>
        <Text style={styles.welcomeTitle}>Welcome back, {data.name} 👋</Text>
        <Text style={styles.welcomeSubtitle}>{data.subtitle}</Text>
      </View>

      <Text style={styles.dateText}>{data.date}</Text>
    </View>
  );
};

const OverviewIcon = ({ item }: { item: OverviewCard }) => {
  return (
    <View style={[styles.overviewIconBox, { backgroundColor: item.bg }]}>
      {item.icon === 'stock' && (
        <Building2 color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
      {item.icon === 'orders' && (
        <ClipboardList color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
      {item.icon === 'dealers' && (
        <Users color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
      {item.icon === 'revenue' && (
        <TrendingUp color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
      {item.icon === 'lowStock' && (
        <AlertTriangle color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
      {item.icon === 'incentive' && (
        <Gift color={colors.white} size={rs(30)} strokeWidth={2.2} />
      )}
    </View>
  );
};

const OverviewCardScreen = ({ item }: { item: OverviewCard }) => {
  return (
    <View style={styles.overviewCard}>
      <OverviewIcon item={item} />

      <View style={styles.overviewTextBox}>
        <Text style={styles.overviewTitle}>{item.title}</Text>
        <Text style={[styles.overviewValue, { color: item.color }]}>
          {item.value}
        </Text>
        <Text
          style={[
            styles.overviewSubtitle,
            item.color === colors.dangerDeep && styles.redText,
            item.color === colors.profileOrange && styles.orangeText,
          ]}
        >
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const BusinessOverview = ({ data }: { data: StockistDashboardData }) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Business Overview</Text>
        <Text style={styles.viewReports}>View Reports</Text>
      </View>

      <View style={styles.overviewGrid}>
        {data.overview.map(item => (
          <OverviewCardScreen key={item.id} item={item} />
        ))}
      </View>
    </>
  );
};

const PriorityIcon = ({ item }: { item: PriorityAction }) => {
  if (item.icon === 'warning') {
    return <AlertTriangle color={item.color} size={rs(26)} strokeWidth={2.2} />;
  }

  if (item.icon === 'truck') {
    return <Truck color={item.color} size={rs(26)} strokeWidth={2.2} />;
  }

  if (item.icon === 'card') {
    return <CreditCard color={item.color} size={rs(26)} strokeWidth={2.2} />;
  }

  return <UserPlus color={item.color} size={rs(26)} strokeWidth={2.2} />;
};

const PriorityActionsCard = ({ items }: { items: PriorityAction[] }) => {
  return (
    <View style={styles.priorityCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Today's Priority Actions</Text>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityBadgeText}>4</Text>
        </View>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.priorityRow}>
          <View
            style={[styles.priorityLine, { backgroundColor: item.color }]}
          />

          <View style={styles.priorityIconWrap}>
            <PriorityIcon item={item} />
          </View>

          <View style={styles.priorityTextBox}>
            <Text style={styles.priorityTitle}>{item.title}</Text>
            <Text style={styles.prioritySubtitle}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.priorityButton}>
            <Text style={styles.priorityButtonText}>{item.button}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const ProgressBar = ({ item }: { item: InventoryItem }) => {
  return (
    <View style={styles.healthRow}>
      <View style={styles.healthLabelRow}>
        <Text style={styles.healthLabel}>{item.label}</Text>
        <Text style={styles.healthPercent}>{item.value}%</Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${item.value}%`, backgroundColor: item.color },
          ]}
        />
      </View>
    </View>
  );
};

const InventoryHealthCard = ({ items }: { items: InventoryItem[] }) => {
  return (
    <View style={styles.healthCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Inventory Health</Text>
        <View style={styles.healthyBadge}>
          <Text style={styles.healthyText}>Healthy</Text>
        </View>
      </View>

      {items.map(item => (
        <ProgressBar key={item.id} item={item} />
      ))}
    </View>
  );
};

const TrendMini = ({ color }: { color: string }) => {
  return (
    <View style={styles.trendMini}>
      <View style={[styles.trendLineOne, { borderColor: color }]} />
      <View style={[styles.trendLineTwo, { borderColor: color }]} />
      <View style={[styles.trendDot, { backgroundColor: color }]} />
    </View>
  );
};

const TopSellingProducts = ({ items }: { items: ProductItem[] }) => {
  return (
    <View style={styles.productsCard}>
      <Text style={styles.cardTitle}>Top Selling Products</Text>

      {items.map(item => (
        <View key={item.id} style={styles.productRow}>
          <Image source={{ uri: item.image }} style={styles.productImage} />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productUnits}>{item.units}</Text>
            <Text style={styles.productRevenue}>↗ {item.revenue}</Text>
          </View>

          <TrendMini color={item.trendColor} />
        </View>
      ))}
    </View>
  );
};

const DealerPerformance = ({ items }: { items: DealerItem[] }) => {
  return (
    <View style={styles.dealerCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Dealer Performance</Text>
        <Text style={styles.seeAllText}>See All</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.dealerRow}>
          <View style={[styles.dealerAvatar, { backgroundColor: item.color }]}>
            <Text style={styles.dealerAvatarText}>{item.initials}</Text>
          </View>

          <View style={styles.dealerInfo}>
            <Text style={styles.dealerName}>{item.name}</Text>
            <Text style={styles.dealerSub}>{item.orders}</Text>
            <Text style={styles.dealerSub}>{item.score}</Text>
          </View>

          <View
            style={[styles.dealerStatus, { backgroundColor: item.statusBg }]}
          >
            <Text
              style={[styles.dealerStatusText, { color: item.statusColor }]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const RecentOrdersCard = ({ items }: { items: RecentOrder[] }) => {
  return (
    <View style={styles.recentOrdersCard}>
      <Text style={styles.cardTitle}>Recent Orders</Text>

      {items.map(item => (
        <View key={item.id} style={styles.orderRow}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDealer}>{item.dealer}</Text>
          <Text style={styles.orderAmount}>{item.amount}</Text>

          <View
            style={[styles.orderStatus, { backgroundColor: item.statusBg }]}
          >
            <Text style={[styles.orderStatusText, { color: item.statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const QuickActionsCard = ({ items }: { items: QuickAction[] }) => {
  return (
    <View style={styles.quickActionsCard}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.quickActionRow}
        >
          {item.icon === 'create' && (
            <FilePlus2 color={colors.primaryText} size={rs(28)} strokeWidth={2.2} />
          )}
          {item.icon === 'dealer' && (
            <UserPlus color={colors.primaryText} size={rs(28)} strokeWidth={2.2} />
          )}
          {item.icon === 'restock' && (
            <Box color={colors.primaryText} size={rs(28)} strokeWidth={2.2} />
          )}
          <Text style={styles.quickActionText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const StockistDashboardScreen = () => {
  const [data, setData] = useState<StockistDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getStockistDashboard();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load stockist dashboard. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <DashboardHeader data={data} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeCard data={data} />

        <BusinessOverview data={data} />

        <View style={styles.twoColumnRow}>
          <PriorityActionsCard items={data.priorityActions} />
          <InventoryHealthCard items={data.inventoryHealth} />
        </View>

        <View style={styles.twoColumnRow}>
          <TopSellingProducts items={data.products} />
          <DealerPerformance items={data.dealers} />
        </View>

        <View style={styles.bottomContentRow}>
          <RecentOrdersCard items={data.recentOrders} />
          <QuickActionsCard items={data.quickActions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockistDashboardScreen;

const PAGE_PADDING = rs(30);
const CARD_GAP = rs(14);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const OVERVIEW_CARD_WIDTH = HALF_WIDTH;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.financeBackground,
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.financeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(82),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(30),
    paddingTop: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fs(30),
    fontFamily: fonts.extraBold,
  },
  bellBox: {
    width: rs(40),
    height: rs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -rs(7),
    right: -rs(7),
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: colors.dangerDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(24),
    paddingBottom: rs(132),
  },
  welcomeCard: {
    height: rs(104),
    backgroundColor: colors.white,
    borderRadius: rs(8),
    paddingHorizontal: rs(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(28),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: rs(14),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  leftBlueLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(4),
    backgroundColor: colors.financeBlue,
  },
  welcomeTitle: {
    color: colors.text,
    fontSize: fs(28),
    fontFamily: fonts.extraBold,
  },
  welcomeSubtitle: {
    color: colors.slateText,
    fontSize: fs(15),
    fontFamily: fonts.semiBold,
    marginTop: rs(10),
  },
  dateText: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.semiBold,
    marginTop: rs(34),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(20),
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fs(24),
    fontFamily: fonts.extraBold,
  },
  viewReports: {
    color: colors.financeBlue,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(20),
  },
  overviewCard: {
    width: OVERVIEW_CARD_WIDTH,
    minHeight: rs(128),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    marginBottom: rs(14),
    paddingHorizontal: rs(14),
    paddingVertical: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  overviewIconBox: {
    width: rs(62),
    height: rs(62),
    borderRadius: rs(31),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  overviewTextBox: {
    flex: 1,
    minWidth: 0,
  },
  overviewTitle: {
    color: colors.slateText,
    fontSize: fs(14),
    fontFamily: fonts.bold,
  },
  overviewValue: {
    fontSize: fs(24),
    fontFamily: fonts.extraBold,
    marginTop: rs(6),
    letterSpacing: rs(1),
  },
  overviewSubtitle: {
    color: colors.success,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(6),
  },
  redText: {
    color: colors.dangerDeep,
  },
  orangeText: {
    color: colors.profileOrange,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  priorityCard: {
    width: HALF_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingTop: rs(14),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  healthCard: {
    width: HALF_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  cardTitleRow: {
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(12),
  },
  cardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
  },
  priorityBadge: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    backgroundColor: colors.dangerDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityBadgeText: {
    color: colors.white,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  priorityRow: {
    minHeight: rs(76),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    paddingHorizontal: rs(14),
    paddingVertical: rs(8),
  },
  priorityLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
  },
  priorityIconWrap: {
    width: rs(36),
  },
  priorityTextBox: {
    flex: 1,
    minWidth: 0,
    paddingRight: rs(8),
  },
  priorityTitle: {
    color: colors.text,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    lineHeight: rs(18),
  },
  prioritySubtitle: {
    color: colors.slateText,
    fontSize: fs(10),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
    lineHeight: rs(16),
  },
  priorityButton: {
    minWidth: rs(62),
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.stockistPriorityBorder,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(6),
  },
  priorityButtonText: {
    color: colors.financeBlue,
    fontSize: fs(10),
    fontFamily: fonts.extraBold,
  },
  healthyBadge: {
    minWidth: rs(76),
    height: rs(28),
    borderRadius: rs(6),
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthyText: {
    color: colors.success,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  healthRow: {
    marginBottom: rs(22),
  },
  healthLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(10),
  },
  healthLabel: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.bold,
  },
  healthPercent: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  progressTrack: {
    height: rs(7),
    backgroundColor: colors.progressTrackAlt,
    borderRadius: rs(6),
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(7),
    borderRadius: rs(6),
  },
  productsCard: {
    width: HALF_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  productRow: {
    minHeight: rs(84),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: rs(90),
    height: rs(62),
    borderRadius: rs(4),
    backgroundColor: colors.financeDivider,
    marginRight: rs(18),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: colors.text,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
  },
  productUnits: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.semiBold,
    marginTop: rs(6),
  },
  productRevenue: {
    color: colors.text,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(8),
  },
  trendMini: {
    width: rs(38),
    height: rs(30),
    position: 'relative',
  },
  trendLineOne: {
    position: 'absolute',
    left: rs(4),
    bottom: rs(7),
    width: rs(18),
    height: rs(13),
    borderTopWidth: rs(3),
    transform: [{ rotate: '-28deg' }],
  },
  trendLineTwo: {
    position: 'absolute',
    right: rs(1),
    top: rs(5),
    width: rs(18),
    height: rs(13),
    borderTopWidth: rs(3),
    transform: [{ rotate: '-28deg' }],
  },
  trendDot: {
    position: 'absolute',
    right: rs(0),
    top: rs(2),
    width: rs(5),
    height: rs(5),
    borderRadius: rs(3),
  },
  dealerCard: {
    width: HALF_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  seeAllText: {
    color: colors.financeBlue,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  dealerRow: {
    minHeight: rs(84),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerAvatar: {
    width: rs(54),
    height: rs(54),
    borderRadius: rs(27),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(16),
  },
  dealerAvatarText: {
    color: colors.white,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: colors.text,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
  },
  dealerSub: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    marginTop: rs(5),
  },
  dealerStatus: {
    minWidth: rs(90),
    height: rs(30),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  dealerStatusText: {
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  bottomContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  recentOrdersCard: {
    width: SCREEN_WIDTH - PAGE_PADDING * 2 - rs(270),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  orderRow: {
    height: rs(50),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    width: rs(130),
    color: colors.financeBlue,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  orderDealer: {
    flex: 1,
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.bold,
  },
  orderAmount: {
    width: rs(86),
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  orderStatus: {
    minWidth: rs(90),
    height: rs(28),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusText: {
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
  },
  quickActionsCard: {
    width: rs(250),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(8),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  quickActionRow: {
    height: rs(54),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
  },
  quickActionText: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(18),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(30),
    bottom: rs(118),
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    backgroundColor: colors.financeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 10,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: rs(100),
    backgroundColor: colors.white,
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: rs(16),
    shadowOffset: { width: 0, height: -rs(6) },
    elevation: 14,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabText: {
    color: colors.mutedText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
    marginTop: rs(7),
  },
  activeBottomText: {
    color: colors.financeBlue,
  },
});
