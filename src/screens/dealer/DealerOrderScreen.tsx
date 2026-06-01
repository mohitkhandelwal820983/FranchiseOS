import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Box,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Download,
  Edit3,
  Eye,
  Filter,
  Home,
  Menu,
  Plus,
  Search,
  ShoppingCart,
  Truck,
  Warehouse,
  WalletCards,
  X,
} from 'lucide-react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type MainTab = 'customer' | 'stock';
type OrderFilter = 'All' | 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';

type CustomerOrderStatus = 'Processing' | 'Delivered' | 'Cancelled';

type StockOrderStatus = 'In Transit' | 'Approval Pending' | 'Delivered' | 'Cancelled';

type CustomerOrder = {
  id: string;
  customer: string;
  location: string;
  status: CustomerOrderStatus;
  amount: string;
  date: string;
  items: string;
  paymentStatus: string;
  invoice: string;
};

type StockOrder = {
  id: string;
  stockist: string;
  location: string;
  status: StockOrderStatus;
  amount: string;
  dateLabel: string;
  sku: string;
  orderStatus: string;
  expectedDelivery: string;
};

type SummaryItem = {
  id: string;
  label: string;
  value: string;
  icon: 'customer' | 'pending' | 'inventory' | 'cancelled';
  color: string;
  bg: string;
};

type DealerOrdersData = {
  customerOrders: CustomerOrder[];
  stockOrders: StockOrder[];
  summary: SummaryItem[];
};

const mockDealerOrdersData: DealerOrdersData = {
  customerOrders: [
    {
      id: '#CUST-2201',
      customer: 'Rahul Kirana Store',
      location: 'Jaipur, Rajasthan',
      status: 'Processing',
      amount: '₹4,200',
      date: '21 May 2026, 10:30 AM',
      items: '8 items',
      paymentStatus: 'Partial Paid',
      invoice: '#INV-2201',
    },
    {
      id: '#CUST-2200',
      customer: 'Sharma General Store',
      location: 'Jaipur, Rajasthan',
      status: 'Delivered',
      amount: '₹6,850',
      date: '20 May 2026, 06:15 PM',
      items: '12 items',
      paymentStatus: 'Paid Full',
      invoice: '#INV-2200',
    },
  ],
  stockOrders: [
    {
      id: '#PO-8821',
      stockist: 'Rajesh Stockist',
      location: 'Jaipur, Rajasthan',
      status: 'In Transit',
      amount: '₹42,000',
      dateLabel: 'Expected: Tomorrow',
      sku: '32 SKUs',
      orderStatus: 'In Transit',
      expectedDelivery: '22 May 2026',
    },
    {
      id: '#PO-8820',
      stockist: 'Mohan Stockist',
      location: 'Jaipur, Rajasthan',
      status: 'Approval Pending',
      amount: '₹18,750',
      dateLabel: 'Placed: 21 May 2026',
      sku: '24 SKUs',
      orderStatus: 'Approval Pending',
      expectedDelivery: '--',
    },
  ],
  summary: [
    {
      id: '1',
      label: 'Customer Orders Today',
      value: '18',
      icon: 'customer',
      color: '#173CFF',
      bg: '#173CFF',
    },
    {
      id: '2',
      label: 'Pending Deliveries',
      value: '7',
      icon: 'pending',
      color: '#F06419',
      bg: '#F06419',
    },
    {
      id: '3',
      label: 'Incoming Inventory',
      value: '₹68,500',
      icon: 'inventory',
      color: '#138A36',
      bg: '#138A36',
    },
    {
      id: '4',
      label: 'Cancelled Orders',
      value: '2',
      icon: 'cancelled',
      color: '#E00014',
      bg: '#E00014',
    },
  ],
};

const mockDealerOrdersApi = async (): Promise<DealerOrdersData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDealerOrdersData), 300);
  });
};

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Orders</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Filter color="#FFFFFF" size={rs(36)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const MainTabs = ({
  activeTab,
  onChange,
}: {
  activeTab: MainTab;
  onChange: (tab: MainTab) => void;
}) => {
  return (
    <View style={styles.mainTabs}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange('customer')}
        style={[
          styles.mainTabButton,
          activeTab === 'customer' && styles.activeMainTab,
        ]}>
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'customer' && styles.activeMainTabText,
          ]}>
          Customer Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange('stock')}
        style={[
          styles.mainTabButton,
          activeTab === 'stock' && styles.activeMainTab,
        ]}>
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'stock' && styles.activeMainTabText,
          ]}>
          Stock Orders
        </Text>
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
      <Search color="#5D607E" size={rs(28)} strokeWidth={2.1} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search order ID, customer or product"
        placeholderTextColor="#5D607E"
        style={styles.searchInput}
      />
    </View>
  );
};

const FilterChips = ({
  activeFilter,
  onChange,
}: {
  activeFilter: OrderFilter;
  onChange: (filter: OrderFilter) => void;
}) => {
  const filters: OrderFilter[] = [
    'All',
    'Pending',
    'Processing',
    'Delivered',
    'Cancelled',
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}>
      {filters.map(item => {
        const active = activeFilter === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onChange(item)}
            style={[styles.filterChip, active && styles.activeFilterChip]}>
            <Text style={[styles.filterText, active && styles.activeFilterText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const SectionTitle = ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionLine, {backgroundColor: color}]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

const StatusBadge = ({
  status,
}: {
  status: CustomerOrderStatus | StockOrderStatus;
}) => {
  const isDelivered = status === 'Delivered';
  const isProcessing = status === 'Processing';
  const isTransit = status === 'In Transit';
  const isPending = status === 'Approval Pending';
  const isCancelled = status === 'Cancelled';

  return (
    <View
      style={[
        styles.statusBadge,
        isDelivered && styles.deliveredBadge,
        isProcessing && styles.processingBadge,
        isTransit && styles.transitBadge,
        isPending && styles.pendingBadge,
        isCancelled && styles.cancelledBadge,
      ]}>
      <Text
        style={[
          styles.statusText,
          isDelivered && styles.deliveredText,
          isProcessing && styles.processingText,
          isTransit && styles.transitText,
          isPending && styles.pendingText,
          isCancelled && styles.cancelledText,
        ]}>
        {status}
      </Text>
    </View>
  );
};

const CustomerOrderCard = ({
  item,
  onDeliver,
  onRepeat,
}: {
  item: CustomerOrder;
  onDeliver: (id: string) => void;
  onRepeat: (id: string) => void;
}) => {
  const isProcessing = item.status === 'Processing';
  const isDelivered = item.status === 'Delivered';

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderTopRow}>
        <View
          style={[
            styles.orderIcon,
            isDelivered ? styles.greenSoftIcon : styles.blueSoftIcon,
          ]}>
          <ShoppingCart
            color={isDelivered ? '#138A36' : '#173CFF'}
            size={rs(36)}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderName}>{item.customer}</Text>

          <View style={styles.locationRow}>
            <Home color="#5D607E" size={rs(15)} strokeWidth={2.1} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.orderRight}>
          <StatusBadge status={item.status} />
          <Text style={styles.orderAmount}>{item.amount}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>

        <ChevronRight color="#061247" size={rs(26)} strokeWidth={2.4} />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Box color="#173CFF" size={rs(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.items}</Text>
            <Text style={styles.metricLabel}>Products</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <WalletCards
            color={isDelivered ? '#138A36' : '#F06419'}
            size={rs(27)}
            strokeWidth={2.2}
          />
          <View>
            <Text style={styles.metricValue}>{item.paymentStatus}</Text>
            <Text style={styles.metricLabel}>Payment Status</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <ClipboardList
            color={isDelivered ? '#138A36' : '#173CFF'}
            size={rs(27)}
            strokeWidth={2.2}
          />
          <View>
            <Text style={styles.metricValue}>{item.invoice}</Text>
            <Text style={styles.metricLabel}>Invoice</Text>
          </View>
        </View>
      </View>

      {isProcessing ? (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onDeliver(item.id)}
            style={styles.primaryAction}>
            <Truck color="#FFFFFF" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.primaryActionText}>Deliver</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <ClipboardList color="#173CFF" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <Eye color="#173CFF" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>View</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onRepeat(item.id)}
            style={styles.greenOutlineAction}>
            <Text style={styles.greenOutlineText}>↻ Repeat</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.greenOutlineAction}>
            <ClipboardList color="#138A36" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.greenOutlineText}>Invoice</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const StockOrderCard = ({
  item,
  onCancel,
}: {
  item: StockOrder;
  onCancel: (id: string) => void;
}) => {
  const isTransit = item.status === 'In Transit';
  const isPending = item.status === 'Approval Pending';

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderTopRow}>
        <View style={styles.purpleSoftIcon}>
          <Warehouse color="#7B22EA" size={rs(36)} strokeWidth={2.2} />
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderName}>{item.stockist}</Text>

          <View style={styles.locationRow}>
            <Home color="#5D607E" size={rs(15)} strokeWidth={2.1} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.orderRight}>
          <StatusBadge status={item.status} />
          <Text style={styles.orderAmount}>{item.amount}</Text>
          <Text style={styles.orderDate}>{item.dateLabel}</Text>
        </View>

        <ChevronRight color="#061247" size={rs(26)} strokeWidth={2.4} />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Box color="#7B22EA" size={rs(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.sku}</Text>
            <Text style={styles.metricLabel}>Products</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <Truck
            color={isTransit ? '#173CFF' : '#F06419'}
            size={rs(27)}
            strokeWidth={2.2}
          />
          <View>
            <Text style={styles.metricValue}>{item.orderStatus}</Text>
            <Text style={styles.metricLabel}>Order Status</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <CalendarDays color="#7B22EA" size={rs(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.expectedDelivery}</Text>
            <Text style={styles.metricLabel}>Expected Delivery</Text>
          </View>
        </View>
      </View>

      {isTransit ? (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.primaryActionWide}>
            <Truck color="#FFFFFF" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.primaryActionText}>Track</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineActionWide}>
            <ClipboardList color="#173CFF" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>Invoice</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.orangeOutlineAction}>
            <Edit3 color="#F06419" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.orangeOutlineText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onCancel(item.id)}
            style={styles.dangerOutlineAction}>
            <X color="#E00014" size={rs(22)} strokeWidth={2.2} />
            <Text style={styles.dangerOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const OrderSummary = ({items}: {items: SummaryItem[]}) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryTitleRow}>
        <ClipboardList color="#173CFF" size={rs(28)} strokeWidth={2.3} />
        <Text style={styles.summaryTitle}>Order Summary</Text>
      </View>

      <View style={styles.summaryItemsRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.summaryItem}>
            <View style={[styles.summaryIcon, {backgroundColor: item.bg}]}>
              {item.icon === 'customer' && (
                <ShoppingCart color="#FFFFFF" size={rs(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'pending' && (
                <Truck color="#FFFFFF" size={rs(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'inventory' && (
                <Download color="#FFFFFF" size={rs(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'cancelled' && (
                <X color="#FFFFFF" size={rs(31)} strokeWidth={2.2} />
              )}
            </View>

            <View>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>

            {index !== items.length - 1 && <View style={styles.summaryDivider} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const FloatingActions = ({
  onCustomerOrder,
  onStockOrder,
}: {
  onCustomerOrder: () => void;
  onStockOrder: () => void;
}) => {
  return (
    <View style={styles.floatingActions}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onCustomerOrder}
        style={styles.floatingButton}>
        <Plus color="#173CFF" size={rs(30)} strokeWidth={2.5} />
        <Text style={styles.floatingText}>Create{'\n'}Customer Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onStockOrder}
        style={styles.floatingButton}>
        <Plus color="#173CFF" size={rs(30)} strokeWidth={2.5} />
        <Text style={styles.floatingText}>Create{'\n'}Stock Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const DealerOrderScreen = () => {
  const [data, setData] = useState<DealerOrdersData | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('customer');
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockDealerOrdersApi().then(setData);
  }, []);

  const filteredCustomerOrders = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.customerOrders.filter(item => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.invoice.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'All' ||
        item.status === activeFilter ||
        (activeFilter === 'Pending' && item.status === 'Processing');

      return matchesSearch && matchesFilter;
    });
  }, [data, search, activeFilter]);

  const filteredStockOrders = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.stockOrders.filter(item => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.stockist.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Pending' && item.status === 'Approval Pending') ||
        (activeFilter === 'Processing' && item.status === 'In Transit') ||
        item.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [data, search, activeFilter]);

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setActiveFilter('All');
    setSearch('');
  };

  const updateCustomerStatus = (id: string, status: CustomerOrderStatus) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      customerOrders: data.customerOrders.map(item =>
        item.id === id ? {...item, status, date: 'Delivered just now'} : item,
      ),
    });
  };

  const updateStockStatus = (id: string, status: StockOrderStatus) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      stockOrders: data.stockOrders.map(item =>
        item.id === id ? {...item, status} : item,
      ),
    });
  };

  const handleCreateCustomerOrder = () => {
    Alert.alert('Create Customer Order', 'Customer order form opened.');
  };

  const handleCreateStockOrder = () => {
    Alert.alert('Create Stock Order', 'Stock order form opened.');
  };

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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <MainTabs activeTab={activeTab} onChange={handleTabChange} />

        <Text style={styles.subTitle}>Manage customer sales and stock purchases</Text>

        <SearchBox value={search} onChangeText={setSearch} />

        <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />

        {activeTab === 'customer' ? (
          <>
            <SectionTitle title="Customer Orders" color="#173CFF" />

            {filteredCustomerOrders.map(item => (
              <CustomerOrderCard
                key={item.id}
                item={item}
                onDeliver={id => updateCustomerStatus(id, 'Delivered')}
                onRepeat={() => handleCreateCustomerOrder()}
              />
            ))}

            <SectionTitle title="Orders To Stockist" color="#7B22EA" />

            {data.stockOrders.map(item => (
              <StockOrderCard
                key={item.id}
                item={item}
                onCancel={id => updateStockStatus(id, 'Cancelled')}
              />
            ))}
          </>
        ) : (
          <>
            <SectionTitle title="Orders To Stockist" color="#7B22EA" />

            {filteredStockOrders.map(item => (
              <StockOrderCard
                key={item.id}
                item={item}
                onCancel={id => updateStockStatus(id, 'Cancelled')}
              />
            ))}
          </>
        )}

        <OrderSummary items={data.summary} />
      </ScrollView>

      <FloatingActions
        onCustomerOrder={handleCreateCustomerOrder}
        onStockOrder={handleCreateStockOrder}
      />
    </SafeAreaView>
  );
};

export default DealerOrderScreen;

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
    fontSize: rs(31),
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
  mainTabs: {
    height: rs(54),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: rs(14),
  },
  mainTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMainTab: {
    backgroundColor: '#061B66',
  },
  mainTabText: {
    color: '#5D607E',
    fontSize: rs(18),
    fontWeight: '800',
  },
  activeMainTabText: {
    color: '#FFFFFF',
  },
  subTitle: {
    color: '#5D607E',
    fontSize: rs(16),
    fontWeight: '700',
    marginLeft: rs(12),
    marginBottom: rs(18),
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
    marginBottom: rs(18),
  },
  searchInput: {
    flex: 1,
    color: '#111327',
    fontSize: rs(17),
    fontWeight: '500',
    paddingVertical: 0,
    marginLeft: rs(16),
  },
  filterRow: {
    paddingBottom: rs(18),
  },
  filterChip: {
    minWidth: rs(104),
    height: rs(46),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(7),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(26),
    paddingHorizontal: rs(14),
  },
  activeFilterChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  filterText: {
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '800',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  sectionTitleRow: {
    height: rs(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    width: rs(4),
    height: rs(31),
    borderRadius: rs(2),
    marginRight: rs(16),
  },
  sectionTitle: {
    color: '#061247',
    fontSize: rs(23),
    fontWeight: '900',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(20),
    paddingVertical: rs(18),
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIcon: {
    width: rs(74),
    height: rs(74),
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  blueSoftIcon: {
    backgroundColor: '#EEF3FF',
  },
  greenSoftIcon: {
    backgroundColor: '#EAF8EC',
  },
  purpleSoftIcon: {
    width: rs(74),
    height: rs(74),
    borderRadius: rs(13),
    backgroundColor: '#F7F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: '#061247',
    fontSize: rs(24),
    fontWeight: '900',
  },
  orderName: {
    color: '#061247',
    fontSize: rs(16),
    fontWeight: '900',
    marginTop: rs(8),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(8),
  },
  locationText: {
    color: '#5D607E',
    fontSize: rs(13),
    fontWeight: '700',
    marginLeft: rs(8),
  },
  orderRight: {
    alignItems: 'flex-end',
    marginRight: rs(14),
  },
  orderAmount: {
    color: '#061247',
    fontSize: rs(24),
    fontWeight: '900',
    marginTop: rs(10),
  },
  orderDate: {
    color: '#5D607E',
    fontSize: rs(13),
    fontWeight: '700',
    marginTop: rs(8),
  },
  statusBadge: {
    minWidth: rs(104),
    height: rs(32),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(10),
  },
  deliveredBadge: {
    backgroundColor: '#EAF8EC',
  },
  processingBadge: {
    backgroundColor: '#FFF3E9',
  },
  transitBadge: {
    backgroundColor: '#F1F5FF',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E9',
  },
  cancelledBadge: {
    backgroundColor: '#FFF0F0',
  },
  statusText: {
    fontSize: rs(13),
    fontWeight: '900',
  },
  deliveredText: {
    color: '#138A36',
  },
  processingText: {
    color: '#F06419',
  },
  transitText: {
    color: '#173CFF',
  },
  pendingText: {
    color: '#F06419',
  },
  cancelledText: {
    color: '#E00014',
  },
  metricsRow: {
    height: rs(72),
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
    justifyContent: 'center',
  },
  metricValue: {
    color: '#061247',
    fontSize: rs(16),
    fontWeight: '900',
  },
  metricLabel: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  metricDivider: {
    width: 1,
    height: rs(48),
    backgroundColor: '#D9DCE8',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(10),
  },
  primaryAction: {
    width: '31%',
    height: rs(44),
    backgroundColor: '#173CFF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryActionWide: {
    width: '49%',
    height: rs(44),
    backgroundColor: '#173CFF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  outlineAction: {
    width: '31%',
    height: rs(44),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionWide: {
    width: '49%',
    height: rs(44),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionText: {
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  greenOutlineAction: {
    width: '49%',
    height: rs(44),
    borderWidth: 1,
    borderColor: '#88C99A',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  greenOutlineText: {
    color: '#138A36',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  orangeOutlineAction: {
    width: '49%',
    height: rs(44),
    borderWidth: 1,
    borderColor: '#F8C9A8',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangeOutlineText: {
    color: '#F06419',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  dangerOutlineAction: {
    width: '49%',
    height: rs(44),
    borderWidth: 1,
    borderColor: '#FFB6B6',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dangerOutlineText: {
    color: '#E00014',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(20),
    paddingVertical: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  summaryTitle: {
    color: '#061247',
    fontSize: rs(20),
    fontWeight: '900',
    marginLeft: rs(12),
  },
  summaryItemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  summaryIcon: {
    width: rs(55),
    height: rs(55),
    borderRadius: rs(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  summaryValue: {
    color: '#061247',
    fontSize: rs(23),
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  summaryDivider: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: rs(50),
    backgroundColor: '#D9DCE8',
  },
  floatingActions: {
    position: 'absolute',
    right: rs(28),
    bottom: rs(86),
    flexDirection: 'row',
    gap: rs(18),
  },
  floatingButton: {
    width: rs(206),
    height: rs(56),
    borderRadius: rs(28),
    backgroundColor: '#173CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 10,
  },
  floatingText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(10),
    lineHeight: rs(18),
  },
});