export type OverviewType = 'total' | 'activeToday' | 'activeMonth' | 'newMonth' | 'inactive';

export type OverviewItem = {
  title: string;
  value: string;
  subtitle: string;
  type: OverviewType;
};

export type HealthItem = {
  label: string;
  value: string;
  progress: number;
  color: 'green' | 'blue';
};

export type RevenueMiniItem = {
  label: string;
  value: string;
  type: 'collected' | 'due' | 'overdue';
};

export type AttentionItem = {
  title: string;
  subtitle: string;
  action: string;
  color: string;
  icon: 'alert' | 'clock' | 'card' | 'headset';
};

export type CompanyStatus = 'Active' | 'Pending';

export type RecentCompany = {
  initials: string;
  name: string;
  owner: string;
  location: string;
  status: CompanyStatus;
  plan: string;
  added: string;
  color: string;
};

export const dashboardData = {
  adminName: 'Super Admin',
  date: 'Thursday, 21 May 2026',
  notificationCount: 5,
  overview: {
    total: {
      title: 'Total Companies',
      value: '24',
      subtitle: 'On platform',
      type: 'total' as const,
    },
    smallCards: [
      {
        title: 'Active Today',
        value: '18',
        subtitle: 'Companies',
        type: 'activeToday' as const,
      },
      {
        title: 'Active This Month',
        value: '22',
        subtitle: 'Companies',
        type: 'activeMonth' as const,
      },
      {
        title: 'New This Month',
        value: '3',
        subtitle: '↑ +3 added',
        type: 'newMonth' as const,
      },
      {
        title: 'Inactive 30 Days',
        value: '2',
        subtitle: 'No activity',
        type: 'inactive' as const,
      },
    ] satisfies OverviewItem[],
  },
  health: [
    {label: 'Uptime', value: '99.9%', progress: 99.9, color: 'green' as const},
    {label: 'Active Users', value: '92%', progress: 92, color: 'blue' as const},
    {label: 'Order Success Rate', value: '96%', progress: 96, color: 'green' as const},
    {label: 'Tenant Isolation', value: '100%', progress: 100, color: 'green' as const},
  ] satisfies HealthItem[],
  revenue: {
    amount: '₹2,40,000',
    items: [
      {label: 'Collected', value: '₹1,80,000', type: 'collected' as const},
      {label: 'Due', value: '₹60,000', type: 'due' as const},
      {label: 'Overdue', value: '₹0', type: 'overdue' as const},
    ] satisfies RevenueMiniItem[],
  },
  attention: [
    {
      title: 'ABC Corp subscription overdue',
      subtitle: '3 days overdue',
      action: 'Send Reminder',
      color: '#E51B2B',
      icon: 'alert' as const,
    },
    {
      title: '2 companies pending approval',
      subtitle: 'Waiting since yesterday',
      action: 'Review Now',
      color: '#F97316',
      icon: 'clock' as const,
    },
    {
      title: 'TechCorp onboarding 40% complete',
      subtitle: 'Setup incomplete',
      action: 'Send Nudge',
      color: '#F97316',
      icon: 'card' as const,
    },
    {
      title: '5 support tickets open',
      subtitle: '2 urgent',
      action: 'View Tickets',
      color: '#1557F5',
      icon: 'headset' as const,
    },
  ] satisfies AttentionItem[],
  recentCompanies: [
    {
      initials: 'TC',
      name: 'TechCorp India',
      owner: 'Owner: Rajesh Sharma',
      location: 'Mumbai, Maharashtra',
      status: 'Active' as const,
      plan: 'Professional',
      added: 'Added 2 days ago',
      color: '#042475',
    },
    {
      initials: 'RI',
      name: 'Reliance Industries',
      owner: 'Owner: Amit Shah',
      location: 'Delhi, NCR',
      status: 'Active' as const,
      plan: 'Enterprise',
      added: 'Added 5 days ago',
      color: '#07843B',
    },
    {
      initials: 'AB',
      name: 'ABC Distributors',
      owner: 'Owner: Priya Patrash',
      location: 'Pune, Maharashtra',
      status: 'Pending' as const,
      plan: 'Basic',
      added: 'Added 1 week ago',
      color: '#F45108',
    },
  ] satisfies RecentCompany[],
};
