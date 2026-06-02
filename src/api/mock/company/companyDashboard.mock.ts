export type SnapshotItem = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'users' | 'store' | 'activity';
  color: string;
  bgColor: string;
};

export type RevenueData = {
  title: string;
  filter: string;
  amount: string;
  growth: string;
  growthLabel: string;
  progress: number;
  progressLabel: string;
  achievedLabel: string;
  collected: string;
  outstanding: string;
  target: string;
};

export type OrderItem = {
  id: string;
  title: string;
  value: string;
  icon: 'cart' | 'clock' | 'check';
  color: string;
  bgColor: string;
  borderColor: string;
};

export type AttentionItem = {
  id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  icon: 'warning' | 'clock' | 'user' | 'gift';
  color: string;
};

export type NetworkLeader = {
  id: string;
  rank: string;
  shortName: string;
  name: string;
  zone: string;
  amount: string;
  growth: string;
  color: string;
  rankColor?: string;
  amountColor: string;
};

export type YourAttentionItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  time: string;
  color: string;
};

export type BottomTabItem = {
  id: string;
  label: string;
  icon: 'home' | 'network' | 'orders' | 'finance' | 'profile';
  active: boolean;
};

export type CompanyDashboardData = {
  companyName: string;
  date: string;
  notificationCount: string;
  welcomeSubtitle: string;
  snapshots: SnapshotItem[];
  revenue: RevenueData;
  orders: OrderItem[];
  orderMessageTitle: string;
  orderMessageSubtitle: string;
  needsAttentionCount: string;
  needsAttention: AttentionItem[];
  networkLeaders: NetworkLeader[];
  yourAttention: YourAttentionItem[];
  supportMessage: string;
  activities: ActivityItem[];
  activityMessage: string;
  bottomTabs: BottomTabItem[];
};

export const mockCompanyDashboardData: CompanyDashboardData = {
  companyName: 'Reliance Industries',
  date: 'Thursday, 21 May 2026',
  notificationCount: '8',
  welcomeSubtitle: 'Your network is performing well today! 🚀',
  snapshots: [
    {
      id: '1',
      title: 'Total Stockists',
      value: '12',
      subtitle: 'In your network',
      icon: 'users',
      color: '#7B22EA',
      bgColor: '#F1E4FF',
    },
    {
      id: '2',
      title: 'Total Dealers',
      value: '96',
      subtitle: 'Across all zones',
      icon: 'store',
      color: '#1557F5',
      bgColor: '#EAF0FF',
    },
    {
      id: '3',
      title: 'Active Today',
      value: '34',
      subtitle: 'Franchises logged in',
      icon: 'activity',
      color: '#F06419',
      bgColor: '#FFF1E8',
    },
  ],
  revenue: {
    title: 'Network Revenue MTD',
    filter: 'Month',
    amount: '₹48,00,000',
    growth: '18%',
    growthLabel: 'vs last month',
    progress: 80,
    progressLabel: '80%',
    achievedLabel: '₹48L achieved of ₹60L target',
    collected: '₹38L',
    outstanding: '₹10L',
    target: '₹60L',
  },
  orders: [
    {
      id: '1',
      title: 'Total',
      value: '34',
      icon: 'cart',
      color: '#1557F5',
      bgColor: '#F3F6FF',
      borderColor: '#B8C8FF',
    },
    {
      id: '2',
      title: 'Pending',
      value: '8',
      icon: 'clock',
      color: '#F06419',
      bgColor: '#FFF8F1',
      borderColor: '#FFD9BD',
    },
    {
      id: '3',
      title: 'Delivered',
      value: '26',
      icon: 'check',
      color: '#138A36',
      bgColor: '#F0FFF4',
      borderColor: '#BDE9C9',
    },
  ],
  orderMessageTitle: 'Great momentum!',
  orderMessageSubtitle: "Keep it up! You're doing great. 😊",
  needsAttentionCount: '4',
  needsAttention: [
    {
      id: '1',
      title: '8 orders pending approval',
      subtitle: 'Waiting 2+ hours',
      buttonLabel: 'Approve Now',
      icon: 'warning',
      color: '#EA1111',
    },
    {
      id: '2',
      title: '3 Dealers payment overdue',
      subtitle: 'Past due date',
      buttonLabel: 'Send Reminder',
      icon: 'clock',
      color: '#F06419',
    },
    {
      id: '3',
      title: '2 franchise onboarding pending',
      subtitle: 'Submitted yesterday',
      buttonLabel: 'Review Now',
      icon: 'user',
      color: '#F06419',
    },
    {
      id: '4',
      title: '4 incentive rewards to approve',
      subtitle: 'Franchises qualified',
      buttonLabel: 'Review Rewards',
      icon: 'gift',
      color: '#1557F5',
    },
  ],
  networkLeaders: [
    {
      id: '1',
      rank: '1',
      shortName: 'SA',
      name: 'Stockist A',
      zone: 'Mumbai Zone A',
      amount: '₹24,00,000',
      growth: '22%',
      color: '#061B66',
      rankColor: '#F3AD16',
      amountColor: '#138A36',
    },
    {
      id: '2',
      rank: '2',
      shortName: 'SB',
      name: 'Stockist B',
      zone: 'Delhi Zone B',
      amount: '₹18,00,000',
      growth: '15%',
      color: '#7B22EA',
      rankColor: '#C5CAD3',
      amountColor: '#138A36',
    },
    {
      id: '3',
      rank: '3',
      shortName: 'D1',
      name: 'Dealer 1 (Direct)',
      zone: 'Pune',
      amount: '₹6,00,000',
      growth: '8%',
      color: '#1557F5',
      rankColor: '#C8732D',
      amountColor: '#138A36',
    },
    {
      id: '4',
      rank: '4',
      shortName: 'SC',
      name: 'Stockist C',
      zone: 'Chennai Zone C',
      amount: '₹3,80,000',
      growth: '3%',
      color: '#138A36',
      amountColor: '#1557F5',
    },
    {
      id: '5',
      rank: '5',
      shortName: 'D5',
      name: 'Dealer 5',
      zone: 'Nashik',
      amount: '₹4,20,000',
      growth: '5%',
      color: '#F06419',
      amountColor: '#1557F5',
    },
  ],
  yourAttention: [
    {
      id: '1',
      title: 'Dealer 4 — Mumbai',
      subtitle: '0 orders in 14 days',
      color: '#EA1111',
    },
    {
      id: '2',
      title: 'Stockist C — Chennai',
      subtitle: 'Below 60% target',
      color: '#EA1111',
    },
    {
      id: '3',
      title: 'Dealer 7 — Pune',
      subtitle: 'Payment overdue 8 days',
      color: '#F06419',
    },
  ],
  supportMessage: 'Support them to keep your network strong!',
  activities: [
    {
      id: '1',
      title: 'Stockist A placed order ₹2,40,000',
      time: '2 hours ago',
      color: '#138A36',
    },
    {
      id: '2',
      title: 'Dealer 3 payment received ₹45,000',
      time: '4 hours ago',
      color: '#138A36',
    },
    {
      id: '3',
      title: 'New dealer onboarding request',
      time: '5 hours ago',
      color: '#1557F5',
    },
    {
      id: '4',
      title: 'Incentive qualified — Dealer 1',
      time: '6 hours ago',
      color: '#7B22EA',
    },
    {
      id: '5',
      title: 'Dealer 7 payment overdue flagged',
      time: '8 hours ago',
      color: '#F06419',
    },
  ],
  activityMessage: 'Stay proactive. Your network is growing! 😃',
  bottomTabs: [
    {id: '1', label: 'Home', icon: 'home', active: true},
    {id: '2', label: 'Network', icon: 'network', active: false},
    {id: '3', label: 'Orders', icon: 'orders', active: false},
    {id: '4', label: 'Finance', icon: 'finance', active: false},
    {id: '5', label: 'Profile', icon: 'profile', active: false},
  ],
};

export const getMockCompanyDashboard =
  async (): Promise<CompanyDashboardData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockCompanyDashboardData);
      }, 300);
    });
  };