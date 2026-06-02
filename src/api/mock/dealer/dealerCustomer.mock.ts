export type CustomerFilter =
  | 'All'
  | 'Active'
  | 'High Value'
  | 'Payment Due'
  | 'Inactive';

export type CustomerStatus = 'Active' | 'Payment Due' | 'Top Buyer';

export type Customer = {
  id: string;
  initials: string;
  name: string;
  owner: string;
  city: string;
  state: string;
  status: CustomerStatus;
  avatarBg: string;
  avatarColor: string;
  monthlyPurchase: string;
  completedOrders: string;
  paymentScore: string;
  outstandingAmount?: string;
  achievement?: string;
};

export type Insight = {
  id: string;
  value: string;
  label: string;
  icon: 'top' | 'repeat' | 'inactive' | 'average';
  color: string;
  bg: string;
};

export type DealerCustomerData = {
  summary: {
    customers: string;
    monthlyBusiness: string;
    overduePayments: string;
  };
  customers: Customer[];
  insights: Insight[];
};

export const dealerCustomerMock: DealerCustomerData = {
  summary: {
    customers: '248',
    monthlyBusiness: '₹3.8L',
    overduePayments: '12',
  },
  customers: [
    {
      id: '1',
      initials: 'RK',
      name: 'Rahul Kirana Store',
      owner: 'Rahul Sharma',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Active',
      avatarBg: '#EAF8EC',
      avatarColor: '#138A36',
      monthlyPurchase: '₹42,000',
      completedOrders: '18',
      paymentScore: '92%',
    },
    {
      id: '2',
      initials: 'MR',
      name: 'Modern Retail Shop',
      owner: 'Amit Verma',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Payment Due',
      avatarBg: '#FFF1E7',
      avatarColor: '#F06419',
      monthlyPurchase: '₹28,500',
      completedOrders: '12',
      paymentScore: '68%',
      outstandingAmount: '₹12,000',
    },
    {
      id: '3',
      initials: 'GS',
      name: 'Ganesh Supermarket',
      owner: 'Suresh Yadav',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Top Buyer',
      avatarBg: '#EEF3FF',
      avatarColor: '#173CFF',
      monthlyPurchase: '₹68,500',
      completedOrders: '28',
      paymentScore: '95%',
      achievement: 'Highest monthly purchase',
    },
  ],
  insights: [
    {
      id: '1',
      value: '32',
      label: 'Top Buyers',
      icon: 'top',
      color: '#173CFF',
      bg: '#EEF3FF',
    },
    {
      id: '2',
      value: '186',
      label: 'Repeat Customers',
      icon: 'repeat',
      color: '#138A36',
      bg: '#EAF8EC',
    },
    {
      id: '3',
      value: '14',
      label: 'Inactive Customers',
      icon: 'inactive',
      color: '#F06419',
      bg: '#FFF1E7',
    },
    {
      id: '4',
      value: '₹16,200',
      label: 'Avg. Order Value',
      icon: 'average',
      color: '#7B22EA',
      bg: '#F7F0FF',
    },
  ],
};

export const getMockDealerCustomer =
  async (): Promise<DealerCustomerData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dealerCustomerMock);
      }, 300);
    });
  };