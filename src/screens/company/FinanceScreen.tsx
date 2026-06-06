import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import {colors, financeTextSize, fonts, size} from '../../theme';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Database,
  Download,
  FileText,
  Menu,
  WalletCards,
} from 'lucide-react-native';
import {
  CompanyFinanceData,
  DirectDealerRevenue,
  FinanceKpi,
  FinanceTabType,
  PeriodType,
  StockistRevenue,
} from '../../api/mock/company/companyFinance.mock';
import { getCompanyFinance } from '../../api/company/companyFinance.api';
import { showErrorToast } from '../../utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={size(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Finance</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Download color={colors.white} size={size(34)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const PeriodTabs = ({
  activePeriod,
  onChange,
}: {
  activePeriod: PeriodType;
  onChange: (period: PeriodType) => void;
}) => {
  const periods: PeriodType[] = ['Today', 'Week', 'Month', 'Quarter', 'Custom'];

  return (
    <View style={styles.periodRow}>
      {periods.map(period => {
        const active = activePeriod === period;

        return (
          <TouchableOpacity
            key={period}
            activeOpacity={0.8}
            onPress={() => onChange(period)}
            style={[styles.periodPill, active && styles.activePeriodPill]}
          >
            <Text
              style={[styles.periodText, active && styles.activePeriodText]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const KpiIcon = ({ item }: { item: FinanceKpi }) => {
  return (
    <View style={[styles.kpiIconBox, { backgroundColor: item.iconBg }]}>
      {item.icon === 'revenue' && (
        <Database color={colors.white} size={size(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'commission' && (
        <WalletCards color={colors.white} size={size(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'outstanding' && (
        <BarChart3 color={colors.white} size={size(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'overdue' && (
        <AlertTriangle color={colors.white} size={size(31)} strokeWidth={2.3} />
      )}
    </View>
  );
};

const KpiCard = ({ item }: { item: FinanceKpi }) => {
  return (
    <View style={styles.kpiCard}>
      <KpiIcon item={item} />

      <View style={styles.kpiTextBox}>
        <Text style={styles.kpiTitle}>{item.title}</Text>
        <Text style={[styles.kpiValue, { color: item.color }]}>
          {item.value}
        </Text>
        <Text style={[styles.kpiSubtitle, { color: item.color }]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const KpiGrid = ({ items }: { items: FinanceKpi[] }) => {
  return (
    <View style={styles.kpiGrid}>
      {items.map(item => (
        <KpiCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const FinanceTabs = ({
  activeTab,
  onChange,
}: {
  activeTab: FinanceTabType;
  onChange: (tab: FinanceTabType) => void;
}) => {
  const tabs: FinanceTabType[] = [
    'Revenue',
    'Commission',
    'Payments',
    'Incentives',
  ];

  return (
    <View style={styles.financeTabs}>
      {tabs.map(tab => {
        const active = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onChange(tab)}
            style={[styles.financeTab, active && styles.activeFinanceTab]}
          >
            <Text
              style={[
                styles.financeTabText,
                active && styles.activeFinanceTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RevenueSourceCard = ({ data }: { data: CompanyFinanceData }) => {
  return (
    <View style={styles.revenueSourceCard}>
      <Text style={styles.cardTitle}>Where Revenue Comes From</Text>

      <View style={styles.donutWrap}>
        <View style={styles.donutCircle}>
          <Text style={styles.donutAmount}>{data.revenueSplit.total}</Text>
          <Text style={styles.donutLabel}>Total MTD</Text>
        </View>

        <Text style={styles.donutPercentRight}>
          {data.revenueSplit.directDealerPercent}
        </Text>
        <Text style={styles.donutPercentLeft}>
          {data.revenueSplit.stockistPercent}
        </Text>
      </View>

      <View style={styles.legendWrap}>
        <View style={styles.legendRow}>
          <View style={styles.darkDot} />
          <Text style={styles.legendLabel}>Via Stockists</Text>
          <Text style={styles.legendValue}>
            {data.revenueSplit.stockistRevenue} (
            {data.revenueSplit.stockistPercent})
          </Text>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.blueDot} />
          <Text style={styles.legendLabel}>Direct Dealers</Text>
          <Text style={styles.legendValue}>
            {data.revenueSplit.directDealerRevenue} (
            {data.revenueSplit.directDealerPercent})
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProgressBar = ({ value, color }: { value: number; color: string }) => {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${value}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{value}%</Text>
    </View>
  );
};

const RevenueByStockistCard = ({
  stockists,
  onToggle,
}: {
  stockists: StockistRevenue[];
  onToggle: (id: string) => void;
}) => {
  return (
    <View style={styles.stockistRevenueCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Revenue by Stockist</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {stockists.map(stockist => (
        <View key={stockist.id} style={styles.stockistBlock}>
          <View style={styles.stockistTopRow}>
            <View
              style={[
                styles.stockistAvatar,
                { backgroundColor: stockist.color },
              ]}
            >
              <Text style={styles.avatarText}>{stockist.initials}</Text>
            </View>

            <View style={styles.stockistInfo}>
              <Text style={styles.stockistName}>{stockist.name}</Text>
              <Text style={styles.stockistTargetText}>
                {stockist.targetText}
              </Text>
              <ProgressBar
                value={stockist.progress}
                color={stockist.progressColor}
              />
            </View>

            <View style={styles.stockistAmountBox}>
              <Text
                style={[
                  styles.stockistRevenue,
                  stockist.progressColor === colors.financeRed && { color: colors.financeRed },
                ]}
              >
                {stockist.revenue}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onToggle(stockist.id)}
                style={styles.showDealerButton}
              >
                <ChevronDown
                  color={colors.darkText}
                  size={size(18)}
                  strokeWidth={2.3}
                  style={{
                    transform: [
                      { rotate: stockist.expanded ? '0deg' : '-90deg' },
                    ],
                  }}
                />
                <Text style={styles.showDealerText}>Show Dealers</Text>
              </TouchableOpacity>
            </View>
          </View>

          {stockist.expanded && stockist.dealers.length > 0 && (
            <View style={styles.dealerTree}>
              {stockist.dealers.map(dealer => (
                <View key={dealer.id} style={styles.dealerRevenueRow}>
                  <View
                    style={[
                      styles.dealerAvatar,
                      { backgroundColor: dealer.color },
                    ]}
                  >
                    <Text style={styles.dealerAvatarText}>
                      {dealer.initials}
                    </Text>
                  </View>

                  <Text style={styles.dealerName}>{dealer.name}</Text>

                  <View style={styles.dealerAmountBox}>
                    <Text
                      style={[
                        styles.dealerRevenue,
                        dealer.targetColor === colors.financeOrange && {
                          color: colors.financeOrange,
                        },
                      ]}
                    >
                      {dealer.revenue}
                    </Text>
                    <Text
                      style={[
                        styles.dealerTarget,
                        { color: dealer.targetColor },
                      ]}
                    >
                      {dealer.target}
                    </Text>
                  </View>

                  <ChevronRight
                    color={colors.darkText}
                    size={size(22)}
                    strokeWidth={2.4}
                  />
                </View>
              ))}

              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.moreDealersText}>+9 more dealers</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const DirectDealersRevenueCard = ({
  dealers,
}: {
  dealers: DirectDealerRevenue[];
}) => {
  return (
    <View style={styles.directDealerCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.directDealerTitle}>Direct Dealers Revenue</Text>
        <Text style={styles.directDealerAmount}>₹10,00,000</Text>
      </View>

      {dealers.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.directDealerRow}
        >
          <View style={styles.directDealerAvatar}>
            <Text style={styles.directDealerAvatarText}>{item.initials}</Text>
          </View>

          <Text style={styles.directDealerName}>{item.name}</Text>

          <Text style={styles.directDealerRevenue}>{item.revenue}</Text>

          <ChevronRight color={colors.darkText} size={size(18)} strokeWidth={2.4} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MonthlyTrendCard = () => {
  return (
    <View style={styles.monthlyTrendCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.cardTitle}>Monthly Trend</Text>

        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={styles.blueLine} />
            <Text style={styles.chartLegendText}>Actual Revenue</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.dashedLine} />
            <Text style={styles.chartLegendText}>Target Revenue</Text>
          </View>
        </View>
      </View>

      <View style={styles.fakeChart}>
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>₹30L</Text>
          <Text style={styles.axisText}>₹20L</Text>
          <Text style={styles.axisText}>₹10L</Text>
          <Text style={styles.axisText}>₹0</Text>
        </View>

        <View style={styles.chartArea}>
          <View style={styles.gridLine} />
          <View style={[styles.gridLine, { top: '35%' }]} />
          <View style={[styles.gridLine, { top: '66%' }]} />

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
            <Text key={month} style={styles.monthLabel}>
              {month}
            </Text>
          ))}

          <View style={styles.lineOne} />
          <View style={styles.lineTwo} />
          <View style={styles.lineDot} />
        </View>
      </View>
    </View>
  );
};

const RevenueSection = ({
  data,
  onToggleStockist,
}: {
  data: CompanyFinanceData;
  onToggleStockist: (id: string) => void;
}) => {
  return (
    <>
      <View style={styles.revenueLayout}>
        <RevenueSourceCard data={data} />

        <RevenueByStockistCard
          stockists={data.stockists}
          onToggle={onToggleStockist}
        />
      </View>

      <View style={styles.revenueLayout}>
        <DirectDealersRevenueCard dealers={data.directDealers} />
        <MonthlyTrendCard />
      </View>
    </>
  );
};

const CommissionOverview = ({
  data,
  approvedAll,
  onApprove,
}: {
  data: CompanyFinanceData;
  approvedAll: boolean;
  onApprove: () => void;
}) => {
  return (
    <View style={styles.commissionCard}>
      <Text style={styles.cardTitle}>Commission Overview</Text>

      <View style={styles.commissionStats}>
        <View style={styles.commissionStat}>
          <Text style={styles.commissionLabel}>Total Generated</Text>
          <Text style={styles.commissionBlue}>
            {data.commission.totalGenerated}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.commissionStat}>
          <Text style={styles.commissionLabel}>Stockist Commissions 5%</Text>
          <Text style={styles.commissionBlue}>
            {data.commission.stockistCommissions}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.commissionStat}>
          <Text style={styles.commissionLabel}>Dealer Commissions 3%</Text>
          <Text style={styles.commissionBlue}>
            {data.commission.dealerCommissions}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.commissionStat}>
          <Text style={styles.commissionLabel}>Pending Payout</Text>
          <Text style={styles.commissionOrange}>
            {data.commission.pendingPayout}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onApprove}
        style={[styles.approveButton, approvedAll && styles.approvedButton]}
      >
        <Text style={styles.approveButtonText}>
          {approvedAll ? 'All Payouts Approved' : 'Approve All Payouts'}
        </Text>
        <CheckCircle2 color={colors.white} size={size(20)} fill={colors.white} />
      </TouchableOpacity>

      <View style={styles.commissionTableHeader}>
        <Text style={styles.tableHeaderText}>Entity</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <View style={{ width: size(20) }} />
      </View>

      {data.commission.rows.map(row => {
        const paid = approvedAll || row.status === 'Paid';

        return (
          <TouchableOpacity
            key={row.id}
            activeOpacity={0.8}
            style={styles.commissionRow}
          >
            <Text style={styles.entityText}>{row.entity}</Text>
            <Text style={styles.amountColumn}>{row.amount}</Text>

            <View
              style={[
                styles.payoutBadge,
                paid ? styles.paidBadge : styles.pendingBadge,
              ]}
            >
              <Text
                style={[
                  styles.payoutText,
                  paid ? styles.paidText : styles.pendingText,
                ]}
              >
                {paid ? 'Paid' : 'Pending'}
              </Text>
              {paid && (
                <CheckCircle2 color={colors.success} size={size(14)} fill={colors.success} />
              )}
            </View>

            <ChevronRight color={colors.darkText} size={size(20)} strokeWidth={2.4} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const PaymentsSection = ({ data }: { data: CompanyFinanceData }) => {
  return (
    <View style={styles.simpleFullCard}>
      <Text style={styles.cardTitle}>Payments Overview</Text>

      {[
        ['Total Outstanding', data.kpis[2].value],
        ['Overdue Payments', data.kpis[3].value],
        ['Pending Invoices', data.kpis[2].subtitle],
        ['Overdue Franchises', data.kpis[3].subtitle],
      ].map(item => (
        <View key={item[0]} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{item[0]}</Text>
          <Text style={styles.infoValue}>{item[1]}</Text>
        </View>
      ))}
    </View>
  );
};

const IncentivesSection = ({ data }: { data: CompanyFinanceData }) => {
  return (
    <View style={styles.simpleFullCard}>
      <Text style={styles.cardTitle}>Incentives Overview</Text>

      {[
        ['Eligible Stockists', '8'],
        ['Eligible Dealers', '27'],
        ['Reward Pool', data.commission.pendingPayout],
        ['Approval Status', 'Pending Review'],
      ].map(item => (
        <View key={item[0]} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{item[0]}</Text>
          <Text style={styles.infoValue}>{item[1]}</Text>
        </View>
      ))}
    </View>
  );
};

const FinanceActions = () => {
  return (
    <View style={styles.financeActions}>
      <TouchableOpacity activeOpacity={0.8} style={styles.reportButton}>
        <FileText color={colors.primary} size={size(22)} strokeWidth={2.3} />
        <Text style={styles.reportButtonText}>Export Finance Report</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.excelButton}>
        <Download color={colors.white} size={size(22)} strokeWidth={2.3} />
        <Text style={styles.excelButtonText}>Download Excel</Text>
      </TouchableOpacity>
    </View>
  );
};

const FinanceScreen = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('Month');
  const [activeTab, setActiveTab] = useState<FinanceTabType>('Revenue');
  const [data, setData] = useState<CompanyFinanceData | null>(null);
  const [approvedAll, setApprovedAll] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadFinance = useCallback(async () => {
    try {
      setError('');
      setApprovedAll(false);

      const response = await getCompanyFinance(activePeriod);

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load company finance';

      showErrorToast(errorMessage);

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activePeriod]);

  useEffect(() => {
    setLoading(true);
    loadFinance();
  }, [loadFinance]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFinance();
  }, [loadFinance]);

  const displayedData = useMemo(() => {
    return data;
  }, [data]);

  const toggleStockist = (id: string) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      stockists: data.stockists.map(item =>
        item.id === id ? { ...item, expanded: !item.expanded } : item,
      ),
    });
  };

  const handleRetry = () => {
    setLoading(true);
    loadFinance();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  if (error || !displayedData) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Text
          style={{
            color: colors.darkText,
            fontSize: financeTextSize(18),
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
            style={{ color: colors.white, fontSize: financeTextSize(14), fontFamily: fonts.extraBold }}
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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PeriodTabs activePeriod={activePeriod} onChange={setActivePeriod} />

        <KpiGrid items={displayedData.kpis} />

        <FinanceTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Revenue' && (
          <RevenueSection
            data={displayedData}
            onToggleStockist={toggleStockist}
          />
        )}

        {activeTab === 'Commission' && (
          <CommissionOverview
            data={displayedData}
            approvedAll={approvedAll}
            onApprove={() => setApprovedAll(true)}
          />
        )}

        {activeTab === 'Payments' && <PaymentsSection data={displayedData} />}

        {activeTab === 'Incentives' && (
          <IncentivesSection data={displayedData} />
        )}

        <CommissionOverview
          data={displayedData}
          approvedAll={approvedAll}
          onApprove={() => setApprovedAll(true)}
        />

        <FinanceActions />
      </ScrollView>
    </SafeAreaView>
  );
};
export default FinanceScreen;

const PAGE_PADDING = size(28);
const CARD_GAP = size(14);
const KPI_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const LEFT_CARD_WIDTH = size(272);
const RIGHT_CARD_WIDTH =
  SCREEN_WIDTH - PAGE_PADDING * 2 - LEFT_CARD_WIDTH - CARD_GAP;

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
    paddingHorizontal: size(30),
    paddingTop: size(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: financeTextSize(27),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: size(18),
    paddingBottom: size(34),
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: size(18),
  },
  periodPill: {
    minWidth: size(118),
    height: size(39),
    borderRadius: size(20),
    borderWidth: 1,
    borderColor: colors.financeTabBorder,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: size(8),
  },
  activePeriodPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    color: colors.darkText,
    fontSize: financeTextSize(15),
    fontFamily: fonts.bold,
  },
  activePeriodText: {
    color: colors.white,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: size(14),
  },
  kpiCard: {
    width: KPI_WIDTH,
    minHeight: size(132),
    backgroundColor: colors.white,
    borderRadius: size(8),
    marginBottom: size(14),
    paddingHorizontal: size(20),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  kpiIconBox: {
    width: size(68),
    height: size(68),
    borderRadius: size(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(22),
  },
  kpiTextBox: {
    flex: 1,
  },
  kpiTitle: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(16),
    fontFamily: fonts.bold,
  },
  kpiValue: {
    fontSize: financeTextSize(31),
    fontFamily: fonts.extraBold,
    letterSpacing: size(5),
    marginTop: size(9),
  },
  kpiSubtitle: {
    fontSize: financeTextSize(16),
    fontFamily: fonts.semiBold,
    marginTop: size(8),
  },
  financeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(12),
  },
  financeTab: {
    width: '23.5%',
    height: size(44),
    borderRadius: size(22),
    borderWidth: 1,
    borderColor: colors.financeTabBorder,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFinanceTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  financeTabText: {
    color: colors.darkText,
    fontSize: financeTextSize(15),
    fontFamily: fonts.bold,
  },
  activeFinanceTabText: {
    color: colors.white,
  },
  revenueLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(14),
  },
  revenueSourceCard: {
    width: LEFT_CARD_WIDTH,
    minHeight: size(550),
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(20),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  cardTitle: {
    color: colors.text,
    fontSize: financeTextSize(16),
    fontFamily: fonts.extraBold,
  },
  donutWrap: {
    width: size(220),
    height: size(220),
    alignSelf: 'center',
    marginTop: size(22),
    marginBottom: size(26),
    borderRadius: size(110),
    borderWidth: size(45),
    borderTopColor: colors.financeBlue,
    borderRightColor: colors.financeBlue,
    borderBottomColor: colors.primary,
    borderLeftColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCircle: {
    width: size(130),
    height: size(130),
    borderRadius: size(65),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutAmount: {
    color: colors.darkText,
    fontSize: financeTextSize(30),
    fontFamily: fonts.extraBold,
  },
  donutLabel: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(14),
    fontFamily: fonts.semiBold,
    marginTop: size(5),
  },
  donutPercentRight: {
    position: 'absolute',
    right: -size(32),
    top: size(48),
    color: colors.white,
    fontSize: financeTextSize(18),
    fontFamily: fonts.extraBold,
  },
  donutPercentLeft: {
    position: 'absolute',
    left: -size(22),
    bottom: size(34),
    color: colors.white,
    fontSize: financeTextSize(18),
    fontFamily: fonts.extraBold,
  },
  legendWrap: {
    marginTop: size(2),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(14),
  },
  darkDot: {
    width: size(14),
    height: size(14),
    borderRadius: size(7),
    backgroundColor: colors.primary,
    marginRight: size(12),
  },
  blueDot: {
    width: size(14),
    height: size(14),
    borderRadius: size(7),
    backgroundColor: colors.financeBlue,
    marginRight: size(12),
  },
  legendLabel: {
    flex: 1,
    color: colors.darkText,
    fontSize: financeTextSize(14),
    fontFamily: fonts.semiBold,
  },
  legendValue: {
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  stockistRevenueCard: {
    width: RIGHT_CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(20),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: size(18),
  },
  viewAllText: {
    color: colors.financeBlue,
    fontSize: financeTextSize(15),
    fontFamily: fonts.extraBold,
  },
  stockistBlock: {
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    paddingBottom: size(14),
    marginBottom: size(14),
  },
  stockistTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stockistAvatar: {
    width: size(50),
    height: size(50),
    borderRadius: size(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  avatarText: {
    color: colors.white,
    fontSize: financeTextSize(19),
    fontFamily: fonts.extraBold,
  },
  stockistInfo: {
    flex: 1,
  },
  stockistName: {
    color: colors.text,
    fontSize: financeTextSize(16),
    fontFamily: fonts.extraBold,
  },
  stockistTargetText: {
    color: colors.financeBodyText,
    fontSize: financeTextSize(13),
    fontFamily: fonts.semiBold,
    marginTop: size(8),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(12),
  },
  progressTrack: {
    flex: 1,
    height: size(7),
    borderRadius: size(6),
    backgroundColor: colors.financeProgressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: size(7),
    borderRadius: size(6),
  },
  progressText: {
    color: colors.financeBodyText,
    fontSize: financeTextSize(13),
    fontFamily: fonts.bold,
    marginLeft: size(14),
  },
  stockistAmountBox: {
    alignItems: 'flex-end',
    marginLeft: size(10),
  },
  stockistRevenue: {
    color: colors.success,
    fontSize: financeTextSize(18),
    fontFamily: fonts.extraBold,
  },
  showDealerButton: {
    marginTop: size(16),
    height: size(30),
    minWidth: size(126),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: size(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showDealerText: {
    color: colors.darkText,
    fontSize: financeTextSize(12),
    fontFamily: fonts.extraBold,
    marginLeft: size(6),
  },
  dealerTree: {
    marginLeft: size(38),
    marginTop: size(14),
    paddingLeft: size(26),
    borderLeftWidth: 1,
    borderLeftColor: colors.inputBorder,
  },
  dealerRevenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: size(54),
  },
  dealerAvatar: {
    width: size(34),
    height: size(34),
    borderRadius: size(17),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  dealerAvatarText: {
    color: colors.white,
    fontSize: financeTextSize(12),
    fontFamily: fonts.extraBold,
  },
  dealerName: {
    flex: 1,
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  dealerAmountBox: {
    alignItems: 'flex-end',
    marginRight: size(12),
  },
  dealerRevenue: {
    color: colors.success,
    fontSize: financeTextSize(16),
    fontFamily: fonts.extraBold,
  },
  dealerTarget: {
    fontSize: financeTextSize(12),
    fontFamily: fonts.bold,
    marginTop: size(3),
  },
  moreDealersText: {
    color: colors.financeBlue,
    fontSize: financeTextSize(15),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
    marginTop: size(10),
  },
  directDealerCard: {
    width: LEFT_CARD_WIDTH,
    minHeight: size(222),
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  directDealerTitle: {
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  directDealerAmount: {
    color: colors.success,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  directDealerRow: {
    minHeight: size(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
  },
  directDealerAvatar: {
    width: size(36),
    height: size(36),
    borderRadius: size(18),
    backgroundColor: colors.financeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(14),
  },
  directDealerAvatarText: {
    color: colors.white,
    fontSize: financeTextSize(12),
    fontFamily: fonts.extraBold,
  },
  directDealerName: {
    flex: 1,
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  directDealerRevenue: {
    color: colors.success,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
    marginRight: size(12),
  },
  monthlyTrendCard: {
    width: RIGHT_CARD_WIDTH,
    minHeight: size(222),
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(18),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartLegend: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: size(12),
  },
  blueLine: {
    width: size(22),
    height: size(3),
    backgroundColor: colors.financeBlue,
    marginRight: size(6),
  },
  dashedLine: {
    width: size(22),
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.financeMutedText,
    marginRight: size(6),
  },
  chartLegendText: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(10),
    fontFamily: fonts.semiBold,
  },
  fakeChart: {
    flex: 1,
    flexDirection: 'row',
    marginTop: size(16),
  },
  yAxis: {
    width: size(38),
    justifyContent: 'space-between',
    paddingBottom: size(18),
  },
  axisText: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(10),
    fontFamily: fonts.medium,
  },
  chartArea: {
    flex: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: size(5),
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '12%',
    height: 1,
    backgroundColor: colors.financeDivider,
  },
  monthLabel: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(9),
    fontFamily: fonts.medium,
  },
  lineOne: {
    position: 'absolute',
    left: size(4),
    right: size(36),
    bottom: size(32),
    height: size(64),
    borderTopWidth: size(3),
    borderColor: colors.financeBlue,
    transform: [{ rotate: '-5deg' }],
  },
  lineTwo: {
    position: 'absolute',
    left: size(90),
    right: size(12),
    bottom: size(74),
    height: size(74),
    borderTopWidth: size(3),
    borderColor: colors.financeBlue,
    transform: [{ rotate: '7deg' }],
  },
  lineDot: {
    position: 'absolute',
    right: size(2),
    top: size(10),
    width: size(12),
    height: size(12),
    borderRadius: size(6),
    backgroundColor: colors.financeBlue,
  },
  commissionCard: {
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(20),
    marginBottom: size(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  commissionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(22),
    marginBottom: size(22),
  },
  commissionStat: {
    flex: 1,
  },
  commissionLabel: {
    color: colors.financeMutedText,
    fontSize: financeTextSize(11),
    fontFamily: fonts.semiBold,
    marginBottom: size(7),
  },
  commissionBlue: {
    color: colors.financeBlue,
    fontSize: financeTextSize(21),
    fontFamily: fonts.extraBold,
    letterSpacing: size(4),
  },
  commissionOrange: {
    color: colors.financeOrange,
    fontSize: financeTextSize(21),
    fontFamily: fonts.extraBold,
    letterSpacing: size(4),
  },
  verticalDivider: {
    width: 1,
    height: size(40),
    backgroundColor: colors.inputBorder,
    marginHorizontal: size(16),
  },
  approveButton: {
    height: size(38),
    backgroundColor: colors.financeApproveGreen,
    borderRadius: size(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: size(18),
  },
  approvedButton: {
    backgroundColor: colors.financeApprovedGreen,
  },
  approveButtonText: {
    color: colors.white,
    fontSize: financeTextSize(15),
    fontFamily: fonts.extraBold,
    marginRight: size(8),
  },
  commissionTableHeader: {
    height: size(34),
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(2),
  },
  tableHeaderText: {
    flex: 1,
    color: colors.financeMutedText,
    fontSize: financeTextSize(12),
    fontFamily: fonts.bold,
  },
  commissionRow: {
    minHeight: size(42),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
  },
  entityText: {
    flex: 1,
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.extraBold,
  },
  amountColumn: {
    flex: 1,
    color: colors.text,
    fontSize: financeTextSize(14),
    fontFamily: fonts.semiBold,
  },
  payoutBadge: {
    width: size(72),
    height: size(26),
    borderRadius: size(5),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: size(20),
  },
  paidBadge: {
    backgroundColor: colors.paidBg,
    borderColor: colors.paidBorder,
  },
  pendingBadge: {
    backgroundColor: colors.pendingBg,
    borderColor: colors.pendingBorder,
  },
  payoutText: {
    fontSize: financeTextSize(12),
    fontFamily: fonts.extraBold,
    marginRight: size(4),
  },
  paidText: {
    color: colors.success,
  },
  pendingText: {
    color: colors.financeOrange,
  },
  simpleFullCard: {
    backgroundColor: colors.white,
    borderRadius: size(8),
    padding: size(20),
    marginBottom: size(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: size(12),
    shadowOffset: { width: 0, height: size(5) },
    elevation: 3,
  },
  infoRow: {
    minHeight: size(52),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: colors.text,
    fontSize: financeTextSize(15),
    fontFamily: fonts.bold,
  },
  infoValue: {
    color: colors.financeBlue,
    fontSize: financeTextSize(16),
    fontFamily: fonts.extraBold,
  },
  financeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportButton: {
    width: '49%',
    height: size(50),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: size(5),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: colors.primary,
    fontSize: financeTextSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(12),
  },
  excelButton: {
    width: '49%',
    height: size(50),
    borderRadius: size(5),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  excelButtonText: {
    color: colors.white,
    fontSize: financeTextSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: size(12),
  },
});
