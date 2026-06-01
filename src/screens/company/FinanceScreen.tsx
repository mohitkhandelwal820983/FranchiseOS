import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type PeriodType = 'Today' | 'Week' | 'Month' | 'Quarter' | 'Custom';
type FinanceTabType = 'Revenue' | 'Commission' | 'Payments' | 'Incentives';

type FinanceKpi = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'revenue' | 'commission' | 'outstanding' | 'overdue';
  color: string;
  iconBg: string;
};

type DealerRevenue = {
  id: string;
  initials: string;
  name: string;
  revenue: string;
  target: string;
  targetColor: string;
  color: string;
};

type StockistRevenue = {
  id: string;
  initials: string;
  name: string;
  revenue: string;
  targetText: string;
  progress: number;
  progressColor: string;
  color: string;
  expanded: boolean;
  dealers: DealerRevenue[];
};

type DirectDealerRevenue = {
  id: string;
  initials: string;
  name: string;
  revenue: string;
};

type CommissionRow = {
  id: string;
  entity: string;
  amount: string;
  status: 'Paid' | 'Pending';
};

type FinanceData = {
  period: PeriodType;
  kpis: FinanceKpi[];
  revenueSplit: {
    total: string;
    stockistRevenue: string;
    stockistPercent: string;
    directDealerRevenue: string;
    directDealerPercent: string;
  };
  stockists: StockistRevenue[];
  directDealers: DirectDealerRevenue[];
  commission: {
    totalGenerated: string;
    stockistCommissions: string;
    dealerCommissions: string;
    pendingPayout: string;
    rows: CommissionRow[];
  };
};

const financeMockByPeriod: Record<PeriodType, FinanceData> = {
  Today: {
    period: 'Today',
    kpis: [
      {
        id: '1',
        title: 'Network Revenue Today',
        value: '₹6,80,000',
        subtitle: '↑ +12% vs yesterday',
        icon: 'revenue',
        color: '#061247',
        iconBg: '#008A21',
      },
      {
        id: '2',
        title: 'Commission Payable',
        value: '₹68,000',
        subtitle: 'To franchises today',
        icon: 'commission',
        color: '#F06419',
        iconBg: '#F06419',
      },
      {
        id: '3',
        title: 'Total Outstanding',
        value: '₹2,80,000',
        subtitle: '8 invoices pending',
        icon: 'outstanding',
        color: '#173CFF',
        iconBg: '#173CFF',
      },
      {
        id: '4',
        title: 'Overdue Payments',
        value: '₹90,000',
        subtitle: '3 franchises overdue',
        icon: 'overdue',
        color: '#D90014',
        iconBg: '#D90014',
      },
    ],
    revenueSplit: {
      total: '₹6.8L',
      stockistRevenue: '₹5.2L',
      stockistPercent: '76%',
      directDealerRevenue: '₹1.6L',
      directDealerPercent: '24%',
    },
    stockists: [
      {
        id: 'sa',
        initials: 'SA',
        name: 'Stockist A',
        revenue: '₹3,20,000',
        targetText: '92% of ₹3.5L target',
        progress: 92,
        progressColor: '#173CFF',
        color: '#061B66',
        expanded: true,
        dealers: [
          {
            id: 'd1',
            initials: 'D1',
            name: 'Dealer 1',
            revenue: '₹1,60,000',
            target: '96% target',
            targetColor: '#138A36',
            color: '#173CFF',
          },
          {
            id: 'd2',
            initials: 'D2',
            name: 'Dealer 2',
            revenue: '₹1,20,000',
            target: '88% target',
            targetColor: '#173CFF',
            color: '#087A55',
          },
          {
            id: 'd3',
            initials: 'D3',
            name: 'Dealer 3',
            revenue: '₹40,000',
            target: '45% target ⚠',
            targetColor: '#F06419',
            color: '#F06419',
          },
        ],
      },
      {
        id: 'sb',
        initials: 'SB',
        name: 'Stockist B',
        revenue: '₹1,40,000',
        targetText: '74% of ₹1.9L target',
        progress: 74,
        progressColor: '#173CFF',
        color: '#7412D9',
        expanded: false,
        dealers: [],
      },
      {
        id: 'sc',
        initials: 'SC',
        name: 'Stockist C',
        revenue: '₹60,000',
        targetText: '48% of ₹1.2L target',
        progress: 48,
        progressColor: '#D90014',
        color: '#C80016',
        expanded: false,
        dealers: [],
      },
    ],
    directDealers: [
      {id: 'dd1', initials: 'DD1', name: 'Direct Dealer 1', revenue: '₹95K'},
      {id: 'dd2', initials: 'DD2', name: 'Direct Dealer 2', revenue: '₹65K'},
    ],
    commission: {
      totalGenerated: '₹68,000',
      stockistCommissions: '₹42,000',
      dealerCommissions: '₹26,000',
      pendingPayout: '₹24,000',
      rows: [
        {id: '1', entity: 'Stockist A', amount: '₹28,000', status: 'Paid'},
        {id: '2', entity: 'Stockist B', amount: '₹18,000', status: 'Pending'},
        {id: '3', entity: 'Dealer 1', amount: '₹9,600', status: 'Pending'},
      ],
    },
  },

  Week: {
    period: 'Week',
    kpis: [
      {
        id: '1',
        title: 'Network Revenue Week',
        value: '₹18,00,000',
        subtitle: '↑ +15% vs last week',
        icon: 'revenue',
        color: '#061247',
        iconBg: '#008A21',
      },
      {
        id: '2',
        title: 'Commission Payable',
        value: '₹1,80,000',
        subtitle: 'To franchises this week',
        icon: 'commission',
        color: '#F06419',
        iconBg: '#F06419',
      },
      {
        id: '3',
        title: 'Total Outstanding',
        value: '₹6,40,000',
        subtitle: '15 invoices pending',
        icon: 'outstanding',
        color: '#173CFF',
        iconBg: '#173CFF',
      },
      {
        id: '4',
        title: 'Overdue Payments',
        value: '₹1,40,000',
        subtitle: '5 franchises overdue',
        icon: 'overdue',
        color: '#D90014',
        iconBg: '#D90014',
      },
    ],
    revenueSplit: {
      total: '₹18L',
      stockistRevenue: '₹14L',
      stockistPercent: '78%',
      directDealerRevenue: '₹4L',
      directDealerPercent: '22%',
    },
    stockists: [
      {
        id: 'sa',
        initials: 'SA',
        name: 'Stockist A',
        revenue: '₹8,00,000',
        targetText: '86% of ₹9.3L target',
        progress: 86,
        progressColor: '#173CFF',
        color: '#061B66',
        expanded: true,
        dealers: [
          {
            id: 'd1',
            initials: 'D1',
            name: 'Dealer 1',
            revenue: '₹3,10,000',
            target: '91% target',
            targetColor: '#138A36',
            color: '#173CFF',
          },
          {
            id: 'd2',
            initials: 'D2',
            name: 'Dealer 2',
            revenue: '₹2,60,000',
            target: '83% target',
            targetColor: '#173CFF',
            color: '#087A55',
          },
          {
            id: 'd3',
            initials: 'D3',
            name: 'Dealer 3',
            revenue: '₹90,000',
            target: '40% target ⚠',
            targetColor: '#F06419',
            color: '#F06419',
          },
        ],
      },
      {
        id: 'sb',
        initials: 'SB',
        name: 'Stockist B',
        revenue: '₹4,20,000',
        targetText: '72% of ₹5.8L target',
        progress: 72,
        progressColor: '#173CFF',
        color: '#7412D9',
        expanded: false,
        dealers: [],
      },
      {
        id: 'sc',
        initials: 'SC',
        name: 'Stockist C',
        revenue: '₹1,80,000',
        targetText: '44% of ₹4L target',
        progress: 44,
        progressColor: '#D90014',
        color: '#C80016',
        expanded: false,
        dealers: [],
      },
    ],
    directDealers: [
      {id: 'dd1', initials: 'DD1', name: 'Direct Dealer 1', revenue: '₹2.4L'},
      {id: 'dd2', initials: 'DD2', name: 'Direct Dealer 2', revenue: '₹1.6L'},
    ],
    commission: {
      totalGenerated: '₹1,80,000',
      stockistCommissions: '₹1,10,000',
      dealerCommissions: '₹70,000',
      pendingPayout: '₹64,000',
      rows: [
        {id: '1', entity: 'Stockist A', amount: '₹60,000', status: 'Paid'},
        {id: '2', entity: 'Stockist B', amount: '₹32,000', status: 'Pending'},
        {id: '3', entity: 'Dealer 1', amount: '₹18,000', status: 'Pending'},
      ],
    },
  },

  Month: {
    period: 'Month',
    kpis: [
      {
        id: '1',
        title: 'Network Revenue MTD',
        value: '₹48,00,000',
        subtitle: '↑ +18% vs last month',
        icon: 'revenue',
        color: '#061247',
        iconBg: '#008A21',
      },
      {
        id: '2',
        title: 'Commission Payable',
        value: '₹4,80,000',
        subtitle: 'To franchises this cycle',
        icon: 'commission',
        color: '#F06419',
        iconBg: '#F06419',
      },
      {
        id: '3',
        title: 'Total Outstanding',
        value: '₹12,00,000',
        subtitle: '32 invoices pending',
        icon: 'outstanding',
        color: '#173CFF',
        iconBg: '#173CFF',
      },
      {
        id: '4',
        title: 'Overdue Payments',
        value: '₹3,50,000',
        subtitle: '8 franchises overdue',
        icon: 'overdue',
        color: '#D90014',
        iconBg: '#D90014',
      },
    ],
    revenueSplit: {
      total: '₹48L',
      stockistRevenue: '₹38L',
      stockistPercent: '79%',
      directDealerRevenue: '₹10L',
      directDealerPercent: '21%',
    },
    stockists: [
      {
        id: 'sa',
        initials: 'SA',
        name: 'Stockist A',
        revenue: '₹24,00,000',
        targetText: '80% of ₹30L target',
        progress: 80,
        progressColor: '#173CFF',
        color: '#061B66',
        expanded: true,
        dealers: [
          {
            id: 'd1',
            initials: 'D1',
            name: 'Dealer 1',
            revenue: '₹3,20,000',
            target: '92 target',
            targetColor: '#138A36',
            color: '#173CFF',
          },
          {
            id: 'd2',
            initials: 'D2',
            name: 'Dealer 2',
            revenue: '₹2,80,000',
            target: '85% target',
            targetColor: '#173CFF',
            color: '#087A55',
          },
          {
            id: 'd3',
            initials: 'D3',
            name: 'Dealer 3',
            revenue: '₹80,000',
            target: '32% target ⚠',
            targetColor: '#F06419',
            color: '#F06419',
          },
        ],
      },
      {
        id: 'sb',
        initials: 'SB',
        name: 'Stockist B',
        revenue: '₹18,00,000',
        targetText: '75% of ₹24L target',
        progress: 75,
        progressColor: '#173CFF',
        color: '#7412D9',
        expanded: false,
        dealers: [],
      },
      {
        id: 'sc',
        initials: 'SC',
        name: 'Stockist C',
        revenue: '₹3,80,000',
        targetText: '48% of ₹8L target',
        progress: 48,
        progressColor: '#D90014',
        color: '#C80016',
        expanded: false,
        dealers: [],
      },
    ],
    directDealers: [
      {id: 'dd1', initials: 'DD1', name: 'Direct Dealer 1', revenue: '₹6L'},
      {id: 'dd2', initials: 'DD2', name: 'Direct Dealer 2', revenue: '₹4L'},
    ],
    commission: {
      totalGenerated: '₹4,80,000',
      stockistCommissions: '₹3,00,000',
      dealerCommissions: '₹1,80,000',
      pendingPayout: '₹1,60,000',
      rows: [
        {id: '1', entity: 'Stockist A', amount: '₹1,20,000', status: 'Paid'},
        {id: '2', entity: 'Stockist B', amount: '₹90,000', status: 'Pending'},
        {id: '3', entity: 'Dealer 1', amount: '₹36,000', status: 'Pending'},
      ],
    },
  },

  Quarter: {
    period: 'Quarter',
    kpis: [
      {
        id: '1',
        title: 'Network Revenue QTD',
        value: '₹1,36,00,000',
        subtitle: '↑ +22% vs last quarter',
        icon: 'revenue',
        color: '#061247',
        iconBg: '#008A21',
      },
      {
        id: '2',
        title: 'Commission Payable',
        value: '₹13,60,000',
        subtitle: 'To franchises this quarter',
        icon: 'commission',
        color: '#F06419',
        iconBg: '#F06419',
      },
      {
        id: '3',
        title: 'Total Outstanding',
        value: '₹28,00,000',
        subtitle: '68 invoices pending',
        icon: 'outstanding',
        color: '#173CFF',
        iconBg: '#173CFF',
      },
      {
        id: '4',
        title: 'Overdue Payments',
        value: '₹8,40,000',
        subtitle: '14 franchises overdue',
        icon: 'overdue',
        color: '#D90014',
        iconBg: '#D90014',
      },
    ],
    revenueSplit: {
      total: '₹136L',
      stockistRevenue: '₹106L',
      stockistPercent: '78%',
      directDealerRevenue: '₹30L',
      directDealerPercent: '22%',
    },
    stockists: [
      {
        id: 'sa',
        initials: 'SA',
        name: 'Stockist A',
        revenue: '₹64,00,000',
        targetText: '82% of ₹78L target',
        progress: 82,
        progressColor: '#173CFF',
        color: '#061B66',
        expanded: true,
        dealers: [
          {
            id: 'd1',
            initials: 'D1',
            name: 'Dealer 1',
            revenue: '₹9,80,000',
            target: '94% target',
            targetColor: '#138A36',
            color: '#173CFF',
          },
          {
            id: 'd2',
            initials: 'D2',
            name: 'Dealer 2',
            revenue: '₹8,20,000',
            target: '87% target',
            targetColor: '#173CFF',
            color: '#087A55',
          },
          {
            id: 'd3',
            initials: 'D3',
            name: 'Dealer 3',
            revenue: '₹2,40,000',
            target: '42% target ⚠',
            targetColor: '#F06419',
            color: '#F06419',
          },
        ],
      },
      {
        id: 'sb',
        initials: 'SB',
        name: 'Stockist B',
        revenue: '₹32,00,000',
        targetText: '76% of ₹42L target',
        progress: 76,
        progressColor: '#173CFF',
        color: '#7412D9',
        expanded: false,
        dealers: [],
      },
      {
        id: 'sc',
        initials: 'SC',
        name: 'Stockist C',
        revenue: '₹10,00,000',
        targetText: '50% of ₹20L target',
        progress: 50,
        progressColor: '#D90014',
        color: '#C80016',
        expanded: false,
        dealers: [],
      },
    ],
    directDealers: [
      {id: 'dd1', initials: 'DD1', name: 'Direct Dealer 1', revenue: '₹18L'},
      {id: 'dd2', initials: 'DD2', name: 'Direct Dealer 2', revenue: '₹12L'},
    ],
    commission: {
      totalGenerated: '₹13,60,000',
      stockistCommissions: '₹8,60,000',
      dealerCommissions: '₹5,00,000',
      pendingPayout: '₹4,20,000',
      rows: [
        {id: '1', entity: 'Stockist A', amount: '₹3,20,000', status: 'Paid'},
        {id: '2', entity: 'Stockist B', amount: '₹1,90,000', status: 'Pending'},
        {id: '3', entity: 'Dealer 1', amount: '₹96,000', status: 'Pending'},
      ],
    },
  },

  Custom: {
    period: 'Custom',
    kpis: [
      {
        id: '1',
        title: 'Network Revenue Custom',
        value: '₹72,00,000',
        subtitle: 'Selected range performance',
        icon: 'revenue',
        color: '#061247',
        iconBg: '#008A21',
      },
      {
        id: '2',
        title: 'Commission Payable',
        value: '₹7,20,000',
        subtitle: 'To franchises in range',
        icon: 'commission',
        color: '#F06419',
        iconBg: '#F06419',
      },
      {
        id: '3',
        title: 'Total Outstanding',
        value: '₹15,60,000',
        subtitle: '41 invoices pending',
        icon: 'outstanding',
        color: '#173CFF',
        iconBg: '#173CFF',
      },
      {
        id: '4',
        title: 'Overdue Payments',
        value: '₹4,20,000',
        subtitle: '9 franchises overdue',
        icon: 'overdue',
        color: '#D90014',
        iconBg: '#D90014',
      },
    ],
    revenueSplit: {
      total: '₹72L',
      stockistRevenue: '₹56L',
      stockistPercent: '78%',
      directDealerRevenue: '₹16L',
      directDealerPercent: '22%',
    },
    stockists: [
      {
        id: 'sa',
        initials: 'SA',
        name: 'Stockist A',
        revenue: '₹32,00,000',
        targetText: '84% of ₹38L target',
        progress: 84,
        progressColor: '#173CFF',
        color: '#061B66',
        expanded: true,
        dealers: [
          {
            id: 'd1',
            initials: 'D1',
            name: 'Dealer 1',
            revenue: '₹4,30,000',
            target: '90% target',
            targetColor: '#138A36',
            color: '#173CFF',
          },
          {
            id: 'd2',
            initials: 'D2',
            name: 'Dealer 2',
            revenue: '₹3,40,000',
            target: '82% target',
            targetColor: '#173CFF',
            color: '#087A55',
          },
          {
            id: 'd3',
            initials: 'D3',
            name: 'Dealer 3',
            revenue: '₹1,20,000',
            target: '39% target ⚠',
            targetColor: '#F06419',
            color: '#F06419',
          },
        ],
      },
      {
        id: 'sb',
        initials: 'SB',
        name: 'Stockist B',
        revenue: '₹18,00,000',
        targetText: '72% of ₹25L target',
        progress: 72,
        progressColor: '#173CFF',
        color: '#7412D9',
        expanded: false,
        dealers: [],
      },
      {
        id: 'sc',
        initials: 'SC',
        name: 'Stockist C',
        revenue: '₹6,00,000',
        targetText: '46% of ₹13L target',
        progress: 46,
        progressColor: '#D90014',
        color: '#C80016',
        expanded: false,
        dealers: [],
      },
    ],
    directDealers: [
      {id: 'dd1', initials: 'DD1', name: 'Direct Dealer 1', revenue: '₹9L'},
      {id: 'dd2', initials: 'DD2', name: 'Direct Dealer 2', revenue: '₹7L'},
    ],
    commission: {
      totalGenerated: '₹7,20,000',
      stockistCommissions: '₹4,40,000',
      dealerCommissions: '₹2,80,000',
      pendingPayout: '₹2,10,000',
      rows: [
        {id: '1', entity: 'Stockist A', amount: '₹1,80,000', status: 'Paid'},
        {id: '2', entity: 'Stockist B', amount: '₹1,10,000', status: 'Pending'},
        {id: '3', entity: 'Dealer 1', amount: '₹54,000', status: 'Pending'},
      ],
    },
  },
};

const mockFinanceApi = async (period: PeriodType): Promise<FinanceData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(financeMockByPeriod[period]), 300);
  });
};

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(34)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Finance</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Download color="#FFFFFF" size={rs(34)} strokeWidth={2.4} />
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
            style={[styles.periodPill, active && styles.activePeriodPill]}>
            <Text style={[styles.periodText, active && styles.activePeriodText]}>
              {period}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const KpiIcon = ({item}: {item: FinanceKpi}) => {
  return (
    <View style={[styles.kpiIconBox, {backgroundColor: item.iconBg}]}>
      {item.icon === 'revenue' && (
        <Database color="#FFFFFF" size={rs(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'commission' && (
        <WalletCards color="#FFFFFF" size={rs(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'outstanding' && (
        <BarChart3 color="#FFFFFF" size={rs(31)} strokeWidth={2.3} />
      )}

      {item.icon === 'overdue' && (
        <AlertTriangle color="#FFFFFF" size={rs(31)} strokeWidth={2.3} />
      )}
    </View>
  );
};

const KpiCard = ({item}: {item: FinanceKpi}) => {
  return (
    <View style={styles.kpiCard}>
      <KpiIcon item={item} />

      <View style={styles.kpiTextBox}>
        <Text style={styles.kpiTitle}>{item.title}</Text>
        <Text style={[styles.kpiValue, {color: item.color}]}>{item.value}</Text>
        <Text style={[styles.kpiSubtitle, {color: item.color}]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

const KpiGrid = ({items}: {items: FinanceKpi[]}) => {
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
            style={[styles.financeTab, active && styles.activeFinanceTab]}>
            <Text style={[styles.financeTabText, active && styles.activeFinanceTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RevenueSourceCard = ({data}: {data: FinanceData}) => {
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
            {data.revenueSplit.stockistRevenue} ({data.revenueSplit.stockistPercent})
          </Text>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.blueDot} />
          <Text style={styles.legendLabel}>Direct Dealers</Text>
          <Text style={styles.legendValue}>
            {data.revenueSplit.directDealerRevenue} ({data.revenueSplit.directDealerPercent})
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProgressBar = ({
  value,
  color,
}: {
  value: number;
  color: string;
}) => {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${value}%`, backgroundColor: color}]} />
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
            <View style={[styles.stockistAvatar, {backgroundColor: stockist.color}]}>
              <Text style={styles.avatarText}>{stockist.initials}</Text>
            </View>

            <View style={styles.stockistInfo}>
              <Text style={styles.stockistName}>{stockist.name}</Text>
              <Text style={styles.stockistTargetText}>{stockist.targetText}</Text>
              <ProgressBar value={stockist.progress} color={stockist.progressColor} />
            </View>

            <View style={styles.stockistAmountBox}>
              <Text
                style={[
                  styles.stockistRevenue,
                  stockist.progressColor === '#D90014' && {color: '#D90014'},
                ]}>
                {stockist.revenue}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onToggle(stockist.id)}
                style={styles.showDealerButton}>
                <ChevronDown
                  color="#061247"
                  size={rs(18)}
                  strokeWidth={2.3}
                  style={{
                    transform: [{rotate: stockist.expanded ? '0deg' : '-90deg'}],
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
                  <View style={[styles.dealerAvatar, {backgroundColor: dealer.color}]}>
                    <Text style={styles.dealerAvatarText}>{dealer.initials}</Text>
                  </View>

                  <Text style={styles.dealerName}>{dealer.name}</Text>

                  <View style={styles.dealerAmountBox}>
                    <Text
                      style={[
                        styles.dealerRevenue,
                        dealer.targetColor === '#F06419' && {color: '#F06419'},
                      ]}>
                      {dealer.revenue}
                    </Text>
                    <Text style={[styles.dealerTarget, {color: dealer.targetColor}]}>
                      {dealer.target}
                    </Text>
                  </View>

                  <ChevronRight color="#061247" size={rs(22)} strokeWidth={2.4} />
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
        <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.directDealerRow}>
          <View style={styles.directDealerAvatar}>
            <Text style={styles.directDealerAvatarText}>{item.initials}</Text>
          </View>

          <Text style={styles.directDealerName}>{item.name}</Text>

          <Text style={styles.directDealerRevenue}>{item.revenue}</Text>

          <ChevronRight color="#061247" size={rs(18)} strokeWidth={2.4} />
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
          <View style={[styles.gridLine, {top: '35%'}]} />
          <View style={[styles.gridLine, {top: '66%'}]} />

          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
            month => (
              <Text key={month} style={styles.monthLabel}>
                {month}
              </Text>
            ),
          )}

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
  data: FinanceData;
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
  data: FinanceData;
  approvedAll: boolean;
  onApprove: () => void;
}) => {
  return (
    <View style={styles.commissionCard}>
      <Text style={styles.cardTitle}>Commission Overview</Text>

      <View style={styles.commissionStats}>
        <View style={styles.commissionStat}>
          <Text style={styles.commissionLabel}>Total Generated</Text>
          <Text style={styles.commissionBlue}>{data.commission.totalGenerated}</Text>
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
          <Text style={styles.commissionOrange}>{data.commission.pendingPayout}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onApprove}
        style={[styles.approveButton, approvedAll && styles.approvedButton]}>
        <Text style={styles.approveButtonText}>
          {approvedAll ? 'All Payouts Approved' : 'Approve All Payouts'}
        </Text>
        <CheckCircle2 color="#FFFFFF" size={rs(20)} fill="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.commissionTableHeader}>
        <Text style={styles.tableHeaderText}>Entity</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <View style={{width: rs(20)}} />
      </View>

      {data.commission.rows.map(row => {
        const paid = approvedAll || row.status === 'Paid';

        return (
          <TouchableOpacity key={row.id} activeOpacity={0.8} style={styles.commissionRow}>
            <Text style={styles.entityText}>{row.entity}</Text>
            <Text style={styles.amountColumn}>{row.amount}</Text>

            <View style={[styles.payoutBadge, paid ? styles.paidBadge : styles.pendingBadge]}>
              <Text style={[styles.payoutText, paid ? styles.paidText : styles.pendingText]}>
                {paid ? 'Paid' : 'Pending'}
              </Text>
              {paid && <CheckCircle2 color="#138A36" size={rs(14)} fill="#138A36" />}
            </View>

            <ChevronRight color="#061247" size={rs(20)} strokeWidth={2.4} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const PaymentsSection = ({data}: {data: FinanceData}) => {
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

const IncentivesSection = ({data}: {data: FinanceData}) => {
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
        <FileText color="#061B66" size={rs(22)} strokeWidth={2.3} />
        <Text style={styles.reportButtonText}>Export Finance Report</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.excelButton}>
        <Download color="#FFFFFF" size={rs(22)} strokeWidth={2.3} />
        <Text style={styles.excelButtonText}>Download Excel</Text>
      </TouchableOpacity>
    </View>
  );
};

const FinanceScreen = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('Month');
  const [activeTab, setActiveTab] = useState<FinanceTabType>('Revenue');
  const [data, setData] = useState<FinanceData | null>(null);
  const [approvedAll, setApprovedAll] = useState(false);

  useEffect(() => {
    setData(null);
    setApprovedAll(false);

    mockFinanceApi(activePeriod).then(response => {
      setData(response);
    });
  }, [activePeriod]);

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
        item.id === id ? {...item, expanded: !item.expanded} : item,
      ),
    });
  };

  if (!displayedData) {
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
        <PeriodTabs activePeriod={activePeriod} onChange={setActivePeriod} />

        <KpiGrid items={displayedData.kpis} />

        <FinanceTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Revenue' && (
          <RevenueSection data={displayedData} onToggleStockist={toggleStockist} />
        )}

        {activeTab === 'Commission' && (
          <CommissionOverview
            data={displayedData}
            approvedAll={approvedAll}
            onApprove={() => setApprovedAll(true)}
          />
        )}

        {activeTab === 'Payments' && <PaymentsSection data={displayedData} />}

        {activeTab === 'Incentives' && <IncentivesSection data={displayedData} />}

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

const PAGE_PADDING = rs(28);
const CARD_GAP = rs(14);
const KPI_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;
const LEFT_CARD_WIDTH = rs(272);
const RIGHT_CARD_WIDTH = SCREEN_WIDTH - PAGE_PADDING * 2 - LEFT_CARD_WIDTH - CARD_GAP;

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
    paddingHorizontal: rs(30),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(27),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(18),
    paddingBottom: rs(34),
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: rs(18),
  },
  periodPill: {
    minWidth: rs(118),
    height: rs(39),
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#D7DBE7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: rs(8),
  },
  activePeriodPill: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  periodText: {
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '700',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: rs(14),
  },
  kpiCard: {
    width: KPI_WIDTH,
    minHeight: rs(132),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    marginBottom: rs(14),
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  kpiIconBox: {
    width: rs(68),
    height: rs(68),
    borderRadius: rs(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  kpiTextBox: {
    flex: 1,
  },
  kpiTitle: {
    color: '#5D607E',
    fontSize: rs(16),
    fontWeight: '700',
  },
  kpiValue: {
    fontSize: rs(31),
    fontWeight: '900',
    letterSpacing: rs(5),
    marginTop: rs(9),
  },
  kpiSubtitle: {
    fontSize: rs(16),
    fontWeight: '600',
    marginTop: rs(8),
  },
  financeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(12),
  },
  financeTab: {
    width: '23.5%',
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 1,
    borderColor: '#D7DBE7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFinanceTab: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  financeTabText: {
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '700',
  },
  activeFinanceTabText: {
    color: '#FFFFFF',
  },
  revenueLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(14),
  },
  revenueSourceCard: {
    width: LEFT_CARD_WIDTH,
    minHeight: rs(550),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(20),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  cardTitle: {
    color: '#111327',
    fontSize: rs(16),
    fontWeight: '900',
  },
  donutWrap: {
    width: rs(220),
    height: rs(220),
    alignSelf: 'center',
    marginTop: rs(22),
    marginBottom: rs(26),
    borderRadius: rs(110),
    borderWidth: rs(45),
    borderTopColor: '#173CFF',
    borderRightColor: '#173CFF',
    borderBottomColor: '#061B66',
    borderLeftColor: '#061B66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCircle: {
    width: rs(130),
    height: rs(130),
    borderRadius: rs(65),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutAmount: {
    color: '#061247',
    fontSize: rs(30),
    fontWeight: '900',
  },
  donutLabel: {
    color: '#5D607E',
    fontSize: rs(14),
    fontWeight: '600',
    marginTop: rs(5),
  },
  donutPercentRight: {
    position: 'absolute',
    right: -rs(32),
    top: rs(48),
    color: '#FFFFFF',
    fontSize: rs(18),
    fontWeight: '800',
  },
  donutPercentLeft: {
    position: 'absolute',
    left: -rs(22),
    bottom: rs(34),
    color: '#FFFFFF',
    fontSize: rs(18),
    fontWeight: '800',
  },
  legendWrap: {
    marginTop: rs(2),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  darkDot: {
    width: rs(14),
    height: rs(14),
    borderRadius: rs(7),
    backgroundColor: '#061B66',
    marginRight: rs(12),
  },
  blueDot: {
    width: rs(14),
    height: rs(14),
    borderRadius: rs(7),
    backgroundColor: '#173CFF',
    marginRight: rs(12),
  },
  legendLabel: {
    flex: 1,
    color: '#061247',
    fontSize: rs(14),
    fontWeight: '600',
  },
  legendValue: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  stockistRevenueCard: {
    width: RIGHT_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(20),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(18),
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '800',
  },
  stockistBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    paddingBottom: rs(14),
    marginBottom: rs(14),
  },
  stockistTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stockistAvatar: {
    width: rs(50),
    height: rs(50),
    borderRadius: rs(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: rs(19),
    fontWeight: '900',
  },
  stockistInfo: {
    flex: 1,
  },
  stockistName: {
    color: '#111327',
    fontSize: rs(16),
    fontWeight: '900',
  },
  stockistTargetText: {
    color: '#4D506E',
    fontSize: rs(13),
    fontWeight: '600',
    marginTop: rs(8),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(12),
  },
  progressTrack: {
    flex: 1,
    height: rs(7),
    borderRadius: rs(6),
    backgroundColor: '#E3E5EC',
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(7),
    borderRadius: rs(6),
  },
  progressText: {
    color: '#4D506E',
    fontSize: rs(13),
    fontWeight: '700',
    marginLeft: rs(14),
  },
  stockistAmountBox: {
    alignItems: 'flex-end',
    marginLeft: rs(10),
  },
  stockistRevenue: {
    color: '#138A36',
    fontSize: rs(18),
    fontWeight: '900',
  },
  showDealerButton: {
    marginTop: rs(16),
    height: rs(30),
    minWidth: rs(126),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showDealerText: {
    color: '#061247',
    fontSize: rs(12),
    fontWeight: '800',
    marginLeft: rs(6),
  },
  dealerTree: {
    marginLeft: rs(38),
    marginTop: rs(14),
    paddingLeft: rs(26),
    borderLeftWidth: 1,
    borderLeftColor: '#D9DCE8',
  },
  dealerRevenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: rs(54),
  },
  dealerAvatar: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  dealerAvatarText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '900',
  },
  dealerName: {
    flex: 1,
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
  },
  dealerAmountBox: {
    alignItems: 'flex-end',
    marginRight: rs(12),
  },
  dealerRevenue: {
    color: '#138A36',
    fontSize: rs(16),
    fontWeight: '900',
  },
  dealerTarget: {
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(3),
  },
  moreDealersText: {
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: rs(10),
  },
  directDealerCard: {
    width: LEFT_CARD_WIDTH,
    minHeight: rs(222),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  directDealerTitle: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  directDealerAmount: {
    color: '#138A36',
    fontSize: rs(14),
    fontWeight: '900',
  },
  directDealerRow: {
    minHeight: rs(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
  },
  directDealerAvatar: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#173CFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  directDealerAvatarText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontWeight: '900',
  },
  directDealerName: {
    flex: 1,
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
  },
  directDealerRevenue: {
    color: '#138A36',
    fontSize: rs(14),
    fontWeight: '900',
    marginRight: rs(12),
  },
  monthlyTrendCard: {
    width: RIGHT_CARD_WIDTH,
    minHeight: rs(222),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
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
    marginLeft: rs(12),
  },
  blueLine: {
    width: rs(22),
    height: rs(3),
    backgroundColor: '#173CFF',
    marginRight: rs(6),
  },
  dashedLine: {
    width: rs(22),
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#5D607E',
    marginRight: rs(6),
  },
  chartLegendText: {
    color: '#5D607E',
    fontSize: rs(10),
    fontWeight: '600',
  },
  fakeChart: {
    flex: 1,
    flexDirection: 'row',
    marginTop: rs(16),
  },
  yAxis: {
    width: rs(38),
    justifyContent: 'space-between',
    paddingBottom: rs(18),
  },
  axisText: {
    color: '#5D607E',
    fontSize: rs(10),
    fontWeight: '500',
  },
  chartArea: {
    flex: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: rs(5),
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '12%',
    height: 1,
    backgroundColor: '#EEF0F6',
  },
  monthLabel: {
    color: '#5D607E',
    fontSize: rs(9),
    fontWeight: '500',
  },
  lineOne: {
    position: 'absolute',
    left: rs(4),
    right: rs(36),
    bottom: rs(32),
    height: rs(64),
    borderTopWidth: rs(3),
    borderColor: '#173CFF',
    transform: [{rotate: '-5deg'}],
  },
  lineTwo: {
    position: 'absolute',
    left: rs(90),
    right: rs(12),
    bottom: rs(74),
    height: rs(74),
    borderTopWidth: rs(3),
    borderColor: '#173CFF',
    transform: [{rotate: '7deg'}],
  },
  lineDot: {
    position: 'absolute',
    right: rs(2),
    top: rs(10),
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#173CFF',
  },
  commissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(20),
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  commissionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(22),
    marginBottom: rs(22),
  },
  commissionStat: {
    flex: 1,
  },
  commissionLabel: {
    color: '#5D607E',
    fontSize: rs(11),
    fontWeight: '600',
    marginBottom: rs(7),
  },
  commissionBlue: {
    color: '#173CFF',
    fontSize: rs(21),
    fontWeight: '900',
    letterSpacing: rs(4),
  },
  commissionOrange: {
    color: '#F06419',
    fontSize: rs(21),
    fontWeight: '900',
    letterSpacing: rs(4),
  },
  verticalDivider: {
    width: 1,
    height: rs(40),
    backgroundColor: '#D9DCE8',
    marginHorizontal: rs(16),
  },
  approveButton: {
    height: rs(38),
    backgroundColor: '#087A22',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: rs(18),
  },
  approvedButton: {
    backgroundColor: '#0B9A2D',
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '800',
    marginRight: rs(8),
  },
  commissionTableHeader: {
    height: rs(34),
    backgroundColor: '#F7F8FC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(2),
  },
  tableHeaderText: {
    flex: 1,
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
  },
  commissionRow: {
    minHeight: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
  },
  entityText: {
    flex: 1,
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '800',
  },
  amountColumn: {
    flex: 1,
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '600',
  },
  payoutBadge: {
    width: rs(72),
    height: rs(26),
    borderRadius: rs(5),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
  },
  paidBadge: {
    backgroundColor: '#EAF8EC',
    borderColor: '#BEE7C5',
  },
  pendingBadge: {
    backgroundColor: '#FFF6EE',
    borderColor: '#FFD4B6',
  },
  payoutText: {
    fontSize: rs(12),
    fontWeight: '800',
    marginRight: rs(4),
  },
  paidText: {
    color: '#138A36',
  },
  pendingText: {
    color: '#F06419',
  },
  simpleFullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    padding: rs(20),
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  infoRow: {
    minHeight: rs(52),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#111327',
    fontSize: rs(15),
    fontWeight: '700',
  },
  infoValue: {
    color: '#173CFF',
    fontSize: rs(16),
    fontWeight: '900',
  },
  financeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportButton: {
    width: '49%',
    height: rs(50),
    borderWidth: 1,
    borderColor: '#061B66',
    borderRadius: rs(5),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: '#061B66',
    fontSize: rs(15),
    fontWeight: '800',
    marginLeft: rs(12),
  },
  excelButton: {
    width: '49%',
    height: rs(50),
    borderRadius: rs(5),
    backgroundColor: '#061B66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  excelButtonText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '800',
    marginLeft: rs(12),
  },
});