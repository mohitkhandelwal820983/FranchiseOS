export type PeriodTab = 'Today' | 'Week' | 'Month' | 'Quarter';

export type SummaryCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'collected' | 'outstanding' | 'overdue' | 'revenue';
  color: string;
  bg: string;
};

export type BreakdownItem = {
  id: string;
  company: string;
  collected: number;
  pending: number;
  overdue: number;
};

export type PaymentStatus = 'Collected' | 'Pending' | 'Overdue' | 'Processing';

export type LatestPayment = {
  id: string;
  company: string;
  description: string;
  time: string;
  amount: string;
  status: PaymentStatus;
};

export type PaymentData = {
  summary: SummaryCard[];
  collectionTrend: {
    collected: string;
    pending: string;
    overdue: string;
    weekly: {
      week: string;
      collected: number;
      pending: number;
    }[];
  };
  companyBreakdown: BreakdownItem[];
  latestPayments: LatestPayment[];
};

export const periodWiseData: Record<PeriodTab, PaymentData> = {
  Today: {
    summary: [
      {
        id: '1',
        title: 'Total Collected Today',
        value: '₹8,20,000',
        subtitle: '↑ +6% vs yesterday',
        icon: 'collected',
        color: '#138A36',
        bg: '#EAF8EC',
      },
      {
        id: '2',
        title: 'Total Outstanding',
        value: '₹3,40,000',
        subtitle: '14 invoices pending',
        icon: 'outstanding',
        color: '#F06419',
        bg: '#FFF3E9',
      },
      {
        id: '3',
        title: 'Total Overdue',
        value: '₹82,000',
        subtitle: '3 franchises ⚠',
        icon: 'overdue',
        color: '#E00014',
        bg: '#FFF0F0',
      },
      {
        id: '4',
        title: 'Total Revenue',
        value: '₹12,50,000',
        subtitle: 'Platform wide today',
        icon: 'revenue',
        color: '#173CFF',
        bg: '#EEF3FF',
      },
    ],
    collectionTrend: {
      collected: '₹8.2L',
      pending: '₹3.4L',
      overdue: '₹82K',
      weekly: [
        {week: '9 AM', collected: 12, pending: 4},
        {week: '12 PM', collected: 18, pending: 6},
        {week: '3 PM', collected: 25, pending: 9},
        {week: '6 PM', collected: 32, pending: 12},
      ],
    },
    companyBreakdown: [
      {id: '1', company: 'TechCorp', collected: 9, pending: 2, overdue: 0},
      {id: '2', company: 'Reliance', collected: 6, pending: 3, overdue: 0},
      {id: '3', company: 'ABC Brand', collected: 3, pending: 1, overdue: 1},
    ],
    latestPayments: [
      {
        id: '1',
        company: 'TechCorp India',
        description: 'Invoice #INV-2024-001 — Stockist A',
        time: '20 min ago',
        amount: '₹2,40,000',
        status: 'Collected',
      },
      {
        id: '2',
        company: 'Reliance Industries',
        description: 'Invoice #INV-2024-002 — Dealer Network',
        time: '1 hour ago',
        amount: '₹80,000',
        status: 'Pending',
      },
      {
        id: '3',
        company: 'ABC Distributors',
        description: 'Invoice #INV-2024-003 — Stockist B',
        time: '3 hours ago',
        amount: '₹82,000',
        status: 'Overdue',
      },
      {
        id: '4',
        company: 'MNO Brands',
        description: 'Commission Payout — Dealer Network',
        time: '5 hours ago',
        amount: '₹1,20,000',
        status: 'Processing',
      },
    ],
  },

  Week: {
    summary: [
      {
        id: '1',
        title: 'Total Collected This Week',
        value: '₹22,00,000',
        subtitle: '↑ +11% vs last week',
        icon: 'collected',
        color: '#138A36',
        bg: '#EAF8EC',
      },
      {
        id: '2',
        title: 'Total Outstanding',
        value: '₹8,40,000',
        subtitle: '22 invoices pending',
        icon: 'outstanding',
        color: '#F06419',
        bg: '#FFF3E9',
      },
      {
        id: '3',
        title: 'Total Overdue',
        value: '₹1,80,000',
        subtitle: '5 franchises ⚠',
        icon: 'overdue',
        color: '#E00014',
        bg: '#FFF0F0',
      },
      {
        id: '4',
        title: 'Total Revenue',
        value: '₹32,00,000',
        subtitle: 'Platform wide week',
        icon: 'revenue',
        color: '#173CFF',
        bg: '#EEF3FF',
      },
    ],
    collectionTrend: {
      collected: '₹22L',
      pending: '₹8.4L',
      overdue: '₹1.8L',
      weekly: [
        {week: 'Mon', collected: 15, pending: 4},
        {week: 'Tue', collected: 22, pending: 6},
        {week: 'Wed', collected: 30, pending: 8},
        {week: 'Thu', collected: 36, pending: 10},
      ],
    },
    companyBreakdown: [
      {id: '1', company: 'TechCorp', collected: 16, pending: 3, overdue: 1},
      {id: '2', company: 'Reliance', collected: 12, pending: 4, overdue: 1},
      {id: '3', company: 'ABC Brand', collected: 6, pending: 2, overdue: 1},
    ],
    latestPayments: [
      {
        id: '1',
        company: 'TechCorp India',
        description: 'Invoice #INV-2024-001 — Stockist A',
        time: '2 hours ago',
        amount: '₹6,00,000',
        status: 'Collected',
      },
      {
        id: '2',
        company: 'Reliance Industries',
        description: 'Invoice #INV-2024-002 — Dealer Network',
        time: '8 hours ago',
        amount: '₹4,80,000',
        status: 'Pending',
      },
      {
        id: '3',
        company: 'ABC Distributors',
        description: 'Invoice #INV-2024-003 — Stockist B',
        time: '1 day ago',
        amount: '₹1,80,000',
        status: 'Overdue',
      },
      {
        id: '4',
        company: 'MNO Brands',
        description: 'Commission Payout — Dealer Network',
        time: '2 days ago',
        amount: '₹2,10,000',
        status: 'Processing',
      },
    ],
  },

  Month: {
    summary: [
      {
        id: '1',
        title: 'Total Collected MTD',
        value: '₹48,00,000',
        subtitle: '↑ +18% vs last month',
        icon: 'collected',
        color: '#138A36',
        bg: '#EAF8EC',
      },
      {
        id: '2',
        title: 'Total Outstanding',
        value: '₹12,00,000',
        subtitle: '32 invoices pending',
        icon: 'outstanding',
        color: '#F06419',
        bg: '#FFF3E9',
      },
      {
        id: '3',
        title: 'Total Overdue',
        value: '₹3,50,000',
        subtitle: '8 franchises ⚠',
        icon: 'overdue',
        color: '#E00014',
        bg: '#FFF0F0',
      },
      {
        id: '4',
        title: 'Total Revenue',
        value: '₹60,00,000',
        subtitle: 'Platform wide MTD',
        icon: 'revenue',
        color: '#173CFF',
        bg: '#EEF3FF',
      },
    ],
    collectionTrend: {
      collected: '₹48L',
      pending: '₹12L',
      overdue: '₹3.5L',
      weekly: [
        {week: 'Week 1', collected: 19, pending: 5},
        {week: 'Week 2', collected: 29, pending: 8},
        {week: 'Week 3', collected: 32, pending: 10},
        {week: 'Week 4', collected: 36, pending: 12},
      ],
    },
    companyBreakdown: [
      {id: '1', company: 'TechCorp', collected: 24, pending: 4, overdue: 0},
      {id: '2', company: 'Reliance', collected: 18, pending: 6, overdue: 0},
      {id: '3', company: 'ABC Brand', collected: 8, pending: 0, overdue: 2},
    ],
    latestPayments: [
      {
        id: '1',
        company: 'TechCorp India',
        description: 'Invoice #INV-2024-001 — Stockist A',
        time: '2 hours ago',
        amount: '₹24,00,000',
        status: 'Collected',
      },
      {
        id: '2',
        company: 'Reliance Industries',
        description: 'Invoice #INV-2024-002 — Dealer Network',
        time: '5 hours ago',
        amount: '₹18,00,000',
        status: 'Pending',
      },
      {
        id: '3',
        company: 'ABC Distributors',
        description: 'Invoice #INV-2024-003 — Stockist B',
        time: '2 days ago',
        amount: '₹3,50,000',
        status: 'Overdue',
      },
      {
        id: '4',
        company: 'MNO Brands',
        description: 'Commission Payout — Dealer Network',
        time: '3 days ago',
        amount: '₹2,80,000',
        status: 'Processing',
      },
    ],
  },

  Quarter: {
    summary: [
      {
        id: '1',
        title: 'Total Collected QTD',
        value: '₹1,42,00,000',
        subtitle: '↑ +22% vs last quarter',
        icon: 'collected',
        color: '#138A36',
        bg: '#EAF8EC',
      },
      {
        id: '2',
        title: 'Total Outstanding',
        value: '₹28,00,000',
        subtitle: '76 invoices pending',
        icon: 'outstanding',
        color: '#F06419',
        bg: '#FFF3E9',
      },
      {
        id: '3',
        title: 'Total Overdue',
        value: '₹9,40,000',
        subtitle: '18 franchises ⚠',
        icon: 'overdue',
        color: '#E00014',
        bg: '#FFF0F0',
      },
      {
        id: '4',
        title: 'Total Revenue',
        value: '₹1,80,00,000',
        subtitle: 'Platform wide QTD',
        icon: 'revenue',
        color: '#173CFF',
        bg: '#EEF3FF',
      },
    ],
    collectionTrend: {
      collected: '₹142L',
      pending: '₹28L',
      overdue: '₹9.4L',
      weekly: [
        {week: 'Month 1', collected: 30, pending: 8},
        {week: 'Month 2', collected: 44, pending: 12},
        {week: 'Month 3', collected: 58, pending: 16},
        {week: 'Current', collected: 72, pending: 20},
      ],
    },
    companyBreakdown: [
      {id: '1', company: 'TechCorp', collected: 64, pending: 12, overdue: 2},
      {id: '2', company: 'Reliance', collected: 48, pending: 10, overdue: 3},
      {id: '3', company: 'ABC Brand', collected: 28, pending: 5, overdue: 4},
    ],
    latestPayments: [
      {
        id: '1',
        company: 'TechCorp India',
        description: 'Quarterly Invoice #QINV-2024-001',
        time: '1 day ago',
        amount: '₹64,00,000',
        status: 'Collected',
      },
      {
        id: '2',
        company: 'Reliance Industries',
        description: 'Quarterly Invoice #QINV-2024-002',
        time: '3 days ago',
        amount: '₹48,00,000',
        status: 'Pending',
      },
      {
        id: '3',
        company: 'ABC Distributors',
        description: 'Quarterly Invoice #QINV-2024-003',
        time: '1 week ago',
        amount: '₹9,40,000',
        status: 'Overdue',
      },
      {
        id: '4',
        company: 'MNO Brands',
        description: 'Quarterly Commission Payout',
        time: '2 weeks ago',
        amount: '₹8,20,000',
        status: 'Processing',
      },
    ],
  },
};

export const getMockPayments = async (): Promise<
  Record<PeriodTab, PaymentData>
> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(periodWiseData);
    }, 300);
  });
};