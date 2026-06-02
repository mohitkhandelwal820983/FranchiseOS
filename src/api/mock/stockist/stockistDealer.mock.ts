export type DealerFilter =
  | 'All'
  | 'Active'
  | 'Pending'
  | 'Payment Due'
  | 'Top Performers';

export type DealerStatus = 'Active' | 'Payment Due' | 'Top Performer';

export type Dealer = {
  id: string;
  initials: string;
  name: string;
  owner: string;
  city: string;
  state: string;
  status: DealerStatus;
  avatarColor: string;
  monthlyOrders: string;
  paymentScore: string;
  completedOrders: string;
  outstandingAmount?: string;
  achievement?: string;
  incentive?: boolean;
};

export type OnboardingRequest = {
  id: string;
  initials: string;
  name: string;
  city: string;
  state: string;
  appliedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type RankingItem = {
  id: string;
  rank: number;
  name: string;
  amount: string;
  progress: number;
};

export type StockistDealerData = {
  summary: {
    activeDealers: string;
    monthlyBusiness: string;
    paymentOverdue: string;
  };
  dealers: Dealer[];
  onboardingRequests: OnboardingRequest[];
  rankings: RankingItem[];
};

export const stockistDealerMock: StockistDealerData = {
  summary: {
    activeDealers: '42',
    monthlyBusiness: '₹24L',
    paymentOverdue: '3',
  },
  dealers: [
    {
      id: '1',
      initials: 'AD',
      name: 'ABC Dealers',
      owner: 'Amit Sharma',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Active',
      avatarColor: '#061B66',
      monthlyOrders: '₹1.2L',
      paymentScore: '94%',
      completedOrders: '28',
    },
    {
      id: '2',
      initials: 'MM',
      name: 'Modern Mart',
      owner: 'Rahul Verma',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Payment Due',
      avatarColor: '#087F8C',
      monthlyOrders: '₹94K',
      paymentScore: '72%',
      completedOrders: '16',
      outstandingAmount: '₹24,000',
    },
    {
      id: '3',
      initials: 'SK',
      name: 'Shree Krishna Traders',
      owner: 'Suresh Yadav',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Top Performer',
      avatarColor: '#173CFF',
      monthlyOrders: '₹1.6L',
      paymentScore: '96%',
      completedOrders: '35',
      achievement: 'Highest sales this month',
      incentive: true,
    },
  ],
  onboardingRequests: [
    {
      id: '1',
      initials: 'RK',
      name: 'R.K. Distributors',
      city: 'Jaipur',
      state: 'Rajasthan',
      appliedOn: '20 May 2026',
      status: 'Pending',
    },
    {
      id: '2',
      initials: 'VP',
      name: 'Vijay Provision Store',
      city: 'Tonk',
      state: 'Rajasthan',
      appliedOn: '19 May 2026',
      status: 'Pending',
    },
  ],
  rankings: [
    {
      id: '1',
      rank: 1,
      name: 'Shree Krishna Traders',
      amount: '₹1.6L',
      progress: 88,
    },
    {
      id: '2',
      rank: 2,
      name: 'ABC Dealers',
      amount: '₹1.2L',
      progress: 72,
    },
    {
      id: '3',
      rank: 3,
      name: 'Modern Mart',
      amount: '₹94K',
      progress: 62,
    },
    {
      id: '4',
      rank: 4,
      name: 'Ganesh Agencies',
      amount: '₹72K',
      progress: 50,
    },
    {
      id: '5',
      rank: 5,
      name: 'Suresh Provision Store',
      amount: '₹58K',
      progress: 39,
    },
  ],
};

export const getMockStockistDealer =
  async (): Promise<StockistDealerData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(stockistDealerMock);
      }, 300);
    });
  };