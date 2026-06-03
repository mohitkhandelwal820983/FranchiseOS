import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Database,
  Download,
  Menu,
  Send,
  TrendingUp,
  Upload,
} from 'lucide-react-native';

import { getPayments } from '../../../api/superadmin/payment.api';

import type {
  BreakdownItem,
  LatestPayment,
  PaymentData,
  PaymentStatus,
  PeriodTab,
  SummaryCard,
} from '../../../api/mock/superadmin/payment.mock';
import { showErrorToast } from '../../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 5);

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Payments</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Upload color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const PeriodTabs = ({
  active,
  onChange,
}: {
  active: PeriodTab;
  onChange: (tab: PeriodTab) => void;
}) => {
  const tabs: PeriodTab[] = ['Today', 'Week', 'Month', 'Quarter'];

  return (
    <View style={styles.periodRow}>
      {tabs.map(tab => {
        const isActive = active === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.85}
            onPress={() => onChange(tab)}
            style={[styles.periodTab, isActive && styles.activePeriodTab]}
          >
            <Text
              style={[styles.periodText, isActive && styles.activePeriodText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SummaryIcon = ({ item }: { item: SummaryCard }) => {
  return (
    <View style={[styles.summaryIcon, { backgroundColor: item.bg }]}>
      {item.icon === 'collected' && (
        <Database color={item.color} size={rs(38)} strokeWidth={2.3} />
      )}
      {item.icon === 'outstanding' && (
        <Clock3 color={item.color} size={rs(40)} strokeWidth={2.3} />
      )}
      {item.icon === 'overdue' && (
        <AlertTriangle
          color={item.color}
          fill={item.color}
          size={rs(42)}
          strokeWidth={1.6}
        />
      )}
      {item.icon === 'revenue' && (
        <TrendingUp color={item.color} size={rs(42)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const SummaryCardItem = ({ item }: { item: SummaryCard }) => {
  return (
    <View style={styles.summaryCard}>
      <SummaryIcon item={item} />

      <View style={styles.summaryTextBox}>
        <Text style={styles.summaryTitle}>{item.title}</Text>
        <Text style={[styles.summaryValue, { color: item.color }]}>
          {item.value}
        </Text>
        <Text style={[styles.summarySubtitle, { color: item.color }]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const SummaryGrid = ({ items }: { items: SummaryCard[] }) => {
  return (
    <View style={styles.summaryGrid}>
      {items.map(item => (
        <SummaryCardItem key={item.id} item={item} />
      ))}
    </View>
  );
};

const CollectionTrendCard = ({
  data,
}: {
  data: PaymentData['collectionTrend'];
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Collection Trend</Text>

        <TouchableOpacity activeOpacity={0.85} style={styles.weeklyButton}>
          <Text style={styles.weeklyText}>Weekly</Text>
          <ChevronDown color="#061247" size={rs(20)} strokeWidth={2.3} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartArea}>
        <View style={styles.yAxisLabels}>
          <Text style={styles.axisText}>₹40L</Text>
          <Text style={styles.axisText}>₹30L</Text>
          <Text style={styles.axisText}>₹20L</Text>
          <Text style={styles.axisText}>₹0</Text>
        </View>

        <View style={styles.chartBox}>
          <View style={[styles.gridLine, { top: '0%' }]} />
          <View style={[styles.gridLine, { top: '26%' }]} />
          <View style={[styles.gridLine, { top: '52%' }]} />
          <View style={[styles.gridLine, { top: '78%' }]} />

          <View style={styles.greenFillArea} />

          <View style={[styles.blueLine, styles.blueLineOne]} />
          <View style={[styles.blueLine, styles.blueLineTwo]} />
          <View style={[styles.blueLine, styles.blueLineThree]} />

          <View style={[styles.orangeLine, styles.orangeLineOne]} />
          <View style={[styles.orangeLine, styles.orangeLineTwo]} />
          <View style={[styles.orangeLine, styles.orangeLineThree]} />

          {data.weekly.map((item, index) => {
            const leftPercent = index * 31 + 2;
            const blueTopPercent = 82 - item.collected;
            const orangeTopPercent = 88 - item.pending;

            return (
              <React.Fragment key={item.week}>
                <View
                  style={[
                    styles.blueDot,
                    {
                      left: `${leftPercent}%` as any,
                      top: `${blueTopPercent}%` as any,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.orangeDot,
                    {
                      left: `${leftPercent}%` as any,
                      top: `${orangeTopPercent}%` as any,
                    },
                  ]}
                />
              </React.Fragment>
            );
          })}

          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{data.collected} Collected</Text>
          </View>
        </View>
      </View>

      <View style={styles.xAxisRow}>
        {data.weekly.map(item => (
          <Text key={item.week} style={styles.xAxisText}>
            {item.week}
          </Text>
        ))}
      </View>

      <View style={styles.trendCardsRow}>
        <View style={[styles.trendSmallCard, styles.collectedSmallCard]}>
          <Text style={styles.greenLegend}>● Collected</Text>
          <Text style={styles.greenBig}>{data.collected}</Text>
        </View>

        <View style={[styles.trendSmallCard, styles.pendingSmallCard]}>
          <Text style={styles.orangeLegend}>● Pending</Text>
          <Text style={styles.orangeBig}>{data.pending}</Text>
        </View>

        <View style={[styles.trendSmallCard, styles.overdueSmallCard]}>
          <Text style={styles.redLegend}>● Overdue</Text>
          <Text style={styles.redBig}>{data.overdue}</Text>
        </View>
      </View>
    </View>
  );
};

const CompanyBreakdownCard = ({ items }: { items: BreakdownItem[] }) => {
  const maxValue = Math.max(
    ...items.map(item => item.collected + item.pending + item.overdue),
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Company Breakdown</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      <View style={styles.breakdownList}>
        {items.map(item => {
          const collectedWidth = `${(item.collected / maxValue) * 100}%` as any;
          const pendingWidth = `${(item.pending / maxValue) * 100}%` as any;
          const overdueWidth = `${(item.overdue / maxValue) * 100}%` as any;

          return (
            <View key={item.id} style={styles.breakdownRow}>
              <Text style={styles.companyName}>{item.company}</Text>

              <View style={styles.stackedBar}>
                <View style={[styles.collectedBar, { width: collectedWidth }]}>
                  {item.collected > 0 && (
                    <Text style={styles.barText}>₹{item.collected}L</Text>
                  )}
                </View>

                <View style={[styles.pendingBar, { width: pendingWidth }]}>
                  {item.pending > 0 && (
                    <Text style={styles.barText}>₹{item.pending}L</Text>
                  )}
                </View>

                <View style={[styles.overdueBar, { width: overdueWidth }]}>
                  {item.overdue > 0 && (
                    <Text style={styles.barText}>₹{item.overdue}L</Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.breakdownFooter}>
        <View style={styles.legendItem}>
          <View style={styles.legendGreenBox} />
          <Text style={styles.legendText}>Collected</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={styles.legendOrangeBox} />
          <Text style={styles.legendText}>Pending</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={styles.legendRedBox} />
          <Text style={styles.legendText}>Overdue</Text>
        </View>

        <Text style={styles.amountNote}>All amounts in ₹</Text>
      </View>
    </View>
  );
};

const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const isCollected = status === 'Collected';
  const isPending = status === 'Pending';
  const isOverdue = status === 'Overdue';
  const isProcessing = status === 'Processing';

  return (
    <View
      style={[
        styles.paymentBadge,
        isCollected && styles.collectedBadge,
        isPending && styles.pendingBadge,
        isOverdue && styles.overdueBadge,
        isProcessing && styles.processingBadge,
      ]}
    >
      <Text
        style={[
          styles.paymentBadgeText,
          isCollected && styles.collectedBadgeText,
          isPending && styles.pendingBadgeText,
          isOverdue && styles.overdueBadgeText,
          isProcessing && styles.processingBadgeText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const LatestPaymentIcon = ({ status }: { status: PaymentStatus }) => {
  const isCollected = status === 'Collected';
  const isPending = status === 'Pending';
  const isOverdue = status === 'Overdue';

  return (
    <View
      style={[
        styles.latestIcon,
        isCollected && { backgroundColor: '#138A36' },
        isPending && { backgroundColor: '#F06419' },
        isOverdue && { backgroundColor: '#E00014' },
        status === 'Processing' && { backgroundColor: '#173CFF' },
      ]}
    >
      {isCollected && <CheckCircle2 color="#FFFFFF" size={rs(34)} />}
      {isPending && <Clock3 color="#FFFFFF" size={rs(34)} />}
      {isOverdue && <AlertTriangle color="#FFFFFF" size={rs(34)} />}
      {status === 'Processing' && <CreditCard color="#FFFFFF" size={rs(34)} />}
    </View>
  );
};

const LatestPaymentsCard = ({ items }: { items: LatestPayment[] }) => {
  return (
    <View style={styles.latestCard}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Latest Payments</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.paymentRow}
        >
          <LatestPaymentIcon status={item.status} />

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentCompany}>{item.company}</Text>
            <Text style={styles.paymentDescription}>{item.description}</Text>
          </View>

          <View style={styles.paymentRight}>
            <Text style={styles.paymentTime}>{item.time}</Text>
            <Text
              style={[
                styles.paymentAmount,
                item.status === 'Collected' && { color: '#138A36' },
                item.status === 'Pending' && { color: '#F06419' },
                item.status === 'Overdue' && { color: '#E00014' },
                item.status === 'Processing' && { color: '#173CFF' },
              ]}
            >
              {item.amount}
            </Text>
          </View>

          <PaymentStatusBadge status={item.status} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BottomActions = () => {
  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.exportButton}
        onPress={() => Alert.alert('Export Report', 'Payment report exported.')}
      >
        <Download color="#061247" size={rs(24)} strokeWidth={2.3} />
        <Text style={styles.exportText}>Export Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.reminderButton}
        onPress={() => Alert.alert('Send Reminders', 'Payment reminders sent.')}
      >
        <Send color="#FFFFFF" size={rs(24)} strokeWidth={2.3} />
        <Text style={styles.reminderText}>Send Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentScreen = () => {
  const [allData, setAllData] = useState<Record<PeriodTab, PaymentData> | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<PeriodTab>('Month');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadPayments = useCallback(async () => {
    try {
      setError('');

      const response = await getPayments();

      setAllData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load payment data';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPayments();
  }, [loadPayments]);

  const activeData = useMemo(() => {
    if (!allData) {
      return null;
    }

    return allData[activeTab];
  }, [allData, activeTab]);

  const handleRetry = () => {
    setLoading(true);
    loadPayments();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  if (error || !activeData) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />

        <Text
          style={{
            color: '#061247',
            fontSize: rs(18),
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
          <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Retry</Text>
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
        <PeriodTabs active={activeTab} onChange={setActiveTab} />

        <SummaryGrid items={activeData.summary} />

        <CollectionTrendCard data={activeData.collectionTrend} />

        <CompanyBreakdownCard items={activeData.companyBreakdown} />

        <LatestPaymentsCard items={activeData.latestPayments} />

        <BottomActions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const PAGE_PADDING = rs(28);
const CARD_GAP = rs(16);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;

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
    height: rs(96),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(30),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(34),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(24),
    paddingBottom: rs(120),
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(22),
  },
  periodTab: {
    width: (SCREEN_WIDTH - PAGE_PADDING * 2 - rs(90)) / 4,
    height: rs(48),
    borderWidth: 1,
    borderColor: '#BFC3D3',
    borderRadius: rs(7),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePeriodTab: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  periodText: {
    color: '#061247',
    fontSize: fs(17),
    fontWeight: '800',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  summaryCard: {
    width: HALF_WIDTH,
    height: rs(142),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  summaryIcon: {
    width: rs(92),
    height: rs(92),
    borderRadius: rs(46),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
  },
  summaryTextBox: {
    flex: 1,
  },
  summaryTitle: {
    color: '#5D607E',
    fontSize: fs(16),
    fontWeight: '700',
    marginBottom: rs(9),
  },
  summaryValue: {
    fontSize: fs(30),
    fontWeight: '900',
    letterSpacing: rs(2.5),
  },
  summarySubtitle: {
    fontSize: fs(15),
    fontWeight: '800',
    marginTop: rs(9),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  latestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(18),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  cardHeaderRow: {
    minHeight: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(10),
  },
  cardTitle: {
    color: '#111327',
    fontSize: fs(24),
    fontWeight: '900',
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: fs(18),
    fontWeight: '800',
  },
  weeklyButton: {
    width: rs(128),
    height: rs(38),
    borderWidth: 1,
    borderColor: '#D8DCE8',
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(14),
  },
  weeklyText: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '800',
  },
  chartArea: {
    height: rs(230),
    flexDirection: 'row',
    marginTop: rs(10),
  },
  yAxisLabels: {
    width: rs(54),
    justifyContent: 'space-between',
    paddingVertical: rs(6),
  },
  axisText: {
    color: '#5D607E',
    fontSize: fs(13),
    fontWeight: '700',
  },
  chartBox: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D8DCE8',
    overflow: 'visible',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D8DCE8',
  },
  greenFillArea: {
    position: 'absolute',
    left: rs(24),
    right: rs(64),
    bottom: 0,
    height: '62%',
    backgroundColor: 'rgba(19, 138, 54, 0.12)',
  },
  blueLine: {
    position: 'absolute',
    borderTopWidth: 3,
    borderColor: '#173CFF',
  },
  blueLineOne: {
    left: '4%',
    top: '52%',
    width: '31%',
    transform: [{ rotate: '-12deg' }],
  },
  blueLineTwo: {
    left: '34%',
    top: '30%',
    width: '31%',
    transform: [{ rotate: '-1deg' }],
  },
  blueLineThree: {
    left: '64%',
    top: '24%',
    width: '30%',
    transform: [{ rotate: '-7deg' }],
  },
  orangeLine: {
    position: 'absolute',
    borderTopWidth: 2,
    borderColor: '#F06419',
    borderStyle: 'dashed',
  },
  orangeLineOne: {
    left: '4%',
    top: '72%',
    width: '31%',
    transform: [{ rotate: '-5deg' }],
  },
  orangeLineTwo: {
    left: '34%',
    top: '66%',
    width: '31%',
    transform: [{ rotate: '-4deg' }],
  },
  orangeLineThree: {
    left: '64%',
    top: '60%',
    width: '30%',
    transform: [{ rotate: '-5deg' }],
  },
  blueDot: {
    position: 'absolute',
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#173CFF',
  },
  orangeDot: {
    position: 'absolute',
    width: rs(11),
    height: rs(11),
    borderRadius: rs(5.5),
    backgroundColor: '#F06419',
  },
  tooltip: {
    position: 'absolute',
    right: rs(22),
    top: -rs(16),
    backgroundColor: '#173CFF',
    borderRadius: rs(4),
    height: rs(26),
    paddingHorizontal: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: fs(14),
    fontWeight: '800',
  },
  xAxisRow: {
    marginLeft: rs(54),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(12),
    marginBottom: rs(16),
  },
  xAxisText: {
    color: '#5D607E',
    fontSize: fs(15),
    fontWeight: '700',
  },
  trendCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendSmallCard: {
    width: '31%',
    height: rs(68),
    borderWidth: 1,
    borderRadius: rs(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectedSmallCard: {
    backgroundColor: '#F0FAF3',
    borderColor: '#88C99A',
  },
  pendingSmallCard: {
    backgroundColor: '#FFF8F1',
    borderColor: '#F8C9A8',
  },
  overdueSmallCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FFB6B6',
  },
  greenLegend: {
    color: '#138A36',
    fontSize: fs(14),
    fontWeight: '800',
  },
  orangeLegend: {
    color: '#F06419',
    fontSize: fs(14),
    fontWeight: '800',
  },
  redLegend: {
    color: '#E00014',
    fontSize: fs(14),
    fontWeight: '800',
  },
  greenBig: {
    color: '#138A36',
    fontSize: fs(22),
    fontWeight: '900',
    marginTop: rs(4),
  },
  orangeBig: {
    color: '#F06419',
    fontSize: fs(22),
    fontWeight: '900',
    marginTop: rs(4),
  },
  redBig: {
    color: '#E00014',
    fontSize: fs(22),
    fontWeight: '900',
    marginTop: rs(4),
  },
  breakdownList: {
    marginTop: rs(4),
  },
  breakdownRow: {
    height: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    width: rs(120),
    color: '#44465F',
    fontSize: fs(17),
    fontWeight: '700',
  },
  stackedBar: {
    flex: 1,
    height: rs(24),
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: rs(3),
  },
  collectedBar: {
    height: '100%',
    backgroundColor: '#138A36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBar: {
    height: '100%',
    backgroundColor: '#F06419',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueBar: {
    height: '100%',
    backgroundColor: '#E00014',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barText: {
    color: '#FFFFFF',
    fontSize: fs(13),
    fontWeight: '900',
  },
  breakdownFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(16),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rs(28),
  },
  legendGreenBox: {
    width: rs(12),
    height: rs(12),
    backgroundColor: '#138A36',
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendOrangeBox: {
    width: rs(12),
    height: rs(12),
    backgroundColor: '#F06419',
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendRedBox: {
    width: rs(12),
    height: rs(12),
    backgroundColor: '#E00014',
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendText: {
    color: '#5D607E',
    fontSize: fs(13),
    fontWeight: '700',
  },
  amountNote: {
    marginLeft: 'auto',
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '700',
  },
  paymentRow: {
    minHeight: rs(76),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  latestIcon: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
  },
  paymentInfo: {
    flex: 1,
  },
  paymentCompany: {
    color: '#111327',
    fontSize: fs(17),
    fontWeight: '900',
  },
  paymentDescription: {
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '600',
    marginTop: rs(6),
  },
  paymentRight: {
    width: rs(160),
  },
  paymentTime: {
    color: '#5D607E',
    fontSize: fs(13),
    fontWeight: '700',
  },
  paymentAmount: {
    fontSize: fs(20),
    fontWeight: '900',
    marginTop: rs(7),
  },
  paymentBadge: {
    width: rs(104),
    height: rs(34),
    borderRadius: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentBadgeText: {
    fontSize: fs(14),
    fontWeight: '900',
  },
  collectedBadge: {
    backgroundColor: '#EAF8EC',
    borderWidth: 1,
    borderColor: '#BEE7C5',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E9',
    borderWidth: 1,
    borderColor: '#F8C9A8',
  },
  overdueBadge: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFB6B6',
  },
  processingBadge: {
    backgroundColor: '#F1F5FF',
    borderWidth: 1,
    borderColor: '#B8C8FF',
  },
  collectedBadgeText: {
    color: '#138A36',
  },
  pendingBadgeText: {
    color: '#F06419',
  },
  overdueBadgeText: {
    color: '#E00014',
  },
  processingBadgeText: {
    color: '#173CFF',
  },
  bottomActions: {
    height: rs(52),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportButton: {
    width: '48%',
    height: rs(52),
    borderWidth: 1,
    borderColor: '#061247',
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportText: {
    color: '#061247',
    fontSize: fs(17),
    fontWeight: '800',
    marginLeft: rs(10),
  },
  reminderButton: {
    width: '48%',
    height: rs(52),
    borderRadius: rs(6),
    backgroundColor: '#061B66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: {
    color: '#FFFFFF',
    fontSize: fs(17),
    fontWeight: '800',
    marginLeft: rs(10),
  },
});
