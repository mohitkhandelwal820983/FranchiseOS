import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import {
  CustomerOrder,
  CustomerOrderStatus,
  DealerOrdersData,
  MainTab,
  OrderFilter,
  StockOrder,
  StockOrderStatus,
  SummaryItem,
} from '../../api/mock/dealer/dealerOrders.mock';
import { getDealerOrders } from '../../api/dealer/dealerOrders.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size, textSize } from '../../theme';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={size(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Orders</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Filter color={colors.white} size={size(36)} strokeWidth={2.4} />
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
        ]}
      >
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'customer' && styles.activeMainTabText,
          ]}
        >
          Customer Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange('stock')}
        style={[
          styles.mainTabButton,
          activeTab === 'stock' && styles.activeMainTab,
        ]}
      >
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'stock' && styles.activeMainTabText,
          ]}
        >
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
      <Search color={colors.slateText} size={size(28)} strokeWidth={2.1} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search order ID, customer or product"
        placeholderTextColor={colors.slateText}
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
      contentContainerStyle={styles.filterRow}
    >
      {filters.map(item => {
        const active = activeFilter === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onChange(item)}
            style={[styles.filterChip, active && styles.activeFilterChip]}
          >
            <Text
              style={[styles.filterText, active && styles.activeFilterText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const SectionTitle = ({ title, color }: { title: string; color: string }) => {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionLine, { backgroundColor: color }]} />
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
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isDelivered && styles.deliveredText,
          isProcessing && styles.processingText,
          isTransit && styles.transitText,
          isPending && styles.pendingText,
          isCancelled && styles.cancelledText,
        ]}
      >
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
          ]}
        >
          <ShoppingCart
            color={isDelivered ? colors.success : colors.financeBlue}
            size={size(36)}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderName}>{item.customer}</Text>

          <View style={styles.locationRow}>
            <Home color={colors.slateText} size={size(15)} strokeWidth={2.1} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.orderRight}>
          <StatusBadge status={item.status} />
          <Text style={styles.orderAmount}>{item.amount}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>

        <ChevronRight color={colors.primaryText} size={size(26)} strokeWidth={2.4} />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Box color={colors.financeBlue} size={size(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.items}</Text>
            <Text style={styles.metricLabel}>Products</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <WalletCards
            color={isDelivered ? colors.success : colors.profileOrange}
            size={size(27)}
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
            color={isDelivered ? colors.success : colors.financeBlue}
            size={size(27)}
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
            style={styles.primaryAction}
          >
            <Truck color={colors.white} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.primaryActionText}>Deliver</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <ClipboardList color={colors.financeBlue} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <Eye color={colors.financeBlue} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>View</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onRepeat(item.id)}
            style={styles.greenOutlineAction}
          >
            <Text style={styles.greenOutlineText}>↻ Repeat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.greenOutlineAction}
          >
            <ClipboardList color={colors.success} size={size(22)} strokeWidth={2.2} />
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
  // const isPending = item.status === 'Approval Pending';

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderTopRow}>
        <View style={styles.purpleSoftIcon}>
          <Warehouse color={colors.purple} size={size(36)} strokeWidth={2.2} />
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderName}>{item.stockist}</Text>

          <View style={styles.locationRow}>
            <Home color={colors.slateText} size={size(15)} strokeWidth={2.1} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.orderRight}>
          <StatusBadge status={item.status} />
          <Text style={styles.orderAmount}>{item.amount}</Text>
          <Text style={styles.orderDate}>{item.dateLabel}</Text>
        </View>

        <ChevronRight color={colors.primaryText} size={size(26)} strokeWidth={2.4} />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Box color={colors.purple} size={size(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.sku}</Text>
            <Text style={styles.metricLabel}>Products</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <Truck
            color={isTransit ? colors.financeBlue : colors.profileOrange}
            size={size(27)}
            strokeWidth={2.2}
          />
          <View>
            <Text style={styles.metricValue}>{item.orderStatus}</Text>
            <Text style={styles.metricLabel}>Order Status</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <CalendarDays color={colors.purple} size={size(27)} strokeWidth={2.2} />
          <View>
            <Text style={styles.metricValue}>{item.expectedDelivery}</Text>
            <Text style={styles.metricLabel}>Expected Delivery</Text>
          </View>
        </View>
      </View>

      {isTransit ? (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryActionWide}
          >
            <Truck color={colors.white} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.primaryActionText}>Track</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.outlineActionWide}
          >
            <ClipboardList color={colors.financeBlue} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.outlineActionText}>Invoice</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.orangeOutlineAction}
          >
            <Edit3 color={colors.profileOrange} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.orangeOutlineText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onCancel(item.id)}
            style={styles.dangerOutlineAction}
          >
            <X color={colors.dangerDark} size={size(22)} strokeWidth={2.2} />
            <Text style={styles.dangerOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const OrderSummary = ({ items }: { items: SummaryItem[] }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryTitleRow}>
        <ClipboardList color={colors.financeBlue} size={size(28)} strokeWidth={2.3} />
        <Text style={styles.summaryTitle}>Order Summary</Text>
      </View>

      <View style={styles.summaryItemsRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: item.bg }]}>
              {item.icon === 'customer' && (
                <ShoppingCart color={colors.white} size={size(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'pending' && (
                <Truck color={colors.white} size={size(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'inventory' && (
                <Download color={colors.white} size={size(31)} strokeWidth={2.2} />
              )}
              {item.icon === 'cancelled' && (
                <X color={colors.white} size={size(31)} strokeWidth={2.2} />
              )}
            </View>

            <View>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>

            {index !== items.length - 1 && (
              <View style={styles.summaryDivider} />
            )}
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
        style={styles.floatingButton}
      >
        <Plus color={colors.financeBlue} size={size(30)} strokeWidth={2.5} />
        <Text style={styles.floatingText}>Create{'\n'}Customer Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onStockOrder}
        style={styles.floatingButton}
      >
        <Plus color={colors.financeBlue} size={size(30)} strokeWidth={2.5} />
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
  const [loading, setLoading] = useState<boolean>(true);

  const loadDealerOrders = async () => {
    try {
      setLoading(true);

      const response = await getDealerOrders();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load dealer orders. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDealerOrders();
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
        item.id === id ? { ...item, status, date: 'Delivered just now' } : item,
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
        item.id === id ? { ...item, status } : item,
      ),
    });
  };

  const handleCreateCustomerOrder = () => {
    Alert.alert('Create Customer Order', 'Customer order form opened.');
  };

  const handleCreateStockOrder = () => {
    Alert.alert('Create Stock Order', 'Stock order form opened.');
  };

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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MainTabs activeTab={activeTab} onChange={handleTabChange} />

        <Text style={styles.subTitle}>
          Manage customer sales and stock purchases
        </Text>

        <SearchBox value={search} onChangeText={setSearch} />

        <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />

        {activeTab === 'customer' ? (
          <>
            <SectionTitle title="Customer Orders" color={colors.financeBlue} />

            {filteredCustomerOrders.map(item => (
              <CustomerOrderCard
                key={item.id}
                item={item}
                onDeliver={id => updateCustomerStatus(id, 'Delivered')}
                onRepeat={() => handleCreateCustomerOrder()}
              />
            ))}

            <SectionTitle title="Orders To Stockist" color={colors.purple} />

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
            <SectionTitle title="Orders To Stockist" color={colors.purple} />

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

const PAGE_PADDING = size(28);

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(22),
    paddingBottom: size(160),
  },
  mainTabs: {
    height: size(54),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(6),
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: size(14),
  },
  mainTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMainTab: {
    backgroundColor: colors.primary,
  },
  mainTabText: {
    color: colors.slateText,
    fontSize: textSize(18),
    fontFamily: fonts.bold,
  },
  activeMainTabText: {
    color: colors.white,
  },
  subTitle: {
    color: colors.slateText,
    fontSize: textSize(16),
    fontFamily: fonts.semiBold,
    marginLeft: size(12),
    marginBottom: size(18),
  },
  searchBox: {
    height: size(62),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(8),
    paddingHorizontal: size(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(18),
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(17),
    fontFamily: fonts.medium,
    paddingVertical: 0,
    marginLeft: size(16),
  },
  filterRow: {
    paddingBottom: size(18),
  },
  filterChip: {
    minWidth: size(104),
    height: size(46),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(7),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(26),
    paddingHorizontal: size(14),
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.primaryText,
    fontSize: textSize(15),
    fontFamily: fonts.bold,
  },
  activeFilterText: {
    color: colors.white,
  },
  sectionTitleRow: {
    height: size(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    width: size(4),
    height: size(31),
    borderRadius: size(2),
    marginRight: size(16),
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: textSize(23),
    fontFamily: fonts.extraBold,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(20),
    paddingVertical: size(18),
    marginBottom: size(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIcon: {
    width: size(74),
    height: size(74),
    borderRadius: size(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(22),
  },
  blueSoftIcon: {
    backgroundColor: colors.dealerBlueSoft,
  },
  greenSoftIcon: {
    backgroundColor: colors.successLight,
  },
  purpleSoftIcon: {
    width: size(74),
    height: size(74),
    borderRadius: size(13),
    backgroundColor: colors.purpleSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(22),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: colors.primaryText,
    fontSize: textSize(24),
    fontFamily: fonts.extraBold,
  },
  orderName: {
    color: colors.primaryText,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
    marginTop: size(8),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(8),
  },
  locationText: {
    color: colors.slateText,
    fontSize: textSize(13),
    fontFamily: fonts.semiBold,
    marginLeft: size(8),
  },
  orderRight: {
    alignItems: 'flex-end',
    marginRight: size(14),
  },
  orderAmount: {
    color: colors.primaryText,
    fontSize: textSize(24),
    fontFamily: fonts.extraBold,
    marginTop: size(10),
  },
  orderDate: {
    color: colors.slateText,
    fontSize: textSize(13),
    fontFamily: fonts.semiBold,
    marginTop: size(8),
  },
  statusBadge: {
    minWidth: size(104),
    height: size(32),
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size(10),
  },
  deliveredBadge: {
    backgroundColor: colors.successLight,
  },
  processingBadge: {
    backgroundColor: colors.orangeSoft,
  },
  transitBadge: {
    backgroundColor: colors.blueLight,
  },
  pendingBadge: {
    backgroundColor: colors.orangeSoft,
  },
  cancelledBadge: {
    backgroundColor: colors.dangerLight,
  },
  statusText: {
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
  },
  deliveredText: {
    color: colors.success,
  },
  processingText: {
    color: colors.profileOrange,
  },
  transitText: {
    color: colors.financeBlue,
  },
  pendingText: {
    color: colors.profileOrange,
  },
  cancelledText: {
    color: colors.dangerDark,
  },
  metricsRow: {
    height: size(72),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(18),
  },
  metricBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    color: colors.primaryText,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
  },
  metricLabel: {
    color: colors.slateText,
    fontSize: textSize(12),
    fontFamily: fonts.semiBold,
    marginTop: size(4),
  },
  metricDivider: {
    width: 1,
    height: size(48),
    backgroundColor: colors.inputBorder,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: size(10),
  },
  primaryAction: {
    width: '31%',
    height: size(44),
    backgroundColor: colors.financeBlue,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryActionWide: {
    width: '49%',
    height: size(44),
    backgroundColor: colors.financeBlue,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryActionText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  outlineAction: {
    width: '31%',
    height: size(44),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionWide: {
    width: '49%',
    height: size(44),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionText: {
    color: colors.financeBlue,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  greenOutlineAction: {
    width: '49%',
    height: size(44),
    borderWidth: 1,
    borderColor: colors.greenBorder,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  greenOutlineText: {
    color: colors.success,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  orangeOutlineAction: {
    width: '49%',
    height: size(44),
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangeOutlineText: {
    color: colors.profileOrange,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  dangerOutlineAction: {
    width: '49%',
    height: size(44),
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dangerOutlineText: {
    color: colors.dangerDark,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(20),
    paddingVertical: size(18),
    marginBottom: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(18),
  },
  summaryTitle: {
    color: colors.primaryText,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
    marginLeft: size(12),
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
    width: size(55),
    height: size(55),
    borderRadius: size(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  summaryValue: {
    color: colors.primaryText,
    fontSize: textSize(23),
    fontFamily: fonts.extraBold,
  },
  summaryLabel: {
    color: colors.slateText,
    fontSize: textSize(12),
    fontFamily: fonts.semiBold,
    marginTop: size(4),
  },
  summaryDivider: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: size(50),
    backgroundColor: colors.inputBorder,
  },
  floatingActions: {
    position: 'absolute',
    right: size(28),
    bottom: size(86),
    flexDirection: 'row',
    gap: size(18),
  },
  floatingButton: {
    width: size(206),
    height: size(56),
    borderRadius: size(28),
    backgroundColor: colors.financeBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.18,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 10,
  },
  floatingText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
    lineHeight: size(18),
  },
});
