export type DetailType = 'stockist' | 'dealer';

export type MetricItem = {
  id: string;
  title: string;
  value: string;
  icon: 'revenue' | 'orders' | 'avg' | 'target' | 'commission';
  color: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  time: string;
};

export type DealerItem = {
  id: string;
  initials: string;
  name: string;
  city: string;
  revenue: string;
  score: string;
  status: 'Active' | 'At Risk' | 'Overdue';
  color: string;
};

export type CompanyNetworkDetailData = {
  id: string;
  type: DetailType;
  title: string;
  headerTitle: string;
  initials: string;
  location: string;
  status: string;
  memberSince: string;
  score: number;
  color: string;
  tabs: string[];
  metrics: MetricItem[];
  payment: {
    title: string;
    rateLabel: string;
    rate: string;
    outstandingLabel: string;
    outstanding: string;
    lastPaymentLabel: string;
    lastPayment: string;
    overdueLabel: string;
    overdue: string;
  };
  incentives: {
    firstTitle: string;
    firstProgress: number;
    firstMeta: string;
    firstReward: string;
    secondTitle: string;
    secondProgress: number;
    secondMeta: string;
  };
  timeline: TimelineItem[];
  dealers?: DealerItem[];
};

export const stockistDetail: CompanyNetworkDetailData = {
  id: 'stockist-a',
  type: 'stockist',
  title: 'Stockist Detail',
  headerTitle: 'Stockist A',
  initials: 'SA',
  location: 'Mumbai — Zone A',
  status: 'Active',
  memberSince: 'January 2023',
  score: 88,
  color: '#061B66',
  tabs: ['Overview', 'Dealers', 'Revenue', 'Orders', 'Payments'],
  metrics: [
    {
      id: '1',
      title: 'Revenue MTD',
      value: '₹24,00,000',
      icon: 'revenue',
      color: '#138A36',
    },
    {
      id: '2',
      title: 'Orders MTD',
      value: '156',
      icon: 'orders',
      color: '#173CFF',
    },
    {
      id: '3',
      title: 'Avg Order Value',
      value: '₹1,54,00',
      icon: 'avg',
      color: '#111327',
    },
    {
      id: '4',
      title: 'Target Achievement',
      value: '85%',
      icon: 'target',
      color: '#173CFF',
    },
    {
      id: '5',
      title: 'Commission Earned',
      value: '₹1,20,000',
      icon: 'commission',
      color: '#138A36',
    },
  ],
  payment: {
    title: 'Payment Compliance',
    rateLabel: 'On-time Payment Rate',
    rate: '95%',
    outstandingLabel: 'Outstanding Dues',
    outstanding: '₹0',
    lastPaymentLabel: 'Last Payment',
    lastPayment: '3 days ago',
    overdueLabel: 'Overdue Invoices',
    overdue: '0',
  },
  incentives: {
    firstTitle: '1000 Unit Club',
    firstProgress: 85,
    firstMeta: '850 of 1000 units',
    firstReward: '₹50,000 reward',
    secondTitle: 'Payment Champion',
    secondProgress: 100,
    secondMeta: 'Qualified — ₹20,000',
  },
  timeline: [
    {id: '1', title: 'Order placed ₹2,40,000', time: '2 hr ago'},
    {id: '2', title: 'Payment received ₹1,00,000', time: 'yesterday'},
    {id: '3', title: 'New dealer onboarded', time: '3 days ago'},
    {id: '4', title: 'Incentive qualified', time: '1 week ago'},
    {id: '5', title: 'Commission paid ₹1,20,000', time: '2 weeks ago'},
  ],
  dealers: [
    {
      id: 'dealer-1',
      initials: 'D1',
      name: 'Dealer 1',
      city: 'Mumbai',
      revenue: '₹3,20,000',
      score: '92/100',
      status: 'Active',
      color: '#173CFF',
    },
    {
      id: 'dealer-2',
      initials: 'D2',
      name: 'Dealer 2',
      city: 'Thane',
      revenue: '₹2,80,000',
      score: '85/100',
      status: 'Active',
      color: '#087A55',
    },
    {
      id: 'dealer-3',
      initials: 'D3',
      name: 'Dealer 3',
      city: 'Navi Mumbai',
      revenue: '₹80,000',
      score: '42/100',
      status: 'At Risk',
      color: '#F06419',
    },
    {
      id: 'dealer-4',
      initials: 'D4',
      name: 'Dealer 4',
      city: 'Mumbai',
      revenue: '₹0',
      score: '12/100',
      status: 'Overdue',
      color: '#D90014',
    },
    {
      id: 'dealer-5',
      initials: 'D5',
      name: 'Dealer 5',
      city: 'Pune',
      revenue: '₹2,10,000',
      score: '78/100',
      status: 'Active',
      color: '#173CFF',
    },
  ],
};

export const dealerDetail: CompanyNetworkDetailData = {
  id: 'dealer-1',
  type: 'dealer',
  title: 'Dealer Detail',
  headerTitle: 'Dealer 1',
  initials: 'D1',
  location: 'Under: Stockist A — Mumbai Zone A',
  status: 'Active',
  memberSince: 'March 2023',
  score: 92,
  color: '#173CFF',
  tabs: ['Overview', 'Revenue', 'Orders', 'Payments', 'Incentives'],
  metrics: [
    {
      id: '1',
      title: 'Revenue MTD',
      value: '₹3,20,000',
      icon: 'revenue',
      color: '#138A36',
    },
    {
      id: '2',
      title: 'Orders MTD',
      value: '18',
      icon: 'orders',
      color: '#173CFF',
    },
    {
      id: '3',
      title: 'Avg Order Value',
      value: '₹17,778',
      icon: 'avg',
      color: '#111327',
    },
    {
      id: '4',
      title: 'Target Achievement',
      value: '92%',
      icon: 'target',
      color: '#138A36',
    },
    {
      id: '5',
      title: 'Commission Earned',
      value: '₹9,600',
      icon: 'commission',
      color: '#138A36',
    },
  ],
  payment: {
    title: 'Payment Status',
    rateLabel: 'On-time Rate',
    rate: '100%',
    outstandingLabel: 'Outstanding Dues',
    outstanding: '₹0',
    lastPaymentLabel: 'Last Payment',
    lastPayment: '5 days ago',
    overdueLabel: 'Overdue',
    overdue: 'None',
  },
  incentives: {
    firstTitle: 'Diwali Champion',
    firstProgress: 75,
    firstMeta: '₹2.4L of ₹3L revenue',
    firstReward: '₹10,000 reward at stake',
    secondTitle: '100 Unit Club',
    secondProgress: 100,
    secondMeta: 'Qualified — ₹5,000 reward pending',
  },
  timeline: [
    {id: '1', title: 'Order placed ₹80,000', time: '2 hr ago'},
    {id: '2', title: 'Payment received ₹40,000', time: 'yesterday'},
    {id: '3', title: 'Target milestone crossed', time: '3 days ago'},
    {id: '4', title: 'Incentive qualified', time: '1 week ago'},
  ],
};

export const getMockCompanyNetworkDetail = async (
  id: string,
  type: DetailType,
): Promise<CompanyNetworkDetailData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (type === 'dealer' || id.includes('dealer')) {
        const dealerNameMap: Record<string, string> = {
          'dealer-1': 'Dealer 1',
          'dealer-2': 'Dealer 2',
          'dealer-3': 'Dealer 3',
          'dealer-4': 'Dealer 4',
          'dealer-5': 'Dealer 5',
        };

        const dealerInitialMap: Record<string, string> = {
          'dealer-1': 'D1',
          'dealer-2': 'D2',
          'dealer-3': 'D3',
          'dealer-4': 'D4',
          'dealer-5': 'D5',
        };

        resolve({
          ...dealerDetail,
          id,
          headerTitle: dealerNameMap[id] || 'Dealer 1',
          initials: dealerInitialMap[id] || 'D1',
        });
      } else {
        resolve({
          ...stockistDetail,
          id,
        });
      }
    }, 300);
  });
};