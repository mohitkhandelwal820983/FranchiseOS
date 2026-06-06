import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import {colors, fonts, networkSize as size, networkTextSize as textSize} from '../../theme';
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


const Header = ({ count }: { count: string }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={size(40)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>My Network</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.bellWrap}>
        <Bell color={colors.white} size={size(34)} strokeWidth={2.3} />
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
        <Search color={colors.slateText} size={size(34)} strokeWidth={2.2} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Search franchise, city, PIN code"
          placeholderTextColor={colors.searchPlaceholder}
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}>
        <Filter color={colors.filterIcon} size={size(35)} strokeWidth={2.2} />
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
                <ChevronDown color={colors.white} size={size(22)} strokeWidth={2.4} />
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
            <MapPin color={colors.iconMuted} size={size(20)} strokeWidth={2.1} />
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
              isRisk && { backgroundColor: colors.dangerDark },
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
          <MapPin color={colors.iconMuted} size={size(18)} strokeWidth={2.1} />
          <Text style={styles.dealerCity}>{item.city}</Text>
        </View>
      </View>

      <Text style={styles.dealerRevenue}>{item.revenueLabel}</Text>

      <View style={styles.dealerStatusBadge}>
        <Text style={styles.dealerStatusText}>{item.status}</Text>
      </View>

      <ChevronRight color={colors.primaryText} size={size(28)} strokeWidth={2.4} />
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
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Text
          style={{
            color: colors.primaryText,
            fontSize: textSize(18),
            fontFamily: fonts.bold,
            marginBottom: size(18),
            textAlign: 'center',
          }}
        >
          {error || 'Something went wrong'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleRetry}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: size(28),
            paddingVertical: size(14),
            borderRadius: size(8),
          }}
        >
          <Text
            style={{ color: colors.white, fontSize: textSize(14), fontFamily: fonts.extraBold }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

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
            <Download color={colors.financeBlue} size={size(26)} strokeWidth={2.3} />
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
            <ChevronRight color={colors.financeBlue} size={size(26)} strokeWidth={2.4} />
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

const PAGE_PADDING = size(30);

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
    height: size(102),
    backgroundColor: colors.primary,
    paddingHorizontal: size(34),
    paddingTop: size(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: textSize(38),
    fontFamily: fonts.extraBold,
    letterSpacing: 0.2,
  },
  bellWrap: {
    width: size(52),
    height: size(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    right: -size(5),
    top: -size(4),
    width: size(32),
    height: size(32),
    borderRadius: size(16),
    backgroundColor: colors.notificationRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: colors.white,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(30),
    paddingBottom: size(140),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(44),
  },
  searchBox: {
    flex: 1,
    height: size(78),
    borderWidth: 1,
    borderColor: colors.networkInputBorder,
    backgroundColor: colors.white,
    borderRadius: size(10),
    paddingHorizontal: size(26),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: size(24),
    color: colors.inputText,
    fontSize: textSize(22),
    fontFamily: fonts.medium,
    paddingVertical: 0,
  },
  filterButton: {
    marginLeft: size(16),
    width: size(78),
    height: size(78),
    borderWidth: 1,
    borderColor: colors.networkInputBorder,
    backgroundColor: colors.white,
    borderRadius: size(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    paddingRight: size(10),
    paddingBottom: size(36),
  },
  filterChip: {
    height: size(58),
    minWidth: size(104),
    paddingHorizontal: size(24),
    borderWidth: 1,
    borderColor: colors.networkInputBorder,
    borderRadius: size(31),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.primaryText,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  activeFilterText: {
    color: colors.white,
  },
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(38),
  },
  sortLabel: {
    color: colors.slateText,
    fontSize: textSize(20),
    fontFamily: fonts.semiBold,
    marginRight: size(42),
  },
  sortButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    height: size(54),
    minWidth: size(98),
    paddingHorizontal: size(26),
    borderWidth: 1,
    borderColor: colors.networkInputBorder,
    borderRadius: size(9),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(18),
    flexDirection: 'row',
  },
  activeSortButton: {
    minWidth: size(150),
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    color: colors.primaryText,
    fontSize: textSize(18),
    fontFamily: fonts.bold,
  },
  activeSortButtonText: {
    color: colors.white,
    marginRight: size(12),
  },
  showingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(28),
  },
  showingText: {
    color: colors.slateText,
    fontSize: textSize(20),
    fontFamily: fonts.bold,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportText: {
    color: colors.financeBlue,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
    marginRight: size(12),
  },
  stockistCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.networkCardBorder,
    borderRadius: size(12),
    paddingHorizontal: size(26),
    paddingVertical: size(32),
    marginBottom: size(20),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(14),
    shadowOffset: { width: 0, height: size(6) },
    elevation: 3,
  },
  stockistTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: size(104),
    height: size(104),
    borderRadius: size(52),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(28),
  },
  avatarText: {
    color: colors.white,
    fontSize: textSize(46),
    fontFamily: fonts.extraBold,
  },
  stockistMainInfo: {
    flex: 1,
    paddingTop: size(2),
  },
  stockistName: {
    color: colors.networkTitle,
    fontSize: textSize(30),
    fontFamily: fonts.extraBold,
    marginBottom: size(18),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(26),
  },
  locationText: {
    marginLeft: size(12),
    color: colors.slateText,
    fontSize: textSize(18),
    fontFamily: fonts.semiBold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueMeta: {
    color: colors.financeBlue,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  greenMeta: {
    color: colors.successDark2,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  redMeta: {
    color: colors.dangerDark,
  },
  metaDivider: {
    width: 1,
    height: size(20),
    backgroundColor: colors.inputBorder,
    marginHorizontal: size(20),
  },
  stockistRightInfo: {
    width: size(250),
    alignItems: 'flex-end',
    paddingTop: size(2),
  },
  statusBadge: {
    minWidth: size(92),
    height: size(38),
    borderRadius: size(7),
    borderWidth: 1,
    paddingHorizontal: size(16),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: size(22),
  },
  statusText: {
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  riskDot: {
    width: size(18),
    height: size(18),
    borderRadius: size(9),
    backgroundColor: colors.dangerDeep,
    marginLeft: size(12),
  },
  scoreBadge: {
    minWidth: size(108),
    height: size(42),
    borderRadius: size(7),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size(14),
    marginBottom: size(24),
  },
  scoreText: {
    color: colors.white,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(22),
  },
  paymentLabel: {
    color: colors.slateText,
    fontSize: textSize(18),
    fontFamily: fonts.bold,
  },
  paymentValue: {
    color: colors.successDark2,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
  },
  checkCircle: {
    width: size(24),
    height: size(24),
    borderRadius: size(12),
    backgroundColor: colors.checkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: size(12),
  },
  checkText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  lastActiveText: {
    color: colors.slateText,
    fontSize: textSize(18),
    fontFamily: fonts.semiBold,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(34),
  },
  progressTrack: {
    height: size(12),
    backgroundColor: colors.progressTrack2,
    borderRadius: size(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: size(12),
    borderRadius: size(10),
  },
  progressValue: {
    color: colors.slateText,
    fontSize: textSize(18),
    fontFamily: fonts.bold,
    marginLeft: size(30),
  },
  riskNote: {
    color: colors.dangerDark,
    fontSize: textSize(18),
    fontFamily: fonts.bold,
    marginTop: size(22),
  },
  directHeader: {
    marginTop: size(8),
    marginBottom: size(12),
    paddingHorizontal: size(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  directTitle: {
    color: colors.networkTitle,
    fontSize: textSize(22),
    fontFamily: fonts.extraBold,
  },
  directSubtitle: {
    color: colors.slateText,
    fontSize: textSize(20),
    fontFamily: fonts.semiBold,
    marginTop: size(4),
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.financeBlue,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
    marginRight: size(12),
  },
  directDealersCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.networkCardBorder,
    borderRadius: size(12),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(14),
    shadowOffset: { width: 0, height: size(6) },
    elevation: 3,
  },
  dealerRow: {
    height: size(76),
    paddingHorizontal: size(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerAvatar: {
    width: size(55),
    height: size(55),
    borderRadius: size(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(20),
  },
  dealerAvatarText: {
    color: colors.white,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: colors.networkTitle,
    fontSize: textSize(20),
    fontFamily: fonts.extraBold,
  },
  dealerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(8),
  },
  dealerCity: {
    color: colors.slateText,
    fontSize: textSize(16),
    fontFamily: fonts.semiBold,
    marginLeft: size(8),
  },
  dealerRevenue: {
    color: colors.successDark2,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
    marginRight: size(42),
  },
  dealerStatusBadge: {
    width: size(76),
    height: size(34),
    borderRadius: size(7),
    borderWidth: 1,
    borderColor: colors.successBorder,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(22),
  },
  dealerStatusText: {
    color: colors.successDark2,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
  },
  dealerDivider: {
    height: 1,
    backgroundColor: colors.networkCardBorder,
    marginLeft: size(92),
  },
  bottomNavigation: {
    position: 'absolute',
    left: size(26),
    right: size(26),
    bottom: 0,
    height: size(112),
    backgroundColor: colors.white,
    borderTopLeftRadius: size(22),
    borderTopRightRadius: size(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: size(12),
    paddingBottom: size(12),
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: size(16),
    shadowOffset: { width: 0, height: -size(6) },
    elevation: 14,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabText: {
    fontSize: textSize(16),
    fontFamily: fonts.bold,
    marginTop: size(8),
  },
});
