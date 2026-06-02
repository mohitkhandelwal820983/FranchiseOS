export type PeriodType = 'Today' | 'Week' | 'Month' | 'Quarter' | 'Custom';

export type FinanceTabType =
  | 'Revenue'
  | 'Commission'
  | 'Payments'
  | 'Incentives';

export type FinanceKpi = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'revenue' | 'commission' | 'outstanding' | 'overdue';
  color: string;
  iconBg: string;
};

export type DealerRevenue = {
  id: string;
  initials: string;
  name: string;
  revenue: string;
  target: string;
  targetColor: string;
  color: string;
};

export type StockistRevenue = {
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

export type DirectDealerRevenue = {
  id: string;
  initials: string;
  name: string;
  revenue: string;
};

export type CommissionRow = {
  id: string;
  entity: string;
  amount: string;
  status: 'Paid' | 'Pending';
};

export type CompanyFinanceData = {
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

export const companyFinanceMockByPeriod: Record<
  PeriodType,
  CompanyFinanceData
> = {
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
      {
        id: 'dd1',
        initials: 'DD1',
        name: 'Direct Dealer 1',
        revenue: '₹95K',
      },
      {
        id: 'dd2',
        initials: 'DD2',
        name: 'Direct Dealer 2',
        revenue: '₹65K',
      },
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
      {
        id: 'dd1',
        initials: 'DD1',
        name: 'Direct Dealer 1',
        revenue: '₹2.4L',
      },
      {
        id: 'dd2',
        initials: 'DD2',
        name: 'Direct Dealer 2',
        revenue: '₹1.6L',
      },
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
      {
        id: 'dd1',
        initials: 'DD1',
        name: 'Direct Dealer 1',
        revenue: '₹6L',
      },
      {
        id: 'dd2',
        initials: 'DD2',
        name: 'Direct Dealer 2',
        revenue: '₹4L',
      },
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
      {
        id: 'dd1',
        initials: 'DD1',
        name: 'Direct Dealer 1',
        revenue: '₹18L',
      },
      {
        id: 'dd2',
        initials: 'DD2',
        name: 'Direct Dealer 2',
        revenue: '₹12L',
      },
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
      {
        id: 'dd1',
        initials: 'DD1',
        name: 'Direct Dealer 1',
        revenue: '₹9L',
      },
      {
        id: 'dd2',
        initials: 'DD2',
        name: 'Direct Dealer 2',
        revenue: '₹7L',
      },
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

export const getMockCompanyFinance = async (
  period: PeriodType,
): Promise<CompanyFinanceData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(companyFinanceMockByPeriod[period]);
    }, 300);
  });
};