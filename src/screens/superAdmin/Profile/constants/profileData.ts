export const adminDetails = [
  {id: 'fullName', label: 'Full Name', value: 'Rajesh Kumar', icon: 'user'},
  {id: 'email', label: 'Email Address', value: 'admin@franchiseos.com', note: 'Verified', verified: true, icon: 'mail'},
  {id: 'phone', label: 'Phone Number', value: '+91 98765 43210', note: 'Verified', verified: true, icon: 'phone'},
  {id: 'organization', label: 'Organization', value: 'FranchiseOS Platform', icon: 'building'},
  {id: 'memberSince', label: 'Member Since', value: 'January 2023', icon: 'calendar'},
  {id: 'adminLevel', label: 'Admin Level', value: 'Super Administrator', highlight: true, icon: 'shield'},
];

export const securityItems = [
  {id: 'password', title: 'Change Password', subtitle: 'Last changed 30 days ago', icon: 'lock', type: 'arrow'},
  {id: 'twoFactor', title: 'Two Factor Auth', subtitle: 'Enabled via SMS', icon: 'shield-check', type: 'switch', enabled: true},
  {id: 'loginOtp', title: 'Login OTP Required', subtitle: 'Every login requires OTP', icon: 'smartphone', type: 'switch', enabled: true},
  {id: 'ipWhitelist', title: 'IP Whitelist', subtitle: 'Only whitelisted IPs can login', value: '3 IPs allowed', icon: 'globe', type: 'arrow'},
  {id: 'sessions', title: 'Active Sessions', value: '2 active devices', icon: 'eye', type: 'arrow'},
  {id: 'history', title: 'Login History', subtitle: 'Last 10 logins', icon: 'clock', type: 'arrow'},
];

export const recentLogins = [
  {id: 1, device: 'iPhone 14 Pro', location: 'Mumbai — 192.168.1.100', time: 'Today 9:00 AM', status: 'success'},
  {id: 2, device: 'MacBook Pro', location: 'Mumbai — 192.168.1.101', time: 'Yesterday 6:30 PM', status: 'success'},
  {id: 3, device: 'Unknown Device', location: 'Delhi — 203.x.x.x', time: '2 days ago — Blocked', status: 'blocked'},
];

export const platformControls = [
  {id: 1, title: 'Emergency Platform Lockdown', subtitle: 'Blocks all user access instantly', action: 'Activate', color: '#E51B2B', icon: 'lock'},
  {id: 2, title: 'Maintenance Mode', subtitle: 'Show maintenance page to all users', action: 'Schedule', color: '#F15A24', icon: 'wrench'},
  {id: 3, title: 'Force Logout All Users', subtitle: 'Logs out all active sessions', action: 'Execute', color: '#1557F5', icon: 'users'},
];

export const developerSettings = [
  {id: 1, title: 'API Keys', value: '2 active keys', icon: 'code'},
  {id: 2, title: 'Webhook URLs', value: '3 configured', icon: 'link'},
  {id: 3, title: 'Integration Health', value: 'All Connected', success: true, icon: 'refresh'},
];

export const settings = [
  {id: 1, title: 'Push Notifications', icon: 'bell', type: 'switch', enabled: true},
  {id: 2, title: 'Dark Mode', icon: 'moon', type: 'switch', enabled: false},
  {id: 3, title: 'Language', value: 'English', icon: 'globe', type: 'arrow'},
  {id: 4, title: 'Default Tab', value: 'Home', icon: 'chart', type: 'arrow'},
];

export const otherAdmins = [
  {id: 1, initials: 'AK', name: 'Amit Kumar', role: 'Super Admin', status: 'Active'},
];

export const helpInfo = [
  {id: 1, title: 'Help & Support', icon: 'help'},
  {id: 2, title: 'Support Tickets', value: '5 open', warning: true, icon: 'ticket'},
  {id: 3, title: 'Terms of Service', icon: 'file'},
  {id: 4, title: 'Privacy Policy', icon: 'shield'},
  {id: 5, title: 'App Version', value: 'v1.0 (Build 100)', icon: 'info'},
];
