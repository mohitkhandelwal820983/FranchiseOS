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
import { colors, fonts, size, textSize } from '../../theme';
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  ChevronRight,
  Flag,
  Gift,
  IndianRupee,
  Lock,
  MapPin,
  MoreVertical,
  Search,
  Send,
  ShoppingCart,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';
import { getCompanyNetworkDetail } from '../../api/company/companyNetworkDetail.api';

import type {
  CompanyNetworkDetailData,
  DealerItem,
  DetailType,
  MetricItem,
} from '../../api/mock/company/companyNetworkDetail';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = ({ title }: { title: string }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <ArrowLeft color={colors.white} size={size(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <MoreVertical color={colors.white} size={size(32)} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileCard = ({ data }: { data: CompanyNetworkDetailData }) => {
  return (
    <View style={[styles.profileCard, { backgroundColor: data.color }]}>
      <View style={styles.profileAvatarWrap}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{data.initials}</Text>
        </View>

        <View style={styles.cameraButton}>
          <Camera color={colors.financeBlue} size={size(24)} strokeWidth={2.4} />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{data.headerTitle}</Text>

        <View style={styles.profileLocationRow}>
          <MapPin color={colors.white} size={size(18)} strokeWidth={2.2} />
          <Text style={styles.profileLocationText}>{data.location}</Text>
        </View>

        <View style={styles.profileStatusBadge}>
          <Text style={styles.profileStatusText}>{data.status}</Text>
        </View>

        <Text style={styles.memberSince}>Member since: {data.memberSince}</Text>
      </View>

      <View style={styles.scoreCircle}>
        <Text style={styles.scoreNumber}>{data.score}</Text>
        <Text style={styles.scoreHundred}>/100</Text>
        <Text style={styles.scoreLabel}>Score</Text>
      </View>
    </View>
  );
};

const Tabs = ({
  tabs,
  activeTab,
  onChangeTab,
}: {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}) => {
  return (
    <View style={styles.tabsCard}>
      {tabs.map(tab => {
        const active = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={() => onChangeTab(tab)}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>
              {tab}
            </Text>
            {active && <View style={styles.activeTabLine} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MetricIcon = ({ item }: { item: MetricItem }) => {
  if (item.icon === 'revenue') {
    return <TrendingUp color={item.color} size={size(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'orders') {
    return <ShoppingCart color={item.color} size={size(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'avg') {
    return <IndianRupee color={colors.purple} size={size(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'target') {
    return <Target color={item.color} size={size(30)} strokeWidth={2.4} />;
  }

  return <Wallet color={item.color} size={size(30)} strokeWidth={2.4} />;
};

const MetricCard = ({ item }: { item: MetricItem }) => {
  return (
    <View style={styles.metricCard}>
      <MetricIcon item={item} />
      <Text style={styles.metricTitle}>{item.title}</Text>
      <Text style={[styles.metricValue, { color: item.color }]}>
        {item.value}
      </Text>
    </View>
  );
};

const MetricsRow = ({ items }: { items: MetricItem[] }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.metricsContent}
    >
      {items.map(item => (
        <MetricCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const StockistPerformanceCard = () => {
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.cardTitle}>12 Month Performance</Text>

        <View>
          <View style={styles.legendRow}>
            <View style={styles.legendBlue} />
            <Text style={styles.legendText}>Actual Revenue</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendDash} />
            <Text style={styles.legendText}>Target Revenue</Text>
          </View>
        </View>
      </View>

      <View style={styles.lineChartArea}>
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>₹30L</Text>
          <Text style={styles.axisText}>₹20L</Text>
          <Text style={styles.axisText}>₹10L</Text>
          <Text style={styles.axisText}>₹0</Text>
        </View>

        <View style={styles.fakeLineChart}>
          <View style={styles.chartGridLine} />
          <View style={[styles.chartGridLine, { top: '33%' }]} />
          <View style={[styles.chartGridLine, { top: '66%' }]} />

          {[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ].map(month => (
            <Text key={month} style={styles.monthText}>
              {month}
            </Text>
          ))}

          <View style={styles.fakeLineOne} />
          <View style={styles.fakeLineTwo} />
          <View style={styles.fakeLineThree} />
        </View>
      </View>
    </View>
  );
};

const DealerRevenueTargetCard = () => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Revenue vs Target</Text>

      <View style={styles.bigCircle}>
        <Text style={styles.bigCircleValue}>92%</Text>
        <Text style={styles.bigCircleSub}>₹2.94L of ₹3.2L target</Text>
      </View>

      <View style={styles.onTrackBadge}>
        <Text style={styles.onTrackText}>On Track ✓</Text>
      </View>
    </View>
  );
};

const DealerRevenueTrendCard = () => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.cardTitle}>Revenue Trend</Text>
        <Text style={styles.greenSmall}>↑ +8% vs last month</Text>
      </View>

      <View style={styles.barChart}>
        {[1.8, 2.1, 2.4, 2.6, 2.7, 3.2].map((value, index) => (
          <View key={index} style={styles.barItem}>
            <Text style={styles.barValue}>₹{value}L</Text>
            <View
              style={[
                styles.bar,
                {
                  height: size(60 + value * 20),
                  backgroundColor: index === 5 ? colors.financeBlue : colors.lightBlue,
                },
              ]}
            />
            <Text style={styles.barMonth}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const PaymentCard = ({ data }: { data: CompanyNetworkDetailData }) => {
  return (
    <View
      style={data.type === 'stockist' ? styles.paymentCard : styles.halfCard}
    >
      <Text style={styles.cardTitle}>{data.payment.title}</Text>

      <View style={styles.paymentLine}>
        <Text style={styles.paymentText}>{data.payment.rateLabel}</Text>
      </View>

      <View style={styles.paymentProgressRow}>
        <View style={styles.paymentProgressTrack}>
          <View style={styles.paymentProgressFill} />
        </View>
        <Text style={styles.paymentPercent}>{data.payment.rate}</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>{data.payment.outstandingLabel}</Text>
        <Text style={styles.greenValue}>{data.payment.outstanding}</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>{data.payment.lastPaymentLabel}</Text>
        <Text style={styles.grayValue}>{data.payment.lastPayment}</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>{data.payment.overdueLabel}</Text>
        <Text style={styles.greenValue}>{data.payment.overdue}</Text>
      </View>
    </View>
  );
};

const IncentiveCard = ({ data }: { data: CompanyNetworkDetailData }) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Incentive Progress</Text>

      <Text style={styles.incentiveTitle}>{data.incentives.firstTitle}</Text>
      <View style={styles.incentiveRow}>
        <View style={styles.incentiveTrack}>
          <View
            style={[
              styles.incentiveFillBlue,
              { width: `${data.incentives.firstProgress}%` },
            ]}
          />
        </View>
        <Text style={styles.incentivePercent}>
          {data.incentives.firstProgress}%
        </Text>
      </View>

      <View style={styles.incentiveMetaRow}>
        <Text style={styles.incentiveMeta}>{data.incentives.firstMeta}</Text>
        <Text style={styles.rewardText}>{data.incentives.firstReward}</Text>
      </View>

      <View style={styles.cardDivider} />

      <Text style={styles.incentiveTitle}>{data.incentives.secondTitle}</Text>
      <View style={styles.incentiveRow}>
        <View style={styles.incentiveTrack}>
          <View
            style={[
              styles.incentiveFillGreen,
              { width: `${data.incentives.secondProgress}%` },
            ]}
          />
        </View>
        <Text style={styles.incentivePercent}>
          {data.incentives.secondProgress}%
        </Text>
      </View>

      <Text style={styles.qualifiedText}>✓ {data.incentives.secondMeta}</Text>
    </View>
  );
};

const TimelineCard = ({ data }: { data: CompanyNetworkDetailData }) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>
        {data.type === 'dealer' ? 'Behavior Metrics' : 'Activity Timeline'}
      </Text>

      {data.type === 'dealer' ? (
        <>
          <View style={styles.paymentInfoRow}>
            <Text style={styles.paymentText}>App Logins — Last 30 days</Text>
            <Text style={styles.blueValue}>22 days</Text>
          </View>

          <View style={styles.paymentInfoRow}>
            <Text style={styles.paymentText}>DSR Submissions</Text>
            <Text style={styles.grayValue}>90%</Text>
          </View>

          <View style={styles.paymentProgressRow}>
            <View style={styles.paymentProgressTrack}>
              <View style={[styles.paymentProgressFill, { width: '90%' }]} />
            </View>
          </View>

          <Text style={styles.smallGray}>27 of 30</Text>

          <View style={styles.paymentInfoRow}>
            <Text style={styles.paymentText}>Order Response Time</Text>
            <Text style={styles.greenValue}>{'< 2 hours'}</Text>
          </View>

          <View style={styles.paymentInfoRow}>
            <Text style={styles.paymentText}>Engagement Score</Text>
            <Text style={styles.blueValue}>78/100</Text>
          </View>
        </>
      ) : (
        data.timeline.map(item => (
          <View key={item.id} style={styles.timelineRow}>
            <View style={styles.timelineCheck}>
              <Text style={styles.timelineCheckText}>✓</Text>
            </View>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineTime}>{item.time}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const CustomerMetricsCard = () => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Customer Metrics</Text>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>New Customers MTD</Text>
        <Text style={styles.greenValue}>4</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>Customer Retention</Text>
        <View style={styles.smallProgressTrack}>
          <View style={styles.smallProgressFill} />
        </View>
        <Text style={styles.grayValue}>85%</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>Complaints</Text>
        <Text style={styles.greenValue}>0</Text>
      </View>

      <View style={styles.paymentInfoRow}>
        <Text style={styles.paymentText}>NPS Score</Text>
        <Text style={styles.blueValue}>8.2/10</Text>
      </View>
    </View>
  );
};

const PeerComparisonCard = () => {
  return (
    <View style={styles.fullCard}>
      <View style={styles.peerHeader}>
        <Text style={styles.cardTitle}>Peer Comparison</Text>
        <Text style={styles.peerSub}>vs Zone Average</Text>
        <View style={styles.peerLegendRow}>
          <View style={styles.blueDot} />
          <Text style={styles.legendText}>Dealer 1</Text>
          <View style={styles.grayDot} />
          <Text style={styles.legendText}>Zone Average</Text>
        </View>
      </View>

      {[
        ['Revenue', '92%', '74%'],
        ['Orders', '85%', '68%'],
        ['Score', '92', '71'],
      ].map(row => (
        <View key={row[0]} style={styles.peerRow}>
          <Text style={styles.peerLabel}>{row[0]}</Text>
          <View style={styles.peerTrack}>
            <View style={styles.peerFillBlue} />
          </View>
          <Text style={styles.peerValue}>{row[1]}</Text>
          <View style={styles.peerTrackSmall}>
            <View style={styles.peerFillGray} />
          </View>
          <Text style={styles.peerValue}>{row[2]}</Text>
        </View>
      ))}

      <Text style={styles.aboveAverage}>
        Above zone average in all metrics ✓
      </Text>
    </View>
  );
};

const SimpleSectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.fullCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.simpleCardBody}>{children}</View>
    </View>
  );
};

const OrdersSummaryCard = ({ type }: { type: DetailType }) => {
  const rows =
    type === 'stockist'
      ? [
          ['Total Orders MTD', '156'],
          ['Pending Orders', '8'],
          ['Delivered Orders', '148'],
          ['Average Fulfilment Time', '2.4 days'],
        ]
      : [
          ['Total Orders MTD', '18'],
          ['Pending Orders', '2'],
          ['Delivered Orders', '16'],
          ['Average Order Value', '₹17,778'],
        ];

  return (
    <SimpleSectionCard title="Orders Summary">
      {rows.map(row => (
        <View key={row[0]} style={styles.paymentInfoRow}>
          <Text style={styles.paymentText}>{row[0]}</Text>
          <Text style={styles.blueValue}>{row[1]}</Text>
        </View>
      ))}
    </SimpleSectionCard>
  );
};

const RevenueSummaryCard = ({ type }: { type: DetailType }) => {
  const rows =
    type === 'stockist'
      ? [
          ['Revenue MTD', '₹24,00,000'],
          ['Target Achievement', '85%'],
          ['Average Order Value', '₹1,54,000'],
          ['Commission Earned', '₹1,20,000'],
        ]
      : [
          ['Revenue MTD', '₹3,20,000'],
          ['Target Achievement', '92%'],
          ['Average Order Value', '₹17,778'],
          ['Growth vs Last Month', '+8%'],
        ];

  return (
    <SimpleSectionCard title="Revenue Details">
      {rows.map(row => (
        <View key={row[0]} style={styles.paymentInfoRow}>
          <Text style={styles.paymentText}>{row[0]}</Text>
          <Text style={styles.greenValue}>{row[1]}</Text>
        </View>
      ))}
    </SimpleSectionCard>
  );
};

const AdminActions = ({ type }: { type: DetailType }) => {
  const actions =
    type === 'stockist'
      ? [
          { label: 'Nudge', icon: 'send', color: colors.financeBlue },
          { label: 'Flag', icon: 'flag', color: colors.warningOrange },
          { label: 'Reward', icon: 'gift', color: colors.success },
          { label: 'Suspend', icon: 'lock', color: colors.dangerDark },
        ]
      : [
          { label: 'Send Nudge', icon: 'send', color: colors.financeBlue },
          { label: 'Flag for Review', icon: 'flag', color: colors.warningOrange },
          { label: 'Give Reward', icon: 'gift', color: colors.success },
          { label: 'Suspend', icon: 'lock', color: colors.dangerDark },
        ];

  return (
    <View style={styles.adminCard}>
      {type === 'stockist' && (
        <Text style={styles.cardTitle}>Admin Action</Text>
      )}

      <View style={styles.actionsRow}>
        {actions.map(item => (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.8}
            style={[styles.actionButton, { borderColor: item.color }]}
          >
            {item.icon === 'send' && (
              <Send color={item.color} size={size(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'flag' && (
              <Flag color={item.color} size={size(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'gift' && (
              <Gift color={item.color} size={size(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'lock' && (
              <Lock color={item.color} size={size(26)} strokeWidth={2.3} />
            )}

            <Text style={[styles.actionText, { color: item.color }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const DealersUnderStockist = ({
  dealers,
  onDealerPress,
}: {
  dealers: DealerItem[];
  onDealerPress: (dealer: DealerItem) => void;
}) => {
  const [dealerSearch, setDealerSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'risk' | 'overdue'
  >('all');
  const [sortByRevenueHigh, setSortByRevenueHigh] = useState(true);

  const getRevenueNumber = (value: string) => {
    return Number(value.replace(/[₹,]/g, '')) || 0;
  };

  const filteredDealers = useMemo(() => {
    const query = dealerSearch.trim().toLowerCase();

    let list = dealers.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.initials.toLowerCase().includes(query);

      if (!matchesSearch) {
        return false;
      }

      if (activeFilter === 'active') {
        return item.status === 'Active';
      }

      if (activeFilter === 'risk') {
        return item.status === 'At Risk';
      }

      if (activeFilter === 'overdue') {
        return item.status === 'Overdue';
      }

      return true;
    });

    list = [...list].sort((a, b) => {
      const first = getRevenueNumber(a.revenue);
      const second = getRevenueNumber(b.revenue);

      return sortByRevenueHigh ? second - first : first - second;
    });

    return list;
  }, [dealers, dealerSearch, activeFilter, sortByRevenueHigh]);

  const chips = [
    { label: `All (${dealers.length})`, value: 'all' as const },
    {
      label: `Active (${
        dealers.filter(item => item.status === 'Active').length
      })`,
      value: 'active' as const,
    },
    {
      label: `At Risk (${
        dealers.filter(item => item.status === 'At Risk').length
      })`,
      value: 'risk' as const,
    },
    {
      label: `Overdue (${
        dealers.filter(item => item.status === 'Overdue').length
      })`,
      value: 'overdue' as const,
    },
  ];

  return (
    <View style={styles.dealersSection}>
      <View style={styles.dealersHeader}>
        <Text style={styles.cardTitle}>
          {dealers.length} Dealers under Stockist A
        </Text>

        <View style={styles.dealerTools}>
          <View style={styles.dealerSearchBox}>
            <Search color={colors.slateText} size={size(18)} />
            <TextInput
              value={dealerSearch}
              onChangeText={setDealerSearch}
              placeholder="Search dealers..."
              placeholderTextColor={colors.slateText}
              style={styles.dealerSearchInput}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dealerFilterButton}
            onPress={() => setSortByRevenueHigh(prev => !prev)}
          >
            <ChevronDown color={colors.primary} size={size(20)} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dealerChipRow}>
        {chips.map(item => {
          const active = activeFilter === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item.value)}
              style={[styles.dealerChip, active && styles.activeDealerChip]}
            >
              <Text
                style={[
                  styles.dealerChipText,
                  active && styles.activeDealerChipText,
                  item.value === 'risk' && !active && { color: colors.warningOrange },
                  item.value === 'overdue' && !active && { color: colors.dangerDark },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.sortDealerRow}>
        <Text style={styles.sortDealerText}>Sort by:</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sortDealerButton}
          onPress={() => setSortByRevenueHigh(prev => !prev)}
        >
          <Text style={styles.sortDealerButtonText}>
            {sortByRevenueHigh
              ? 'Revenue (High to Low)'
              : 'Revenue (Low to High)'}
          </Text>
          <ChevronDown color={colors.primary} size={size(18)} />
        </TouchableOpacity>
      </View>

      <View style={styles.dealerTable}>
        {filteredDealers.map(item => {
          const isRisk = item.status === 'At Risk';
          const isOverdue = item.status === 'Overdue';

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.86}
              onPress={() => onDealerPress(item)}
              style={styles.dealerTableRow}
            >
              <View
                style={[
                  styles.smallDealerAvatar,
                  { backgroundColor: item.color },
                ]}
              >
                <Text style={styles.smallDealerAvatarText}>
                  {item.initials}
                </Text>
              </View>

              <View style={styles.dealerNameBlock}>
                <Text style={styles.dealerName}>{item.name}</Text>
                <Text style={styles.dealerCity}>{item.city}</Text>
              </View>

              <View style={styles.tableDivider} />

              <View style={styles.revenueBlock}>
                <Text
                  style={[
                    styles.tableRevenue,
                    (isRisk || isOverdue) && { color: colors.dangerDark },
                  ]}
                >
                  {item.revenue}
                </Text>
                <Text style={styles.tableSubText}>MTD Revenue</Text>
              </View>

              <View style={styles.tableDivider} />

              <View style={styles.scoreBlock}>
                <View
                  style={[
                    styles.smallScoreBadge,
                    isRisk && {
                      borderColor: colors.riskBorder,
                      backgroundColor: colors.riskBg,
                    },
                    isOverdue && {
                      borderColor: colors.overdueBorder,
                      backgroundColor: colors.overdueBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.smallScoreText,
                      (isRisk || isOverdue) && { color: colors.dangerDark },
                    ]}
                  >
                    {item.score}
                  </Text>
                </View>
                <Text style={styles.tableSubText}>Score</Text>
              </View>

              <View style={styles.tableDivider} />

              <View
                style={[
                  styles.tableStatusBadge,
                  isRisk && styles.tableRiskBadge,
                  isOverdue && styles.tableOverdueBadge,
                ]}
              >
                <Text
                  style={[
                    styles.tableStatusText,
                    isRisk && { color: colors.warningOrange },
                    isOverdue && { color: colors.dangerDark },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <ChevronRight color={colors.primary} size={size(22)} />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load 5 more dealers</Text>
        <ChevronDown color={colors.financeBlue} size={size(20)} />
      </TouchableOpacity>
    </View>
  );
};

const NetworkDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [data, setData] = useState<CompanyNetworkDetailData | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const routeId = route.params?.id || 'stockist-a';
  const routeType: DetailType = route.params?.type || 'stockist';

  const loadDetail = useCallback(async () => {
    try {
      setError('');

      const response = await getCompanyNetworkDetail(routeId, routeType);

      setData(response);
      setActiveTab('Overview');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load network detail';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [routeId, routeType]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDetail();
  }, [loadDetail]);

  const screenTitle = useMemo(() => {
    if (!data) {
      return routeType === 'dealer' ? 'Dealer Detail' : 'Stockist Detail';
    }

    return data.title;
  }, [data, routeType]);

  const openDealerDetail = (dealer: DealerItem) => {
    navigation.push('NetworkDetail', {
      id: dealer.id,
      type: 'dealer',
    });
  };

  const handleRetry = () => {
    setLoading(true);
    loadDetail();
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
            color: colors.primaryDark,
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

      <Header title={screenTitle} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileCard data={data} />

        <Tabs
          tabs={data.tabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        <MetricsRow items={data.metrics} />

        {data.type === 'stockist' ? (
          <>
            {activeTab === 'Overview' && (
              <>
                <View style={styles.twoColumnRow}>
                  <StockistPerformanceCard />
                  <PaymentCard data={data} />
                </View>

                <View style={styles.twoColumnRow}>
                  <IncentiveCard data={data} />
                  <TimelineCard data={data} />
                </View>

                <AdminActions type={data.type} />

                {!!data.dealers && (
                  <DealersUnderStockist
                    dealers={data.dealers}
                    onDealerPress={openDealerDetail}
                  />
                )}
              </>
            )}

            {activeTab === 'Dealers' && !!data.dealers && (
              <DealersUnderStockist
                dealers={data.dealers}
                onDealerPress={openDealerDetail}
              />
            )}

            {activeTab === 'Revenue' && (
              <>
                <RevenueSummaryCard type={data.type} />
                <View style={styles.twoColumnRow}>
                  <StockistPerformanceCard />
                  <IncentiveCard data={data} />
                </View>
              </>
            )}

            {activeTab === 'Orders' && <OrdersSummaryCard type={data.type} />}

            {activeTab === 'Payments' && <PaymentCard data={data} />}
          </>
        ) : (
          <>
            {activeTab === 'Overview' && (
              <>
                <View style={styles.twoColumnRow}>
                  <DealerRevenueTargetCard />
                  <DealerRevenueTrendCard />
                </View>

                <View style={styles.twoColumnRow}>
                  <CustomerMetricsCard />
                  <PaymentCard data={data} />
                </View>

                <View style={styles.twoColumnRow}>
                  <IncentiveCard data={data} />
                  <TimelineCard data={data} />
                </View>

                <PeerComparisonCard />

                <AdminActions type={data.type} />
              </>
            )}

            {activeTab === 'Revenue' && (
              <>
                <RevenueSummaryCard type={data.type} />
                <View style={styles.twoColumnRow}>
                  <DealerRevenueTargetCard />
                  <DealerRevenueTrendCard />
                </View>
                <PeerComparisonCard />
              </>
            )}

            {activeTab === 'Orders' && <OrdersSummaryCard type={data.type} />}

            {activeTab === 'Payments' && <PaymentCard data={data} />}

            {activeTab === 'Incentives' && (
              <>
                <IncentiveCard data={data} />
                <AdminActions type={data.type} />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NetworkDetailScreen;

const PAGE_PADDING = size(22);
const CARD_GAP = size(14);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const METRIC_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - size(16) * 4) / 5;

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
    paddingHorizontal: size(32),
    paddingTop: size(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: textSize(28),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(24),
    paddingBottom: size(30),
  },
  profileCard: {
    minHeight: size(228),
    borderRadius: size(8),
    paddingHorizontal: size(42),
    paddingVertical: size(26),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(16),
  },
  profileAvatarWrap: {
    width: size(172),
    height: size(172),
    marginRight: size(40),
    position: 'relative',
  },
  profileAvatar: {
    width: size(162),
    height: size(162),
    borderRadius: size(81),
    borderWidth: size(3),
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: colors.white,
    fontSize: textSize(56),
    fontFamily: fonts.extraBold,
  },
  cameraButton: {
    position: 'absolute',
    right: size(10),
    bottom: 0,
    width: size(50),
    height: size(50),
    borderRadius: size(25),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: colors.white,
    fontSize: textSize(34),
    fontFamily: fonts.extraBold,
    marginBottom: size(12),
  },
  profileLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(14),
  },
  profileLocationText: {
    color: colors.white,
    fontSize: textSize(18),
    fontFamily: fonts.medium,
    marginLeft: size(10),
  },
  profileStatusBadge: {
    width: size(92),
    height: size(30),
    borderRadius: size(15),
    borderWidth: 1,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: size(18),
  },
  profileStatusText: {
    color: colors.successLightText,
    fontSize: textSize(14),
    fontFamily: fonts.bold,
  },
  memberSince: {
    color: colors.white,
    fontSize: textSize(16),
    fontFamily: fonts.medium,
  },
  scoreCircle: {
    width: size(176),
    height: size(176),
    borderRadius: size(88),
    backgroundColor: colors.white,
    borderWidth: size(12),
    borderColor: colors.successBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    color: colors.primaryDark,
    fontSize: textSize(56),
    lineHeight: size(62),
    fontFamily: fonts.extraBold,
  },
  scoreHundred: {
    color: colors.primaryDark,
    fontSize: textSize(18),
    fontFamily: fonts.medium,
  },
  scoreLabel: {
    color: colors.primaryDark,
    fontSize: textSize(16),
    fontFamily: fonts.bold,
    marginTop: size(4),
  },
  tabsCard: {
    height: size(58),
    backgroundColor: colors.white,
    borderRadius: size(8),
    flexDirection: 'row',
    marginBottom: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabText: {
    color: colors.mutedTextDark,
    fontSize: textSize(16),
    fontFamily: fonts.semiBold,
  },
  activeTabText: {
    color: colors.financeBlue,
    fontFamily: fonts.extraBold,
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    height: size(4),
    width: '70%',
    backgroundColor: colors.financeBlue,
  },
  metricsContent: {
    paddingBottom: size(28),
  },
  metricCard: {
    width: METRIC_WIDTH,
    minHeight: size(126),
    backgroundColor: colors.white,
    borderRadius: size(8),
    marginRight: size(8),
    alignItems: 'center',
    justifyContent: 'center',
    padding: size(10),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  metricTitle: {
    color: colors.mutedTextDark,
    fontSize: textSize(13),
    fontFamily: fonts.semiBold,
    marginTop: size(10),
    marginBottom: size(8),
    textAlign: 'center',
  },
  metricValue: {
    fontSize: textSize(22),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(16),
  },
  chartCard: {
    width: HALF_WIDTH,
    minHeight: size(294),
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  paymentCard: {
    width: HALF_WIDTH,
    minHeight: size(294),
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  halfCard: {
    width: HALF_WIDTH,
    minHeight: size(214),
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  fullCard: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    marginBottom: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  simpleCardBody: {
    marginTop: size(18),
  },
  cardTitle: {
    color: colors.text,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(4),
  },
  legendBlue: {
    width: size(22),
    height: size(3),
    backgroundColor: colors.financeBlue,
    marginRight: size(8),
  },
  legendDash: {
    width: size(22),
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.slateText,
    marginRight: size(8),
  },
  legendText: {
    color: colors.mutedTextDark,
    fontSize: textSize(12),
    fontFamily: fonts.medium,
  },
  lineChartArea: {
    flex: 1,
    flexDirection: 'row',
    marginTop: size(22),
  },
  yAxis: {
    width: size(36),
    justifyContent: 'space-between',
    paddingBottom: size(20),
  },
  axisText: {
    color: colors.mutedTextDark,
    fontSize: textSize(11),
  },
  fakeLineChart: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: size(4),
  },
  chartGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '12%',
    height: 1,
    backgroundColor: colors.financeDivider,
  },
  monthText: {
    color: colors.mutedTextDark,
    fontSize: textSize(11),
  },
  fakeLineOne: {
    position: 'absolute',
    left: size(8),
    right: size(16),
    bottom: size(38),
    height: size(80),
    borderTopWidth: size(4),
    borderColor: colors.financeBlue,
    transform: [{ rotate: '-8deg' }],
  },
  fakeLineTwo: {
    position: 'absolute',
    left: size(120),
    right: size(40),
    bottom: size(94),
    height: size(72),
    borderTopWidth: size(4),
    borderColor: colors.financeBlue,
    transform: [{ rotate: '5deg' }],
  },
  fakeLineThree: {
    position: 'absolute',
    right: size(10),
    bottom: size(130),
    width: size(8),
    height: size(8),
    borderRadius: size(4),
    backgroundColor: colors.financeBlue,
  },
  paymentLine: {
    marginTop: size(26),
  },
  paymentText: {
    color: colors.text,
    fontSize: textSize(15),
    fontFamily: fonts.semiBold,
  },
  paymentProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(14),
    marginBottom: size(18),
  },
  paymentProgressTrack: {
    flex: 1,
    height: size(7),
    backgroundColor: colors.chartTrack,
    borderRadius: size(6),
    overflow: 'hidden',
  },
  paymentProgressFill: {
    width: '95%',
    height: size(7),
    backgroundColor: colors.success,
    borderRadius: size(6),
  },
  paymentPercent: {
    color: colors.text,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
    marginLeft: size(16),
  },
  paymentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: size(20),
  },
  greenValue: {
    color: colors.success,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  grayValue: {
    color: colors.mutedTextDark,
    fontSize: textSize(15),
    fontFamily: fonts.bold,
  },
  blueValue: {
    color: colors.financeBlue,
    fontSize: textSize(18),
    fontFamily: fonts.extraBold,
  },
  incentiveTitle: {
    color: colors.text,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginTop: size(18),
    marginBottom: size(12),
  },
  incentiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incentiveTrack: {
    flex: 1,
    height: size(6),
    backgroundColor: colors.chartTrack,
    borderRadius: size(5),
    overflow: 'hidden',
  },
  incentiveFillBlue: {
    height: size(6),
    backgroundColor: colors.financeBlue,
  },
  incentiveFillGreen: {
    height: size(6),
    backgroundColor: colors.success,
  },
  incentivePercent: {
    color: colors.text,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(16),
  },
  incentiveMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: size(12),
  },
  incentiveMeta: {
    color: colors.mutedTextDark,
    fontSize: textSize(14),
    fontFamily: fonts.semiBold,
  },
  rewardText: {
    color: colors.financeBlue,
    fontSize: textSize(14),
    fontFamily: fonts.bold,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.financeDivider,
    marginTop: size(18),
  },
  qualifiedText: {
    color: colors.success,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    marginTop: size(14),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(16),
  },
  timelineCheck: {
    width: size(18),
    height: size(18),
    borderRadius: size(9),
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  timelineCheckText: {
    color: colors.white,
    fontSize: textSize(10),
    fontFamily: fonts.extraBold,
  },
  timelineTitle: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(15),
    fontFamily: fonts.semiBold,
  },
  timelineTime: {
    color: colors.mutedTextDark,
    fontSize: textSize(14),
    fontFamily: fonts.medium,
  },
  adminCard: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    marginBottom: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: size(16),
  },
  actionButton: {
    width: '23%',
    height: size(54),
    borderWidth: 1,
    borderRadius: size(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(10),
  },
  dealersSection: {
    backgroundColor: colors.white,
    borderRadius: size(10),
    padding: size(18),
    marginBottom: size(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  dealersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealerTools: {
    flexDirection: 'row',
  },
  dealerSearchBox: {
    width: size(266),
    height: size(40),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(12),
  },
  dealerSearchInput: {
    flex: 1,
    fontSize: textSize(13),
    color: colors.text,
    marginLeft: size(8),
    paddingVertical: 0,
  },
  dealerFilterButton: {
    width: size(44),
    height: size(40),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: size(12),
  },
  dealerChipRow: {
    flexDirection: 'row',
    marginTop: size(22),
  },
  dealerChip: {
    height: size(32),
    minWidth: size(86),
    borderRadius: size(16),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(12),
    paddingHorizontal: size(14),
  },
  activeDealerChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dealerChipText: {
    color: colors.success,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
  },
  activeDealerChipText: {
    color: colors.white,
  },
  sortDealerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: size(10),
    marginBottom: size(10),
  },
  sortDealerText: {
    color: colors.mutedTextDark,
    fontSize: textSize(13),
    marginRight: size(14),
  },
  sortDealerButton: {
    height: size(36),
    minWidth: size(190),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(5),
    paddingHorizontal: size(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortDealerButtonText: {
    color: colors.primaryDark,
    fontSize: textSize(13),
    fontFamily: fonts.semiBold,
  },
  dealerTable: {
    borderRadius: size(8),
    overflow: 'hidden',
  },
  dealerTableRow: {
    minHeight: size(58),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
  },
  smallDealerAvatar: {
    width: size(42),
    height: size(42),
    borderRadius: size(21),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(18),
  },
  smallDealerAvatarText: {
    color: colors.white,
    fontSize: textSize(16),
    fontFamily: fonts.extraBold,
  },
  dealerNameBlock: {
    width: size(165),
  },
  dealerName: {
    color: colors.text,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  dealerCity: {
    color: colors.mutedTextDark,
    fontSize: textSize(12),
    marginTop: size(5),
  },
  tableDivider: {
    height: size(42),
    width: 1,
    backgroundColor: colors.financeDivider,
    marginHorizontal: size(16),
  },
  revenueBlock: {
    width: size(130),
  },
  tableRevenue: {
    color: colors.success,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  tableSubText: {
    color: colors.mutedTextDark,
    fontSize: textSize(11),
    marginTop: size(4),
  },
  scoreBlock: {
    width: size(84),
    alignItems: 'center',
  },
  smallScoreBadge: {
    minWidth: size(70),
    height: size(24),
    borderRadius: size(4),
    borderWidth: 1,
    borderColor: colors.blueBorder,
    backgroundColor: colors.blueBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallScoreText: {
    color: colors.financeBlue,
    fontSize: textSize(12),
    fontFamily: fonts.extraBold,
  },
  tableStatusBadge: {
    width: size(76),
    height: size(28),
    borderRadius: size(5),
    borderWidth: 1,
    borderColor: colors.successBorderSoft,
    backgroundColor: colors.paidBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(20),
  },
  tableRiskBadge: {
    borderColor: colors.riskBorderStrong,
    backgroundColor: colors.riskBg,
  },
  tableOverdueBadge: {
    borderColor: colors.overdueBorder,
    backgroundColor: colors.overdueBg,
  },
  tableStatusText: {
    color: colors.success,
    fontSize: textSize(12),
    fontFamily: fonts.extraBold,
  },
  loadMoreButton: {
    height: size(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: colors.financeBlue,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginRight: size(8),
  },
  bigCircle: {
    width: size(180),
    height: size(180),
    borderRadius: size(90),
    borderWidth: size(12),
    borderColor: colors.success,
    alignSelf: 'center',
    marginTop: size(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCircleValue: {
    color: colors.financeBlue,
    fontSize: textSize(36),
    fontFamily: fonts.extraBold,
  },
  bigCircleSub: {
    color: colors.mutedTextDark,
    fontSize: textSize(12),
    marginTop: size(6),
  },
  onTrackBadge: {
    alignSelf: 'center',
    marginTop: size(12),
    minWidth: size(145),
    height: size(30),
    borderRadius: size(5),
    borderWidth: 1,
    borderColor: colors.successBorderSoft,
    backgroundColor: colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onTrackText: {
    color: colors.success,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
  },
  greenSmall: {
    color: colors.success,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: size(20),
  },
  barItem: {
    alignItems: 'center',
  },
  barValue: {
    color: colors.text,
    fontSize: textSize(11),
    fontFamily: fonts.extraBold,
    marginBottom: size(8),
  },
  bar: {
    width: size(32),
    borderTopLeftRadius: size(4),
    borderTopRightRadius: size(4),
  },
  barMonth: {
    color: colors.mutedTextDark,
    fontSize: textSize(12),
    marginTop: size(8),
  },
  smallProgressTrack: {
    width: size(120),
    height: size(7),
    backgroundColor: colors.chartTrack,
    borderRadius: size(6),
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: size(10),
  },
  smallProgressFill: {
    width: '85%',
    height: size(7),
    backgroundColor: colors.success,
  },
  smallGray: {
    color: colors.mutedTextDark,
    fontSize: textSize(12),
    marginTop: -size(8),
    marginBottom: size(18),
  },
  peerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(20),
  },
  peerSub: {
    color: colors.mutedTextDark,
    fontSize: textSize(15),
    marginLeft: size(20),
    flex: 1,
  },
  peerLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueDot: {
    width: size(12),
    height: size(12),
    borderRadius: size(6),
    backgroundColor: colors.financeBlue,
    marginRight: size(8),
  },
  grayDot: {
    width: size(12),
    height: size(12),
    borderRadius: size(6),
    backgroundColor: colors.grayDot,
    marginLeft: size(24),
    marginRight: size(8),
  },
  peerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(14),
  },
  peerLabel: {
    width: size(90),
    color: colors.text,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
  },
  peerTrack: {
    flex: 1,
    height: size(7),
    backgroundColor: colors.chartTrack,
    borderRadius: size(6),
    overflow: 'hidden',
    marginRight: size(14),
  },
  peerFillBlue: {
    width: '92%',
    height: size(7),
    backgroundColor: colors.financeBlue,
  },
  peerValue: {
    width: size(45),
    color: colors.text,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
  },
  peerTrackSmall: {
    flex: 0.45,
    height: size(7),
    backgroundColor: colors.chartTrack,
    borderRadius: size(6),
    overflow: 'hidden',
    marginRight: size(14),
  },
  peerFillGray: {
    width: '74%',
    height: size(7),
    backgroundColor: colors.grayDot,
  },
  aboveAverage: {
    color: colors.success,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
    marginTop: size(4),
  },
});
