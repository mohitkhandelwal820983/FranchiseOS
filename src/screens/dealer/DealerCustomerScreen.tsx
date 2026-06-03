import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Briefcase,
  ChevronRight,
  ClipboardList,
  Eye,
  IndianRupee,
  List,
  MapPin,
  Menu,
  MoreVertical,
  Plus,
  RotateCw,
  Search,
  ShieldCheck,
  Trophy,
  User,
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react-native';
import {
  Customer,
  CustomerFilter,
  CustomerStatus,
  DealerCustomerData,
  Insight,
} from '../../api/mock/dealer/dealerCustomer.mock';
import { getDealerCustomer } from '../../api/dealer/dealerCustomer.api';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Customers</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onAdd}>
        <Plus color="#FFFFFF" size={rs(39)} strokeWidth={2.3} />
      </TouchableOpacity>
    </View>
  );
};

const SearchBox = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.searchBox}>
      <Search color="#5D607E" size={rs(29)} strokeWidth={2.1} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search customer name or mobile"
        placeholderTextColor="#5D607E"
        style={styles.searchInput}
      />
    </View>
  );
};

const FilterChips = ({
  active,
  onChange,
}: {
  active: CustomerFilter;
  onChange: (filter: CustomerFilter) => void;
}) => {
  const filters: CustomerFilter[] = [
    'All',
    'Active',
    'High Value',
    'Payment Due',
    'Inactive',
  ];

  return (
    <View style={styles.filterRow}>
      {filters.map(item => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onChange(item)}
            style={[styles.filterChip, isActive && styles.activeFilterChip]}
          >
            <Text
              style={[styles.filterText, isActive && styles.activeFilterText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SummaryCard = ({
  summary,
}: {
  summary: DealerCustomerData['summary'];
}) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: '#EEF3FF' }]}>
          <Users color="#173CFF" size={rs(32)} strokeWidth={2.3} />
        </View>

        <View>
          <Text style={styles.summaryValue}>{summary.customers}</Text>
          <Text style={styles.summaryLabel}>Customers</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: '#138A36' }]}>
          <IndianRupee color="#FFFFFF" size={rs(32)} strokeWidth={2.4} />
        </View>

        <View>
          <Text style={[styles.summaryValue, styles.greenText]}>
            {summary.monthlyBusiness}
          </Text>
          <Text style={styles.summaryLabel}>Monthly Business</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: '#F06419' }]}>
          <WalletCards color="#FFFFFF" size={rs(32)} strokeWidth={2.3} />
        </View>

        <View>
          <Text style={[styles.summaryValue, styles.orangeText]}>
            {summary.overduePayments}
          </Text>
          <Text style={styles.summaryLabel}>Overdue Payments</Text>
        </View>
      </View>
    </View>
  );
};

const StatusBadge = ({ status }: { status: CustomerStatus }) => {
  const isActive = status === 'Active';
  const isPaymentDue = status === 'Payment Due';
  const isTopBuyer = status === 'Top Buyer';

  return (
    <View
      style={[
        styles.statusBadge,
        isActive && styles.activeBadge,
        isPaymentDue && styles.paymentBadge,
        isTopBuyer && styles.topBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isActive && styles.activeText,
          isPaymentDue && styles.paymentText,
          isTopBuyer && styles.topText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const CustomerMetric = ({
  icon,
  value,
  label,
  color,
}: {
  icon: 'purchase' | 'orders' | 'score';
  value: string;
  label: string;
  color: string;
}) => {
  return (
    <View style={styles.metricBlock}>
      <View style={[styles.metricIconSoft, { backgroundColor: `${color}14` }]}>
        {icon === 'purchase' && (
          <Briefcase color={color} size={rs(24)} strokeWidth={2.2} />
        )}
        {icon === 'orders' && (
          <ClipboardList color={color} size={rs(24)} strokeWidth={2.2} />
        )}
        {icon === 'score' && (
          <ShieldCheck color={color} size={rs(24)} strokeWidth={2.2} />
        )}
      </View>

      <View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </View>
  );
};

const CustomerCard = ({
  item,
  onCollect,
  onReminder,
  onReward,
}: {
  item: Customer;
  onCollect: (customer: Customer) => void;
  onReminder: (customer: Customer) => void;
  onReward: (customer: Customer) => void;
}) => {
  const isPaymentDue = item.status === 'Payment Due';
  const isTopBuyer = item.status === 'Top Buyer';

  return (
    <View style={styles.customerCard}>
      <View style={styles.customerTopRow}>
        <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
          <Text style={[styles.avatarText, { color: item.avatarColor }]}>
            {item.initials}
          </Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>

          <View style={styles.metaRow}>
            <User color="#5D607E" size={rs(17)} strokeWidth={2.1} />
            <Text style={styles.metaText}>Owner: {item.owner}</Text>
          </View>

          <View style={styles.metaRow}>
            <MapPin color="#5D607E" size={rs(17)} strokeWidth={2.1} />
            <Text style={styles.metaText}>
              {item.city}, {item.state}
            </Text>
          </View>
        </View>

        <StatusBadge status={item.status} />

        <TouchableOpacity activeOpacity={0.8} style={styles.moreButton}>
          <MoreVertical color="#061247" size={rs(25)} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {isPaymentDue && (
        <TouchableOpacity activeOpacity={0.85} style={styles.outstandingBox}>
          <Text style={styles.outstandingLabel}>⚠ Outstanding Amount</Text>

          <View style={styles.outstandingRight}>
            <Text style={styles.outstandingAmount}>
              {item.outstandingAmount}
            </Text>
            <ChevronRight color="#F06419" size={rs(24)} strokeWidth={2.3} />
          </View>
        </TouchableOpacity>
      )}

      {isTopBuyer && (
        <View style={styles.achievementBox}>
          <Trophy color="#173CFF" size={rs(22)} strokeWidth={2.4} />
          <Text style={styles.achievementText}>
            <Text style={styles.achievementStrong}>Achievement:</Text>{' '}
            {item.achievement}
          </Text>
        </View>
      )}

      <View style={styles.metricsRow}>
        <CustomerMetric
          icon="purchase"
          value={item.monthlyPurchase}
          label="Monthly Purchase"
          color="#138A36"
        />

        <View style={styles.metricDivider} />

        <CustomerMetric
          icon="orders"
          value={item.completedOrders}
          label="Completed Orders"
          color="#7B22EA"
        />

        <View style={styles.metricDivider} />

        <CustomerMetric
          icon="score"
          value={item.paymentScore}
          label="Payment Score"
          color={isPaymentDue ? '#F06419' : '#138A36'}
        />
      </View>

      <View style={styles.actionRow}>
        {isTopBuyer ? (
          <>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onReward(item)}
              style={styles.outlineButtonHalf}
            >
              <Trophy color="#173CFF" size={rs(20)} strokeWidth={2.3} />
              <Text style={styles.outlineButtonText}>Reward</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.outlineButtonHalf}
            >
              <List color="#173CFF" size={rs(20)} strokeWidth={2.3} />
              <Text style={styles.outlineButtonText}>Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
              <Eye color="#173CFF" size={rs(20)} strokeWidth={2.3} />
              <Text style={styles.outlineButtonText}>View</Text>
            </TouchableOpacity>

            {isPaymentDue ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onReminder(item)}
                style={styles.orangeOutlineButton}
              >
                <Bell color="#F06419" size={rs(20)} strokeWidth={2.3} />
                <Text style={styles.orangeOutlineText}>Reminder</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.outlineButton}
              >
                <ClipboardList
                  color="#173CFF"
                  size={rs(20)}
                  strokeWidth={2.3}
                />
                <Text style={styles.outlineButtonText}>Ledger</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onCollect(item)}
              style={
                isPaymentDue ? styles.orangePrimaryButton : styles.primaryButton
              }
            >
              <IndianRupee color="#FFFFFF" size={rs(20)} strokeWidth={2.3} />
              <Text style={styles.primaryButtonText}>Collect</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const InsightIcon = ({ item }: { item: Insight }) => {
  if (item.icon === 'top') {
    return (
      <UserRoundCheck color={item.color} size={rs(28)} strokeWidth={2.2} />
    );
  }

  if (item.icon === 'repeat') {
    return <RotateCw color={item.color} size={rs(28)} strokeWidth={2.2} />;
  }

  if (item.icon === 'inactive') {
    return <User color={item.color} size={rs(28)} strokeWidth={2.2} />;
  }

  return <IndianRupee color={item.color} size={rs(28)} strokeWidth={2.2} />;
};

const CustomerInsights = ({ items }: { items: Insight[] }) => {
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightTitleRow}>
        <View style={styles.insightBars}>
          <View style={styles.barOne} />
          <View style={styles.barTwo} />
          <View style={styles.barThree} />
        </View>
        <Text style={styles.insightTitle}>Customer Insights</Text>
      </View>

      <View style={styles.insightItemsRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: item.bg }]}>
              <InsightIcon item={item} />
            </View>

            <View>
              <Text style={styles.insightValue}>{item.value}</Text>
              <Text style={styles.insightLabel}>{item.label}</Text>
            </View>

            {index !== items.length - 1 && (
              <View style={styles.insightDivider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const FloatingAddButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.floatingAddButton}
      onPress={onPress}
    >
      <Plus color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      <Text style={styles.floatingAddText}>Add Customer</Text>
    </TouchableOpacity>
  );
};

const DealerCustomerScreen = () => {
  const [data, setData] = useState<DealerCustomerData | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<CustomerFilter>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const loadCustomerData = async () => {
    try {
      setLoading(true);

      const response = await getDealerCustomer();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load customer data. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerData();
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.customers.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.initials.toLowerCase().includes(query);

      const numericPurchase = Number(item.monthlyPurchase.replace(/[₹,]/g, ''));

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Active' && item.status === 'Active') ||
        (activeFilter === 'Payment Due' && item.status === 'Payment Due') ||
        (activeFilter === 'High Value' && numericPurchase >= 40000) ||
        (activeFilter === 'Inactive' && item.paymentScore === '68%');

      return matchesSearch && matchesFilter;
    });
  }, [data, search, activeFilter]);

  const handleAddCustomer = () => {
    Alert.alert('Add Customer', 'Add customer form opened.');
  };

  const handleCollect = (customer: Customer) => {
    Alert.alert('Collect Payment', `Collect payment from ${customer.name}.`);
  };

  const handleReminder = (customer: Customer) => {
    Alert.alert('Reminder Sent', `Payment reminder sent to ${customer.name}.`);
  };

  const handleReward = (customer: Customer) => {
    Alert.alert('Reward', `Reward flow opened for ${customer.name}.`);
  };

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

      <Header onAdd={handleAddCustomer} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBox value={search} onChangeText={setSearch} />

        <FilterChips active={activeFilter} onChange={setActiveFilter} />

        <SummaryCard summary={data.summary} />

        {filteredCustomers.map(item => (
          <CustomerCard
            key={item.id}
            item={item}
            onCollect={handleCollect}
            onReminder={handleReminder}
            onReward={handleReward}
          />
        ))}

        <CustomerInsights items={data.insights} />
      </ScrollView>

      <FloatingAddButton onPress={handleAddCustomer} />
    </SafeAreaView>
  );
};

export default DealerCustomerScreen;

const PAGE_PADDING = rs(28);

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(22),
    paddingBottom: rs(160),
  },
  searchBox: {
    height: rs(62),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(8),
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(24),
  },
  searchInput: {
    flex: 1,
    color: '#111327',
    fontSize: fs(17),
    fontWeight: '500',
    paddingVertical: 0,
    marginLeft: rs(16),
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(28),
  },
  filterChip: {
    minWidth: rs(112),
    height: rs(50),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(7),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(14),
  },
  activeFilterChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  filterText: {
    color: '#061247',
    fontSize: fs(16),
    fontWeight: '800',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    height: rs(124),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(28),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: rs(60),
    height: rs(60),
    borderRadius: rs(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  summaryValue: {
    color: '#061247',
    fontSize: fs(31),
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '700',
    marginTop: rs(8),
  },
  greenText: {
    color: '#138A36',
  },
  orangeText: {
    color: '#F06419',
  },
  summaryDivider: {
    width: 1,
    height: rs(66),
    backgroundColor: '#D9DCE8',
    marginHorizontal: rs(22),
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(20),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  customerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: rs(78),
    height: rs(78),
    borderRadius: rs(39),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(24),
  },
  avatarText: {
    fontSize: fs(29),
    fontWeight: '900',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    color: '#061247',
    fontSize: fs(25),
    fontWeight: '900',
    marginBottom: rs(8),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(5),
  },
  metaText: {
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '700',
    marginLeft: rs(9),
  },
  moreButton: {
    marginLeft: rs(16),
  },
  statusBadge: {
    minWidth: rs(114),
    height: rs(36),
    borderRadius: rs(6),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(12),
  },
  activeBadge: {
    backgroundColor: '#EAF8EC',
    borderColor: '#BEE7C5',
  },
  paymentBadge: {
    backgroundColor: '#FFF3E9',
    borderColor: '#F8C9A8',
  },
  topBadge: {
    backgroundColor: '#F1F5FF',
    borderColor: '#B8C8FF',
  },
  statusText: {
    fontSize: fs(14),
    fontWeight: '900',
  },
  activeText: {
    color: '#138A36',
  },
  paymentText: {
    color: '#F06419',
  },
  topText: {
    color: '#173CFF',
  },
  outstandingBox: {
    minHeight: rs(58),
    backgroundColor: '#FFF3E9',
    borderWidth: 1,
    borderColor: '#F8C9A8',
    borderRadius: rs(6),
    paddingHorizontal: rs(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(20),
  },
  outstandingLabel: {
    color: '#F06419',
    fontSize: fs(16),
    fontWeight: '900',
  },
  outstandingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outstandingAmount: {
    color: '#F06419',
    fontSize: fs(20),
    fontWeight: '900',
    marginRight: rs(12),
  },
  achievementBox: {
    minHeight: rs(42),
    backgroundColor: '#F1F5FF',
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    marginTop: rs(20),
  },
  achievementText: {
    color: '#061247',
    fontSize: fs(14),
    fontWeight: '700',
    marginLeft: rs(10),
  },
  achievementStrong: {
    color: '#173CFF',
    fontWeight: '900',
  },
  metricsRow: {
    height: rs(78),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(18),
  },
  metricBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconSoft: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  metricValue: {
    color: '#061247',
    fontSize: fs(21),
    fontWeight: '900',
  },
  metricLabel: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(5),
  },
  metricDivider: {
    width: 1,
    height: rs(50),
    backgroundColor: '#D9DCE8',
    marginHorizontal: rs(18),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineButton: {
    width: '31%',
    height: rs(46),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButtonHalf: {
    width: '49%',
    height: rs(46),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButtonText: {
    color: '#173CFF',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(9),
  },
  primaryButton: {
    width: '31%',
    height: rs(46),
    backgroundColor: '#173CFF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangePrimaryButton: {
    width: '49%',
    height: rs(46),
    backgroundColor: '#F06419',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(9),
  },
  orangeOutlineButton: {
    width: '49%',
    height: rs(46),
    borderWidth: 1,
    borderColor: '#F8C9A8',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangeOutlineText: {
    color: '#F06419',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(9),
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(18),
    marginBottom: rs(20),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  insightBars: {
    width: rs(32),
    height: rs(30),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: rs(14),
  },
  barOne: {
    width: rs(6),
    height: rs(16),
    backgroundColor: '#173CFF',
    marginRight: rs(5),
  },
  barTwo: {
    width: rs(6),
    height: rs(24),
    backgroundColor: '#173CFF',
    marginRight: rs(5),
  },
  barThree: {
    width: rs(6),
    height: rs(30),
    backgroundColor: '#173CFF',
  },
  insightTitle: {
    color: '#061247',
    fontSize: fs(20),
    fontWeight: '900',
  },
  insightItemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  insightIcon: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(29),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  insightValue: {
    color: '#061247',
    fontSize: fs(19),
    fontWeight: '900',
  },
  insightLabel: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(5),
  },
  insightDivider: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: rs(54),
    backgroundColor: '#D9DCE8',
  },
  floatingAddButton: {
    position: 'absolute',
    right: rs(28),
    bottom: rs(88),
    width: rs(232),
    height: rs(60),
    borderRadius: rs(30),
    backgroundColor: '#173CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 10,
  },
  floatingAddText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: '900',
    marginLeft: rs(12),
  },
});
