import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { colors, fonts, size, textSize } from '../../theme';
import {
  Award,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  IndianRupee,
  Menu,
  Package,
  Plus,
  Store,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react-native';
import { getDealerDashboard } from '../../api/dealer/dealerDashboard.api';
import {
  DealerDashboardData,
  OverviewItem,
  Payment,
  PriorityAction,
  Product,
  RecentOrder,
} from '../../api/mock/dealer/dealerDashboard.mock';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = ({ count }: { count: string }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={size(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellWrap}>
        <Bell color={colors.white }size={size(32)} strokeWidth={2.3} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({ data }: { data: DealerDashboardData['welcome'] }) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeLine} />

      <View>
        <Text style={styles.welcomeTitle}>Welcome back, {data.name} 👋</Text>

        <View style={styles.welcomeMetaRow}>
          <Store color={colors.slateText} size={size(18)} strokeWidth={2.2} />
          <Text style={styles.welcomeMeta}>{data.business}</Text>
        </View>

        <View style={styles.welcomeMetaRow}>
          <CalendarDays color={colors.slateText} size={size(18)} strokeWidth={2.2} />
          <Text style={styles.welcomeMeta}>{data.date}</Text>
        </View>
      </View>
    </View>
  );
};

const OverviewIcon = ({ item }: { item: OverviewItem }) => {
  const iconColor =
    item.icon === 'revenue'
      ? colors.success
      : item.icon === 'customers'
      ? colors.profileOrange
      : item.icon === 'incentive'
      ? colors.purple
      : item.icon === 'dues'
      ? colors.dangerDark
      : item.icon === 'delivery'
      ? colors.financeBlue
      : colors.financeBlue;

  return (
    <View style={[styles.overviewIcon, { backgroundColor: item.bg }]}>
      {item.icon === 'orders' && (
        <ClipboardList color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'revenue' && (
        <IndianRupee color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'customers' && (
        <Users color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'incentive' && (
        <Award color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'dues' && (
        <WalletCards color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'delivery' && (
        <Truck color={iconColor} size={size(34)} strokeWidth={2.3} />
      )}
    </View>
  );
};

const OverviewCard = ({ item }: { item: OverviewItem }) => {
  return (
    <View style={styles.overviewCard}>
      <OverviewIcon item={item} />

      <View style={styles.overviewContent}>
        <Text style={styles.overviewTitle}>{item.title}</Text>
        <Text style={styles.overviewValue}>{item.value}</Text>

        {item.progress ? (
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${item.progress}%` }]}
            />
          </View>
        ) : null}

        <Text
          style={[
            styles.overviewSubtitle,
            item.icon === 'dues' && styles.redText,
            item.icon === 'incentive' && styles.purpleText,
            item.icon === 'delivery' && styles.blueText,
          ]}
        >
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const BusinessOverview = ({ items }: { items: OverviewItem[] }) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Business Overview</Text>

      <View style={styles.overviewGrid}>
        {items.map(item => (
          <OverviewCard key={item.id} item={item} />
        ))}
      </View>
    </>
  );
};

const PriorityIcon = ({ item }: { item: PriorityAction }) => {
  return (
    <View
      style={[styles.priorityIconSoft, { backgroundColor: `${item.color}12` }]}
    >
      {item.icon === 'order' && (
        <ClipboardList color={item.color} size={size(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'payment' && (
        <WalletCards color={item.color} size={size(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'stock' && (
        <Package color={item.color} size={size(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'target' && (
        <CheckCircle2 color={item.color} size={size(22)} strokeWidth={2.2} />
      )}
    </View>
  );
};

const PriorityActions = ({ items }: { items: PriorityAction[] }) => {
  return (
    <View style={styles.fullCard}>
      <Text style={styles.cardTitle}>Today's Priority Actions</Text>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.priorityRow}
        >
          <PriorityIcon item={item} />

          <View style={styles.priorityTextBox}>
            <Text style={styles.priorityTitle}>{item.title}</Text>
            {!!item.subtitle && (
              <Text style={styles.prioritySubtitle}>{item.subtitle}</Text>
            )}
          </View>

          <View style={[styles.priorityButton, { borderColor: item.color }]}>
            <Text style={[styles.priorityButtonText, { color: item.color }]}>
              {item.button}
            </Text>
          </View>

          <ChevronRight color={colors.primaryText} size={size(22)} strokeWidth={2.3} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RecentOrdersCard = ({ items }: { items: RecentOrder[] }) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>Recent Orders</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.orderRow}
        >
          <View style={styles.fileIconSoft}>
            <ClipboardList color={colors.financeBlue} size={size(22)} />
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.orderCustomer}>{item.customer}</Text>
          </View>

          <View style={styles.orderRight}>
            <Text style={styles.orderAmount}>{item.amount}</Text>
            <View
              style={[styles.statusBadge, { backgroundColor: item.statusBg }]}
            >
              <Text style={[styles.statusText, { color: item.statusColor }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TopProductsCard = ({ items }: { items: Product[] }) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>Top Products</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.productRow}
        >
          <Image source={{ uri: item.image }} style={styles.productImage} />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productUnits}>{item.units}</Text>
          </View>

          <View style={styles.productRight}>
            <Text style={styles.productAmount}>{item.amount}</Text>
            <Text style={[styles.productGrowth, { color: item.growthColor }]}>
              {item.growth}
            </Text>
          </View>

          <ChevronRight color={colors.slateText} size={size(18)} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TargetProgressCard = ({
  target,
}: {
  target: DealerDashboardData['target'];
}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Target Progress</Text>

      <View style={styles.targetContent}>
        <View style={styles.targetCircle}>
          <Text style={styles.targetPercent}>{target.percent}%</Text>
        </View>

        <View style={styles.targetInfo}>
          <Text style={styles.targetRemaining}>{target.remaining}</Text>
          <Text style={styles.targetLabel}>remaining to hit target</Text>
        </View>
      </View>

      <View style={styles.targetBonusBox}>
        <Award color={colors.financeBlue} size={size(22)} strokeWidth={2.3} />
        <Text style={styles.targetBonusText}>{target.message}</Text>
      </View>
    </View>
  );
};

const RecentPaymentsCard = ({ items }: { items: Payment[] }) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Recent Payments</Text>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.paymentRow}
        >
          <View style={[styles.paymentIconSoft, { backgroundColor: item.bg }]}>
            {item.icon === 'received' && (
              <CheckCircle2 color={item.color} size={size(22)} />
            )}
            {item.icon === 'pending' && (
              <CalendarDays color={item.color} size={size(22)} />
            )}
            {item.icon === 'overdue' && (
              <WalletCards color={item.color} size={size(22)} />
            )}
          </View>

          <View style={styles.paymentInfo}>
            <Text style={[styles.paymentTitle, { color: item.color }]}>
              {item.title}
            </Text>
            <Text style={styles.paymentSubtitle}>{item.subtitle}</Text>
          </View>

          <Text style={styles.paymentAmount}>{item.amount}</Text>

          <ChevronRight color={colors.slateText} size={size(18)} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const QuickActions = () => {
  const handleAction = (title: string) => {
    Alert.alert(title, `${title} action clicked.`);
  };

  return (
    <View style={styles.quickActions}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleAction('Create Order')}
        style={styles.quickActionButton}
      >
        <View style={styles.quickPlus}>
          <Plus color={colors.financeBlue }size={size(28)} strokeWidth={2.5} />
        </View>
        <Text style={styles.quickActionText}>Create Order</Text>
      </TouchableOpacity>

      <View style={styles.quickDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleAction('Add Customer')}
        style={styles.quickActionButton}
      >
        <View style={styles.quickPlus}>
          <Plus color={colors.financeBlue} size={size(28)} strokeWidth={2.5} />
        </View>
        <Text style={styles.quickActionText}>Add Customer</Text>
      </TouchableOpacity>

      <View style={styles.quickDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleAction('Collect Payment')}
        style={styles.quickActionButton}
      >
        <View style={styles.quickPlus}>
          <IndianRupee color={colors.financeBlue }size={size(26)} strokeWidth={2.5} />
        </View>
        <Text style={styles.quickActionText}>Collect Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const DealerDashboardScreen = () => {
  const [data, setData] = useState<DealerDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDealerDashboard();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load dashboard data. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const bottomRows = useMemo(() => {
    if (!data) {
      return null;
    }

    return (
      <>
        <View style={styles.twoColumnRow}>
          <RecentOrdersCard items={data.recentOrders} />
          <TopProductsCard items={data.topProducts} />
        </View>

        <View style={styles.twoColumnRow}>
          <TargetProgressCard target={data.target} />
          <RecentPaymentsCard items={data.payments} />
        </View>
      </>
    );
  }, [data]);

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

      <Header count={data.welcome.notifications} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeCard data={data.welcome} />

        <BusinessOverview items={data.overview} />

        <PriorityActions items={data.priorities} />

        {bottomRows}

        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DealerDashboardScreen;

const PAGE_PADDING = size(28);
const CARD_GAP = size(16);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;

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
    height: size(78),
    backgroundColor: colors.primary,
    paddingHorizontal: size(28),
    paddingTop: size(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: textSize(31),
    fontFamily: fonts.extraBold,
  },
  bellWrap: {
    width: size(42),
    height: size(42),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -size(4),
    right: -size(4),
    width: size(24),
    height: size(24),
    borderRadius: size(12),
    backgroundColor: colors.dangerDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: colors.white,
    fontSize: textSize(12),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(28),
    paddingBottom: size(118),
  },
  welcomeCard: {
    minHeight: size(138),
    backgroundColor: colors.white,
    borderRadius: size(8),
    paddingHorizontal: size(38),
    justifyContent: 'center',
    marginBottom: size(22),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  welcomeLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: size(4),
    backgroundColor: colors.financeBlue,
  },
  welcomeTitle: {
    color: colors.primaryText,
    fontSize: textSize(28),
    fontFamily: fonts.extraBold,
    marginBottom: size(14),
  },
  welcomeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(7),
  },
  welcomeMeta: {
    color: colors.slateText,
    fontSize: textSize(15),
    fontFamily: fonts.bold,
    marginLeft: size(12),
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: textSize(25),
    fontFamily: fonts.extraBold,
    marginBottom: size(14),
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: size(16),
  },
  overviewCard: {
    width: HALF_WIDTH,
    minHeight: size(118),
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(12),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  overviewIcon: {
    width: size(72),
    height: size(72),
    borderRadius: size(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(22),
  },
  overviewContent: {
    flex: 1,
  },
  overviewTitle: {
    color: colors.primaryText,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  overviewValue: {
    color: colors.primaryText,
    fontSize: textSize(28),
    fontFamily: fonts.extraBold,
    marginTop: size(9),
    letterSpacing: size(3),
  },
  overviewSubtitle: {
    color: colors.success,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    marginTop: size(8),
  },
  progressTrack: {
    height: size(7),
    backgroundColor: colors.dealerProgressTrack,
    borderRadius: size(8),
    marginTop: size(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: size(7),
    borderRadius: size(8),
    backgroundColor: colors.success,
  },
  redText: {
    color: colors.dangerDark,
  },
  purpleText: {
    color: colors.purple,
  },
  blueText: {
    color: colors.financeBlue,
  },
  fullCard: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(20),
    paddingVertical: size(16),
    marginBottom: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  cardTitle: {
    color: colors.primaryText,
    fontSize: textSize(19),
    fontFamily: fonts.extraBold,
  },
  priorityRow: {
    minHeight: size(58),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIconSoft: {
    width: size(36),
    height: size(36),
    borderRadius: size(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(16),
  },
  priorityTextBox: {
    flex: 1,
  },
  priorityTitle: {
    color: colors.primaryText,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  prioritySubtitle: {
    color: colors.dangerDark,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
    marginTop: size(4),
  },
  priorityButton: {
    minWidth: size(132),
    height: size(36),
    borderWidth: 1,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(18),
  },
  priorityButtonText: {
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(16),
  },
  halfCard: {
    width: HALF_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(18),
    paddingVertical: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: size(12),
  },
  viewAllText: {
    color: colors.financeBlue,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  orderRow: {
    minHeight: size(58),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconSoft: {
    width: size(34),
    height: size(34),
    borderRadius: size(17),
    backgroundColor: colors.dealerBlueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: colors.financeBlue,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  orderCustomer: {
    color: colors.slateText,
    fontSize: textSize(12),
    fontFamily: fonts.bold,
    marginTop: size(4),
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    color: colors.primaryText,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    marginBottom: size(6),
  },
  statusBadge: {
    minWidth: size(74),
    height: size(24),
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size(8),
  },
  statusText: {
    fontSize: textSize(11),
    fontFamily: fonts.extraBold,
  },
  productRow: {
    minHeight: size(58),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: size(45),
    height: size(36),
    borderRadius: size(3),
    backgroundColor: colors.financeDivider,
    marginRight: size(14),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: colors.primaryText,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  productUnits: {
    color: colors.slateText,
    fontSize: textSize(12),
    fontFamily: fonts.bold,
    marginTop: size(5),
  },
  productRight: {
    width: size(70),
    alignItems: 'flex-end',
    marginRight: size(8),
  },
  productAmount: {
    color: colors.primaryText,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  productGrowth: {
    fontSize: textSize(12),
    fontFamily: fonts.extraBold,
    marginTop: size(5),
  },
  targetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(24),
  },
  targetCircle: {
    width: size(120),
    height: size(120),
    borderRadius: size(60),
    borderWidth: size(12),
    borderColor: colors.financeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(26),
  },
  targetPercent: {
    color: colors.primaryText,
    fontSize: textSize(29),
    fontFamily: fonts.extraBold,
  },
  targetInfo: {
    flex: 1,
  },
  targetRemaining: {
    color: colors.primaryText,
    fontSize: textSize(25),
    fontFamily: fonts.extraBold,
  },
  targetLabel: {
    color: colors.slateText,
    fontSize: textSize(14),
    fontFamily: fonts.bold,
    marginTop: size(10),
  },
  targetBonusBox: {
    height: size(40),
    backgroundColor: colors.dealerBlueSoft,
    borderRadius: size(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: size(18),
  },
  targetBonusText: {
    color: colors.financeBlue,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  paymentRow: {
    minHeight: size(58),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconSoft: {
    width: size(38),
    height: size(38),
    borderRadius: size(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  paymentSubtitle: {
    color: colors.slateText,
    fontSize: textSize(12),
    fontFamily: fonts.bold,
    marginTop: size(5),
  },
  paymentAmount: {
    color: colors.primaryText,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginRight: size(10),
  },
  quickActions: {
    height: size(76),
    backgroundColor: colors.financeBlue,
    borderRadius: size(38),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(18),
    marginTop: size(2),
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickPlus: {
    width: size(42),
    height: size(42),
    borderRadius: size(21),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(12),
  },
  quickActionText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  quickDivider: {
    width: 1,
    height: size(44),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});
