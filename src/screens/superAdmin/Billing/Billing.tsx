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
import { colors, fonts, size as rs, superAdminTextSize as fs } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(36)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Payments</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Upload color={colors.white} size={rs(34)} strokeWidth={2.4} />
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
        <Database color={item.color} size={rs(30)} strokeWidth={2.3} />
      )}
      {item.icon === 'outstanding' && (
        <Clock3 color={item.color} size={rs(32)} strokeWidth={2.3} />
      )}
      {item.icon === 'overdue' && (
        <AlertTriangle
          color={item.color}
          fill={item.color}
          size={rs(34)}
          strokeWidth={1.6}
        />
      )}
      {item.icon === 'revenue' && (
        <TrendingUp color={item.color} size={rs(34)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const SummaryCardItem = ({ item }: { item: SummaryCard }) => {
  return (
    <View style={styles.summaryCard}>
      <SummaryIcon item={item} />

      <View style={styles.summaryTextBox}>
        <Text numberOfLines={1} style={styles.summaryTitle}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.72}
          style={[styles.summaryValue, { color: item.color }]}
        >
          {item.value}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          style={[styles.summarySubtitle, { color: item.color }]}
        >
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
          <ChevronDown color={colors.primaryText} size={rs(20)} strokeWidth={2.3} />
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
          <Text numberOfLines={1} style={styles.greenLegend}>
            ● Collected
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={styles.greenBig}
          >
            {data.collected}
          </Text>
        </View>

        <View style={[styles.trendSmallCard, styles.pendingSmallCard]}>
          <Text numberOfLines={1} style={styles.orangeLegend}>
            ● Pending
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={styles.orangeBig}
          >
            {data.pending}
          </Text>
        </View>

        <View style={[styles.trendSmallCard, styles.overdueSmallCard]}>
          <Text numberOfLines={1} style={styles.redLegend}>
            ● Overdue
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={styles.redBig}
          >
            {data.overdue}
          </Text>
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
        isCollected && { backgroundColor: colors.success },
        isPending && { backgroundColor: colors.profileOrange },
        isOverdue && { backgroundColor: colors.dangerDark },
        status === 'Processing' && { backgroundColor: colors.financeBlue },
      ]}
    >
      {isCollected && <CheckCircle2 color={colors.white} size={rs(34)} />}
      {isPending && <Clock3 color={colors.white} size={rs(34)} />}
      {isOverdue && <AlertTriangle color={colors.white} size={rs(34)} />}
      {status === 'Processing' && <CreditCard color={colors.white} size={rs(34)} />}
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
                item.status === 'Collected' && { color: colors.success },
                item.status === 'Pending' && { color: colors.profileOrange },
                item.status === 'Overdue' && { color: colors.dangerDark },
                item.status === 'Processing' && { color: colors.financeBlue },
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
        <Download color={colors.primaryText} size={rs(24)} strokeWidth={2.3} />
        <Text style={styles.exportText}>Export Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.reminderButton}
        onPress={() => Alert.alert('Send Reminders', 'Payment reminders sent.')}
      >
        <Send color={colors.white} size={rs(24)} strokeWidth={2.3} />
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
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  if (error || !activeData) {
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
    fontSize: fs(34),
    fontFamily: fonts.extraBold,
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
    borderColor: colors.superAdminTabBorder,
    borderRadius: rs(7),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePeriodTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    color: colors.primaryText,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
  },
  activePeriodText: {
    color: colors.white,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  summaryCard: {
    width: HALF_WIDTH,
    minHeight: rs(142),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(14),
    paddingVertical: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  summaryIcon: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  summaryTextBox: {
    flex: 1,
    minWidth: 0,
  },
  summaryTitle: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
    marginBottom: rs(6),
  },
  summaryValue: {
    fontSize: fs(24),
    fontFamily: fonts.extraBold,
    letterSpacing: rs(0.5),
  },
  summarySubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginTop: rs(6),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(18),
    marginBottom: rs(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  latestCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(18),
    marginBottom: rs(16),
    shadowColor: colors.black,
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
    color: colors.text,
    fontSize: fs(24),
    fontFamily: fonts.extraBold,
  },
  viewAllText: {
    color: colors.financeBlue,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  weeklyButton: {
    width: rs(128),
    height: rs(38),
    borderWidth: 1,
    borderColor: colors.superAdminBorder,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(14),
  },
  weeklyText: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
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
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
  },
  chartBox: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.superAdminBorder,
    overflow: 'visible',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.superAdminBorder,
  },
  greenFillArea: {
    position: 'absolute',
    left: rs(24),
    right: rs(64),
    bottom: 0,
    height: '62%',
    backgroundColor: colors.superAdminGreenArea,
  },
  blueLine: {
    position: 'absolute',
    borderTopWidth: 3,
    borderColor: colors.financeBlue,
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
    borderColor: colors.profileOrange,
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
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.financeBlue,
  },
  orangeDot: {
    position: 'absolute',
    width: rs(11),
    height: rs(11),
    borderRadius: rs(5.5),
    backgroundColor: colors.profileOrange,
  },
  tooltip: {
    position: 'absolute',
    right: rs(22),
    top: -rs(16),
    backgroundColor: colors.financeBlue,
    borderRadius: rs(4),
    height: rs(26),
    paddingHorizontal: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  xAxisRow: {
    marginLeft: rs(54),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(12),
    marginBottom: rs(16),
  },
  xAxisText: {
    color: colors.slateText,
    fontSize: fs(15),
    fontFamily: fonts.bold,
  },
  trendCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendSmallCard: {
    width: '31%',
    minHeight: rs(68),
    borderWidth: 1,
    borderRadius: rs(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
    paddingVertical: rs(8),
  },
  collectedSmallCard: {
    backgroundColor: colors.superAdminCollectedBg,
    borderColor: colors.superAdminCollectedBorder,
  },
  pendingSmallCard: {
    backgroundColor: colors.superAdminPendingBg,
    borderColor: colors.orangeBorder,
  },
  overdueSmallCard: {
    backgroundColor: colors.stockistDangerSoft,
    borderColor: colors.dangerBorder,
  },
  greenLegend: {
    color: colors.success,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
  },
  orangeLegend: {
    color: colors.profileOrange,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
  },
  redLegend: {
    color: colors.dangerDark,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
  },
  greenBig: {
    color: colors.success,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
    marginTop: rs(4),
    textAlign: 'center',
  },
  orangeBig: {
    color: colors.profileOrange,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
    marginTop: rs(4),
    textAlign: 'center',
  },
  redBig: {
    color: colors.dangerDark,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
    marginTop: rs(4),
    textAlign: 'center',
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
    color: colors.superAdminCompanyText,
    fontSize: fs(17),
    fontFamily: fonts.bold,
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
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBar: {
    height: '100%',
    backgroundColor: colors.profileOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueBar: {
    height: '100%',
    backgroundColor: colors.dangerDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barText: {
    color: colors.white,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
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
    backgroundColor: colors.success,
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendOrangeBox: {
    width: rs(12),
    height: rs(12),
    backgroundColor: colors.profileOrange,
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendRedBox: {
    width: rs(12),
    height: rs(12),
    backgroundColor: colors.dangerDark,
    borderRadius: rs(2),
    marginRight: rs(8),
  },
  legendText: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
  },
  amountNote: {
    marginLeft: 'auto',
    color: colors.slateText,
    fontSize: fs(14),
    fontFamily: fonts.bold,
  },
  paymentRow: {
    minHeight: rs(76),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
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
    color: colors.text,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
  },
  paymentDescription: {
    color: colors.slateText,
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
    marginTop: rs(6),
  },
  paymentRight: {
    width: rs(160),
  },
  paymentTime: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
  },
  paymentAmount: {
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
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
    fontFamily: fonts.extraBold,
  },
  collectedBadge: {
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  pendingBadge: {
    backgroundColor: colors.orangeSoft,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
  },
  overdueBadge: {
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  processingBadge: {
    backgroundColor: colors.blueLight,
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
  },
  collectedBadgeText: {
    color: colors.success,
  },
  pendingBadgeText: {
    color: colors.profileOrange,
  },
  overdueBadgeText: {
    color: colors.dangerDark,
  },
  processingBadgeText: {
    color: colors.financeBlue,
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
    borderColor: colors.primaryText,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportText: {
    color: colors.primaryText,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
    marginLeft: rs(10),
  },
  reminderButton: {
    width: '48%',
    height: rs(52),
    borderRadius: rs(6),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: {
    color: colors.white,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
    marginLeft: rs(10),
  },
});
