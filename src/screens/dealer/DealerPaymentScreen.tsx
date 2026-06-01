import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  Gift,
  IndianRupee,
  Menu,
  Plus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X,
} from 'lucide-react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type SummaryCardType = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'collected' | 'outstanding' | 'supplier' | 'incentive';
  color: string;
  bg: string;
  trend: 'up' | 'down';
};

type CollectionStatus = 'Overdue' | 'Due Soon' | 'Pending';

type CustomerCollection = {
  id: string;
  initials: string;
  name: string;
  city: string;
  amount: string;
  dueDate: string;
  dueMeta: string;
  status: CollectionStatus;
  avatarBg: string;
  avatarColor: string;
};

type SupplierPayment = {
  id: string;
  logo: string;
  name: string;
  amount: string;
  dueDate: string;
  dueMeta: string;
  status: CollectionStatus;
  logoBg: string;
  logoColor: string;
};

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  icon: 'received' | 'paid' | 'refund' | 'failed';
  color: string;
  bg: string;
};

type PaymentData = {
  summary: SummaryCardType[];
  collections: CustomerCollection[];
  suppliers: SupplierPayment[];
  transactions: Transaction[];
};

const mockPaymentData: PaymentData = {
  summary: [
    {
      id: '1',
      title: 'Collected This Month',
      value: '₹2,84,000',
      subtitle: '↑ 18% vs last month',
      icon: 'collected',
      color: '#138A36',
      bg: '#138A36',
      trend: 'up',
    },
    {
      id: '2',
      title: 'Outstanding Amount',
      value: '₹42,000',
      subtitle: '↓ 12% vs last month',
      icon: 'outstanding',
      color: '#E00014',
      bg: '#E00014',
      trend: 'down',
    },
    {
      id: '3',
      title: 'Pending Supplier Payments',
      value: '₹68,000',
      subtitle: '↑ 8% vs last month',
      icon: 'supplier',
      color: '#173CFF',
      bg: '#173CFF',
      trend: 'up',
    },
    {
      id: '4',
      title: 'Incentives Received',
      value: '₹8,400',
      subtitle: '↑ 15% vs last month',
      icon: 'incentive',
      color: '#7B22EA',
      bg: '#7B22EA',
      trend: 'up',
    },
  ],
  collections: [
    {
      id: '1',
      initials: 'RK',
      name: 'Rahul Kirana Store',
      city: 'Jaipur, Rajasthan',
      amount: '₹12,000',
      dueDate: '22 May 2026',
      dueMeta: 'Overdue',
      status: 'Overdue',
      avatarBg: '#EAF8EC',
      avatarColor: '#138A36',
    },
    {
      id: '2',
      initials: 'MR',
      name: 'Modern Retail Shop',
      city: 'Jaipur, Rajasthan',
      amount: '₹8,500',
      dueDate: '25 May 2026',
      dueMeta: '2 days left',
      status: 'Due Soon',
      avatarBg: '#FFF1E7',
      avatarColor: '#F06419',
    },
    {
      id: '3',
      initials: 'GS',
      name: 'Ganesh Supermarket',
      city: 'Jaipur, Rajasthan',
      amount: '₹6,200',
      dueDate: '28 May 2026',
      dueMeta: '5 days left',
      status: 'Pending',
      avatarBg: '#EEF3FF',
      avatarColor: '#173CFF',
    },
    {
      id: '4',
      initials: 'SK',
      name: 'Shree Krishna Store',
      city: 'Jaipur, Rajasthan',
      amount: '₹5,300',
      dueDate: '02 Jun 2026',
      dueMeta: '10 days left',
      status: 'Pending',
      avatarBg: '#F7F0FF',
      avatarColor: '#7B22EA',
    },
  ],
  suppliers: [
    {
      id: '1',
      logo: '🏢',
      name: 'Rajesh Stockist',
      amount: '₹42,000',
      dueDate: '23 May 2026',
      dueMeta: 'Overdue',
      status: 'Overdue',
      logoBg: '#F7F0FF',
      logoColor: '#7B22EA',
    },
    {
      id: '2',
      logo: 'Nestle',
      name: 'Nestle Supplier',
      amount: '₹18,500',
      dueDate: '26 May 2026',
      dueMeta: '2 days left',
      status: 'Due Soon',
      logoBg: '#EEF3FF',
      logoColor: '#173CFF',
    },
    {
      id: '3',
      logo: 'PARLE',
      name: 'Parle Distributor',
      amount: '₹7,500',
      dueDate: '30 May 2026',
      dueMeta: '6 days left',
      status: 'Pending',
      logoBg: '#F3F3F3',
      logoColor: '#E00014',
    },
  ],
  transactions: [
    {
      id: '1',
      title: 'Payment Received from Rahul Kirana Store',
      subtitle: 'Order #CUST-2198',
      amount: '+ ₹12,000',
      date: '21 May 2026, 10:30 AM',
      icon: 'received',
      color: '#138A36',
      bg: '#EAF8EC',
    },
    {
      id: '2',
      title: 'Payment Made to Rajesh Stockist',
      subtitle: 'Invoice #INV-8820',
      amount: '- ₹42,000',
      date: '20 May 2026, 04:15 PM',
      icon: 'paid',
      color: '#173CFF',
      bg: '#EEF3FF',
    },
    {
      id: '3',
      title: 'Refund to Modern Retail Shop',
      subtitle: 'Order #CUST-2190',
      amount: '+ ₹2,500',
      date: '19 May 2026, 11:20 AM',
      icon: 'refund',
      color: '#7B22EA',
      bg: '#F7F0FF',
    },
    {
      id: '4',
      title: 'Payment Failed from Sharma Store',
      subtitle: 'Order #CUST-2187',
      amount: '₹8,000',
      date: '18 May 2026, 09:45 AM',
      icon: 'failed',
      color: '#E00014',
      bg: '#FFF0F0',
    },
  ],
};

const mockPaymentApi = async (): Promise<PaymentData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockPaymentData), 300);
  });
};

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Payments</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Download color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const SummaryIcon = ({item}: {item: SummaryCardType}) => {
  return (
    <View style={[styles.summaryIcon, {backgroundColor: item.bg}]}>
      {item.icon === 'collected' && (
        <IndianRupee color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      )}
      {item.icon === 'outstanding' && (
        <WalletCards color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
      )}
      {item.icon === 'supplier' && (
        <WalletCards color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
      )}
      {item.icon === 'incentive' && (
        <Gift color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const PaymentSummaryCard = ({item}: {item: SummaryCardType}) => {
  return (
    <View style={styles.summaryCardBox}>
      <SummaryIcon item={item} />

      <View style={styles.summaryTextBox}>
        <Text style={styles.summaryTitle}>{item.title}</Text>
        <Text style={[styles.summaryValue, {color: item.color}]}>
          {item.value}
        </Text>

        <Text style={[styles.summarySubtitle, {color: item.color}]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const SummaryGrid = ({items}: {items: SummaryCardType[]}) => {
  return (
    <View style={styles.summaryGrid}>
      {items.map(item => (
        <PaymentSummaryCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const StatusBadge = ({status}: {status: CollectionStatus}) => {
  const isOverdue = status === 'Overdue';
  const isDueSoon = status === 'Due Soon';

  return (
    <View
      style={[
        styles.statusBadge,
        isOverdue && styles.overdueBadge,
        isDueSoon && styles.dueSoonBadge,
        !isOverdue && !isDueSoon && styles.pendingBadge,
      ]}>
      <Text
        style={[
          styles.statusText,
          isOverdue && styles.overdueText,
          isDueSoon && styles.dueSoonText,
          !isOverdue && !isDueSoon && styles.pendingText,
        ]}>
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
          <ChevronRight color="#173CFF" size={rs(20)} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeadText, {flex: 1.5}]}>Customer</Text>
        <Text style={[styles.tableHeadText, {flex: 0.8}]}>Amount</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Due Date</Text>
        <Text style={[styles.tableHeadText, {flex: 0.8}]}>Status</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Actions</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.collectionRow}>
          <View style={[styles.customerCell, {flex: 1.5}]}>
            <View style={[styles.avatar, {backgroundColor: item.avatarBg}]}>
              <Text style={[styles.avatarText, {color: item.avatarColor}]}>
                {item.initials}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.cityText}>{item.city}</Text>
            </View>
          </View>

          <Text style={[styles.amountText, {flex: 0.8}]}>{item.amount}</Text>

          <View style={{flex: 0.9}}>
            <Text style={styles.dateText}>{item.dueDate}</Text>
            <Text
              style={[
                styles.dueMetaText,
                item.status === 'Overdue' && styles.redText,
                item.status === 'Due Soon' && styles.orangeText,
              ]}>
              {item.dueMeta}
            </Text>
          </View>

          <View style={{flex: 0.8}}>
            <StatusBadge status={item.status} />
          </View>

          <View style={[styles.actionsColumn, {flex: 0.9}]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onCollect(item)}
              style={styles.collectButton}>
              <IndianRupee color="#F06419" size={rs(17)} />
              <Text style={styles.collectText}>Collect</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onReminder(item)}
              style={styles.reminderButton}>
              <Bell color="#173CFF" size={rs(16)} />
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
          <ChevronRight color="#173CFF" size={rs(20)} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeadText, {flex: 1.5}]}>Supplier</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Invoice Amount</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Due Date</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Payment Status</Text>
        <Text style={[styles.tableHeadText, {flex: 0.9}]}>Actions</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.collectionRow}>
          <View style={[styles.customerCell, {flex: 1.5}]}>
            <View style={[styles.supplierLogo, {backgroundColor: item.logoBg}]}>
              <Text style={[styles.supplierLogoText, {color: item.logoColor}]}>
                {item.logo}
              </Text>
            </View>

            <Text style={styles.nameText}>{item.name}</Text>
          </View>

          <Text style={[styles.amountText, {flex: 0.9}]}>{item.amount}</Text>

          <View style={{flex: 0.9}}>
            <Text style={styles.dateText}>{item.dueDate}</Text>
            <Text
              style={[
                styles.dueMetaText,
                item.status === 'Overdue' && styles.redText,
                item.status === 'Due Soon' && styles.orangeText,
              ]}>
              {item.dueMeta}
            </Text>
          </View>

          <View style={{flex: 0.9}}>
            <StatusBadge status={item.status} />
          </View>

          <View style={[styles.actionsColumn, {flex: 0.9}]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onPayNow(item)}
              style={styles.payNowButton}>
              <IndianRupee color="#173CFF" size={rs(17)} />
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.downloadButton}>
              <Download color="#173CFF" size={rs(16)} />
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
              {m: 'Jan', in: 56, out: 38},
              {m: 'Feb', in: 86, out: 70},
              {m: 'Mar', in: 65, out: 38},
              {m: 'Apr', in: 78, out: 40},
              {m: 'May', in: 80, out: 40},
            ].map(item => (
              <View key={item.m} style={styles.barItem}>
                <View style={styles.barWrap}>
                  <View style={[styles.greenBar, {height: rs(item.in)}]} />
                  <View style={[styles.blueBar, {height: rs(item.out)}]} />
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
            <View style={[styles.chartGridLine, {top: '50%'}]} />
            <View style={[styles.chartGridLine, {top: '76%'}]} />

            <Text style={[styles.axisLabel, {top: rs(14)}]}>₹60K</Text>
            <Text style={[styles.axisLabel, {top: rs(54)}]}>₹40K</Text>
            <Text style={[styles.axisLabel, {top: rs(94)}]}>₹20K</Text>

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

const RecentTransactionsCard = ({items}: {items: Transaction[]}) => {
  return (
    <View style={styles.transactionsCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color="#173CFF" size={rs(20)} />
        </TouchableOpacity>
      </View>

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.transactionRow}>
          <View style={[styles.transactionIcon, {backgroundColor: item.bg}]}>
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
              <Text style={[styles.failedIconText, {color: item.color}]}>!</Text>
            )}
          </View>

          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
          </View>

          <View style={styles.transactionRight}>
            <Text style={[styles.transactionAmount, {color: item.color}]}>
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
        onPress={onRecordPayment}>
        <View style={styles.bottomIconCircle}>
          <Plus color="#173CFF" size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Record Payment</Text>
      </TouchableOpacity>

      <View style={styles.bottomDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bottomActionButton}
        onPress={onSendReminder}>
        <View style={styles.bottomIconCircle}>
          <Plus color="#173CFF" size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Send Reminder</Text>
      </TouchableOpacity>

      <View style={styles.bottomDivider} />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bottomActionButton}
        onPress={onGenerateInvoice}>
        <View style={styles.bottomIconCircle}>
          <Plus color="#173CFF" size={rs(25)} />
        </View>
        <Text style={styles.bottomActionText}>Generate Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const DealerPaymentScreen = () => {
  const [data, setData] = useState<PaymentData | null>(null);

  useEffect(() => {
    mockPaymentApi().then(setData);
  }, []);

  const handlers = useMemo(
    () => ({
      collect: (item: CustomerCollection) =>
        Alert.alert('Collect Payment', `Collect ${item.amount} from ${item.name}.`),
      reminder: (item: CustomerCollection) =>
        Alert.alert('Reminder Sent', `Reminder sent to ${item.name}.`),
      payNow: (item: SupplierPayment) =>
        Alert.alert('Pay Supplier', `Pay ${item.amount} to ${item.name}.`),
      recordPayment: () => Alert.alert('Record Payment', 'Record payment form opened.'),
      sendReminder: () => Alert.alert('Send Reminder', 'Reminder flow opened.'),
      generateInvoice: () => Alert.alert('Generate Invoice', 'Invoice form opened.'),
    }),
    [],
  );

  if (!data) {
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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <SummaryGrid items={data.summary} />

        <CustomerCollectionsCard
          items={data.collections}
          onCollect={handlers.collect}
          onReminder={handlers.reminder}
        />

        <SupplierPaymentsCard items={data.suppliers} onPayNow={handlers.payNow} />

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
    fontSize: rs(31),
    fontWeight: '900',
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
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(24),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
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
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '800',
  },
  summaryValue: {
    fontSize: rs(29),
    fontWeight: '900',
    marginTop: rs(9),
    letterSpacing: rs(3),
  },
  summarySubtitle: {
    fontSize: rs(14),
    fontWeight: '800',
    marginTop: rs(9),
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingTop: rs(16),
    marginBottom: rs(16),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
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
    color: '#061247',
    fontSize: rs(20),
    fontWeight: '900',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: rs(14),
    fontWeight: '900',
    marginRight: rs(8),
  },
  tableHeader: {
    height: rs(40),
    backgroundColor: '#FAFBFE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
  },
  tableHeadText: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '800',
  },
  collectionRow: {
    minHeight: rs(88),
    paddingHorizontal: rs(18),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
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
    fontSize: rs(18),
    fontWeight: '900',
  },
  customerInfo: {
    flex: 1,
  },
  nameText: {
    color: '#061247',
    fontSize: rs(14),
    fontWeight: '900',
  },
  cityText: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(6),
  },
  amountText: {
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '900',
  },
  dateText: {
    color: '#061247',
    fontSize: rs(13),
    fontWeight: '700',
  },
  dueMetaText: {
    color: '#173CFF',
    fontSize: rs(11),
    fontWeight: '800',
    marginTop: rs(6),
  },
  redText: {
    color: '#E00014',
  },
  orangeText: {
    color: '#F06419',
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
    backgroundColor: '#FFF0F0',
  },
  dueSoonBadge: {
    backgroundColor: '#FFF3E9',
  },
  pendingBadge: {
    backgroundColor: '#F1F5FF',
  },
  statusText: {
    fontSize: rs(12),
    fontWeight: '900',
  },
  overdueText: {
    color: '#E00014',
  },
  dueSoonText: {
    color: '#F06419',
  },
  pendingText: {
    color: '#173CFF',
  },
  actionsColumn: {
    gap: rs(7),
  },
  collectButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: '#F06419',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectText: {
    color: '#F06419',
    fontSize: rs(12),
    fontWeight: '900',
    marginLeft: rs(6),
  },
  reminderButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '900',
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
    fontSize: rs(11),
    fontWeight: '900',
    textAlign: 'center',
  },
  payNowButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '900',
    marginLeft: rs(6),
  },
  downloadButton: {
    height: rs(30),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '900',
    marginLeft: rs(6),
  },
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
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
    borderColor: '#EEF0F6',
    borderRadius: rs(8),
    padding: rs(12),
  },
  chartTitle: {
    color: '#061247',
    fontSize: rs(12),
    fontWeight: '900',
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
    backgroundColor: '#138A36',
    marginRight: rs(6),
  },
  redDot: {
    width: rs(8),
    height: rs(8),
    backgroundColor: '#E00014',
    marginLeft: rs(14),
    marginRight: rs(6),
  },
  blueDot: {
    width: rs(8),
    height: rs(8),
    backgroundColor: '#173CFF',
    marginLeft: rs(14),
    marginRight: rs(6),
  },
  legendText: {
    color: '#5D607E',
    fontSize: rs(10),
    fontWeight: '700',
  },
  donutOuter: {
    width: rs(118),
    height: rs(118),
    borderRadius: rs(59),
    borderWidth: rs(22),
    borderColor: '#138A36',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    alignItems: 'center',
  },
  donutMain: {
    color: '#061247',
    fontSize: rs(17),
    fontWeight: '900',
  },
  donutSub: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
  },
  donutRed: {
    color: '#E00014',
    fontSize: rs(18),
    fontWeight: '900',
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
    backgroundColor: '#173CFF',
    borderRadius: rs(3),
  },
  monthText: {
    color: '#5D607E',
    fontSize: rs(10),
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
    backgroundColor: '#EEF0F6',
  },
  axisLabel: {
    position: 'absolute',
    left: 0,
    color: '#5D607E',
    fontSize: rs(9),
    fontWeight: '700',
  },
  redLineOne: {
    position: 'absolute',
    left: rs(38),
    top: rs(96),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: '#E00014',
    transform: [{rotate: '-25deg'}],
  },
  redLineTwo: {
    position: 'absolute',
    left: rs(80),
    top: rs(72),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: '#E00014',
    transform: [{rotate: '22deg'}],
  },
  redLineThree: {
    position: 'absolute',
    left: rs(122),
    top: rs(66),
    width: rs(48),
    borderTopWidth: 2,
    borderColor: '#E00014',
    transform: [{rotate: '-32deg'}],
  },
  redLineFour: {
    position: 'absolute',
    left: rs(164),
    top: rs(35),
    width: rs(42),
    borderTopWidth: 2,
    borderColor: '#E00014',
    transform: [{rotate: '-38deg'}],
  },
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  transactionRow: {
    minHeight: rs(58),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
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
    fontSize: rs(22),
    fontWeight: '900',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: '#061247',
    fontSize: rs(14),
    fontWeight: '900',
  },
  transactionSubtitle: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: rs(15),
    fontWeight: '900',
  },
  transactionDate: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(6),
  },
  bottomActions: {
    height: rs(58),
    backgroundColor: '#173CFF',
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(10),
  },
  bottomActionText: {
    color: '#FFFFFF',
    fontSize: rs(14),
    fontWeight: '900',
  },
  bottomDivider: {
    width: 1,
    height: rs(36),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});