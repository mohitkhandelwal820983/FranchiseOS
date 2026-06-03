import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Link2,
  Menu,
  Search,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CompanyOrdersData,
  FilterState,
  OrderItem,
  OrderStatus,
} from '../../api/mock/company/companyOrders.mock';
import { getCompanyOrders } from '../../api/company/companyOrders.api';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Orders</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Filter color="#FFFFFF" size={rs(34)} strokeWidth={2.3} />
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
      <Search color="#5D607E" size={rs(30)} strokeWidth={2.1} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search order ID , dealer, product"
        placeholderTextColor="#5D607E"
        style={styles.searchInput}
      />
    </View>
  );
};

const SummaryCards = ({ data }: { data: CompanyOrdersData }) => {
  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryCard}>
        <View style={styles.blueIconBox}>
          <FileText color="#FFFFFF" size={rs(34)} strokeWidth={2.2} />
        </View>

        <View>
          <Text style={styles.totalNumber}>{data.totalMTD}</Text>
          <Text style={styles.summaryLabel}>Total MTD</Text>
        </View>
      </View>

      <View style={[styles.summaryCard, styles.completedCard]}>
        <View style={styles.greenIconBox}>
          <CheckCircle2 color="#FFFFFF" size={rs(38)} strokeWidth={2.5} />
        </View>

        <View style={styles.completedTextBox}>
          <Text style={styles.completedNumber}>{data.completed}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>

        <ChevronRight color="#5D607E" size={rs(30)} strokeWidth={2.3} />
      </View>
    </View>
  );
};

const StatusTabs = ({
  activeStatus,
  onChange,
}: {
  activeStatus: OrderStatus;
  onChange: (status: OrderStatus) => void;
}) => {
  const tabs: OrderStatus[] = [
    'All',
    'Approved',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  return (
    <View style={styles.statusTabs}>
      {tabs.map(tab => {
        const active = activeStatus === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onChange(tab)}
            style={[styles.statusTab, active && styles.activeStatusTab]}
          >
            <Text
              style={[
                styles.statusTabText,
                active && styles.activeStatusTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const FilterButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.filterChip, active && styles.activeFilterChip]}
    >
      <Text
        style={[styles.filterChipText, active && styles.activeFilterChipText]}
      >
        {label}
      </Text>
      <ChevronDown
        color={active ? '#FFFFFF' : '#061247'}
        size={rs(18)}
        strokeWidth={2.3}
      />
    </TouchableOpacity>
  );
};

const FilterSection = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? 'All' : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      franchise: 'All',
      zone: 'All',
      date: 'All',
      value: 'All',
    });
  };

  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>Filter by:</Text>

      <View style={styles.filterButtonsWrap}>
        <FilterButton
          label={filters.franchise === 'All' ? 'Franchise' : filters.franchise}
          active={filters.franchise !== 'All'}
          onPress={() => toggleFilter('franchise', 'Stockist A')}
        />

        <FilterButton
          label={filters.zone === 'All' ? 'Zone' : filters.zone}
          active={filters.zone !== 'All'}
          onPress={() => toggleFilter('zone', 'Mumbai')}
        />

        <FilterButton
          label={filters.date === 'All' ? 'Date' : filters.date}
          active={filters.date !== 'All'}
          onPress={() => toggleFilter('date', '15 Jan 2026')}
        />

        <FilterButton
          label={filters.value === 'All' ? 'Value' : filters.value}
          active={filters.value !== 'All'}
          onPress={() => toggleFilter('value', 'High Value')}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={clearFilters}
          style={styles.clearFilterButton}
        >
          <Text style={styles.clearFilterText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StatusBadge = ({ status }: { status: OrderItem['status'] }) => {
  const isDelivered = status === 'Delivered';
  const isShipped = status === 'Shipped';
  const isApproved = status === 'Approved';
  const isCancelled = status === 'Cancelled';

  return (
    <View
      style={[
        styles.orderStatusBadge,
        isDelivered && styles.deliveredBadge,
        isShipped && styles.shippedBadge,
        isApproved && styles.approvedBadge,
        isCancelled && styles.cancelledBadge,
      ]}
    >
      <Text
        style={[
          styles.orderStatusText,
          isDelivered && styles.deliveredText,
          isShipped && styles.shippedText,
          isApproved && styles.approvedText,
          isCancelled && styles.cancelledText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const OrderRow = ({ item }: { item: OrderItem }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.orderRow}>
      <View style={styles.orderLeft}>
        <Text style={styles.orderNo}>{item.orderNo}</Text>

        <View style={styles.flowRow}>
          <Text style={styles.flowText}>{item.flow}</Text>
          <Link2 color="#5D607E" size={rs(20)} strokeWidth={2.2} />
        </View>

        <Text style={styles.productText}>
          {item.product} × {item.quantity}
        </Text>

        <Text style={styles.amountText}>{item.amount}</Text>
      </View>

      <View style={styles.orderRight}>
        <Text style={styles.dateText}>{item.date}</Text>

        <StatusBadge status={item.status} />

        {!!item.commission && (
          <Text style={styles.commissionText}>{item.commission}</Text>
        )}

        {!!item.reason && <Text style={styles.reasonText}>{item.reason}</Text>}
      </View>

      <ChevronRight color="#061247" size={rs(30)} strokeWidth={2.5} />
    </TouchableOpacity>
  );
};

const OrdersList = ({ orders }: { orders: OrderItem[] }) => {
  return (
    <View style={styles.ordersCard}>
      <View style={styles.ordersHeader}>
        <Text style={styles.ordersTitle}>All Orders</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.exportButton}>
          <Text style={styles.exportText}>Export</Text>
          <Download color="#173CFF" size={rs(30)} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {orders.map(item => (
        <OrderRow key={item.id} item={item} />
      ))}

      <View style={styles.listFooter}>
        <Text style={styles.showingText}>
          Showing {orders.length} of 342 orders
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.loadMoreText}>Load more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrdersScreen = () => {
  const [data, setData] = useState<CompanyOrdersData | null>(null);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('All');
  const [filters, setFilters] = useState<FilterState>({
    franchise: 'All',
    zone: 'All',
    date: 'All',
    value: 'All',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadOrders = useCallback(async () => {
    try {
      setError('');

      const response = await getCompanyOrders();

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load company orders';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.orders.filter(order => {
      const matchesSearch =
        order.orderNo.toLowerCase().includes(query) ||
        order.flow.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query) ||
        order.franchise.toLowerCase().includes(query) ||
        order.zone.toLowerCase().includes(query);

      const matchesStatus =
        activeStatus === 'All' || order.status === activeStatus;

      const matchesFranchise =
        filters.franchise === 'All' || order.franchise === filters.franchise;

      const matchesZone = filters.zone === 'All' || order.zone === filters.zone;

      const matchesDate = filters.date === 'All' || order.date === filters.date;

      const matchesValue =
        filters.value === 'All' ||
        (filters.value === 'High Value' && order.valueType === 'high');

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFranchise &&
        matchesZone &&
        matchesDate &&
        matchesValue
      );
    });
  }, [data, search, activeStatus, filters]);

  const handleRetry = () => {
    setLoading(true);
    loadOrders();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />

        <Text
          style={{
            color: '#061247',
            fontSize: fs(18),
            fontWeight: '700',
            marginBottom: rs(18),
            textAlign: 'center',
          }}
        >
          {error || 'Something went wrong'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleRetry}
          style={{
            backgroundColor: '#061B66',
            paddingHorizontal: rs(28),
            paddingVertical: rs(14),
            borderRadius: rs(8),
          }}
        >
          <Text
            style={{ color: '#FFFFFF', fontSize: fs(14), fontWeight: '800' }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchBox value={search} onChangeText={setSearch} />

        <SummaryCards data={data} />

        <StatusTabs activeStatus={activeStatus} onChange={setActiveStatus} />

        <FilterSection filters={filters} setFilters={setFilters} />

        <OrdersList orders={filteredOrders} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;

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
    height: rs(92),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(32),
    paddingTop: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(34),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(28),
    paddingBottom: rs(36),
  },
  searchBox: {
    height: rs(76),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(32),
  },
  searchInput: {
    flex: 1,
    marginLeft: rs(20),
    color: '#111737',
    fontSize: fs(22),
    fontWeight: '500',
    paddingVertical: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(30),
  },
  summaryCard: {
    width: '48.5%',
    minHeight: rs(145),
    borderWidth: 1,
    borderColor: '#CEDBFF',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },
  completedCard: {
    borderColor: '#D7E9D9',
  },
  blueIconBox: {
    width: rs(82),
    height: rs(82),
    borderRadius: rs(13),
    backgroundColor: '#0074F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(36),
  },
  greenIconBox: {
    width: rs(82),
    height: rs(82),
    borderRadius: rs(13),
    backgroundColor: '#008D21',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(36),
  },
  totalNumber: {
    color: '#173CFF',
    fontSize: fs(42),
    lineHeight: rs(48),
    fontWeight: '900',
    letterSpacing: rs(5),
  },
  completedTextBox: {
    flex: 1,
  },
  completedNumber: {
    color: '#138A36',
    fontSize: fs(42),
    lineHeight: rs(48),
    fontWeight: '900',
    letterSpacing: rs(5),
  },
  summaryLabel: {
    color: '#2E314A',
    fontSize: fs(18),
    fontWeight: '500',
    marginTop: rs(10),
  },
  statusTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(28),
  },
  statusTab: {
    height: rs(62),
    minWidth: rs(120),
    paddingHorizontal: rs(22),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStatusTab: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  statusTabText: {
    color: '#061247',
    fontSize: fs(20),
    fontWeight: '600',
  },
  activeStatusTabText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  activeFilterChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  filterChipText: {
    color: '#061247',
    fontSize: fs(17),
    fontWeight: '700',
    marginRight: rs(10),
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  filterSection: {
    minHeight: rs(98),
    borderWidth: 1,
    borderColor: '#EEF0F6',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(20),
    paddingVertical: rs(16),
    marginBottom: rs(28),
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 2,
  },
  filterLabel: {
    color: '#111327',
    fontSize: fs(24),
    fontWeight: '700',
    marginBottom: rs(14),
  },
  filterButtonsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterChip: {
    height: rs(54),
    minWidth: rs(112),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: rs(16),
    marginRight: rs(12),
    marginBottom: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearFilterButton: {
    height: rs(54),
    minWidth: rs(82),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(16),
    marginBottom: rs(12),
  },
  clearFilterText: {
    color: '#061247',
    fontSize: fs(16),
    fontWeight: '800',
  },
  ordersCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F6',
    borderRadius: rs(10),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  ordersHeader: {
    height: rs(88),
    paddingHorizontal: rs(26),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ordersTitle: {
    color: '#111327',
    fontSize: fs(24),
    fontWeight: '900',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportText: {
    color: '#173CFF',
    fontSize: fs(22),
    fontWeight: '700',
    marginRight: rs(10),
  },
  orderRow: {
    minHeight: rs(232),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    paddingHorizontal: rs(26),
    paddingVertical: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderLeft: {
    flex: 1,
  },
  orderNo: {
    color: '#173CFF',
    fontSize: fs(26),
    fontWeight: '900',
    marginBottom: rs(20),
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  flowText: {
    color: '#222640',
    fontSize: fs(17),
    fontWeight: '600',
    marginRight: rs(10),
  },
  productText: {
    color: '#5D607E',
    fontSize: fs(17),
    fontWeight: '600',
    marginBottom: rs(20),
  },
  amountText: {
    color: '#111327',
    fontSize: fs(28),
    fontWeight: '900',
  },
  orderRight: {
    width: rs(260),
    alignItems: 'flex-end',
    marginRight: rs(20),
  },
  dateText: {
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '600',
    marginBottom: rs(42),
  },
  orderStatusBadge: {
    minWidth: rs(118),
    height: rs(45),
    borderRadius: rs(7),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(30),
  },
  deliveredBadge: {
    backgroundColor: '#EAF8EC',
    borderColor: '#BEE7C5',
  },
  shippedBadge: {
    backgroundColor: '#F3F6FF',
    borderColor: '#B8C8FF',
  },
  approvedBadge: {
    backgroundColor: '#EEF7FF',
    borderColor: '#B6D8FF',
  },
  cancelledBadge: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFB6B6',
  },
  orderStatusText: {
    fontSize: fs(18),
    fontWeight: '700',
  },
  deliveredText: {
    color: '#087A22',
  },
  shippedText: {
    color: '#173CFF',
  },
  approvedText: {
    color: '#006BCF',
  },
  cancelledText: {
    color: '#E00014',
  },
  commissionText: {
    color: '#087A22',
    fontSize: fs(17),
    fontWeight: '700',
  },
  reasonText: {
    color: '#E00014',
    fontSize: fs(17),
    fontWeight: '700',
  },
  listFooter: {
    minHeight: rs(142),
    paddingHorizontal: rs(26),
    paddingVertical: rs(28),
  },
  showingText: {
    color: '#5D607E',
    fontSize: fs(17),
    fontWeight: '600',
  },
  loadMoreText: {
    color: '#173CFF',
    fontSize: fs(20),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: rs(34),
  },
});
