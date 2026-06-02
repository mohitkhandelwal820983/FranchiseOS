export type OverviewItem = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'orders' | 'revenue' | 'customers' | 'incentive' | 'dues' | 'delivery';
  color: string;
  bg: string;
  progress?: number;
};

export type PriorityAction = {
  id: string;
  title: string;
  subtitle?: string;
  button: string;
  icon: 'order' | 'payment' | 'stock' | 'target';
  color: string;
};

export type RecentOrder = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  statusColor: string;
  statusBg: string;
};

export type Product = {
  id: string;
  name: string;
  units: string;
  amount: string;
  growth: string;
  growthColor: string;
  image: string;
};

export type Payment = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  icon: 'received' | 'pending' | 'overdue';
  color: string;
  bg: string;
};

export type DealerDashboardData = {
  welcome: {
    name: string;
    business: string;
    date: string;
    notifications: string;
  };
  overview: OverviewItem[];
  priorities: PriorityAction[];
  recentOrders: RecentOrder[];
  topProducts: Product[];
  target: {
    percent: number;
    remaining: string;
    message: string;
  };
  payments: Payment[];
};

export const dealerDashboardMock: DealerDashboardData = {
  welcome: {
    name: 'Amit',
    business: 'ABC Dealers — Jaipur',
    date: 'Thursday, 21 May 2026',
    notifications: '5',
  },
  overview: [
    {
      id: '1',
      title: 'Orders This Month',
      value: '124',
      subtitle: '↑ +18% growth',
      icon: 'orders',
      color: '#061247',
      bg: '#EEF3FF',
    },
    {
      id: '2',
      title: 'Sales Revenue',
      value: '₹3,84,000',
      subtitle: '72% monthly target',
      icon: 'revenue',
      color: '#061247',
      bg: '#EAF8EC',
      progress: 72,
    },
    {
      id: '3',
      title: 'Active Customers',
      value: '248',
      subtitle: '12 new this week',
      icon: 'customers',
      color: '#061247',
      bg: '#FFF1E7',
    },
    {
      id: '4',
      title: 'Incentives Earned',
      value: '₹8,400',
      subtitle: '1 reward unlocked',
      icon: 'incentive',
      color: '#061247',
      bg: '#F7F0FF',
    },
    {
      id: '5',
      title: 'Outstanding Dues',
      value: '₹42,000',
      subtitle: 'Need collection',
      icon: 'dues',
      color: '#061247',
      bg: '#FFF0F0',
    },
    {
      id: '6',
      title: 'Pending Deliveries',
      value: '18',
      subtitle: '4 arriving today',
      icon: 'delivery',
      color: '#061247',
      bg: '#EEF3FF',
    },
  ],
  priorities: [
    {
      id: '1',
      title: '5 customer orders awaiting delivery',
      button: 'View Orders',
      icon: 'order',
      color: '#173CFF',
    },
    {
      id: '2',
      title: 'Payment overdue from Modern Store',
      subtitle: '₹12,000 pending',
      button: 'Collect',
      icon: 'payment',
      color: '#E00014',
    },
    {
      id: '3',
      title: 'Stock running low for Coca Cola',
      button: 'Reorder',
      icon: 'stock',
      color: '#F06419',
    },
    {
      id: '4',
      title: 'Target achievement at 72%',
      button: 'Boost Sales',
      icon: 'target',
      color: '#138A36',
    },
  ],
  recentOrders: [
    {
      id: '#ORD-2201',
      customer: 'Sharma Kirana Store',
      amount: '₹12,450',
      status: 'Delivered',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
    {
      id: '#ORD-2200',
      customer: 'Gupta General Store',
      amount: '₹7,850',
      status: 'In Transit',
      statusColor: '#173CFF',
      statusBg: '#F1F5FF',
    },
    {
      id: '#ORD-2199',
      customer: 'Verma Mart',
      amount: '₹9,230',
      status: 'Processing',
      statusColor: '#F06419',
      statusBg: '#FFF3E9',
    },
  ],
  topProducts: [
    {
      id: '1',
      name: 'Parle-G',
      units: '2,450 units',
      amount: '₹48,500',
      growth: '↑ 12%',
      growthColor: '#138A36',
      image: 'https://dummyimage.com/55x40/f9d87b/111111&text=Parle',
    },
    {
      id: '2',
      name: 'Coca Cola',
      units: '1,850 units',
      amount: '₹46,250',
      growth: '↑ 8%',
      growthColor: '#138A36',
      image: 'https://dummyimage.com/55x40/5c0000/ffffff&text=Coke',
    },
    {
      id: '3',
      name: 'Aashirvaad Atta',
      units: '1,320 units',
      amount: '₹31,680',
      growth: '↓ 5%',
      growthColor: '#E00014',
      image: 'https://dummyimage.com/55x40/cb462f/ffffff&text=Atta',
    },
  ],
  target: {
    percent: 72,
    remaining: '₹1.16L',
    message: 'Hit target → Earn ₹10,000 bonus',
  },
  payments: [
    {
      id: '1',
      title: 'Received',
      subtitle: 'Today, 10:30 AM',
      amount: '₹28,500',
      icon: 'received',
      color: '#138A36',
      bg: '#EAF8EC',
    },
    {
      id: '2',
      title: 'Pending',
      subtitle: '2 payments',
      amount: '₹12,000',
      icon: 'pending',
      color: '#F06419',
      bg: '#FFF3E9',
    },
    {
      id: '3',
      title: 'Overdue',
      subtitle: '3 payments',
      amount: '₹42,000',
      icon: 'overdue',
      color: '#E00014',
      bg: '#FFF0F0',
    },
  ],
};

export const getMockDealerDashboard =
  async (): Promise<DealerDashboardData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dealerDashboardMock);
      }, 300);
    });
  };