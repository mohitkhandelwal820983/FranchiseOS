import React, {useEffect, useMemo, useState} from 'react';
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
import { DealerDashboardData, OverviewItem, Payment, PriorityAction, Product, RecentOrder } from '../../api/mock/dealer/dealerDashboard.mock';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);



const Header = ({count}: {count: string}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellWrap}>
        <Bell color="#FFFFFF" size={rs(32)} strokeWidth={2.3} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({data}: {data: DealerDashboardData['welcome']}) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeLine} />

      <View>
        <Text style={styles.welcomeTitle}>Welcome back, {data.name} 👋</Text>

        <View style={styles.welcomeMetaRow}>
          <Store color="#5D607E" size={rs(18)} strokeWidth={2.2} />
          <Text style={styles.welcomeMeta}>{data.business}</Text>
        </View>

        <View style={styles.welcomeMetaRow}>
          <CalendarDays color="#5D607E" size={rs(18)} strokeWidth={2.2} />
          <Text style={styles.welcomeMeta}>{data.date}</Text>
        </View>
      </View>
    </View>
  );
};

const OverviewIcon = ({item}: {item: OverviewItem}) => {
  const iconColor =
    item.icon === 'revenue'
      ? '#138A36'
      : item.icon === 'customers'
      ? '#F06419'
      : item.icon === 'incentive'
      ? '#7B22EA'
      : item.icon === 'dues'
      ? '#E00014'
      : item.icon === 'delivery'
      ? '#173CFF'
      : '#173CFF';

  return (
    <View style={[styles.overviewIcon, {backgroundColor: item.bg}]}>
      {item.icon === 'orders' && (
        <ClipboardList color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'revenue' && (
        <IndianRupee color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'customers' && (
        <Users color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'incentive' && (
        <Award color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'dues' && (
        <WalletCards color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
      {item.icon === 'delivery' && (
        <Truck color={iconColor} size={rs(34)} strokeWidth={2.3} />
      )}
    </View>
  );
};

const OverviewCard = ({item}: {item: OverviewItem}) => {
  return (
    <View style={styles.overviewCard}>
      <OverviewIcon item={item} />

      <View style={styles.overviewContent}>
        <Text style={styles.overviewTitle}>{item.title}</Text>
        <Text style={styles.overviewValue}>{item.value}</Text>

        {item.progress ? (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, {width: `${item.progress}%`}]} />
          </View>
        ) : null}

        <Text
          style={[
            styles.overviewSubtitle,
            item.icon === 'dues' && styles.redText,
            item.icon === 'incentive' && styles.purpleText,
            item.icon === 'delivery' && styles.blueText,
          ]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const BusinessOverview = ({items}: {items: OverviewItem[]}) => {
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

const PriorityIcon = ({item}: {item: PriorityAction}) => {
  return (
    <View style={[styles.priorityIconSoft, {backgroundColor: `${item.color}12`}]}>
      {item.icon === 'order' && (
        <ClipboardList color={item.color} size={rs(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'payment' && (
        <WalletCards color={item.color} size={rs(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'stock' && (
        <Package color={item.color} size={rs(22)} strokeWidth={2.2} />
      )}
      {item.icon === 'target' && (
        <CheckCircle2 color={item.color} size={rs(22)} strokeWidth={2.2} />
      )}
    </View>
  );
};

const PriorityActions = ({items}: {items: PriorityAction[]}) => {
  return (
    <View style={styles.fullCard}>
      <Text style={styles.cardTitle}>Today's Priority Actions</Text>

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.priorityRow}>
          <PriorityIcon item={item} />

          <View style={styles.priorityTextBox}>
            <Text style={styles.priorityTitle}>{item.title}</Text>
            {!!item.subtitle && (
              <Text style={styles.prioritySubtitle}>{item.subtitle}</Text>
            )}
          </View>

          <View style={[styles.priorityButton, {borderColor: item.color}]}>
            <Text style={[styles.priorityButtonText, {color: item.color}]}>
              {item.button}
            </Text>
          </View>

          <ChevronRight color="#061247" size={rs(22)} strokeWidth={2.3} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RecentOrdersCard = ({items}: {items: RecentOrder[]}) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>Recent Orders</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.orderRow}>
          <View style={styles.fileIconSoft}>
            <ClipboardList color="#173CFF" size={rs(22)} />
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.orderCustomer}>{item.customer}</Text>
          </View>

          <View style={styles.orderRight}>
            <Text style={styles.orderAmount}>{item.amount}</Text>
            <View style={[styles.statusBadge, {backgroundColor: item.statusBg}]}>
              <Text style={[styles.statusText, {color: item.statusColor}]}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TopProductsCard = ({items}: {items: Product[]}) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>Top Products</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.productRow}>
          <Image source={{uri: item.image}} style={styles.productImage} />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productUnits}>{item.units}</Text>
          </View>

          <View style={styles.productRight}>
            <Text style={styles.productAmount}>{item.amount}</Text>
            <Text style={[styles.productGrowth, {color: item.growthColor}]}>
              {item.growth}
            </Text>
          </View>

          <ChevronRight color="#5D607E" size={rs(18)} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TargetProgressCard = ({target}: {target: DealerDashboardData['target']}) => {
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
        <Award color="#173CFF" size={rs(22)} strokeWidth={2.3} />
        <Text style={styles.targetBonusText}>{target.message}</Text>
      </View>
    </View>
  );
};

const RecentPaymentsCard = ({items}: {items: Payment[]}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Recent Payments</Text>

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.paymentRow}>
          <View style={[styles.paymentIconSoft, {backgroundColor: item.bg}]}>
            {item.icon === 'received' && (
              <CheckCircle2 color={item.color} size={rs(22)} />
            )}
            {item.icon === 'pending' && (
              <CalendarDays color={item.color} size={rs(22)} />
            )}
            {item.icon === 'overdue' && (
              <WalletCards color={item.color} size={rs(22)} />
            )}
          </View>

          <View style={styles.paymentInfo}>
            <Text style={[styles.paymentTitle, {color: item.color}]}>
              {item.title}
            </Text>
            <Text style={styles.paymentSubtitle}>{item.subtitle}</Text>
          </View>

          <Text style={styles.paymentAmount}>{item.amount}</Text>

          <ChevronRight color="#5D607E" size={rs(18)} />
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
        style={styles.quickActionButton}>
        <View style={styles.quickPlus}>
          <Plus color="#173CFF" size={rs(28)} strokeWidth={2.5} />
        </View>
        <Text style={styles.quickActionText}>Create Order</Text>
      </TouchableOpacity>

      <View style={styles.quickDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleAction('Add Customer')}
        style={styles.quickActionButton}>
        <View style={styles.quickPlus}>
          <Plus color="#173CFF" size={rs(28)} strokeWidth={2.5} />
        </View>
        <Text style={styles.quickActionText}>Add Customer</Text>
      </TouchableOpacity>

      <View style={styles.quickDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleAction('Collect Payment')}
        style={styles.quickActionButton}>
        <View style={styles.quickPlus}>
          <IndianRupee color="#173CFF" size={rs(26)} strokeWidth={2.5} />
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
    } catch (error) {
      console.log('Dealer Dashboard API Error:', error);
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
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <Header count={data.welcome.notifications} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
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

const PAGE_PADDING = rs(28);
const CARD_GAP = rs(16);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(78),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(28),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(31),
    fontWeight: '900',
  },
  bellWrap: {
    width: rs(42),
    height: rs(42),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -rs(4),
    right: -rs(4),
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: '#E00014',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: fs(12),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(28),
    paddingBottom: rs(118),
  },
  welcomeCard: {
    minHeight: rs(138),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(38),
    justifyContent: 'center',
    marginBottom: rs(22),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  welcomeLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(4),
    backgroundColor: '#173CFF',
  },
  welcomeTitle: {
    color: '#061247',
    fontSize: fs(28),
    fontWeight: '900',
    marginBottom: rs(14),
  },
  welcomeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(7),
  },
  welcomeMeta: {
    color: '#5D607E',
    fontSize: fs(15),
    fontWeight: '700',
    marginLeft: rs(12),
  },
  sectionTitle: {
    color: '#061247',
    fontSize: fs(25),
    fontWeight: '900',
    marginBottom: rs(14),
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  overviewCard: {
    width: HALF_WIDTH,
    minHeight: rs(118),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  overviewIcon: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  overviewContent: {
    flex: 1,
  },
  overviewTitle: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '800',
  },
  overviewValue: {
    color: '#061247',
    fontSize: fs(28),
    fontWeight: '900',
    marginTop: rs(9),
    letterSpacing: rs(3),
  },
  overviewSubtitle: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '800',
    marginTop: rs(8),
  },
  progressTrack: {
    height: rs(7),
    backgroundColor: '#E4E6EF',
    borderRadius: rs(8),
    marginTop: rs(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(7),
    borderRadius: rs(8),
    backgroundColor: '#138A36',
  },
  redText: {
    color: '#E00014',
  },
  purpleText: {
    color: '#7B22EA',
  },
  blueText: {
    color: '#173CFF',
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(20),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  cardTitle: {
    color: '#061247',
    fontSize: fs(19),
    fontWeight: '900',
  },
  priorityRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIconSoft: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(16),
  },
  priorityTextBox: {
    flex: 1,
  },
  priorityTitle: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '800',
  },
  prioritySubtitle: {
    color: '#E00014',
    fontSize: fs(13),
    fontWeight: '800',
    marginTop: rs(4),
  },
  priorityButton: {
    minWidth: rs(132),
    height: rs(36),
    borderWidth: 1,
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  priorityButtonText: {
    fontSize: fs(14),
    fontWeight: '900',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  halfCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(12),
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '900',
  },
  orderRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconSoft: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: '#173CFF',
    fontSize: fs(15),
    fontWeight: '900',
  },
  orderCustomer: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    color: '#061247',
    fontSize: fs(14),
    fontWeight: '900',
    marginBottom: rs(6),
  },
  statusBadge: {
    minWidth: rs(74),
    height: rs(24),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  statusText: {
    fontSize: fs(11),
    fontWeight: '800',
  },
  productRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: rs(45),
    height: rs(36),
    borderRadius: rs(3),
    backgroundColor: '#EEF0F6',
    marginRight: rs(14),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '900',
  },
  productUnits: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(5),
  },
  productRight: {
    width: rs(70),
    alignItems: 'flex-end',
    marginRight: rs(8),
  },
  productAmount: {
    color: '#061247',
    fontSize: fs(14),
    fontWeight: '900',
  },
  productGrowth: {
    fontSize: fs(12),
    fontWeight: '800',
    marginTop: rs(5),
  },
  targetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(24),
  },
  targetCircle: {
    width: rs(120),
    height: rs(120),
    borderRadius: rs(60),
    borderWidth: rs(12),
    borderColor: '#173CFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(26),
  },
  targetPercent: {
    color: '#061247',
    fontSize: fs(29),
    fontWeight: '900',
  },
  targetInfo: {
    flex: 1,
  },
  targetRemaining: {
    color: '#061247',
    fontSize: fs(25),
    fontWeight: '900',
  },
  targetLabel: {
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '700',
    marginTop: rs(10),
  },
  targetBonusBox: {
    height: rs(40),
    backgroundColor: '#EEF3FF',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(18),
  },
  targetBonusText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  paymentRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconSoft: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: fs(15),
    fontWeight: '900',
  },
  paymentSubtitle: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(5),
  },
  paymentAmount: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '900',
    marginRight: rs(10),
  },
  quickActions: {
    height: rs(76),
    backgroundColor: '#173CFF',
    borderRadius: rs(38),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    marginTop: rs(2),
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickPlus: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '900',
  },
  quickDivider: {
    width: 1,
    height: rs(44),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});