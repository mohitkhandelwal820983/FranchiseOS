export type BusinessDetail = {
  id: string;
  label: string;
  value: string;
  icon: 'company' | 'owner' | 'email' | 'phone' | 'location' | 'gst' | 'pan';
  verified?: boolean;
};

export type CommissionRule = {
  id: string;
  category: string;
  stockist: string;
  dealer: string;
};

export type TargetItem = {
  id: string;
  label: string;
  value: string;
};

export type DocumentItem = {
  id: string;
  name: string;
  verified: boolean;
};

export type SecurityItem = {
  id: string;
  title: string;
  icon: 'password' | '2fa' | 'otp' | 'sessions' | 'history';
  type: 'arrow' | 'switch';
  enabled?: boolean;
};

export type NotificationItem = {
  id: string;
  title: string;
  enabled: boolean;
};

export type HelpItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: 'ticket' | 'docs' | 'contact' | 'version';
  arrow?: boolean;
};

export type CompanyProfileData = {
  company: {
    initials: string;
    name: string;
    role: string;
    status: string;
    plan: string;
    memberSince: string;
  };
  businessDetails: BusinessDetail[];
  commissionRules: CommissionRule[];
  networkTargets: TargetItem[];
  plan: {
    name: string;
    price: string;
    renewal: string;
    status: string;
  };
  documents: DocumentItem[];
  security: SecurityItem[];
  notifications: NotificationItem[];
  help: HelpItem[];
  footerText: string;
};

export const companyProfileMock: CompanyProfileData = {
  company: {
    initials: 'RI',
    name: 'Reliance Industries',
    role: 'Company Admin',
    status: 'Active',
    plan: 'Enterprise',
    memberSince: 'January 2023',
  },

  businessDetails: [
    {
      id: '1',
      label: 'Company Name',
      value: 'Reliance Industries',
      icon: 'company',
    },
    {
      id: '2',
      label: 'Owner Name',
      value: 'Amit Shah',
      icon: 'owner',
    },
    {
      id: '3',
      label: 'Business Email',
      value: 'admin@reliance.com',
      icon: 'email',
      verified: true,
    },
    {
      id: '4',
      label: 'Phone Number',
      value: '+91 98765 43210',
      icon: 'phone',
      verified: true,
    },
    {
      id: '5',
      label: 'Headquarters',
      value: 'Mumbai, Maharashtra',
      icon: 'location',
    },
    {
      id: '6',
      label: 'GST Number',
      value: '27ABCDE1234F1Z5',
      icon: 'gst',
    },
    {
      id: '7',
      label: 'PAN Number',
      value: 'ABCDE1234F',
      icon: 'pan',
    },
  ],

  commissionRules: [
    {
      id: '1',
      category: 'Category A — Electronics',
      stockist: 'Stockist 5%',
      dealer: 'Dealer 3%',
    },
    {
      id: '2',
      category: 'Category B — FMCG',
      stockist: 'Stockist 4%',
      dealer: 'Dealer 2.5%',
    },
    {
      id: '3',
      category: 'Category C — Others',
      stockist: 'Stockist 3%',
      dealer: 'Dealer 2%',
    },
  ],

  networkTargets: [
    {
      id: '1',
      label: 'Overall Network Target',
      value: '₹60,00,000/month',
    },
    {
      id: '2',
      label: 'Per Stockist Average',
      value: '₹5,00,000/month',
    },
    {
      id: '3',
      label: 'Per Dealer Average',
      value: '₹62,500/month',
    },
  ],

  plan: {
    name: 'Enterprise Plan',
    price: '₹40,000/month',
    renewal: 'Renewal: 30 Jun 2026',
    status: 'Active',
  },

  documents: [
    {
      id: '1',
      name: 'GST Certificate',
      verified: true,
    },
    {
      id: '2',
      name: 'PAN Card',
      verified: true,
    },
    {
      id: '3',
      name: 'Bank Details',
      verified: true,
    },
  ],

  security: [
    {
      id: '1',
      title: 'Change Password',
      icon: 'password',
      type: 'arrow',
    },
    {
      id: '2',
      title: 'Two Factor Auth',
      icon: '2fa',
      type: 'switch',
      enabled: true,
    },
    {
      id: '3',
      title: 'Login OTP',
      icon: 'otp',
      type: 'switch',
      enabled: true,
    },
    {
      id: '4',
      title: 'Active Sessions — 3 devices',
      icon: 'sessions',
      type: 'arrow',
    },
    {
      id: '5',
      title: 'Login History',
      icon: 'history',
      type: 'arrow',
    },
  ],

  notifications: [
    {
      id: '1',
      title: 'New Order Alerts',
      enabled: true,
    },
    {
      id: '2',
      title: 'Payment Overdue',
      enabled: true,
    },
    {
      id: '3',
      title: 'Incentive Qualified',
      enabled: true,
    },
    {
      id: '4',
      title: 'Daily Summary Report',
      enabled: true,
    },
    {
      id: '5',
      title: 'Weekly Performance Report',
      enabled: true,
    },
  ],

  help: [
    {
      id: '1',
      title: 'Support Tickets',
      subtitle: '1 open',
      icon: 'ticket',
      arrow: true,
    },
    {
      id: '2',
      title: 'Help Documentation',
      icon: 'docs',
      arrow: true,
    },
    {
      id: '3',
      title: 'Contact FranchiseOS',
      icon: 'contact',
      arrow: true,
    },
    {
      id: '4',
      title: 'App Version',
      subtitle: 'v1.0.0',
      icon: 'version',
      arrow: false,
    },
  ],

  footerText: 'FranchiseOS v1.0 — Company Admin',
};

export const getMockCompanyProfile = async (): Promise<CompanyProfileData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(companyProfileMock);
    }, 300);
  });
};