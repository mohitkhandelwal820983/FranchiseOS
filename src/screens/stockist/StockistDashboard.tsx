import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type OverviewCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'stock' | 'orders' | 'dealers' | 'revenue' | 'lowStock' | 'incentive';
  color: string;
  bg: string;
};

type PriorityAction = {
  id: string;
  title: string;
  subtitle: string;
  button: string;
  color: string;
  icon: 'warning' | 'truck' | 'card' | 'user';
};

type InventoryItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

type ProductItem = {
  id: string;
  name: string;
  units: string;
  revenue: string;
  trendColor: string;
  image: string;
};

type DealerItem = {
  id: string;
  initials: string;
  name: string;
  orders: string;
  score: string;
  status: string;
  color: string;
  statusColor: string;
  statusBg: string;
};

type RecentOrder = {
  id: string;
  dealer: string;
  amount: string;
  status: string;
  statusColor: string;
  statusBg: string;
};

type QuickAction = {
  id: string;
  title: string;
  icon: 'create' | 'dealer' | 'restock';
};



type DashboardData = {
  name: string;
  subtitle: string;
  date: string;
  notifications: string;
  overview: OverviewCard[];
  priorityActions: PriorityAction[];
  inventoryHealth: InventoryItem[];
  products: ProductItem[];
  dealers: DealerItem[];
  recentOrders: RecentOrder[];
  quickActions: QuickAction[];

};

const mockDashboardData: DashboardData = {
  name: 'Rajesh',
  subtitle: 'Stockist — Jaipur Region',
  date: 'Thursday, 21 May 2026',
  notifications: '3',
  overview: [
    {
      id: '1',
      title: 'Total Stock Value',
      value: '₹12,40,000',
      subtitle: '↑ +8% this month',
      icon: 'stock',
      color: '#173CFF',
      bg: '#0B74FF',
    },
    {
      id: '2',
      title: 'Orders Today',
      value: '28',
      subtitle: '5 pending dispatch',
      icon: 'orders',
      color: '#138A36',
      bg: '#008A21',
    },
    {
      id: '3',
      title: 'Active Dealers',
      value: '42',
      subtitle: '3 inactive',
      icon: 'dealers',
      color: '#F06419',
      bg: '#F06419',
    },
    {
      id: '4',
      title: 'Revenue MTD',
      value: '₹4,80,000',
      subtitle: '82% target achieved',
      icon: 'revenue',
      color: '#173CFF',
      bg: '#173CFF',
    },
    {
      id: '5',
      title: 'Low Stock Items',
      value: '8',
      subtitle: 'Need restock urgently',
      icon: 'lowStock',
      color: '#D90014',
      bg: '#D90014',
    },
    {
      id: '6',
      title: 'Inventives Earned',
      value: '₹18,500',
      subtitle: '2 milestones unlocked',
      icon: 'incentive',
      color: '#7B22EA',
      bg: '#7B22EA',
    },
  ],
  priorityActions: [
    {
      id: '1',
      title: 'Parle-G 500g stock critically low',
      subtitle: 'Only 12 units left',
      button: 'Restock',
      color: '#E00014',
      icon: 'warning',
    },
    {
      id: '2',
      title: '5 dealer orders pending dispatch',
      subtitle: 'Dispatch before 5 PM',
      button: 'View Orders',
      color: '#F06419',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'ABC Dealers payment overdue',
      subtitle: '₹24,000 pending',
      button: 'Collect',
      color: '#173CFF',
      icon: 'card',
    },
    {
      id: '4',
      title: '2 new dealer onboarding requests',
      subtitle: 'Waiting approval',
      button: 'Review',
      color: '#138A36',
      icon: 'user',
    },
  ],
  inventoryHealth: [
    {id: '1', label: 'Fast Moving Products', value: 92, color: '#173CFF'},
    {id: '2', label: 'Low Stock Risk', value: 28, color: '#E00014'},
    {id: '3', label: 'Warehouse Capacity', value: 74, color: '#138A36'},
    {id: '4', label: 'Stock Accuracy', value: 98, color: '#138A36'},
  ],
  products: [
    {
      id: '1',
      name: 'Parle-G Biscuits',
      units: '324 units sold this week',
      revenue: '₹48,000 revenue',
      trendColor: '#138A36',
      image: 'https://dummyimage.com/90x70/f9d87b/000000&text=Parle-G',
    },
    {
      id: '2',
      name: 'Coca Cola 750ml',
      units: '210 units sold',
      revenue: '₹39,000 revenue',
      trendColor: '#173CFF',
      image: 'https://dummyimage.com/90x70/ffffff/000000&text=Coke',
    },
    {
      id: '3',
      name: 'Aashirvaad Atta',
      units: '180 units sold',
      revenue: '₹31,000 revenue',
      trendColor: '#F06419',
      image: 'https://dummyimage.com/90x70/f4b6a5/000000&text=Atta',
    },
  ],
  dealers: [
    {
      id: '1',
      initials: 'AD',
      name: 'ABC Dealers',
      orders: '₹1.2L orders this month',
      score: '94% payment score',
      status: 'Active',
      color: '#061B66',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
    {
      id: '2',
      initials: 'MD',
      name: 'Modern Mart',
      orders: '₹94K orders',
      score: '76% payment score',
      status: 'Payment Due',
      color: '#138A36',
      statusColor: '#F06419',
      statusBg: '#FFF1E7',
    },
    {
      id: '3',
      initials: 'SK',
      name: 'Shree Krishna Traders',
      orders: '₹72K orders',
      score: '96% payment score',
      status: 'Top Performer',
      color: '#173CFF',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
  ],
  recentOrders: [
    {
      id: '#ORD-1023',
      dealer: 'ABC Dealers',
      amount: '₹12,400',
      status: 'Processing',
      statusColor: '#F06419',
      statusBg: '#FFF1E7',
    },
    {
      id: '#ORD-1022',
      dealer: 'Modern Mart',
      amount: '₹8,200',
      status: 'Shipped',
      statusColor: '#173CFF',
      statusBg: '#F1F5FF',
    },
    {
      id: '#ORD-1021',
      dealer: 'Shree Krishna Traders',
      amount: '₹15,600',
      status: 'Delivered',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
  ],
  quickActions: [
    {id: '1', title: 'Create Order', icon: 'create'},
    {id: '2', title: 'Add Dealer', icon: 'dealer'},
    {id: '3', title: 'Restock Inventory', icon: 'restock'},
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
        <Menu color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dashboard</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellBox}>
        <Bell color="#FFFFFF" size={rs(30)} strokeWidth={2.3} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{data.notifications}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const WelcomeCard = ({data}: {data: DashboardData}) => {
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

const OverviewIcon = ({item}: {item: OverviewCard}) => {
  return (
    <View style={[styles.overviewIconBox, {backgroundColor: item.bg}]}>
      {item.icon === 'stock' && (
        <Building2 color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
      {item.icon === 'orders' && (
        <ClipboardList color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
      {item.icon === 'dealers' && (
        <Users color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
      {item.icon === 'revenue' && (
        <TrendingUp color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
      {item.icon === 'lowStock' && (
        <AlertTriangle color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
      {item.icon === 'incentive' && (
        <Gift color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
      )}
    </View>
  );
};

const OverviewCard = ({item}: {item: OverviewCard}) => {
  return (
    <View style={styles.overviewCard}>
      <OverviewIcon item={item} />

      <View style={styles.overviewTextBox}>
        <Text style={styles.overviewTitle}>{item.title}</Text>
        <Text style={[styles.overviewValue, {color: item.color}]}>
          {item.value}
        </Text>
        <Text
          style={[
            styles.overviewSubtitle,
            item.color === '#D90014' && styles.redText,
            item.color === '#F06419' && styles.orangeText,
          ]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const BusinessOverview = ({data}: {data: DashboardData}) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Business Overview</Text>
        <Text style={styles.viewReports}>View Reports</Text>
      </View>

      <View style={styles.overviewGrid}>
        {data.overview.map(item => (
          <OverviewCard key={item.id} item={item} />
        ))}
      </View>
    </>
  );
};

const PriorityIcon = ({item}: {item: PriorityAction}) => {
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

const PriorityActionsCard = ({items}: {items: PriorityAction[]}) => {
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
          <View style={[styles.priorityLine, {backgroundColor: item.color}]} />

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

const ProgressBar = ({item}: {item: InventoryItem}) => {
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
            {width: `${item.value}%`, backgroundColor: item.color},
          ]}
        />
      </View>
    </View>
  );
};

const InventoryHealthCard = ({items}: {items: InventoryItem[]}) => {
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

const TrendMini = ({color}: {color: string}) => {
  return (
    <View style={styles.trendMini}>
      <View style={[styles.trendLineOne, {borderColor: color}]} />
      <View style={[styles.trendLineTwo, {borderColor: color}]} />
      <View style={[styles.trendDot, {backgroundColor: color}]} />
    </View>
  );
};

const TopSellingProducts = ({items}: {items: ProductItem[]}) => {
  return (
    <View style={styles.productsCard}>
      <Text style={styles.cardTitle}>Top Selling Products</Text>

      {items.map(item => (
        <View key={item.id} style={styles.productRow}>
          <Image source={{uri: item.image}} style={styles.productImage} />

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

const DealerPerformance = ({items}: {items: DealerItem[]}) => {
  return (
    <View style={styles.dealerCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Dealer Performance</Text>
        <Text style={styles.seeAllText}>See All</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.dealerRow}>
          <View style={[styles.dealerAvatar, {backgroundColor: item.color}]}>
            <Text style={styles.dealerAvatarText}>{item.initials}</Text>
          </View>

          <View style={styles.dealerInfo}>
            <Text style={styles.dealerName}>{item.name}</Text>
            <Text style={styles.dealerSub}>{item.orders}</Text>
            <Text style={styles.dealerSub}>{item.score}</Text>
          </View>

          <View style={[styles.dealerStatus, {backgroundColor: item.statusBg}]}>
            <Text style={[styles.dealerStatusText, {color: item.statusColor}]}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const RecentOrdersCard = ({items}: {items: RecentOrder[]}) => {
  return (
    <View style={styles.recentOrdersCard}>
      <Text style={styles.cardTitle}>Recent Orders</Text>

      {items.map(item => (
        <View key={item.id} style={styles.orderRow}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDealer}>{item.dealer}</Text>
          <Text style={styles.orderAmount}>{item.amount}</Text>

          <View style={[styles.orderStatus, {backgroundColor: item.statusBg}]}>
            <Text style={[styles.orderStatusText, {color: item.statusColor}]}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const QuickActionsCard = ({items}: {items: QuickAction[]}) => {
  return (
    <View style={styles.quickActionsCard}>
      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.quickActionRow}>
          {item.icon === 'create' && (
            <FilePlus2 color="#061247" size={rs(28)} strokeWidth={2.2} />
          )}
          {item.icon === 'dealer' && (
            <UserPlus color="#061247" size={rs(28)} strokeWidth={2.2} />
          )}
          {item.icon === 'restock' && (
            <Box color="#061247" size={rs(28)} strokeWidth={2.2} />
          )}
          <Text style={styles.quickActionText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};




const StockistDashboardScreen = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    mockDashboardApi().then(setData);
  }, []);

  if (!data) {
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

      <DashboardHeader data={data} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
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
    backgroundColor: '#F8F9FD',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(82),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(30),
    paddingTop: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(30),
    fontWeight: '800',
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
    backgroundColor: '#E00014',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '900',
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
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(28),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(14),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  leftBlueLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(4),
    backgroundColor: '#173CFF',
  },
  welcomeTitle: {
    color: '#111327',
    fontSize: rs(28),
    fontWeight: '900',
  },
  welcomeSubtitle: {
    color: '#5D607E',
    fontSize: rs(15),
    fontWeight: '600',
    marginTop: rs(10),
  },
  dateText: {
    color: '#5D607E',
    fontSize: rs(13),
    fontWeight: '600',
    marginTop: rs(34),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(20),
  },
  sectionTitle: {
    color: '#111327',
    fontSize: rs(24),
    fontWeight: '900',
  },
  viewReports: {
    color: '#173CFF',
    fontSize: rs(17),
    fontWeight: '800',
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(20),
  },
  overviewCard: {
    width: OVERVIEW_CARD_WIDTH,
    height: rs(128),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    marginBottom: rs(14),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  overviewIconBox: {
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(24),
  },
  overviewTextBox: {
    flex: 1,
  },
  overviewTitle: {
    color: '#5D607E',
    fontSize: rs(16),
    fontWeight: '700',
  },
  overviewValue: {
    fontSize: rs(28),
    fontWeight: '900',
    marginTop: rs(10),
    letterSpacing: rs(3),
  },
  overviewSubtitle: {
    color: '#138A36',
    fontSize: rs(14),
    fontWeight: '700',
    marginTop: rs(8),
  },
  redText: {
    color: '#D90014',
  },
  orangeText: {
    color: '#F06419',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  priorityCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingTop: rs(18),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  healthCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  cardTitleRow: {
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  cardTitle: {
    color: '#111327',
    fontSize: rs(18),
    fontWeight: '900',
  },
  priorityBadge: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    backgroundColor: '#E00014',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityBadgeText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '900',
  },
  priorityRow: {
    height: rs(68),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    paddingHorizontal: rs(18),
  },
  priorityLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
  },
  priorityIconWrap: {
    width: rs(44),
  },
  priorityTextBox: {
    flex: 1,
  },
  priorityTitle: {
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '800',
  },
  prioritySubtitle: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
    marginTop: rs(5),
  },
  priorityButton: {
    minWidth: rs(70),
    height: rs(30),
    borderWidth: 1,
    borderColor: '#8CA3FF',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  priorityButtonText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '800',
  },
  healthyBadge: {
    minWidth: rs(76),
    height: rs(28),
    borderRadius: rs(6),
    backgroundColor: '#EAF8EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthyText: {
    color: '#138A36',
    fontSize: rs(12),
    fontWeight: '800',
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
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '700',
  },
  healthPercent: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
  },
  progressTrack: {
    height: rs(7),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(6),
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(7),
    borderRadius: rs(6),
  },
  productsCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  productRow: {
    minHeight: rs(84),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: rs(90),
    height: rs(62),
    borderRadius: rs(4),
    backgroundColor: '#EEF0F6',
    marginRight: rs(18),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#111327',
    fontSize: rs(16),
    fontWeight: '900',
  },
  productUnits: {
    color: '#5D607E',
    fontSize: rs(13),
    fontWeight: '600',
    marginTop: rs(6),
  },
  productRevenue: {
    color: '#111327',
    fontSize: rs(12),
    fontWeight: '700',
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
    transform: [{rotate: '-28deg'}],
  },
  trendLineTwo: {
    position: 'absolute',
    right: rs(1),
    top: rs(5),
    width: rs(18),
    height: rs(13),
    borderTopWidth: rs(3),
    transform: [{rotate: '-28deg'}],
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
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  seeAllText: {
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '800',
  },
  dealerRow: {
    minHeight: rs(84),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
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
    color: '#FFFFFF',
    fontSize: rs(18),
    fontWeight: '900',
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: '#111327',
    fontSize: rs(16),
    fontWeight: '900',
  },
  dealerSub: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
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
    fontSize: rs(12),
    fontWeight: '800',
  },
  bottomContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  recentOrdersCard: {
    width: SCREEN_WIDTH - PAGE_PADDING * 2 - rs(270),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  orderRow: {
    height: rs(50),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    width: rs(130),
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '900',
  },
  orderDealer: {
    flex: 1,
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '700',
  },
  orderAmount: {
    width: rs(86),
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  orderStatus: {
    minWidth: rs(90),
    height: rs(28),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusText: {
    fontSize: rs(11),
    fontWeight: '800',
  },
  quickActionsCard: {
    width: rs(250),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(8),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  quickActionRow: {
    height: rs(54),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
  },
  quickActionText: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
    marginLeft: rs(18),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(30),
    bottom: rs(118),
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    backgroundColor: '#173CFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 10,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: rs(100),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: rs(16),
    shadowOffset: {width: 0, height: -rs(6)},
    elevation: 14,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabText: {
    color: '#55576F',
    fontSize: rs(13),
    fontWeight: '700',
    marginTop: rs(7),
  },
  activeBottomText: {
    color: '#173CFF',
  },
});