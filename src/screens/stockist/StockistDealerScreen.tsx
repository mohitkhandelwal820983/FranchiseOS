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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = ({ onAddPress }: { onAddPress: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Dealers</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onAddPress}>
        <Plus color="#FFFFFF" size={rs(38)} strokeWidth={2.4} />
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
        placeholder="Search dealer name or region"
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
        <View style={[styles.summaryIcon, { backgroundColor: '#138A36' }]}>
          <Users color="#FFFFFF" size={rs(30)} strokeWidth={2.3} />
        </View>

        <View>
          <Text style={[styles.summaryValue, { color: '#138A36' }]}>
            {data.activeDealers}
          </Text>
          <Text style={styles.summaryLabel}>Active Dealers</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: '#173CFF' }]}>
          <IndianRupee color="#FFFFFF" size={rs(30)} strokeWidth={2.3} />
        </View>

        <View>
          <Text style={[styles.summaryValue, { color: '#173CFF' }]}>
            {data.monthlyBusiness}
          </Text>
          <Text style={styles.summaryLabel}>Monthly Business</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, { backgroundColor: '#F06419' }]}>
          <WalletCards color="#FFFFFF" size={rs(30)} strokeWidth={2.3} />
        </View>

        <View>
          <Text style={[styles.summaryValue, { color: '#F06419' }]}>
            {data.paymentOverdue}
          </Text>
          <Text style={styles.summaryLabel}>Payment Overdue</Text>
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
          <Briefcase color="#138A36" size={rs(23)} strokeWidth={2.2} />
        )}
        {icon === 'score' && (
          <ShieldCheck color="#138A36" size={rs(23)} strokeWidth={2.2} />
        )}
        {icon === 'orders' && (
          <BookOpen color="#173CFF" size={rs(23)} strokeWidth={2.2} />
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
            <User color="#5D607E" size={rs(16)} />
            <Text style={styles.metaText}>Owner: {item.owner}</Text>
          </View>

          <View style={styles.metaRow}>
            <MapPin color="#5D607E" size={rs(16)} />
            <Text style={styles.metaText}>
              {item.city}, {item.state}
            </Text>
          </View>
        </View>

        <DealerStatusBadge status={item.status} />

        <TouchableOpacity activeOpacity={0.8} style={styles.moreButton}>
          <MoreVertical color="#061247" size={rs(25)} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {paymentDue && (
        <TouchableOpacity activeOpacity={0.85} style={styles.outstandingBox}>
          <Text style={styles.outstandingLeft}>⚠ Outstanding Amount</Text>
          <View style={styles.outstandingRight}>
            <Text style={styles.outstandingAmount}>
              {item.outstandingAmount}
            </Text>
            <ChevronRight color="#F06419" size={rs(22)} />
          </View>
        </TouchableOpacity>
      )}

      {topPerformer && (
        <View style={styles.achievementRow}>
          <View style={styles.achievementBox}>
            <Trophy color="#173CFF" size={rs(21)} strokeWidth={2.3} />
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
          <Eye color="#173CFF" size={rs(18)} strokeWidth={2.3} />
          <Text style={styles.outlineButtonText}>View</Text>
        </TouchableOpacity>

        {paymentDue ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onSendReminder(item)}
            style={styles.primaryButton}
          >
            <Bell color="#FFFFFF" size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.primaryButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
            <Download color="#173CFF" size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.outlineButtonText}>Collect</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
          <BookOpen color="#173CFF" size={rs(18)} strokeWidth={2.3} />
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
          <ChevronRight color="#173CFF" size={rs(20)} />
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
            <CheckCircle2 color="#138A36" size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onReject(item.id)}
            style={styles.rejectButton}
          >
            <X color="#E00014" size={rs(18)} strokeWidth={2.3} />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>

          <MoreVertical color="#061247" size={rs(24)} />
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
          <ChevronRight color="#173CFF" size={rs(20)} />
        </TouchableOpacity>
      </View>

      {items.map(item => {
        const medalColor =
          item.rank === 1
            ? '#F6B21A'
            : item.rank === 2
            ? '#AEB5C7'
            : item.rank === 3
            ? '#C7793A'
            : '#E6E8F2';

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
      <Plus color="#FFFFFF" size={rs(38)} strokeWidth={2.4} />
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
              avatarColor: '#173CFF',
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
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

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
    paddingBottom: rs(120),
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
    fontSize: fs(18),
    fontWeight: '500',
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
    borderColor: '#D9DCE8',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(7),
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
    fontSize: fs(15),
    fontWeight: '800',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    height: rs(105),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
    paddingHorizontal: rs(28),
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
    marginRight: rs(20),
  },
  summaryValue: {
    fontSize: fs(28),
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#5D607E',
    fontSize: fs(13),
    fontWeight: '700',
    marginTop: rs(7),
  },
  summaryDivider: {
    width: 1,
    height: rs(60),
    backgroundColor: '#D9DCE8',
    marginHorizontal: rs(22),
  },
  dealerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(20),
    marginBottom: rs(14),
    shadowColor: '#000000',
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
    color: '#FFFFFF',
    fontSize: fs(26),
    fontWeight: '900',
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    color: '#111327',
    fontSize: fs(23),
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
    fontSize: fs(13),
    fontWeight: '600',
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
    backgroundColor: '#EAF8EC',
    borderColor: '#BEE7C5',
  },
  paymentDueBadge: {
    backgroundColor: '#FFF3E9',
    borderColor: '#F8C9A8',
  },
  topBadge: {
    backgroundColor: '#F1F5FF',
    borderColor: '#B8C8FF',
  },
  statusText: {
    fontSize: fs(13),
    fontWeight: '900',
  },
  activeText: {
    color: '#138A36',
  },
  paymentDueText: {
    color: '#F06419',
  },
  topText: {
    color: '#173CFF',
  },
  outstandingBox: {
    minHeight: rs(42),
    backgroundColor: '#FFF3E9',
    borderWidth: 1,
    borderColor: '#F8C9A8',
    borderRadius: rs(6),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(18),
  },
  outstandingLeft: {
    color: '#F06419',
    fontSize: fs(14),
    fontWeight: '900',
  },
  outstandingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outstandingAmount: {
    color: '#F06419',
    fontSize: fs(19),
    fontWeight: '900',
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
    backgroundColor: '#F1F5FF',
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
  },
  achievementText: {
    color: '#111327',
    fontSize: fs(14),
    fontWeight: '600',
    marginLeft: rs(10),
  },
  achievementStrong: {
    color: '#173CFF',
    fontWeight: '900',
  },
  incentiveBox: {
    width: '34%',
    minHeight: rs(38),
    backgroundColor: '#F8F1FF',
    borderWidth: 1,
    borderColor: '#D8B8FF',
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
    color: '#7B22EA',
    fontSize: fs(14),
    fontWeight: '900',
  },
  metricsRow: {
    height: rs(70),
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
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#EAF8EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  metricValue: {
    color: '#061247',
    fontSize: fs(20),
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
    height: rs(48),
    backgroundColor: '#D9DCE8',
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
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButtonText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  primaryButton: {
    width: '31%',
    height: rs(42),
    backgroundColor: '#173CFF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: '#000000',
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
    color: '#111327',
    fontSize: fs(20),
    fontWeight: '900',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '900',
    marginRight: rs(6),
  },
  requestRow: {
    minHeight: rs(72),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  requestAvatarText: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '900',
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '900',
  },
  requestMeta: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: rs(3),
  },
  pendingBadge: {
    width: rs(78),
    height: rs(28),
    borderWidth: 1,
    borderColor: '#FFD4B6',
    borderRadius: rs(5),
    backgroundColor: '#FFF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(42),
  },
  pendingText: {
    color: '#F06419',
    fontSize: fs(12),
    fontWeight: '900',
  },
  approveButton: {
    width: rs(120),
    height: rs(36),
    borderWidth: 1,
    borderColor: '#138A36',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(16),
  },
  approveText: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  rejectButton: {
    width: rs(110),
    height: rs(36),
    borderWidth: 1,
    borderColor: '#FFB6B6',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  rejectText: {
    color: '#E00014',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  rankRow: {
    height: rs(43),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
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
    color: '#FFFFFF',
    fontSize: fs(12),
    fontWeight: '900',
  },
  rankName: {
    width: rs(220),
    color: '#111327',
    fontSize: fs(13),
    fontWeight: '900',
  },
  rankProgressTrack: {
    flex: 1,
    height: rs(5),
    backgroundColor: '#E4E6EF',
    borderRadius: rs(5),
    overflow: 'hidden',
  },
  rankProgressFill: {
    height: rs(5),
    backgroundColor: '#138A36',
    borderRadius: rs(5),
  },
  rankAmount: {
    width: rs(70),
    textAlign: 'right',
    color: '#061247',
    fontSize: fs(13),
    fontWeight: '900',
    marginLeft: rs(18),
  },
  rankArrow: {
    color: '#138A36',
    fontSize: fs(22),
    fontWeight: '900',
    marginLeft: rs(18),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(28),
    bottom: rs(88),
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    backgroundColor: '#173CFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
  },
});
