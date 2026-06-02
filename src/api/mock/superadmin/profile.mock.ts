export type AdminDetail = {
  id: string;
  label: string;
  value: string;
  icon: 'user' | 'email' | 'phone' | 'organization' | 'calendar' | 'shield';
  verified?: boolean;
  blue?: boolean;
};

export type SecurityItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'password' | '2fa' | 'otp' | 'ip' | 'sessions' | 'history';
  type: 'arrow' | 'switch';
  value?: string;
  enabled?: boolean;
};

export type LoginItem = {
  id: string;
  device: string;
  location: string;
  time: string;
  status: 'success' | 'blocked';
};

export type PlatformControl = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'lock' | 'maintenance' | 'force';
  action: string;
  color: string;
  bg: string;
};

export type AdminUser = {
  id: string;
  initials: string;
  name: string;
  role: string;
  status?: string;
};

export type DeveloperSetting = {
  id: string;
  title: string;
  value: string;
  icon: 'api' | 'webhook' | 'health';
  green?: boolean;
};

export type SettingItem = {
  id: string;
  title: string;
  value?: string;
  icon: 'push' | 'dark' | 'language' | 'default';
  type: 'switch' | 'arrow';
  enabled?: boolean;
};

export type HelpInfo = {
  id: string;
  title: string;
  value?: string;
  icon: 'help' | 'ticket' | 'terms' | 'privacy' | 'version';
  orange?: boolean;
};

export type ProfileData = {
  profile: {
    initials: string;
    name: string;
    role: string;
    platform: string;
    memberSince: string;
  };
  adminDetails: AdminDetail[];
  security: SecurityItem[];
  logins: LoginItem[];
  controls: PlatformControl[];
  admins: AdminUser[];
  developerSettings: DeveloperSetting[];
  settings: SettingItem[];
  helpInfo: HelpInfo[];
};

export const mockProfileData: ProfileData = {
  profile: {
    initials: 'SA',
    name: 'Rajesh Kumar',
    role: 'Super Administrator',
    platform: 'FranchiseOS Platform',
    memberSince: 'January 2023',
  },
  adminDetails: [
    {
      id: '1',
      label: 'Full Name',
      value: 'Rajesh Kumar',
      icon: 'user',
    },
    {
      id: '2',
      label: 'Email Address',
      value: 'admin@franchiseos.com',
      icon: 'email',
      verified: true,
    },
    {
      id: '3',
      label: 'Phone Number',
      value: '+91 98765 43210',
      icon: 'phone',
      verified: true,
    },
    {
      id: '4',
      label: 'Organization',
      value: 'FranchiseOS Platform',
      icon: 'organization',
    },
    {
      id: '5',
      label: 'Member Since',
      value: 'January 2023',
      icon: 'calendar',
    },
    {
      id: '6',
      label: 'Admin Level',
      value: 'Super Administrator',
      icon: 'shield',
      blue: true,
    },
  ],
  security: [
    {
      id: '1',
      title: 'Change Password',
      subtitle: 'Last changed 30 days ago',
      icon: 'password',
      type: 'arrow',
    },
    {
      id: '2',
      title: 'Two Factor Auth',
      subtitle: 'Enabled via SMS',
      icon: '2fa',
      type: 'switch',
      enabled: true,
    },
    {
      id: '3',
      title: 'Login OTP Required',
      subtitle: 'Every login requires OTP',
      icon: 'otp',
      type: 'switch',
      enabled: true,
    },
    {
      id: '4',
      title: 'IP Whitelist',
      subtitle: 'Only whitelisted IPs can login',
      value: '3 IPs allowed',
      icon: 'ip',
      type: 'arrow',
    },
    {
      id: '5',
      title: 'Active Sessions',
      subtitle: '',
      value: '2 active devices',
      icon: 'sessions',
      type: 'arrow',
    },
    {
      id: '6',
      title: 'Login History',
      subtitle: 'Last 10 logins',
      icon: 'history',
      type: 'arrow',
    },
  ],
  logins: [
    {
      id: '1',
      device: 'iPhone 14 Pro',
      location: 'Mumbai — 192.168.1.100',
      time: 'Today 9:00 AM',
      status: 'success',
    },
    {
      id: '2',
      device: 'MacBook Pro',
      location: 'Mumbai — 192.168.1.101',
      time: 'Yesterday 6:30 PM',
      status: 'success',
    },
    {
      id: '3',
      device: 'Unknown Device',
      location: 'Delhi — 203.x.x.x',
      time: '2 days ago — Blocked',
      status: 'blocked',
    },
  ],
  controls: [
    {
      id: '1',
      title: 'Emergency Platform Lockdown',
      subtitle: 'Blocks all user access instantly',
      icon: 'lock',
      action: 'Activate',
      color: '#E00014',
      bg: '#FFF1F1',
    },
    {
      id: '2',
      title: 'Maintenance Mode',
      subtitle: 'Shows maintenance page to all users',
      icon: 'maintenance',
      action: 'Schedule',
      color: '#F06419',
      bg: '#FFF3E9',
    },
    {
      id: '3',
      title: 'Force Logout All Users',
      subtitle: 'Logs out all active sessions',
      icon: 'force',
      action: 'Execute',
      color: '#173CFF',
      bg: '#F1F5FF',
    },
  ],
  admins: [
    {
      id: '1',
      initials: 'AK',
      name: 'Amit Kumar',
      role: 'Super Admin',
      status: 'Active',
    },
  ],
  developerSettings: [
    {
      id: '1',
      title: 'API Keys',
      value: '2 active keys',
      icon: 'api',
    },
    {
      id: '2',
      title: 'Webhook URLs',
      value: '3 configured',
      icon: 'webhook',
    },
    {
      id: '3',
      title: 'Integration Health',
      value: 'All Connected',
      icon: 'health',
      green: true,
    },
  ],
  settings: [
    {
      id: '1',
      title: 'Push Notifications',
      icon: 'push',
      type: 'switch',
      enabled: true,
    },
    {
      id: '2',
      title: 'Dark Mode',
      icon: 'dark',
      type: 'switch',
      enabled: false,
    },
    {
      id: '3',
      title: 'Language',
      value: 'English',
      icon: 'language',
      type: 'arrow',
    },
    {
      id: '4',
      title: 'Default Tab',
      value: 'Home',
      icon: 'default',
      type: 'arrow',
    },
  ],
  helpInfo: [
    {
      id: '1',
      title: 'Help & Support',
      icon: 'help',
    },
    {
      id: '2',
      title: 'Support Tickets',
      value: '5 open',
      icon: 'ticket',
      orange: true,
    },
    {
      id: '3',
      title: 'Terms of Service',
      icon: 'terms',
    },
    {
      id: '4',
      title: 'Privacy Policy',
      icon: 'privacy',
    },
    {
      id: '5',
      title: 'App Version',
      value: 'v1.0.0 (Build 100)',
      icon: 'version',
    },
  ],
};

export const getMockProfile = async (): Promise<ProfileData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProfileData);
    }, 400);
  });
};