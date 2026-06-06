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
  Bell,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Download,
  Eye,
  IndianRupee,
  MapPin,
  Menu,
  MoreVertical,
  Plus,
  Search,
  ShieldCheck,
  Trophy,
  User,
  Users,
  WalletCards,
  X,
} from 'lucide-react-native';
import {
  Dealer,
  DealerFilter,
  DealerStatus,
  OnboardingRequest,
  RankingItem,
  StockistDealerData,
} from '../../api/mock/stockist/stockistDealer.mock';
import { getStockistDealer } from '../../api/stockist/stockistDealer.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size as rs, textSize as fs } from '../../theme';

const Header = ({ onAddPress }: { onAddPress: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dealers</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onAddPress}>
        <Plus color={colors.white} size={rs(38)} strokeWidth={2.4} />
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
      <Search color={colors.slateText} size={rs(29)} strokeWidth={2.1} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search dealer name or region"
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
  activeFilter: DealerFilter;
  onChange: (filter: DealerFilter) => void;
}) => {
  const filters: DealerFilter[] = [
    'All',
    'Active',
    'Pending',
    'Payment Due',
    'Top Performers',
  ];

  return (
    <View style={styles.filterRow}>
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
    </View>
  );
};

const SummaryCard = ({ data }: { data: StockistDealerData['summary'] }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: colors.success }]}>
          <Users color={colors.white} size={rs(30)} strokeWidth={2.3} />
        </View>

        <View style={styles.summaryTextBox}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.78}
            style={[styles.summaryValue, { color: colors.success }]}
          >
            {data.activeDealers}
          </Text>
          <Text numberOfLines={1} style={styles.summaryLabel}>
            Active Dealers
          </Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: colors.financeBlue }]}>
          <IndianRupee color={colors.white} size={rs(30)} strokeWidth={2.3} />
        </View>

        <View style={styles.summaryTextBox}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            style={[styles.summaryValue, { color: colors.financeBlue }]}
          >
            {data.monthlyBusiness}
          </Text>
          <Text numberOfLines={1} style={styles.summaryLabel}>
            Monthly Business
          </Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: colors.profileOrange }]}>
          <WalletCards color={colors.white} size={rs(30)} strokeWidth={2.3} />
        </View>

        <View style={styles.summaryTextBox}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            style={[styles.summaryValue, { color: colors.profileOrange }]}
          >
            {data.paymentOverdue}
          </Text>
          <Text numberOfLines={1} style={styles.summaryLabel}>
            Payment Overdue
          </Text>
        </View>
      </View>
    </View>
  );
};

const DealerStatusBadge = ({ status }: { status: DealerStatus }) => {
  const isActive = status === 'Active';
  const isPaymentDue = status === 'Payment Due';
  const isTop = status === 'Top Performer';

  return (
    <View
      style={[
        styles.statusBadge,
        isActive && styles.activeBadge,
        isPaymentDue && styles.paymentDueBadge,
        isTop && styles.topBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isActive && styles.activeText,
          isPaymentDue && styles.paymentDueText,
          isTop && styles.topText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const DealerMetric = ({
  icon,
  value,
  label,
}: {
  icon: 'business' | 'score' | 'orders';
  value: string;
  label: string;
}) => {
  return (
    <View style={styles.metricBlock}>
      <View style={styles.metricIconSoft}>
        {icon === 'business' && (
          <Briefcase color={colors.success} size={rs(23)} strokeWidth={2.2} />
        )}
        {icon === 'score' && (
          <ShieldCheck color={colors.success} size={rs(23)} strokeWidth={2.2} />
        )}
        {icon === 'orders' && (
          <BookOpen color={colors.financeBlue} size={rs(23)} strokeWidth={2.2} />
        )}
      </View>

      <View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </View>
  );
};

const DealerCard = ({
  item,
  onSendReminder,
}: {
  item: Dealer;
  onSendReminder: (dealer: Dealer) => void;
}) => {
  const paymentDue = item.status === 'Payment Due';
  const topPerformer = item.status === 'Top Performer';

  return (
    <View style={styles.dealerCard}>
      <View style={styles.dealerTopRow}>
        <View
          style={[styles.dealerAvatar, { backgroundColor: item.avatarColor }]}
        >
          <Text style={styles.dealerAvatarText}>{item.initials}</Text>
        </View>

        <View style={styles.dealerInfo}>
          <Text style={styles.dealerName}>{item.name}</Text>

          <View style={styles.metaRow}>
            <User color={colors.slateText} size={rs(16)} />
            <Text style={styles.metaText}>Owner: {item.owner}</Text>
          </View>

          <View style={styles.metaRow}>
            <MapPin color={colors.slateText} size={rs(16)} />
            <Text style={styles.metaText}>
              {item.city}, {item.state}
            </Text>
          </View>
        </View>

        <DealerStatusBadge status={item.status} />

        <TouchableOpacity activeOpacity={0.8} style={styles.moreButton}>
          <MoreVertical color={colors.primaryText} size={rs(25)} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {paymentDue && (
        <TouchableOpacity activeOpacity={0.85} style={styles.outstandingBox}>
          <Text style={styles.outstandingLeft}>⚠ Outstanding Amount</Text>
          <View style={styles.outstandingRight}>
            <Text style={styles.outstandingAmount}>
              {item.outstandingAmount}
            </Text>
            <ChevronRight color={colors.profileOrange} size={rs(22)} />
          </View>
        </TouchableOpacity>
      )}

      {topPerformer && (
        <View style={styles.achievementRow}>
          <View style={styles.achievementBox}>
            <Trophy color={colors.financeBlue} size={rs(21)} strokeWidth={2.3} />
            <Text style={styles.achievementText}>
              <Text style={styles.achievementStrong}>Achievement:</Text>{' '}
              {item.achievement}
            </Text>
          </View>

          <View style={styles.incentiveBox}>
            <Text style={styles.incentiveIcon}>🎁</Text>
            <Text style={styles.incentiveText}>Incentive Eligible</Text>
          </View>
        </View>
      )}

      <View style={styles.metricsRow}>
        <DealerMetric
          icon="business"
          value={item.monthlyOrders}
          label="Monthly Orders"
        />

        <View style={styles.metricDivider} />

        <DealerMetric
          icon="score"
          value={item.paymentScore}
          label="Payment Score"
        />

        <View style={styles.metricDivider} />

        <DealerMetric
          icon="orders"
          value={item.completedOrders}
          label="Completed Orders"
        />
      </View>

      <View style={styles.dealerActions}>
        <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
          <Eye color={colors.financeBlue} size={rs(18)} strokeWidth={2.3} />
          <Text style={styles.outlineButtonText}>View</Text>
        </TouchableOpacity>

        {paymentDue ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onSendReminder(item)}
            style={styles.primaryButton}
          >
            <Bell color={colors.white} size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.primaryButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
            <Download color={colors.financeBlue} size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.outlineButtonText}>Collect</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
          <BookOpen color={colors.financeBlue} size={rs(18)} strokeWidth={2.3} />
          <Text style={styles.outlineButtonText}>Ledger</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OnboardingRequestsCard = ({
  requests,
  onApprove,
  onReject,
}: {
  requests: OnboardingRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Dealer Onboarding Requests</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color={colors.financeBlue} size={rs(20)} />
        </TouchableOpacity>
      </View>

      {requests.map(item => (
        <View key={item.id} style={styles.requestRow}>
          <View style={styles.requestAvatar}>
            <Text style={styles.requestAvatarText}>{item.initials}</Text>
          </View>

          <View style={styles.requestInfo}>
            <Text style={styles.requestName}>{item.name}</Text>
            <Text style={styles.requestMeta}>
              {item.city}, {item.state}
            </Text>
            <Text style={styles.requestMeta}>Applied on: {item.appliedOn}</Text>
          </View>

          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>{item.status}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onApprove(item.id)}
            style={styles.approveButton}
          >
            <CheckCircle2 color={colors.success} size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onReject(item.id)}
            style={styles.rejectButton}
          >
            <X color={colors.dangerDark} size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>

          <MoreVertical color={colors.primaryText} size={rs(24)} />
        </View>
      ))}
    </View>
  );
};

const RankingCard = ({ items }: { items: RankingItem[] }) => {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Dealer Performance Ranking</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View Full Report</Text>
          <ChevronRight color={colors.financeBlue} size={rs(20)} />
        </TouchableOpacity>
      </View>

      {items.map(item => {
        const medalColor =
          item.rank === 1
            ? colors.stockistGold
            : item.rank === 2
            ? colors.stockistSilver
            : item.rank === 3
            ? colors.stockistBronze
            : colors.stockistRankDefault;

        return (
          <View key={item.id} style={styles.rankRow}>
            <View style={[styles.rankCircle, { backgroundColor: medalColor }]}>
              <Text style={styles.rankText}>{item.rank}</Text>
            </View>

            <Text style={styles.rankName}>{item.name}</Text>

            <View style={styles.rankProgressTrack}>
              <View
                style={[
                  styles.rankProgressFill,
                  { width: `${item.progress}%` },
                ]}
              />
            </View>

            <Text style={styles.rankAmount}>{item.amount}</Text>

            <Text style={styles.rankArrow}>↑</Text>
          </View>
        );
      })}
    </View>
  );
};

const FloatingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.floatingButton}
      onPress={onPress}
    >
      <Plus color={colors.white} size={rs(38)} strokeWidth={2.4} />
    </TouchableOpacity>
  );
};

const StockistDealerScreen = () => {
  const [data, setData] = useState<StockistDealerData | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<DealerFilter>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const loadDealerData = async () => {
    try {
      setLoading(true);

      const response = await getStockistDealer();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load stockist dealer data. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDealerData();
  }, []);

  const filteredDealers = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.dealers.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.initials.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Active' && item.status === 'Active') ||
        (activeFilter === 'Payment Due' && item.status === 'Payment Due') ||
        (activeFilter === 'Top Performers' &&
          item.status === 'Top Performer') ||
        activeFilter === 'Pending';

      return matchesSearch && matchesFilter;
    });
  }, [data, search, activeFilter]);

  const visibleRequests = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.onboardingRequests;
  }, [data]);

  const handleAddDealer = () => {
    Alert.alert('Add Dealer', 'Add dealer flow opened.');
  };

  const handleSendReminder = (dealer: Dealer) => {
    Alert.alert('Reminder Sent', `Payment reminder sent to ${dealer.name}.`);
  };

  const handleApproveRequest = (id: string) => {
    if (!data) {
      return;
    }

    const request = data.onboardingRequests.find(item => item.id === id);

    setData({
      ...data,
      onboardingRequests: data.onboardingRequests.filter(
        item => item.id !== id,
      ),
      dealers: request
        ? [
            ...data.dealers,
            {
              id: `dealer-${Date.now()}`,
              initials: request.initials,
              name: request.name,
              owner: 'New Dealer Owner',
              city: request.city,
              state: request.state,
              status: 'Active',
              avatarColor: colors.financeBlue,
              monthlyOrders: '₹0',
              paymentScore: '100%',
              completedOrders: '0',
            },
          ]
        : data.dealers,
    });

    Alert.alert('Approved', 'Dealer request approved successfully.');
  };

  const handleRejectRequest = (id: string) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      onboardingRequests: data.onboardingRequests.filter(
        item => item.id !== id,
      ),
    });

    Alert.alert('Rejected', 'Dealer request rejected.');
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

      <Header onAddPress={handleAddDealer} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBox value={search} onChangeText={setSearch} />

        <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />

        <SummaryCard data={data.summary} />

        {filteredDealers.map(item => (
          <DealerCard
            key={item.id}
            item={item}
            onSendReminder={handleSendReminder}
          />
        ))}

        {visibleRequests.length > 0 && (
          <OnboardingRequestsCard
            requests={visibleRequests}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        )}

        <RankingCard items={data.rankings} />
      </ScrollView>

      <FloatingButton onPress={handleAddDealer} />
    </SafeAreaView>
  );
};

export default StockistDealerScreen;

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
    height: rs(78),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(28),
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
    paddingTop: rs(22),
    paddingBottom: rs(120),
  },
  searchBox: {
    height: rs(62),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: rs(8),
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: fs(18),
    fontFamily: fonts.medium,
    paddingVertical: 0,
    marginLeft: rs(16),
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(22),
  },
  filterChip: {
    height: rs(46),
    minWidth: rs(92),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
    borderRadius: rs(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(14),
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  activeFilterText: {
    color: colors.white,
  },
  summaryCard: {
    minHeight: rs(105),
    backgroundColor: colors.white,
    borderRadius: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  summaryTextBox: {
    flex: 1,
    minWidth: 0,
  },
  summaryValue: {
    fontSize: fs(24),
    fontFamily: fonts.extraBold,
  },
  summaryLabel: {
    color: colors.slateText,
    fontSize: fs(11),
    fontFamily: fonts.bold,
    marginTop: rs(6),
  },
  summaryDivider: {
    width: 1,
    height: rs(56),
    backgroundColor: colors.inputBorder,
    marginHorizontal: rs(10),
  },
  dealerCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(20),
    marginBottom: rs(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  dealerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerAvatar: {
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(24),
  },
  dealerAvatarText: {
    color: colors.white,
    fontSize: fs(26),
    fontFamily: fonts.extraBold,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: colors.text,
    fontSize: fs(23),
    fontFamily: fonts.extraBold,
    marginBottom: rs(8),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(5),
  },
  metaText: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.semiBold,
    marginLeft: rs(8),
  },
  moreButton: {
    marginLeft: rs(14),
  },
  statusBadge: {
    minWidth: rs(88),
    height: rs(31),
    borderRadius: rs(6),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(10),
  },
  activeBadge: {
    backgroundColor: colors.successLight,
    borderColor: colors.successBorder,
  },
  paymentDueBadge: {
    backgroundColor: colors.orangeSoft,
    borderColor: colors.orangeBorder,
  },
  topBadge: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blueBorderSoft,
  },
  statusText: {
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  activeText: {
    color: colors.success,
  },
  paymentDueText: {
    color: colors.profileOrange,
  },
  topText: {
    color: colors.financeBlue,
  },
  outstandingBox: {
    minHeight: rs(42),
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    borderRadius: rs(6),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(18),
  },
  outstandingLeft: {
    color: colors.profileOrange,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  outstandingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outstandingAmount: {
    color: colors.profileOrange,
    fontSize: fs(19),
    fontFamily: fonts.extraBold,
    marginRight: rs(10),
  },
  achievementRow: {
    flexDirection: 'row',
    marginTop: rs(18),
    justifyContent: 'space-between',
  },
  achievementBox: {
    width: '62%',
    minHeight: rs(38),
    backgroundColor: colors.blueLight,
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
  },
  achievementText: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
    marginLeft: rs(10),
  },
  achievementStrong: {
    color: colors.financeBlue,
    fontFamily: fonts.extraBold,
  },
  incentiveBox: {
    width: '34%',
    minHeight: rs(38),
    backgroundColor: colors.stockistPurpleSoft,
    borderWidth: 1,
    borderColor: colors.stockistPurpleBorder,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incentiveIcon: {
    fontSize: fs(17),
    marginRight: rs(8),
  },
  incentiveText: {
    color: colors.purple,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  metricsRow: {
    height: rs(70),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
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
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  metricValue: {
    color: colors.primaryText,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
  },
  metricLabel: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(5),
  },
  metricDivider: {
    width: 1,
    height: rs(48),
    backgroundColor: colors.inputBorder,
    marginHorizontal: rs(18),
  },
  dealerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineButton: {
    width: '31%',
    height: rs(42),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButtonText: {
    color: colors.financeBlue,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
  primaryButton: {
    width: '31%',
    height: rs(42),
    backgroundColor: colors.financeBlue,
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  cardTitleRow: {
    height: rs(34),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(10),
  },
  cardTitle: {
    color: colors.text,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.financeBlue,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginRight: rs(6),
  },
  requestRow: {
    minHeight: rs(72),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: colors.stockistRequestAvatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  requestAvatarText: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    color: colors.text,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  requestMeta: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    marginTop: rs(3),
  },
  pendingBadge: {
    width: rs(78),
    height: rs(28),
    borderWidth: 1,
    borderColor: colors.stockistPendingBorder,
    borderRadius: rs(5),
    backgroundColor: colors.stockistPendingBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(42),
  },
  pendingText: {
    color: colors.profileOrange,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  approveButton: {
    width: rs(120),
    height: rs(36),
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(16),
  },
  approveText: {
    color: colors.success,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
  rejectButton: {
    width: rs(110),
    height: rs(36),
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  rejectText: {
    color: colors.dangerDark,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
  rankRow: {
    height: rs(43),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(26),
  },
  rankText: {
    color: colors.white,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  rankName: {
    width: rs(220),
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  rankProgressTrack: {
    flex: 1,
    height: rs(5),
    backgroundColor: colors.dealerProgressTrack,
    borderRadius: rs(5),
    overflow: 'hidden',
  },
  rankProgressFill: {
    height: rs(5),
    backgroundColor: colors.success,
    borderRadius: rs(5),
  },
  rankAmount: {
    width: rs(70),
    textAlign: 'right',
    color: colors.primaryText,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
    marginLeft: rs(18),
  },
  rankArrow: {
    color: colors.success,
    fontSize: fs(22),
    fontFamily: fonts.extraBold,
    marginLeft: rs(18),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(28),
    bottom: rs(88),
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    backgroundColor: colors.financeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
  },
});
