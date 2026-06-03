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
const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = ({ title }: { title: string }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <ArrowLeft color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <MoreVertical color="#FFFFFF" size={rs(32)} strokeWidth={2.5} />
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
          <Camera color="#173CFF" size={rs(24)} strokeWidth={2.4} />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{data.headerTitle}</Text>

        <View style={styles.profileLocationRow}>
          <MapPin color="#FFFFFF" size={rs(18)} strokeWidth={2.2} />
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
    return <TrendingUp color={item.color} size={rs(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'orders') {
    return <ShoppingCart color={item.color} size={rs(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'avg') {
    return <IndianRupee color="#5D4B8B" size={rs(30)} strokeWidth={2.4} />;
  }

  if (item.icon === 'target') {
    return <Target color={item.color} size={rs(30)} strokeWidth={2.4} />;
  }

  return <Wallet color={item.color} size={rs(30)} strokeWidth={2.4} />;
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
                  height: rs(60 + value * 20),
                  backgroundColor: index === 5 ? '#173CFF' : '#AFC4FF',
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
          { label: 'Nudge', icon: 'send', color: '#173CFF' },
          { label: 'Flag', icon: 'flag', color: '#F06419' },
          { label: 'Reward', icon: 'gift', color: '#138A36' },
          { label: 'Suspend', icon: 'lock', color: '#E00014' },
        ]
      : [
          { label: 'Send Nudge', icon: 'send', color: '#173CFF' },
          { label: 'Flag for Review', icon: 'flag', color: '#F06419' },
          { label: 'Give Reward', icon: 'gift', color: '#138A36' },
          { label: 'Suspend', icon: 'lock', color: '#E00014' },
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
              <Send color={item.color} size={rs(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'flag' && (
              <Flag color={item.color} size={rs(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'gift' && (
              <Gift color={item.color} size={rs(26)} strokeWidth={2.3} />
            )}
            {item.icon === 'lock' && (
              <Lock color={item.color} size={rs(26)} strokeWidth={2.3} />
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
            <Search color="#5D607E" size={rs(18)} />
            <TextInput
              value={dealerSearch}
              onChangeText={setDealerSearch}
              placeholder="Search dealers..."
              placeholderTextColor="#5D607E"
              style={styles.dealerSearchInput}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dealerFilterButton}
            onPress={() => setSortByRevenueHigh(prev => !prev)}
          >
            <ChevronDown color="#061B66" size={rs(20)} />
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
                  item.value === 'risk' && !active && { color: '#F06419' },
                  item.value === 'overdue' && !active && { color: '#E00014' },
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
          <ChevronDown color="#061B66" size={rs(18)} />
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
                    (isRisk || isOverdue) && { color: '#E00014' },
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
                      borderColor: '#F2BBA2',
                      backgroundColor: '#FFF5EE',
                    },
                    isOverdue && {
                      borderColor: '#FFB6B6',
                      backgroundColor: '#FFF0F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.smallScoreText,
                      (isRisk || isOverdue) && { color: '#E00014' },
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
                    isRisk && { color: '#F06419' },
                    isOverdue && { color: '#E00014' },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <ChevronRight color="#061B66" size={rs(22)} />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load 5 more dealers</Text>
        <ChevronDown color="#173CFF" size={rs(20)} />
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

const PAGE_PADDING = rs(22);
const CARD_GAP = rs(14);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const METRIC_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - rs(16) * 4) / 5;

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
    paddingHorizontal: rs(32),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(28),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(24),
    paddingBottom: rs(30),
  },
  profileCard: {
    minHeight: rs(228),
    borderRadius: rs(8),
    paddingHorizontal: rs(42),
    paddingVertical: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(16),
  },
  profileAvatarWrap: {
    width: rs(172),
    height: rs(172),
    marginRight: rs(40),
    position: 'relative',
  },
  profileAvatar: {
    width: rs(162),
    height: rs(162),
    borderRadius: rs(81),
    borderWidth: rs(3),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: fs(56),
    fontWeight: '800',
  },
  cameraButton: {
    position: 'absolute',
    right: rs(10),
    bottom: 0,
    width: rs(50),
    height: rs(50),
    borderRadius: rs(25),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: fs(34),
    fontWeight: '800',
    marginBottom: rs(12),
  },
  profileLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  profileLocationText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: '500',
    marginLeft: rs(10),
  },
  profileStatusBadge: {
    width: rs(92),
    height: rs(30),
    borderRadius: rs(15),
    borderWidth: 1,
    borderColor: '#75DA9B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(18),
  },
  profileStatusText: {
    color: '#91F0A9',
    fontSize: fs(14),
    fontWeight: '700',
  },
  memberSince: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '500',
  },
  scoreCircle: {
    width: rs(176),
    height: rs(176),
    borderRadius: rs(88),
    backgroundColor: '#FFFFFF',
    borderWidth: rs(12),
    borderColor: '#10A322',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    color: '#061247',
    fontSize: fs(56),
    lineHeight: rs(62),
    fontWeight: '900',
  },
  scoreHundred: {
    color: '#061247',
    fontSize: fs(18),
    fontWeight: '500',
  },
  scoreLabel: {
    color: '#061247',
    fontSize: fs(16),
    fontWeight: '700',
    marginTop: rs(4),
  },
  tabsCard: {
    height: rs(58),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    flexDirection: 'row',
    marginBottom: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabText: {
    color: '#4D506E',
    fontSize: fs(16),
    fontWeight: '600',
  },
  activeTabText: {
    color: '#173CFF',
    fontWeight: '800',
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    height: rs(4),
    width: '70%',
    backgroundColor: '#173CFF',
  },
  metricsContent: {
    paddingBottom: rs(28),
  },
  metricCard: {
    width: METRIC_WIDTH,
    minHeight: rs(126),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    marginRight: rs(8),
    alignItems: 'center',
    justifyContent: 'center',
    padding: rs(10),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  metricTitle: {
    color: '#4D506E',
    fontSize: fs(13),
    fontWeight: '600',
    marginTop: rs(10),
    marginBottom: rs(8),
    textAlign: 'center',
  },
  metricValue: {
    fontSize: fs(22),
    fontWeight: '900',
    textAlign: 'center',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  chartCard: {
    width: HALF_WIDTH,
    minHeight: rs(294),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  paymentCard: {
    width: HALF_WIDTH,
    minHeight: rs(294),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  halfCard: {
    width: HALF_WIDTH,
    minHeight: rs(214),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  simpleCardBody: {
    marginTop: rs(18),
  },
  cardTitle: {
    color: '#111327',
    fontSize: fs(18),
    fontWeight: '900',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(4),
  },
  legendBlue: {
    width: rs(22),
    height: rs(3),
    backgroundColor: '#173CFF',
    marginRight: rs(8),
  },
  legendDash: {
    width: rs(22),
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#5D607E',
    marginRight: rs(8),
  },
  legendText: {
    color: '#4D506E',
    fontSize: fs(12),
    fontWeight: '500',
  },
  lineChartArea: {
    flex: 1,
    flexDirection: 'row',
    marginTop: rs(22),
  },
  yAxis: {
    width: rs(36),
    justifyContent: 'space-between',
    paddingBottom: rs(20),
  },
  axisText: {
    color: '#4D506E',
    fontSize: fs(11),
  },
  fakeLineChart: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: rs(4),
  },
  chartGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '12%',
    height: 1,
    backgroundColor: '#EEF0F6',
  },
  monthText: {
    color: '#4D506E',
    fontSize: fs(11),
  },
  fakeLineOne: {
    position: 'absolute',
    left: rs(8),
    right: rs(16),
    bottom: rs(38),
    height: rs(80),
    borderTopWidth: rs(4),
    borderColor: '#173CFF',
    transform: [{ rotate: '-8deg' }],
  },
  fakeLineTwo: {
    position: 'absolute',
    left: rs(120),
    right: rs(40),
    bottom: rs(94),
    height: rs(72),
    borderTopWidth: rs(4),
    borderColor: '#173CFF',
    transform: [{ rotate: '5deg' }],
  },
  fakeLineThree: {
    position: 'absolute',
    right: rs(10),
    bottom: rs(130),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: '#173CFF',
  },
  paymentLine: {
    marginTop: rs(26),
  },
  paymentText: {
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '600',
  },
  paymentProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(14),
    marginBottom: rs(18),
  },
  paymentProgressTrack: {
    flex: 1,
    height: rs(7),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(6),
    overflow: 'hidden',
  },
  paymentProgressFill: {
    width: '95%',
    height: rs(7),
    backgroundColor: '#138A36',
    borderRadius: rs(6),
  },
  paymentPercent: {
    color: '#111327',
    fontSize: fs(16),
    fontWeight: '800',
    marginLeft: rs(16),
  },
  paymentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(20),
  },
  greenValue: {
    color: '#138A36',
    fontSize: fs(18),
    fontWeight: '900',
  },
  grayValue: {
    color: '#4D506E',
    fontSize: fs(15),
    fontWeight: '700',
  },
  blueValue: {
    color: '#173CFF',
    fontSize: fs(18),
    fontWeight: '900',
  },
  incentiveTitle: {
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '800',
    marginTop: rs(18),
    marginBottom: rs(12),
  },
  incentiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incentiveTrack: {
    flex: 1,
    height: rs(6),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(5),
    overflow: 'hidden',
  },
  incentiveFillBlue: {
    height: rs(6),
    backgroundColor: '#173CFF',
  },
  incentiveFillGreen: {
    height: rs(6),
    backgroundColor: '#138A36',
  },
  incentivePercent: {
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '800',
    marginLeft: rs(16),
  },
  incentiveMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(12),
  },
  incentiveMeta: {
    color: '#4D506E',
    fontSize: fs(14),
    fontWeight: '600',
  },
  rewardText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#EEF0F6',
    marginTop: rs(18),
  },
  qualifiedText: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '800',
    marginTop: rs(14),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(16),
  },
  timelineCheck: {
    width: rs(18),
    height: rs(18),
    borderRadius: rs(9),
    backgroundColor: '#138A36',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  timelineCheckText: {
    color: '#FFFFFF',
    fontSize: fs(10),
    fontWeight: '900',
  },
  timelineTitle: {
    flex: 1,
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '600',
  },
  timelineTime: {
    color: '#4D506E',
    fontSize: fs(14),
    fontWeight: '500',
  },
  adminCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(16),
  },
  actionButton: {
    width: '23%',
    height: rs(54),
    borderWidth: 1,
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: fs(15),
    fontWeight: '800',
    marginLeft: rs(10),
  },
  dealersSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    padding: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
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
    width: rs(266),
    height: rs(40),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
  },
  dealerSearchInput: {
    flex: 1,
    fontSize: fs(13),
    color: '#111327',
    marginLeft: rs(8),
    paddingVertical: 0,
  },
  dealerFilterButton: {
    width: rs(44),
    height: rs(40),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: rs(12),
  },
  dealerChipRow: {
    flexDirection: 'row',
    marginTop: rs(22),
  },
  dealerChip: {
    height: rs(32),
    minWidth: rs(86),
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
    paddingHorizontal: rs(14),
  },
  activeDealerChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  dealerChipText: {
    color: '#138A36',
    fontSize: fs(13),
    fontWeight: '800',
  },
  activeDealerChipText: {
    color: '#FFFFFF',
  },
  sortDealerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rs(10),
    marginBottom: rs(10),
  },
  sortDealerText: {
    color: '#4D506E',
    fontSize: fs(13),
    marginRight: rs(14),
  },
  sortDealerButton: {
    height: rs(36),
    minWidth: rs(190),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(5),
    paddingHorizontal: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortDealerButtonText: {
    color: '#061247',
    fontSize: fs(13),
    fontWeight: '600',
  },
  dealerTable: {
    borderRadius: rs(8),
    overflow: 'hidden',
  },
  dealerTableRow: {
    minHeight: rs(58),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
  },
  smallDealerAvatar: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  smallDealerAvatarText: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '900',
  },
  dealerNameBlock: {
    width: rs(165),
  },
  dealerName: {
    color: '#111327',
    fontSize: fs(14),
    fontWeight: '900',
  },
  dealerCity: {
    color: '#4D506E',
    fontSize: fs(12),
    marginTop: rs(5),
  },
  tableDivider: {
    height: rs(42),
    width: 1,
    backgroundColor: '#EEF0F6',
    marginHorizontal: rs(16),
  },
  revenueBlock: {
    width: rs(130),
  },
  tableRevenue: {
    color: '#138A36',
    fontSize: fs(15),
    fontWeight: '900',
  },
  tableSubText: {
    color: '#4D506E',
    fontSize: fs(11),
    marginTop: rs(4),
  },
  scoreBlock: {
    width: rs(84),
    alignItems: 'center',
  },
  smallScoreBadge: {
    minWidth: rs(70),
    height: rs(24),
    borderRadius: rs(4),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    backgroundColor: '#F6F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallScoreText: {
    color: '#173CFF',
    fontSize: fs(12),
    fontWeight: '900',
  },
  tableStatusBadge: {
    width: rs(76),
    height: rs(28),
    borderRadius: rs(5),
    borderWidth: 1,
    borderColor: '#BEE7C5',
    backgroundColor: '#EAF8EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
  },
  tableRiskBadge: {
    borderColor: '#F9C6A8',
    backgroundColor: '#FFF5EE',
  },
  tableOverdueBadge: {
    borderColor: '#FFB6B6',
    backgroundColor: '#FFF0F0',
  },
  tableStatusText: {
    color: '#138A36',
    fontSize: fs(12),
    fontWeight: '800',
  },
  loadMoreButton: {
    height: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: '#173CFF',
    fontSize: fs(15),
    fontWeight: '800',
    marginRight: rs(8),
  },
  bigCircle: {
    width: rs(180),
    height: rs(180),
    borderRadius: rs(90),
    borderWidth: rs(12),
    borderColor: '#138A36',
    alignSelf: 'center',
    marginTop: rs(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCircleValue: {
    color: '#173CFF',
    fontSize: fs(36),
    fontWeight: '900',
  },
  bigCircleSub: {
    color: '#4D506E',
    fontSize: fs(12),
    marginTop: rs(6),
  },
  onTrackBadge: {
    alignSelf: 'center',
    marginTop: rs(12),
    minWidth: rs(145),
    height: rs(30),
    borderRadius: rs(5),
    borderWidth: 1,
    borderColor: '#BEE7C5',
    backgroundColor: '#F3FFF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onTrackText: {
    color: '#138A36',
    fontSize: fs(15),
    fontWeight: '800',
  },
  greenSmall: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '800',
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: rs(20),
  },
  barItem: {
    alignItems: 'center',
  },
  barValue: {
    color: '#111327',
    fontSize: fs(11),
    fontWeight: '800',
    marginBottom: rs(8),
  },
  bar: {
    width: rs(32),
    borderTopLeftRadius: rs(4),
    borderTopRightRadius: rs(4),
  },
  barMonth: {
    color: '#4D506E',
    fontSize: fs(12),
    marginTop: rs(8),
  },
  smallProgressTrack: {
    width: rs(120),
    height: rs(7),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(6),
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: rs(10),
  },
  smallProgressFill: {
    width: '85%',
    height: rs(7),
    backgroundColor: '#138A36',
  },
  smallGray: {
    color: '#4D506E',
    fontSize: fs(12),
    marginTop: -rs(8),
    marginBottom: rs(18),
  },
  peerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(20),
  },
  peerSub: {
    color: '#4D506E',
    fontSize: fs(15),
    marginLeft: rs(20),
    flex: 1,
  },
  peerLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueDot: {
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#173CFF',
    marginRight: rs(8),
  },
  grayDot: {
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#C5C8D2',
    marginLeft: rs(24),
    marginRight: rs(8),
  },
  peerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  peerLabel: {
    width: rs(90),
    color: '#111327',
    fontSize: fs(13),
    fontWeight: '800',
  },
  peerTrack: {
    flex: 1,
    height: rs(7),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(6),
    overflow: 'hidden',
    marginRight: rs(14),
  },
  peerFillBlue: {
    width: '92%',
    height: rs(7),
    backgroundColor: '#173CFF',
  },
  peerValue: {
    width: rs(45),
    color: '#111327',
    fontSize: fs(13),
    fontWeight: '800',
  },
  peerTrackSmall: {
    flex: 0.45,
    height: rs(7),
    backgroundColor: '#E3E5EC',
    borderRadius: rs(6),
    overflow: 'hidden',
    marginRight: rs(14),
  },
  peerFillGray: {
    width: '74%',
    height: rs(7),
    backgroundColor: '#C5C8D2',
  },
  aboveAverage: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: rs(4),
  },
});
