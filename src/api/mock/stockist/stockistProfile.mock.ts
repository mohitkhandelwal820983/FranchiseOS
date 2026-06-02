export type BusinessInfoItem = {
  id: string;
  label: string;
  value: string;
  icon: 'business' | 'gst' | 'warehouse' | 'phone' | 'email' | 'calendar';
};

export type PerformanceItem = {
  id: string;
  label: string;
  value: string;
  icon: 'revenue' | 'dealers' | 'fulfillment' | 'payment';
  color: string;
};

export type SettingRow = {
  id: string;
  label: string;
  value?: string;
  icon: string;
  type: 'arrow' | 'switch' | 'download';
  enabled?: boolean;
  green?: boolean;
};

export type StockistProfileData = {
  profile: {
    name: string;
    role: string;
    badge: string;
    image: string;
  };
  businessInfo: BusinessInfoItem[];
  performance: PerformanceItem[];
  warehouseSettings: SettingRow[];
  securitySettings: SettingRow[];
  notifications: SettingRow[];
  documents: SettingRow[];
  support: SettingRow[];
  preferences: SettingRow[];
};

export const stockistProfileMock: StockistProfileData = {
  profile: {
    name: 'Rajesh Kumar',
    role: 'Stockist — Jaipur Region',
    badge: 'Premium Distributor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  businessInfo: [
    {
      id: '1',
      label: 'Business Name',
      value: 'Rajesh Distributors',
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
      label: 'Warehouse Address',
      value: 'Plot No. 12, Sitapura Industrial Area,\nJaipur, Rajasthan 302022',
      icon: 'warehouse',
    },
    {
      id: '4',
      label: 'Phone Number',
      value: '+91 98765 43210',
      icon: 'phone',
    },
    {
      id: '5',
      label: 'Email',
      value: 'rajesh.kumar@rajeshdistributors.in',
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
      value: '₹24.8L',
      icon: 'revenue',
      color: '#138A36',
    },
    {
      id: '2',
      label: 'Dealer Count',
      value: '42',
      icon: 'dealers',
      color: '#7B22EA',
    },
    {
      id: '3',
      label: 'Fulfillment Rate',
      value: '96%',
      icon: 'fulfillment',
      color: '#173CFF',
    },
    {
      id: '4',
      label: 'Payment Collection Rate',
      value: '92%',
      icon: 'payment',
      color: '#F06419',
    },
  ],
  warehouseSettings: [
    {
      id: '1',
      label: 'Warehouse Capacity',
      value: '10,000 sq ft',
      icon: 'warehouse',
      type: 'arrow',
    },
    {
      id: '2',
      label: 'Storage Utilization',
      value: '78%',
      icon: 'chart',
      type: 'arrow',
    },
    {
      id: '3',
      label: 'Delivery Radius',
      value: '150 km',
      icon: 'location',
      type: 'arrow',
    },
    {
      id: '4',
      label: 'Operating Hours',
      value: '9:00 AM – 8:00 PM',
      icon: 'clock',
      type: 'arrow',
    },
  ],
  securitySettings: [
    {
      id: '1',
      label: 'Change Password',
      icon: 'lock',
      type: 'arrow',
    },
    {
      id: '2',
      label: '2FA Enabled',
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
      label: 'Login History',
      icon: 'history',
      type: 'arrow',
    },
  ],
  notifications: [
    {
      id: '1',
      label: 'Order Alerts',
      icon: 'orders',
      type: 'switch',
      enabled: true,
    },
    {
      id: '2',
      label: 'Payment Alerts',
      icon: 'payment',
      type: 'switch',
      enabled: true,
    },
    {
      id: '3',
      label: 'Low Stock Alerts',
      icon: 'stock',
      type: 'switch',
      enabled: true,
    },
    {
      id: '4',
      label: 'Dealer Requests',
      icon: 'dealers',
      type: 'switch',
      enabled: true,
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
      label: 'Bank Documents',
      icon: 'bank',
      type: 'download',
    },
    {
      id: '4',
      label: 'Business License',
      icon: 'license',
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
      label: 'Chat Support',
      icon: 'chat',
      type: 'arrow',
    },
    {
      id: '4',
      label: 'Terms & Privacy',
      icon: 'privacy',
      type: 'arrow',
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
      label: 'Default Dashboard',
      value: 'Overview',
      icon: 'dashboard',
      type: 'arrow',
    },
  ],
};

export const getMockStockistProfile =
  async (): Promise<StockistProfileData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(stockistProfileMock);
      }, 300);
    });
  };