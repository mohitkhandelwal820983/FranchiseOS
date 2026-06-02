export type BusinessInfoItem = {
  id: string;
  label: string;
  value: string;
  icon: 'business' | 'gst' | 'address' | 'phone' | 'email' | 'calendar';
};

export type PerformanceItem = {
  id: string;
  label: string;
  value: string;
  growth: string;
  icon: 'revenue' | 'customers' | 'success' | 'score';
  color: string;
};

export type RowItem = {
  id: string;
  label: string;
  value?: string;
  icon: string;
  type: 'arrow' | 'download' | 'switch' | 'plain';
  enabled?: boolean;
  green?: boolean;
};

export type DealerProfileData = {
  profile: {
    name: string;
    business: string;
    badge: string;
    image: string;
  };
  businessInfo: BusinessInfoItem[];
  performance: PerformanceItem[];
  accountSettings: RowItem[];
  documents: RowItem[];
  support: RowItem[];
  achievements: RowItem[];
  preferences: RowItem[];
};

export const dealerProfileMock: DealerProfileData = {
  profile: {
    name: 'Amit Sharma',
    business: 'ABC Dealers',
    badge: 'Gold Dealer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  businessInfo: [
    {
      id: '1',
      label: 'Business Name',
      value: 'ABC Dealers',
      icon: 'business',
    },
    {
      id: '2',
      label: 'GST Number',
      value: '08AABFR1234F1Z5',
      icon: 'gst',
    },
    {
      id: '3',
      label: 'Address',
      value: 'Shop No. 12, Mansarovar,\nJaipur, Rajasthan 302020',
      icon: 'address',
    },
    {
      id: '4',
      label: 'Phone',
      value: '+91 98765 43210',
      icon: 'phone',
    },
    {
      id: '5',
      label: 'Email',
      value: 'amit.sharma@abcdealers.in',
      icon: 'email',
    },
    {
      id: '6',
      label: 'Member Since',
      value: '15 Aug 2019',
      icon: 'calendar',
    },
  ],
  performance: [
    {
      id: '1',
      label: 'Monthly Revenue',
      value: '₹2,84,000',
      growth: '↑ 18%',
      icon: 'revenue',
      color: '#138A36',
    },
    {
      id: '2',
      label: 'Customer Count',
      value: '248',
      growth: '↑ 12%',
      icon: 'customers',
      color: '#173CFF',
    },
    {
      id: '3',
      label: 'Order Success Rate',
      value: '96%',
      growth: '↑ 5%',
      icon: 'success',
      color: '#7B22EA',
    },
    {
      id: '4',
      label: 'Payment Score',
      value: '92%',
      growth: '↑ 7%',
      icon: 'score',
      color: '#F06419',
    },
  ],
  accountSettings: [
    {
      id: '1',
      label: 'Change Password',
      icon: 'lock',
      type: 'arrow',
    },
    {
      id: '2',
      label: '2FA Security',
      value: 'Enabled',
      icon: 'shield',
      type: 'arrow',
      green: true,
    },
    {
      id: '3',
      label: 'Device Sessions',
      value: '3 Active',
      icon: 'device',
      type: 'arrow',
    },
    {
      id: '4',
      label: 'Notification Preferences',
      icon: 'settings',
      type: 'arrow',
    },
  ],
  documents: [
    {
      id: '1',
      label: 'GST Certificate',
      icon: 'gst',
      type: 'download',
    },
    {
      id: '2',
      label: 'PAN Card',
      icon: 'pan',
      type: 'download',
    },
    {
      id: '3',
      label: 'Business License',
      icon: 'license',
      type: 'download',
    },
    {
      id: '4',
      label: 'Bank Details',
      icon: 'bank',
      type: 'download',
    },
  ],
  support: [
    {
      id: '1',
      label: 'Help Center',
      icon: 'help',
      type: 'arrow',
    },
    {
      id: '2',
      label: 'Raise Ticket',
      icon: 'ticket',
      type: 'arrow',
    },
    {
      id: '3',
      label: 'Terms & Conditions',
      icon: 'terms',
      type: 'arrow',
    },
    {
      id: '4',
      label: 'Privacy Policy',
      icon: 'privacy',
      type: 'arrow',
    },
  ],
  achievements: [
    {
      id: '1',
      label: 'Rewards Earned',
      value: '₹8,400',
      icon: 'reward',
      type: 'plain',
      green: true,
    },
    {
      id: '2',
      label: 'Targets Completed',
      value: '7/10',
      icon: 'target',
      type: 'plain',
      green: true,
    },
    {
      id: '3',
      label: 'Leaderboard Rank',
      value: 'Top 12%',
      icon: 'rank',
      type: 'plain',
    },
  ],
  preferences: [
    {
      id: '1',
      label: 'Dark Mode',
      icon: 'dark',
      type: 'switch',
      enabled: false,
    },
    {
      id: '2',
      label: 'Language',
      value: 'English',
      icon: 'language',
      type: 'arrow',
    },
    {
      id: '3',
      label: 'Default Payment Method',
      value: 'UPI',
      icon: 'payment',
      type: 'arrow',
    },
  ],
};

export const getMockDealerProfile = async (): Promise<DealerProfileData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dealerProfileMock);
    }, 300);
  });
};