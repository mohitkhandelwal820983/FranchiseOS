export type OverviewCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'stock' | 'orders' | 'dealers' | 'revenue' | 'lowStock' | 'incentive';
  color: string;
  bg: string;
};

export type PriorityAction = {
  id: string;
  title: string;
  subtitle: string;
  button: string;
  color: string;
  icon: 'warning' | 'truck' | 'card' | 'user';
};

export type InventoryItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type ProductItem = {
  id: string;
  name: string;
  units: string;
  revenue: string;
  trendColor: string;
  image: string;
};

export type DealerItem = {
  id: string;
  initials: string;
  name: string;
  orders: string;
  score: string;
  status: string;
  color: string;
  statusColor: string;
  statusBg: string;
};

export type RecentOrder = {
  id: string;
  dealer: string;
  amount: string;
  status: string;
  statusColor: string;
  statusBg: string;
};

export type QuickAction = {
  id: string;
  title: string;
  icon: 'create' | 'dealer' | 'restock';
};

export type StockistDashboardData = {
  name: string;
  subtitle: string;
  date: string;
  notifications: string;
  overview: OverviewCard[];
  priorityActions: PriorityAction[];
  inventoryHealth: InventoryItem[];
  products: ProductItem[];
  dealers: DealerItem[];
  recentOrders: RecentOrder[];
  quickActions: QuickAction[];
};

export const stockistDashboardMock: StockistDashboardData = {
  name: 'Rajesh',
  subtitle: 'Stockist — Jaipur Region',
  date: 'Thursday, 21 May 2026',
  notifications: '3',
  overview: [
    {
      id: '1',
      title: 'Total Stock Value',
      value: '₹12,40,000',
      subtitle: '↑ +8% this month',
      icon: 'stock',
      color: '#173CFF',
      bg: '#0B74FF',
    },
    {
      id: '2',
      title: 'Orders Today',
      value: '28',
      subtitle: '5 pending dispatch',
      icon: 'orders',
      color: '#138A36',
      bg: '#008A21',
    },
    {
      id: '3',
      title: 'Active Dealers',
      value: '42',
      subtitle: '3 inactive',
      icon: 'dealers',
      color: '#F06419',
      bg: '#F06419',
    },
    {
      id: '4',
      title: 'Revenue MTD',
      value: '₹4,80,000',
      subtitle: '82% target achieved',
      icon: 'revenue',
      color: '#173CFF',
      bg: '#173CFF',
    },
    {
      id: '5',
      title: 'Low Stock Items',
      value: '8',
      subtitle: 'Need restock urgently',
      icon: 'lowStock',
      color: '#D90014',
      bg: '#D90014',
    },
    {
      id: '6',
      title: 'Incentives Earned',
      value: '₹18,500',
      subtitle: '2 milestones unlocked',
      icon: 'incentive',
      color: '#7B22EA',
      bg: '#7B22EA',
    },
  ],
  priorityActions: [
    {
      id: '1',
      title: 'Parle-G 500g stock critically low',
      subtitle: 'Only 12 units left',
      button: 'Restock',
      color: '#E00014',
      icon: 'warning',
    },
    {
      id: '2',
      title: '5 dealer orders pending dispatch',
      subtitle: 'Dispatch before 5 PM',
      button: 'View Orders',
      color: '#F06419',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'ABC Dealers payment overdue',
      subtitle: '₹24,000 pending',
      button: 'Collect',
      color: '#173CFF',
      icon: 'card',
    },
    {
      id: '4',
      title: '2 new dealer onboarding requests',
      subtitle: 'Waiting approval',
      button: 'Review',
      color: '#138A36',
      icon: 'user',
    },
  ],
  inventoryHealth: [
    {
      id: '1',
      label: 'Fast Moving Products',
      value: 92,
      color: '#173CFF',
    },
    {
      id: '2',
      label: 'Low Stock Risk',
      value: 28,
      color: '#E00014',
    },
    {
      id: '3',
      label: 'Warehouse Capacity',
      value: 74,
      color: '#138A36',
    },
    {
      id: '4',
      label: 'Stock Accuracy',
      value: 98,
      color: '#138A36',
    },
  ],
  products: [
    {
      id: '1',
      name: 'Parle-G Biscuits',
      units: '324 units sold this week',
      revenue: '₹48,000 revenue',
      trendColor: '#138A36',
      image: 'https://dummyimage.com/90x70/f9d87b/000000&text=Parle-G',
    },
    {
      id: '2',
      name: 'Coca Cola 750ml',
      units: '210 units sold',
      revenue: '₹39,000 revenue',
      trendColor: '#173CFF',
      image: 'https://dummyimage.com/90x70/ffffff/000000&text=Coke',
    },
    {
      id: '3',
      name: 'Aashirvaad Atta',
      units: '180 units sold',
      revenue: '₹31,000 revenue',
      trendColor: '#F06419',
      image: 'https://dummyimage.com/90x70/f4b6a5/000000&text=Atta',
    },
  ],
  dealers: [
    {
      id: '1',
      initials: 'AD',
      name: 'ABC Dealers',
      orders: '₹1.2L orders this month',
      score: '94% payment score',
      status: 'Active',
      color: '#061B66',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
    {
      id: '2',
      initials: 'MD',
      name: 'Modern Mart',
      orders: '₹94K orders',
      score: '76% payment score',
      status: 'Payment Due',
      color: '#138A36',
      statusColor: '#F06419',
      statusBg: '#FFF1E7',
    },
    {
      id: '3',
      initials: 'SK',
      name: 'Shree Krishna Traders',
      orders: '₹72K orders',
      score: '96% payment score',
      status: 'Top Performer',
      color: '#173CFF',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
  ],
  recentOrders: [
    {
      id: '#ORD-1023',
      dealer: 'ABC Dealers',
      amount: '₹12,400',
      status: 'Processing',
      statusColor: '#F06419',
      statusBg: '#FFF1E7',
    },
    {
      id: '#ORD-1022',
      dealer: 'Modern Mart',
      amount: '₹8,200',
      status: 'Shipped',
      statusColor: '#173CFF',
      statusBg: '#F1F5FF',
    },
    {
      id: '#ORD-1021',
      dealer: 'Shree Krishna Traders',
      amount: '₹15,600',
      status: 'Delivered',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
    },
  ],
  quickActions: [
    {
      id: '1',
      title: 'Create Order',
      icon: 'create',
    },
    {
      id: '2',
      title: 'Add Dealer',
      icon: 'dealer',
    },
    {
      id: '3',
      title: 'Restock Inventory',
      icon: 'restock',
    },
  ],
};

export const getMockStockistDashboard =
  async (): Promise<StockistDashboardData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(stockistDashboardMock);
      }, 300);
    });
  };