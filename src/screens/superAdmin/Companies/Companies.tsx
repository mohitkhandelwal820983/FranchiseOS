import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
  Building2,
  ChevronDown,
  Eye,
  Filter,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
} from 'lucide-react-native';

import { getCompanies } from '../../../api/superadmin/companies.api';
import {
  statusOptions,
  type CompaniesData,
  type Company,
  type CompanyStatus,
} from '../../../api/mock/superadmin/companies.mock';
import { showErrorToast } from '../../../utils/toast';
import { colors, fonts, size as rs, superAdminTextSize as fs } from '../../../theme';



type StatusFilter = 'All' | CompanyStatus;
type RangeFilter =
  | 'This Month'
  | 'Last Month'
  | 'Last 3 Months'
  | 'Custom Range';
type SortType = 'Name' | 'Date Added' | 'Revenue';

const Header = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(36)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Companies</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onAdd}>
        <Plus color={colors.white} size={rs(42)} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
};

const SearchBox = ({
  value,
  onChangeText,
  onFilterPress,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}) => {
  return (
    <View style={styles.searchBox}>
      <Search color={colors.superAdminCompanyText} size={rs(31)} strokeWidth={2.1} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search company name or owner"
        placeholderTextColor={colors.slateText}
        style={styles.searchInput}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onFilterPress}
        style={styles.filterBox}
      >
        <Filter color={colors.superAdminCompanyText} size={rs(32)} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
};

const StatusFilters = ({
  active,
  onChange,
}: {
  active: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}) => {
  const filters: StatusFilter[] = [
    'All',
    'Active',
    'Pending',
    'Inactive',
    'Suspended',
  ];

  return (
    <View style={styles.statusRow}>
      {filters.map(item => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onChange(item)}
            style={[styles.statusChip, isActive && styles.activeChip]}
          >
            <Text
              style={[styles.statusChipText, isActive && styles.activeChipText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RangeFilters = ({
  active,
  onChange,
}: {
  active: RangeFilter;
  onChange: (filter: RangeFilter) => void;
}) => {
  const filters: RangeFilter[] = [
    'This Month',
    'Last Month',
    'Last 3 Months',
    'Custom Range',
  ];

  return (
    <View style={styles.rangeRow}>
      {filters.map(item => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onChange(item)}
            style={[styles.rangeChip, isActive && styles.activeChip]}
          >
            <Text style={[styles.rangeText, isActive && styles.activeChipText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SortBar = ({
  sortBy,
  onSortChange,
}: {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
}) => {
  const sortItems: SortType[] = ['Name', 'Date Added', 'Revenue'];

  return (
    <View style={styles.sortRow}>
      <Text style={styles.sortLabel}>Sort by:</Text>

      {sortItems.map(item => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.85}
          onPress={() => onSortChange(item)}
          style={[
            styles.sortButton,
            sortBy === item && styles.selectedSortButton,
          ]}
        >
          <Text style={styles.sortButtonText}>{item}</Text>
          <ChevronDown color={colors.primaryText} size={rs(18)} strokeWidth={2.2} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const StatusBadge = ({ status }: { status: CompanyStatus }) => {
  const isActive = status === 'Active';
  const isPending = status === 'Pending';
  const isSuspended = status === 'Suspended';
  const isInactive = status === 'Inactive';

  return (
    <View
      style={[
        styles.badge,
        isActive && styles.activeBadge,
        isPending && styles.pendingBadge,
        isSuspended && styles.suspendedBadge,
        isInactive && styles.inactiveBadge,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isActive && styles.activeBadgeText,
          isPending && styles.pendingBadgeText,
          isSuspended && styles.suspendedBadgeText,
          isInactive && styles.inactiveBadgeText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const StatusDropdown = ({
  status,
  onChange,
}: {
  status: CompanyStatus;
  onChange: (status: CompanyStatus) => void;
}) => {
  const getNextStatus = () => {
    const currentIndex = statusOptions.indexOf(status);
    const nextIndex =
      currentIndex === statusOptions.length - 1 ? 0 : currentIndex + 1;

    onChange(statusOptions[nextIndex]);
  };

  const color =
    status === 'Active'
      ? colors.white
      : status === 'Pending'
      ? colors.profileOrange
      : status === 'Suspended'
      ? colors.dangerDark
      : colors.primaryText;

  const bg = status === 'Active' ? colors.primary : colors.white;

  const border =
    status === 'Active'
      ? colors.primary
      : status === 'Pending'
      ? colors.profileOrange
      : status === 'Suspended'
      ? colors.dangerBorder
      : colors.companyInactiveBorder;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={getNextStatus}
      style={[
        styles.dropdownButton,
        {
          backgroundColor: bg,
          borderColor: border,
        },
      ]}
    >
      <Text style={[styles.dropdownText, { color }]}>{status}</Text>
      <ChevronDown color={color} size={rs(18)} strokeWidth={2.2} />
    </TouchableOpacity>
  );
};

const CompanyCard = ({
  item,
  onStatusChange,
  onView,
  onEdit,
  onDelete,
}: {
  item: Company;
  onStatusChange: (id: string, status: CompanyStatus) => void;
  onView: (item: Company) => void;
  onEdit: (item: Company) => void;
  onDelete: (item: Company) => void;
}) => {
  const franchiseColor = item.franchises === 0 ? colors.primaryText : colors.financeBlue;

  const revenueColor =
    item.revenue === 0
      ? colors.primaryText
      : item.status === 'Suspended'
      ? colors.financeBlue
      : colors.success;

  return (
    <View style={styles.companyCard}>
      <View style={styles.companyTopRow}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        <View style={styles.companyInfo}>
          <Text numberOfLines={1} style={styles.companyName}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.ownerText}>Owner: {item.owner}</Text>
        </View>

        <View style={styles.rightInfo}>
          <StatusBadge status={item.status} />
          <Text numberOfLines={1} style={styles.cityText}>{item.city}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={[styles.metricText, { color: franchiseColor }]}>
            {item.franchises} Franchises
          </Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBox}>
          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={[styles.metricText, { color: revenueColor }]}>
            {item.revenueLabel}
          </Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBox}>
          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={styles.metricText}>Added: {item.addedLabel}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.changeStatusText}>Change Status:</Text>

        <StatusDropdown
          status={item.status}
          onChange={nextStatus => onStatusChange(item.id, nextStatus)}
        />

        <View style={styles.actionSpacer} />

        <TouchableOpacity activeOpacity={0.8} onPress={() => onView(item)}>
          <Eye color={colors.superAdminActionIcon} size={rs(30)} strokeWidth={2.2} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => onEdit(item)}>
          <Pencil color={colors.superAdminActionIcon} size={rs(30)} strokeWidth={2.2} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => onDelete(item)}>
          <Trash2 color={colors.companyDeleteRed} size={rs(30)} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CompaniesScreen = () => {
  const [data, setData] = useState<CompaniesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('This Month');
  const [sortBy, setSortBy] = useState<SortType>('Name');

  const loadCompanies = useCallback(async () => {
    try {
      setError('');

      const response = await getCompanies();

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load companies';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCompanies();
  }, [loadCompanies]);

  const filteredCompanies = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    let list = data.companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(query) ||
        company.owner.toLowerCase().includes(query) ||
        company.city.toLowerCase().includes(query) ||
        company.initials.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'All' || company.status === statusFilter;

      const matchesRange =
        rangeFilter === 'This Month' ||
        (rangeFilter === 'Last Month' && company.addedDaysAgo <= 60) ||
        (rangeFilter === 'Last 3 Months' && company.addedDaysAgo <= 120) ||
        rangeFilter === 'Custom Range';

      return matchesSearch && matchesStatus && matchesRange;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'Name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'Date Added') {
        return a.addedDaysAgo - b.addedDaysAgo;
      }

      return b.revenue - a.revenue;
    });

    return list;
  }, [data, search, statusFilter, rangeFilter, sortBy]);

  const updateStatus = (id: string, status: CompanyStatus) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      companies: data.companies.map(company =>
        company.id === id ? { ...company, status } : company,
      ),
    });
  };

  const deleteCompany = (company: Company) => {
    Alert.alert('Delete Company', `Delete ${company.name}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (!data) {
            return;
          }

          setData({
            ...data,
            companies: data.companies.filter(item => item.id !== company.id),
          });
        },
      },
    ]);
  };

  const handleRetry = () => {
    setLoading(true);
    loadCompanies();
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
            fontSize: rs(18),
            fontFamily: fonts.bold,
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
            backgroundColor: colors.primary,
            paddingHorizontal: rs(28),
            paddingVertical: rs(14),
            borderRadius: rs(8),
          }}
        >
          <Text style={{ color: colors.white, fontFamily: fonts.extraBold }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <Header
        onAdd={() => Alert.alert('Add Company', 'Add company screen opened.')}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchBox
          value={search}
          onChangeText={setSearch}
          onFilterPress={() => Alert.alert('Filter', 'Advanced filter opened.')}
        />

        <StatusFilters active={statusFilter} onChange={setStatusFilter} />

        <RangeFilters active={rangeFilter} onChange={setRangeFilter} />

        <SortBar sortBy={sortBy} onSortChange={setSortBy} />

        <View style={styles.showingRow}>
          <Text style={styles.showingText}>
            Showing {filteredCompanies.length} Companies
          </Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.filterTextButton}>
            <Text style={styles.filterText}>Filter</Text>
            <Settings color={colors.financeBlue} size={rs(27)} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {filteredCompanies.map(item => (
          <CompanyCard
            key={item.id}
            item={item}
            onStatusChange={updateStatus}
            onView={company => Alert.alert('View Company', company.name)}
            onEdit={company => Alert.alert('Edit Company', company.name)}
            onDelete={deleteCompany}
          />
        ))}

        {filteredCompanies.length === 0 && (
          <View style={styles.emptyBox}>
            <Building2 color={colors.slateText} size={rs(40)} />
            <Text style={styles.emptyText}>No companies found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompaniesScreen;

const PAGE_PADDING = rs(28);

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
    height: rs(96),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(30),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(30),
    paddingBottom: rs(120),
  },
  searchBox: {
    height: rs(78),
    borderWidth: 1,
    borderColor: colors.superAdminBorder,
    borderRadius: rs(8),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rs(28),
    marginBottom: rs(24),
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: fs(20),
    fontFamily: fonts.medium,
    marginLeft: rs(24),
    paddingVertical: 0,
  },
  filterBox: {
    width: rs(90),
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: colors.superAdminBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(22),
  },
  statusChip: {
    height: rs(58),
    minWidth: rs(128),
    borderWidth: 1,
    borderColor: colors.superAdminTabBorder,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(18),
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusChipText: {
    color: colors.primaryText,
    fontSize: fs(18),
    fontFamily: fonts.bold,
  },
  activeChipText: {
    color: colors.white,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(30),
  },
  rangeChip: {
    height: rs(58),
    minWidth: rs(170),
    borderWidth: 1,
    borderColor: colors.superAdminTabBorder,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(20),
  },
  rangeText: {
    color: colors.primaryText,
    fontSize: fs(18),
    fontFamily: fonts.bold,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(30),
  },
  sortLabel: {
    color: colors.slateText,
    fontSize: fs(21),
    fontFamily: fonts.semiBold,
    marginRight: rs(42),
  },
  sortButton: {
    height: rs(54),
    minWidth: rs(184),
    borderWidth: 1,
    borderColor: colors.superAdminBorder,
    borderRadius: rs(7),
    backgroundColor: colors.white,
    paddingHorizontal: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: rs(20),
  },
  selectedSortButton: {
    borderColor: colors.superAdminTabBorder,
  },
  sortButtonText: {
    color: colors.primaryText,
    fontSize: fs(18),
    fontFamily: fonts.bold,
  },
  showingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(28),
  },
  showingText: {
    flex: 1,
    color: colors.slateText,
    fontSize: fs(21),
    fontFamily: fonts.semiBold,
  },
  filterTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: colors.financeBlue,
    fontSize: fs(22),
    fontFamily: fonts.bold,
    marginRight: rs(12),
  },
  companyCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingTop: rs(24),
    paddingBottom: rs(18),
    marginBottom: rs(20),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: rs(14),
    shadowOffset: {
      width: 0,
      height: rs(5),
    },
    elevation: 3,
  },
  companyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: rs(96),
    height: rs(96),
    borderRadius: rs(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(28),
  },
  avatarText: {
    color: colors.white,
    fontSize: fs(34),
    fontFamily: fonts.extraBold,
  },
  companyInfo: {
    flex: 1,
    minWidth: 0,
  },
  companyName: {
    color: colors.companyTitleText,
    fontSize: fs(25),
    fontFamily: fonts.extraBold,
    marginBottom: rs(14),
  },
  ownerText: {
    color: colors.slateText,
    fontSize: fs(18),
    fontFamily: fonts.semiBold,
  },
  rightInfo: {
    alignItems: 'flex-end',
    marginLeft: rs(12),
  },
  cityText: {
    color: colors.superAdminCompanyText,
    fontSize: fs(18),
    fontFamily: fonts.semiBold,
    marginTop: rs(18),
  },
  badge: {
    minWidth: rs(106),
    height: rs(40),
    borderRadius: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(14),
    borderWidth: 1,
  },
  activeBadge: {
    backgroundColor: colors.successLight,
    borderColor: colors.successBorder,
  },
  pendingBadge: {
    backgroundColor: colors.orangeSoft,
    borderColor: colors.orangeBorder,
  },
  suspendedBadge: {
    backgroundColor: colors.dangerLight,
    borderColor: colors.dangerBorder,
  },
  inactiveBadge: {
    backgroundColor: colors.companyInactiveBg,
    borderColor: colors.companyInactiveBorderLight,
  },
  badgeText: {
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
  },
  activeBadgeText: {
    color: colors.success,
  },
  pendingBadgeText: {
    color: colors.profileOrange,
  },
  suspendedBadgeText: {
    color: colors.dangerDark,
  },
  inactiveBadgeText: {
    color: colors.companyInactiveText,
  },
  metricsRow: {
    height: rs(74),
    borderBottomWidth: 1,
    borderBottomColor: colors.companyMetricDivider,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(10),
  },
  metricBox: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
  },
  metricText: {
    color: colors.slateText,
    fontSize: fs(18),
    fontFamily: fonts.bold,
  },
  metricDivider: {
    width: 1,
    height: rs(44),
    backgroundColor: colors.superAdminBorder,
  },
  bottomRow: {
    height: rs(58),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rs(14),
  },
  changeStatusText: {
    color: colors.superAdminCompanyText,
    fontSize: fs(16),
    fontFamily: fonts.semiBold,
    marginRight: rs(22),
  },
  dropdownButton: {
    minWidth: rs(126),
    height: rs(44),
    borderWidth: 1,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(12),
  },
  dropdownText: {
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
    marginRight: rs(10),
  },
  actionSpacer: {
    flex: 1,
  },
  emptyBox: {
    height: rs(140),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.slateText,
    fontSize: fs(17),
    fontFamily: fonts.bold,
    marginTop: rs(12),
  },
});
