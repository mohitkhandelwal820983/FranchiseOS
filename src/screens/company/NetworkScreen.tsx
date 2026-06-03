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
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  Filter,
  MapPin,
  Menu,
  Search,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  CompanyNetworkData,
  DirectDealer,
  FilterChip,
  filterChips,
  SortOption,
  Stockist,
} from '../../api/mock/company/companyNetwork.mock';
import { getCompanyNetwork } from '../../api/company/companyNetwork.api';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DESIGN_WIDTH = 928;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = ({ count }: { count: string }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(40)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>My Network</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellWrap}>
        <Bell color="#FFFFFF" size={rs(34)} strokeWidth={2.3} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SearchAndFilter = ({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) => {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <Search color="#5D607E" size={rs(34)} strokeWidth={2.2} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Search franchise, city, PIN code"
          placeholderTextColor="#555B7C"
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}>
        <Filter color="#111C63" size={rs(35)} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
};

const FilterChips = ({
  activeFilter,
  onChange,
}: {
  activeFilter: FilterChip['value'];
  onChange: (value: FilterChip['value']) => void;
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsRow}
    >
      {filterChips.map(item => {
        const active = activeFilter === item.value;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => onChange(item.value)}
            style={[styles.filterChip, active && styles.activeFilterChip]}
          >
            <Text
              style={[styles.filterChipText, active && styles.activeFilterText]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const SortBy = ({
  activeSort,
  onChange,
}: {
  activeSort: SortOption;
  onChange: (value: SortOption) => void;
}) => {
  const options: { label: string; value: SortOption }[] = [
    { label: 'Revenue', value: 'revenue' },
    { label: 'Name', value: 'name' },
    { label: 'Score', value: 'score' },
    { label: 'Orders', value: 'orders' },
  ];

  return (
    <View style={styles.sortSection}>
      <Text style={styles.sortLabel}>Sort by:</Text>

      <View style={styles.sortButtons}>
        {options.map(item => {
          const active = activeSort === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.8}
              onPress={() => onChange(item.value)}
              style={[styles.sortButton, active && styles.activeSortButton]}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  active && styles.activeSortButtonText,
                ]}
              >
                {item.label}
              </Text>
              {item.value === 'revenue' && active && (
                <ChevronDown color="#FFFFFF" size={rs(22)} strokeWidth={2.4} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const ProgressBar = ({
  value,
  color,
  widthPercent,
}: {
  value: number;
  color: string;
  widthPercent?: number;
}) => {
  return (
    <View style={styles.progressRow}>
      <View
        style={[
          styles.progressTrack,
          widthPercent ? { width: `${widthPercent}%` } : null,
        ]}
      >
        <View
          style={[
            styles.progressFill,
            { width: `${value}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressValue}>{value}%</Text>
    </View>
  );
};

const StockistCard = ({
  item,
  onPress,
}: {
  item: Stockist;
  onPress: (item: Stockist) => void;
}) => {
  const isRisk = item.status === 'At Risk';

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => onPress(item)}
      style={styles.stockistCard}
    >
      <View style={styles.stockistTopRow}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        <View style={styles.stockistMainInfo}>
          <Text style={styles.stockistName}>{item.name}</Text>

          <View style={styles.locationRow}>
            <MapPin color="#6B6D8A" size={rs(20)} strokeWidth={2.1} />
            <Text style={styles.locationText}>
              {item.city} — {item.zone}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.blueMeta}>{item.dealers} Dealers</Text>
            <View style={styles.metaDivider} />
            <Text style={[styles.greenMeta, isRisk && styles.redMeta]}>
              {item.revenueLabel}
            </Text>
            <View style={styles.metaDivider} />
            <Text style={[styles.blueMeta, isRisk && styles.redMeta]}>
              {item.targetLabel}
            </Text>
          </View>
        </View>

        <View style={styles.stockistRightInfo}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: item.statusBg,
                borderColor: item.statusBorder,
              },
            ]}
          >
            <Text style={[styles.statusText, { color: item.statusColor }]}>
              {item.status}
            </Text>
            {isRisk && <View style={styles.riskDot} />}
          </View>

          <View
            style={[
              styles.scoreBadge,
              isRisk && { backgroundColor: '#D90014' },
            ]}
          >
            <Text style={styles.scoreText}>{item.score}/100</Text>
          </View>

          {!isRisk && item.id === 'stockist-a' && (
            <>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment:</Text>
                <Text style={styles.paymentValue}> {item.payment}</Text>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              </View>

              <Text style={styles.lastActiveText}>
                Last active: {item.lastActive}
              </Text>
            </>
          )}
        </View>
      </View>

      <ProgressBar
        value={item.target}
        color={item.progressColor}
        widthPercent={58}
      />

      {!!item.riskNote && <Text style={styles.riskNote}>{item.riskNote}</Text>}
    </TouchableOpacity>
  );
};

const DirectDealerRow = ({
  item,
  onPress,
}: {
  item: DirectDealer;
  onPress: (item: DirectDealer) => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => onPress(item)}
      style={styles.dealerRow}
    >
      <View style={[styles.dealerAvatar, { backgroundColor: item.color }]}>
        <Text style={styles.dealerAvatarText}>{item.initials}</Text>
      </View>

      <View style={styles.dealerInfo}>
        <Text style={styles.dealerName}>{item.name}</Text>
        <View style={styles.dealerLocationRow}>
          <MapPin color="#6B6D8A" size={rs(18)} strokeWidth={2.1} />
          <Text style={styles.dealerCity}>{item.city}</Text>
        </View>
      </View>

      <Text style={styles.dealerRevenue}>{item.revenueLabel}</Text>

      <View style={styles.dealerStatusBadge}>
        <Text style={styles.dealerStatusText}>{item.status}</Text>
      </View>

      <ChevronRight color="#061247" size={rs(28)} strokeWidth={2.4} />
    </TouchableOpacity>
  );
};

const NetworkScreen = () => {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<CompanyNetworkData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterChip['value']>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('revenue');

  const loadNetwork = useCallback(async () => {
    try {
      setError('');

      const response = await getCompanyNetwork();

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load company network';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNetwork();
  }, [loadNetwork]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNetwork();
  }, [loadNetwork]);

  const filteredStockists = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    let list = data.stockists.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.zone.toLowerCase().includes(query) ||
        item.pinCode.includes(query);

      if (!matchesSearch) {
        return false;
      }

      switch (activeFilter) {
        case 'all':
        case 'stockists':
          return true;

        case 'active':
          return item.status === 'Active';

        case 'inactive':
          return item.status === 'Inactive';

        case 'overdue':
          return item.status === 'Overdue';

        case 'risk':
          return item.status === 'At Risk';

        case 'dealers':
          return false;

        default:
          return true;
      }
    });

    list = [...list].sort((a, b) => {
      if (activeSort === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (activeSort === 'score') {
        return b.score - a.score;
      }

      if (activeSort === 'orders') {
        return b.orders - a.orders;
      }

      return b.revenue - a.revenue;
    });

    return list;
  }, [data, search, activeFilter, activeSort]);

  const filteredDealers = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    let list = data.dealers.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.pinCode.includes(query);

      if (!matchesSearch) {
        return false;
      }

      switch (activeFilter) {
        case 'all':
        case 'dealers':
          return true;

        case 'active':
          return item.status === 'Active';

        case 'inactive':
          return item.status === 'Inactive';

        case 'overdue':
          return item.status === 'Overdue';

        case 'risk':
          return item.status === 'At Risk';

        case 'stockists':
          return false;

        default:
          return true;
      }
    });

    list = [...list].sort((a, b) => {
      if (activeSort === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (activeSort === 'score') {
        return b.score - a.score;
      }

      if (activeSort === 'orders') {
        return b.orders - a.orders;
      }

      return b.revenue - a.revenue;
    });

    return list;
  }, [data, search, activeFilter, activeSort]);

  const openDetail = (item: Stockist | DirectDealer) => {
    navigation.navigate('NetworkDetail', {
      id: item.id,
      type: item.type,
    });
  };

  const handleRetry = () => {
    setLoading(true);
    loadNetwork();
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

      <Header count={data.notificationCount} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchAndFilter search={search} onSearchChange={setSearch} />

        <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />

        <SortBy activeSort={activeSort} onChange={setActiveSort} />

        <View style={styles.showingRow}>
          <Text style={styles.showingText}>
            Showing {filteredStockists.length} Stockists
          </Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.exportButton}>
            <Text style={styles.exportText}>Export</Text>
            <Download color="#173CFF" size={rs(26)} strokeWidth={2.3} />
          </TouchableOpacity>
        </View>

        {filteredStockists.map(item => (
          <StockistCard key={item.id} item={item} onPress={openDetail} />
        ))}

        <View style={styles.directHeader}>
          <View>
            <Text style={styles.directTitle}>Direct Dealers</Text>
            <Text style={styles.directSubtitle}>
              {filteredDealers.length} Dealers
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight color="#173CFF" size={rs(26)} strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

        <View style={styles.directDealersCard}>
          {filteredDealers.map((item, index) => (
            <View key={item.id}>
              <DirectDealerRow item={item} onPress={openDetail} />
              {index !== filteredDealers.length - 1 && (
                <View style={styles.dealerDivider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NetworkScreen;

const PAGE_PADDING = rs(30);

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
    height: rs(102),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(34),
    paddingTop: rs(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(38),
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bellWrap: {
    width: rs(52),
    height: rs(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    right: -rs(5),
    top: -rs(4),
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    backgroundColor: '#E60012',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(30),
    paddingBottom: rs(140),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(44),
  },
  searchBox: {
    flex: 1,
    height: rs(78),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: rs(24),
    color: '#111737',
    fontSize: fs(22),
    fontWeight: '500',
    paddingVertical: 0,
  },
  filterButton: {
    marginLeft: rs(16),
    width: rs(78),
    height: rs(78),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    paddingRight: rs(10),
    paddingBottom: rs(36),
  },
  filterChip: {
    height: rs(58),
    minWidth: rs(104),
    paddingHorizontal: rs(24),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    borderRadius: rs(31),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  activeFilterChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  filterChipText: {
    color: '#061247',
    fontSize: fs(18),
    fontWeight: '800',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(38),
  },
  sortLabel: {
    color: '#5D607E',
    fontSize: fs(20),
    fontWeight: '600',
    marginRight: rs(42),
  },
  sortButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    height: rs(54),
    minWidth: rs(98),
    paddingHorizontal: rs(26),
    borderWidth: 1,
    borderColor: '#E0E3EE',
    borderRadius: rs(9),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
    flexDirection: 'row',
  },
  activeSortButton: {
    minWidth: rs(150),
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  sortButtonText: {
    color: '#061247',
    fontSize: fs(18),
    fontWeight: '700',
  },
  activeSortButtonText: {
    color: '#FFFFFF',
    marginRight: rs(12),
  },
  showingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(28),
  },
  showingText: {
    color: '#5D607E',
    fontSize: fs(20),
    fontWeight: '700',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportText: {
    color: '#173CFF',
    fontSize: fs(20),
    fontWeight: '800',
    marginRight: rs(12),
  },
  stockistCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAECF3',
    borderRadius: rs(12),
    paddingHorizontal: rs(26),
    paddingVertical: rs(32),
    marginBottom: rs(20),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(14),
    shadowOffset: { width: 0, height: rs(6) },
    elevation: 3,
  },
  stockistTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: rs(104),
    height: rs(104),
    borderRadius: rs(52),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(28),
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: fs(46),
    fontWeight: '800',
  },
  stockistMainInfo: {
    flex: 1,
    paddingTop: rs(2),
  },
  stockistName: {
    color: '#071033',
    fontSize: fs(30),
    fontWeight: '900',
    marginBottom: rs(18),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(26),
  },
  locationText: {
    marginLeft: rs(12),
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueMeta: {
    color: '#173CFF',
    fontSize: fs(18),
    fontWeight: '800',
  },
  greenMeta: {
    color: '#087A22',
    fontSize: fs(18),
    fontWeight: '800',
  },
  redMeta: {
    color: '#D90014',
  },
  metaDivider: {
    width: 1,
    height: rs(20),
    backgroundColor: '#D9DCE8',
    marginHorizontal: rs(20),
  },
  stockistRightInfo: {
    width: rs(250),
    alignItems: 'flex-end',
    paddingTop: rs(2),
  },
  statusBadge: {
    minWidth: rs(92),
    height: rs(38),
    borderRadius: rs(7),
    borderWidth: 1,
    paddingHorizontal: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: rs(22),
  },
  statusText: {
    fontSize: fs(18),
    fontWeight: '800',
  },
  riskDot: {
    width: rs(18),
    height: rs(18),
    borderRadius: rs(9),
    backgroundColor: '#E00014',
    marginLeft: rs(12),
  },
  scoreBadge: {
    minWidth: rs(108),
    height: rs(42),
    borderRadius: rs(7),
    backgroundColor: '#061B66',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(14),
    marginBottom: rs(24),
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: fs(20),
    fontWeight: '800',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(22),
  },
  paymentLabel: {
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '700',
  },
  paymentValue: {
    color: '#087A22',
    fontSize: fs(20),
    fontWeight: '800',
  },
  checkCircle: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: '#0A8A26',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: rs(12),
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '900',
  },
  lastActiveText: {
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(34),
  },
  progressTrack: {
    height: rs(12),
    backgroundColor: '#E3E4EA',
    borderRadius: rs(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(12),
    borderRadius: rs(10),
  },
  progressValue: {
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '700',
    marginLeft: rs(30),
  },
  riskNote: {
    color: '#D90014',
    fontSize: fs(18),
    fontWeight: '700',
    marginTop: rs(22),
  },
  directHeader: {
    marginTop: rs(8),
    marginBottom: rs(12),
    paddingHorizontal: rs(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  directTitle: {
    color: '#071033',
    fontSize: fs(22),
    fontWeight: '900',
  },
  directSubtitle: {
    color: '#5D607E',
    fontSize: fs(20),
    fontWeight: '600',
    marginTop: rs(4),
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: fs(20),
    fontWeight: '800',
    marginRight: rs(12),
  },
  directDealersCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAECF3',
    borderRadius: rs(12),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(14),
    shadowOffset: { width: 0, height: rs(6) },
    elevation: 3,
  },
  dealerRow: {
    height: rs(76),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerAvatar: {
    width: rs(55),
    height: rs(55),
    borderRadius: rs(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
  },
  dealerAvatarText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: '900',
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: '#071033',
    fontSize: fs(20),
    fontWeight: '900',
  },
  dealerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(8),
  },
  dealerCity: {
    color: '#5D607E',
    fontSize: fs(16),
    fontWeight: '600',
    marginLeft: rs(8),
  },
  dealerRevenue: {
    color: '#087A22',
    fontSize: fs(18),
    fontWeight: '800',
    marginRight: rs(42),
  },
  dealerStatusBadge: {
    width: rs(76),
    height: rs(34),
    borderRadius: rs(7),
    borderWidth: 1,
    borderColor: '#BEE7C5',
    backgroundColor: '#EAF8EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  dealerStatusText: {
    color: '#087A22',
    fontSize: fs(16),
    fontWeight: '800',
  },
  dealerDivider: {
    height: 1,
    backgroundColor: '#EAECF3',
    marginLeft: rs(92),
  },
  bottomNavigation: {
    position: 'absolute',
    left: rs(26),
    right: rs(26),
    bottom: 0,
    height: rs(112),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: rs(22),
    borderTopRightRadius: rs(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: rs(12),
    paddingBottom: rs(12),
    shadowColor: '#000000',
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
    fontSize: fs(16),
    fontWeight: '700',
    marginTop: rs(8),
  },
});
