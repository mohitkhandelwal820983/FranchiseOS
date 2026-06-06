import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  ChevronRight,
  Download,
  Gift,
  IndianRupee,
  Menu,
  Plus,
  RefreshCw,
  TrendingUp,
  WalletCards,
} from 'lucide-react-native';
import {
  CollectionStatus,
  CustomerCollection,
  DealerPaymentData,
  SummaryCardType,
  SupplierPayment,
  Transaction,
} from '../../api/mock/dealer/dealerPayment.mock';
import { getDealerPayment } from '../../api/dealer/dealerPayment.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size as rs, textSize as fs } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Payments</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Download color={colors.white} size={rs(34)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const SummaryIcon = ({ item }: { item: SummaryCardType }) => {
  return (
    <View style={[styles.summaryIcon, { backgroundColor: item.bg }]}>
      {item.icon === 'collected' && (
        <IndianRupee color={colors.white} size={rs(34)} strokeWidth={2.5} />
      )}
      {item.icon === 'outstanding' && (
        <WalletCards color={colors.white} size={rs(34)} strokeWidth={2.4} />
      )}
      {item.icon === 'supplier' && (
        <WalletCards color={colors.white} size={rs(34)} strokeWidth={2.4} />
      )}
      {item.icon === 'incentive' && (
        <Gift color={colors.white} size={rs(34)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const PaymentSummaryCard = ({ item }: { item: SummaryCardType }) => {
  return (
    <View style={styles.summaryCardBox}>
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

const SummaryGrid = ({ items }: { items: SummaryCardType[] }) => {
  return (
    <View style={styles.summaryGrid}>
      {items.map(item => (
        <PaymentSummaryCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const StatusBadge = ({ status }: { status: CollectionStatus }) => {
  const isOverdue = status === 'Overdue';
  const isDueSoon = status === 'Due Soon';

  return (
    <View
      style={[
        styles.statusBadge,
        isOverdue && styles.overdueBadge,
        isDueSoon && styles.dueSoonBadge,
        !isOverdue && !isDueSoon && styles.pendingBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isOverdue && styles.overdueText,
          isDueSoon && styles.dueSoonText,
          !isOverdue && !isDueSoon && styles.pendingText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const CustomerCollectionsCard = ({
  items,
  onCollect,
  onReminder,
}: {
  items: CustomerCollection[];
  onCollect: (item: CustomerCollection) => void;
  onReminder: (item: CustomerCollection) => void;
}) => {
  return (
    <View style={styles.tableCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Customer Collections</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color={colors.financeBlue} size={rs(20)} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeadText, { flex: 1.5 }]}>Customer</Text>
        <Text style={[styles.tableHeadText, { flex: 0.8 }]}>Amount</Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>Due Date</Text>
        <Text style={[styles.tableHeadText, { flex: 0.8 }]}>Status</Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>Actions</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.collectionRow}>
          <View style={[styles.customerCell, { flex: 1.5 }]}>
            <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
              <Text style={[styles.avatarText, { color: item.avatarColor }]}>
                {item.initials}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.cityText}>{item.city}</Text>
            </View>
          </View>

          <Text style={[styles.amountText, { flex: 0.8 }]}>{item.amount}</Text>

          <View style={{ flex: 0.9 }}>
            <Text style={styles.dateText}>{item.dueDate}</Text>
            <Text
              style={[
                styles.dueMetaText,
                item.status === 'Overdue' && styles.redText,
                item.status === 'Due Soon' && styles.orangeText,
              ]}
            >
              {item.dueMeta}
            </Text>
          </View>

          <View style={{ flex: 0.8 }}>
            <StatusBadge status={item.status} />
          </View>

          <View style={[styles.actionsColumn, { flex: 0.9 }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onCollect(item)}
              style={styles.collectButton}
            >
              <IndianRupee color={colors.profileOrange} size={rs(17)} />
              <Text style={styles.collectText}>Collect</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onReminder(item)}
              style={styles.reminderButton}
            >
              <Bell color={colors.financeBlue} size={rs(16)} />
              <Text style={styles.reminderText}>Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const SupplierPaymentsCard = ({
  items,
  onPayNow,
}: {
  items: SupplierPayment[];
  onPayNow: (item: SupplierPayment) => void;
}) => {
  return (
    <View style={styles.tableCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Supplier Payments</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color={colors.financeBlue} size={rs(20)} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeadText, { flex: 1.5 }]}>Supplier</Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>
          Invoice Amount
        </Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>Due Date</Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>
          Payment Status
        </Text>
        <Text style={[styles.tableHeadText, { flex: 0.9 }]}>Actions</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.collectionRow}>
          <View style={[styles.customerCell, { flex: 1.5 }]}>
            <View
              style={[styles.supplierLogo, { backgroundColor: item.logoBg }]}
            >
              <Text
                style={[styles.supplierLogoText, { color: item.logoColor }]}
              >
                {item.logo}
              </Text>
            </View>

            <Text style={styles.nameText}>{item.name}</Text>
          </View>

          <Text style={[styles.amountText, { flex: 0.9 }]}>{item.amount}</Text>

          <View style={{ flex: 0.9 }}>
            <Text style={styles.dateText}>{item.dueDate}</Text>
            <Text
              style={[
                styles.dueMetaText,
                item.status === 'Overdue' && styles.redText,
                item.status === 'Due Soon' && styles.orangeText,
              ]}
            >
              {item.dueMeta}
            </Text>
          </View>

          <View style={{ flex: 0.9 }}>
            <StatusBadge status={item.status} />
          </View>

          <View style={[styles.actionsColumn, { flex: 0.9 }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onPayNow(item)}
              style={styles.payNowButton}
            >
              <IndianRupee color={colors.financeBlue} size={rs(17)} />
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.downloadButton}
            >
              <Download color={colors.financeBlue} size={rs(16)} />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const PaymentAnalyticsCard = () => {
  return (
    <View style={styles.analyticsCard}>
      <Text style={styles.sectionTitle}>Payment Analytics</Text>

      <View style={styles.analyticsRow}>
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Collections vs Dues</Text>

          <View style={styles.legendRow}>
            <View style={styles.greenDot} />
            <Text style={styles.legendText}>Collected</Text>
            <View style={styles.redDot} />
            <Text style={styles.legendText}>Dues</Text>
          </View>

          <View style={styles.donutOuter}>
            <View style={styles.donutInner}>
              <Text style={styles.donutMain}>₹2.8L</Text>
              <Text style={styles.donutSub}>vs</Text>
              <Text style={styles.donutRed}>₹42K</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Monthly Cash Flow</Text>

          <View style={styles.legendRow}>
            <View style={styles.greenDot} />
            <Text style={styles.legendText}>Incoming</Text>
            <View style={styles.blueDot} />
            <Text style={styles.legendText}>Outgoing</Text>
          </View>

          <View style={styles.barChart}>
            {[
              { m: 'Jan', in: 56, out: 38 },
              { m: 'Feb', in: 86, out: 70 },
              { m: 'Mar', in: 65, out: 38 },
              { m: 'Apr', in: 78, out: 40 },
              { m: 'May', in: 80, out: 40 },
            ].map(item => (
              <View key={item.m} style={styles.barItem}>
                <View style={styles.barWrap}>
                  <View style={[styles.greenBar, { height: rs(item.in) }]} />
                  <View style={[styles.blueBar, { height: rs(item.out) }]} />
                </View>
                <Text style={styles.monthText}>{item.m}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Overdue Trend</Text>

          <View style={styles.lineChart}>
            <View style={styles.chartGridLine} />
            <View style={[styles.chartGridLine, { top: '50%' }]} />
            <View style={[styles.chartGridLine, { top: '76%' }]} />

            <Text style={[styles.axisLabel, { top: rs(14) }]}>₹60K</Text>
            <Text style={[styles.axisLabel, { top: rs(54) }]}>₹40K</Text>
            <Text style={[styles.axisLabel, { top: rs(94) }]}>₹20K</Text>

            <View style={styles.redLineOne} />
            <View style={styles.redLineTwo} />
            <View style={styles.redLineThree} />
            <View style={styles.redLineFour} />
          </View>
        </View>
      </View>
    </View>
  );
};

const RecentTransactionsCard = ({ items }: { items: Transaction[] }) => {
  return (
    <View style={styles.transactionsCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color={colors.financeBlue} size={rs(20)} />
        </TouchableOpacity>
      </View>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.transactionRow}
        >
          <View style={[styles.transactionIcon, { backgroundColor: item.bg }]}>
            {item.icon === 'received' && (
              <Download color={item.color} size={rs(22)} strokeWidth={2.4} />
            )}
            {item.icon === 'paid' && (
              <TrendingUp color={item.color} size={rs(22)} strokeWidth={2.4} />
            )}
            {item.icon === 'refund' && (
              <RefreshCw color={item.color} size={rs(22)} strokeWidth={2.4} />
            )}
            {item.icon === 'failed' && (
              <Text style={[styles.failedIconText, { color: item.color }]}>
                !
              </Text>
            )}
          </View>

          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
          </View>

          <View style={styles.transactionRight}>
            <Text style={[styles.transactionAmount, { color: item.color }]}>
              {item.amount}
            </Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BottomActions = ({
  onRecordPayment,
  onSendReminder,
  onGenerateInvoice,
}: {
  onRecordPayment: () => void;
  onSendReminder: () => void;
  onGenerateInvoice: () => void;
}) => {
  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bottomActionButton}
        onPress={onRecordPayment}
      >
        <View style={styles.bottomIconCircle}>
          <Plus color={colors.financeBlue} size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Record Payment</Text>
      </TouchableOpacity>

      <View style={styles.bottomDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bottomActionButton}
        onPress={onSendReminder}
      >
        <View style={styles.bottomIconCircle}>
          <Plus color={colors.financeBlue} size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Send Reminder</Text>
      </TouchableOpacity>

      <View style={styles.bottomDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bottomActionButton}
        onPress={onGenerateInvoice}
      >
        <View style={styles.bottomIconCircle}>
          <Plus color={colors.financeBlue} size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Generate Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const DealerPaymentScreen = () => {
  const [data, setData] = useState<DealerPaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPaymentData = async () => {
    try {
      setLoading(true);

      const response = await getDealerPayment();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load payment data. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentData();
  }, []);

  const handlers = useMemo(
    () => ({
      collect: (item: CustomerCollection) =>
        Alert.alert(
          'Collect Payment',
          `Collect ${item.amount} from ${item.name}.`,
        ),
      reminder: (item: CustomerCollection) =>
        Alert.alert('Reminder Sent', `Reminder sent to ${item.name}.`),
      payNow: (item: SupplierPayment) =>
        Alert.alert('Pay Supplier', `Pay ${item.amount} to ${item.name}.`),
      recordPayment: () =>
        Alert.alert('Record Payment', 'Record payment form opened.'),
      sendReminder: () => Alert.alert('Send Reminder', 'Reminder flow opened.'),
      generateInvoice: () =>
        Alert.alert('Generate Invoice', 'Invoice form opened.'),
    }),
    [],
  );

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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SummaryGrid items={data.summary} />

        <CustomerCollectionsCard
          items={data.collections}
          onCollect={handlers.collect}
          onReminder={handlers.reminder}
        />

        <SupplierPaymentsCard
          items={data.suppliers}
          onPayNow={handlers.payNow}
        />

        <PaymentAnalyticsCard />

        <RecentTransactionsCard items={data.transactions} />

        <BottomActions
          onRecordPayment={handlers.recordPayment}
          onSendReminder={handlers.sendReminder}
          onGenerateInvoice={handlers.generateInvoice}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DealerPaymentScreen;

const PAGE_PADDING = rs(28);
const CARD_GAP = rs(18);
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
    paddingBottom: rs(116),
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  summaryCardBox: {
    width: HALF_WIDTH,
    minHeight: rs(118),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(24),
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
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(24),
  },
  summaryTextBox: {
    flex: 1,
  },
  summaryTitle: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  summaryValue: {
    fontSize: fs(29),
    fontFamily: fonts.extraBold,
    marginTop: rs(9),
    letterSpacing: rs(3),
  },
  summarySubtitle: {
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginTop: rs(9),
  },
  tableCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingTop: rs(16),
    marginBottom: rs(16),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  sectionHeader: {
    height: rs(42),
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.primaryText,
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
    marginRight: rs(8),
  },
  tableHeader: {
    height: rs(40),
    backgroundColor: '#FAFBFE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
  },
  tableHeadText: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  collectionRow: {
    minHeight: rs(88),
    paddingHorizontal: rs(18),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  avatarText: {
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  customerInfo: {
    flex: 1,
  },
  nameText: {
    color: colors.primaryText,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  cityText: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(6),
  },
  amountText: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  dateText: {
    color: colors.primaryText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
  },
  dueMetaText: {
    color: colors.financeBlue,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
    marginTop: rs(6),
  },
  redText: {
    color: colors.dangerDark,
  },
  orangeText: {
    color: colors.profileOrange,
  },
  statusBadge: {
    minWidth: rs(76),
    height: rs(28),
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  overdueBadge: {
    backgroundColor: colors.dangerLight,
  },
  dueSoonBadge: {
    backgroundColor: colors.orangeSoft,
  },
  pendingBadge: {
    backgroundColor: colors.blueLight,
  },
  statusText: {
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  overdueText: {
    color: colors.dangerDark,
  },
  dueSoonText: {
    color: colors.profileOrange,
  },
  pendingText: {
    color: colors.financeBlue,
  },
  actionsColumn: {
    gap: rs(7),
  },
  collectButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.profileOrange,
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectText: {
    color: colors.profileOrange,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginLeft: rs(6),
  },
  reminderButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginLeft: rs(6),
  },
  supplierLogo: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  supplierLogoText: {
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
  },
  payNowButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginLeft: rs(6),
  },
  downloadButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginLeft: rs(6),
  },
  analyticsCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(14),
  },
  chartBox: {
    width: '32%',
    height: rs(170),
    borderWidth: 1,
    borderColor: colors.financeDivider,
    borderRadius: rs(8),
    padding: rs(12),
  },
  chartTitle: {
    color: colors.primaryText,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginBottom: rs(10),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  greenDot: {
    width: rs(8),
    height: rs(8),
    backgroundColor: colors.success,
    marginRight: rs(6),
  },
  redDot: {
    width: rs(8),
    height: rs(8),
    backgroundColor: colors.dangerDark,
    marginLeft: rs(14),
    marginRight: rs(6),
  },
  blueDot: {
    width: rs(8),
    height: rs(8),
    backgroundColor: colors.financeBlue,
    marginLeft: rs(14),
    marginRight: rs(6),
  },
  legendText: {
    color: colors.slateText,
    fontSize: fs(10),
    fontFamily: fonts.bold,
  },
  donutOuter: {
    width: rs(118),
    height: rs(118),
    borderRadius: rs(59),
    borderWidth: rs(22),
    borderColor: colors.success,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    alignItems: 'center',
  },
  donutMain: {
    color: colors.primaryText,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
  },
  donutSub: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
  },
  donutRed: {
    color: colors.dangerDark,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barItem: {
    alignItems: 'center',
  },
  barWrap: {
    height: rs(100),
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: rs(5),
  },
  greenBar: {
    width: rs(10),
    backgroundColor: '#4DBA79',
    borderRadius: rs(3),
  },
  blueBar: {
    width: rs(10),
    backgroundColor: colors.financeBlue,
    borderRadius: rs(3),
  },
  monthText: {
    color: colors.slateText,
    fontSize: fs(10),
    marginTop: rs(6),
  },
  lineChart: {
    flex: 1,
    position: 'relative',
  },
  chartGridLine: {
    position: 'absolute',
    left: rs(34),
    right: 0,
    top: rs(22),
    height: 1,
    backgroundColor: colors.financeDivider,
  },
  axisLabel: {
    position: 'absolute',
    left: 0,
    color: colors.slateText,
    fontSize: fs(9),
    fontFamily: fonts.bold,
  },
  redLineOne: {
    position: 'absolute',
    left: rs(38),
    top: rs(96),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: colors.dangerDark,
    transform: [{ rotate: '-25deg' }],
  },
  redLineTwo: {
    position: 'absolute',
    left: rs(80),
    top: rs(72),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: colors.dangerDark,
    transform: [{ rotate: '22deg' }],
  },
  redLineThree: {
    position: 'absolute',
    left: rs(122),
    top: rs(66),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: colors.dangerDark,
    transform: [{ rotate: '-32deg' }],
  },
  redLineFour: {
    position: 'absolute',
    left: rs(164),
    top: rs(35),
    width: rs(42),
    borderTopWidth: 2,
    borderColor: colors.dangerDark,
    transform: [{ rotate: '-38deg' }],
  },
  transactionsCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  transactionRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    paddingHorizontal: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  failedIconText: {
    fontSize: fs(22),
    fontFamily: fonts.extraBold,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: colors.primaryText,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  transactionSubtitle: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(4),
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  transactionDate: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(6),
  },
  bottomActions: {
    height: rs(58),
    backgroundColor: colors.financeBlue,
    borderRadius: rs(29),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    marginTop: rs(2),
  },
  bottomActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconCircle: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(10),
  },
  bottomActionText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  bottomDivider: {
    width: 1,
    height: rs(36),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});
