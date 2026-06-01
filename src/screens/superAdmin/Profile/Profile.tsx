import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  Bell,
  Building2,
  CalendarDays,
  Camera,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Edit3,
  Eye,
  FileText,
  Globe2,
  Headphones,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  Moon,
  Phone,
  Plus,
  RefreshCw,
  Shield,
  ShieldAlert,
  Smartphone,
  User,
  Users,
  Wrench,
  CheckCircle2,
} from 'lucide-react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

const LOGIN_ROUTE_NAME = 'Auth';

type AdminDetail = {
  id: string;
  label: string;
  value: string;
  icon: 'user' | 'email' | 'phone' | 'organization' | 'calendar' | 'shield';
  verified?: boolean;
  blue?: boolean;
};

type SecurityItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'password' | '2fa' | 'otp' | 'ip' | 'sessions' | 'history';
  type: 'arrow' | 'switch';
  value?: string;
  enabled?: boolean;
};

type LoginItem = {
  id: string;
  device: string;
  location: string;
  time: string;
  status: 'success' | 'blocked';
};

type PlatformControl = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'lock' | 'maintenance' | 'force';
  action: string;
  color: string;
  bg: string;
};

type AdminUser = {
  id: string;
  initials: string;
  name: string;
  role: string;
  status?: string;
};

type DeveloperSetting = {
  id: string;
  title: string;
  value: string;
  icon: 'api' | 'webhook' | 'health';
  green?: boolean;
};

type SettingItem = {
  id: string;
  title: string;
  value?: string;
  icon: 'push' | 'dark' | 'language' | 'default';
  type: 'switch' | 'arrow';
  enabled?: boolean;
};

type HelpInfo = {
  id: string;
  title: string;
  value?: string;
  icon: 'help' | 'ticket' | 'terms' | 'privacy' | 'version';
  orange?: boolean;
};

type ProfileData = {
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

const mockProfileData: ProfileData = {
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

const mockProfileApi = async (): Promise<ProfileData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProfileData), 300);
  });
};

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(35)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>My Profile</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Edit3 color="#FFFFFF" size={rs(32)} strokeWidth={2.3} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileHero = ({data}: {data: ProfileData}) => {
  return (
    <View style={styles.heroCard}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{data.profile.initials}</Text>
        </View>

        <View style={styles.cameraButton}>
          <Camera color="#173CFF" size={rs(22)} strokeWidth={2.4} />
        </View>
      </View>

      <Text style={styles.profileName}>{data.profile.name}</Text>
      <Text style={styles.profileRole}>{data.profile.role}</Text>

      <View style={styles.platformPill}>
        <Text style={styles.platformText}>{data.profile.platform}</Text>
      </View>

      <Text style={styles.memberSince}>
        Member since {data.profile.memberSince}
      </Text>
    </View>
  );
};

const AdminDetailIcon = ({type}: {type: AdminDetail['icon']}) => {
  const color = '#5D607E';
  const size = rs(20);

  if (type === 'user') {
    return <User color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'email') {
    return <Mail color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'phone') {
    return <Phone color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'organization') {
    return <Building2 color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'calendar') {
    return <CalendarDays color={color} size={size} strokeWidth={2} />;
  }

  return <Shield color={color} size={size} strokeWidth={2} />;
};

const CardHeader = ({
  title,
  edit,
}: {
  title: string;
  edit?: boolean;
}) => {
  return (
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>

      {edit ? (
        <TouchableOpacity activeOpacity={0.8}>
          <Edit3 color="#061247" size={rs(20)} strokeWidth={2.2} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const AdminDetailsCard = ({items}: {items: AdminDetail[]}) => {
  return (
    <View style={styles.halfCard}>
      <CardHeader title="Admin Details" edit />

      {items.map(item => (
        <View key={item.id} style={styles.detailRow}>
          <View style={styles.detailIconBox}>
            <AdminDetailIcon type={item.icon} />
          </View>

          <Text style={styles.detailLabel}>{item.label}</Text>

          <Text style={[styles.detailValue, item.blue && styles.blueText]}>
            {item.value}
          </Text>

          {item.verified ? (
            <View style={styles.verifiedBox}>
              <Text style={styles.verifiedText}>Verified</Text>
              <CheckCircle2
                color="#138A36"
                size={rs(15)}
                fill="#138A36"
                strokeWidth={2}
              />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const PlatformLogoCard = () => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Platform Logo</Text>

      <View style={styles.logoBox}>
        <Text style={styles.logoMark}>F</Text>
        <Text style={styles.logoText}>FranchiseOS</Text>
      </View>

      <Text style={styles.tapLogoText}>Tap to change logo</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload New Logo</Text>
      </TouchableOpacity>
    </View>
  );
};

const SecurityIcon = ({type}: {type: SecurityItem['icon']}) => {
  const color = '#5D607E';
  const size = rs(24);

  if (type === 'password') {
    return <Lock color={color} size={size} strokeWidth={2} />;
  }

  if (type === '2fa') {
    return <Shield color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'otp') {
    return <Smartphone color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'ip') {
    return <Globe2 color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'sessions') {
    return <Eye color={color} size={size} strokeWidth={2} />;
  }

  return <Clock3 color={color} size={size} strokeWidth={2} />;
};

const AccountSecurityCard = ({items}: {items: SecurityItem[]}) => {
  const [securityItems, setSecurityItems] = useState(items);

  const toggle = (id: string) => {
    setSecurityItems(prev =>
      prev.map(item =>
        item.id === id ? {...item, enabled: !item.enabled} : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Account Security</Text>

      {securityItems.map(item => (
        <View key={item.id} style={styles.securityRow}>
          <SecurityIcon type={item.icon} />

          <View style={styles.securityTextBox}>
            <Text style={styles.securityTitle}>{item.title}</Text>
            {!!item.subtitle && (
              <Text
                style={[
                  styles.securitySubtitle,
                  item.enabled && styles.greenText,
                ]}>
                {item.subtitle}
              </Text>
            )}
          </View>

          {!!item.value && (
            <Text style={styles.securityValue}>{item.value}</Text>
          )}

          {item.type === 'switch' ? (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{false: '#D9DCE8', true: '#173CFF'}}
              thumbColor="#FFFFFF"
            />
          ) : (
            <ChevronRight color="#061247" size={rs(20)} strokeWidth={2.2} />
          )}
        </View>
      ))}
    </View>
  );
};

const RecentLoginsCard = ({items}: {items: LoginItem[]}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Recent Logins</Text>

      {items.map(item => {
        const blocked = item.status === 'blocked';

        return (
          <View key={item.id} style={styles.loginRow}>
            <View
              style={[
                styles.loginDot,
                {backgroundColor: blocked ? '#E00014' : '#138A36'},
              ]}
            />

            <View style={styles.loginInfo}>
              <Text style={styles.loginDevice}>{item.device}</Text>
              <Text style={[styles.loginLocation, blocked && styles.redText]}>
                {item.location}
              </Text>
            </View>

            <View style={styles.loginRight}>
              <Text style={[styles.loginTime, blocked && styles.redText]}>
                {item.time}
              </Text>

              {blocked ? (
                <TouchableOpacity activeOpacity={0.8} style={styles.reviewButton}>
                  <Text style={styles.reviewText}>Review</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const SecurityAlertCard = () => {
  return (
    <View style={styles.alertCard}>
      <Text style={styles.cardTitle}>Security Alerts</Text>

      <View style={styles.alertBox}>
        <ShieldAlert color="#F06419" size={rs(30)} fill="#F06419" />

        <View style={styles.alertTextBox}>
          <Text style={styles.alertTitle}>3 failed login attempts detected</Text>
          <Text style={styles.alertSubtitle}>From IP: 203.x.x.x — 2 days ago</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.blockButton}>
          <Text style={styles.blockButtonText}>Block this IP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PlatformControlsCard = ({items}: {items: PlatformControl[]}) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.emergencyLine} />

      <Text style={styles.cardTitle}>Platform Controls</Text>

      <Text style={styles.emergencyNote}>⚠ Use only in emergency situations</Text>

      {items.map(item => (
        <View key={item.id} style={styles.controlRow}>
          <View style={[styles.controlIconBox, {backgroundColor: item.bg}]}>
            {item.icon === 'lock' && (
              <Lock color={item.color} size={rs(22)} strokeWidth={2.3} />
            )}
            {item.icon === 'maintenance' && (
              <Wrench color={item.color} size={rs(22)} strokeWidth={2.3} />
            )}
            {item.icon === 'force' && (
              <Users color={item.color} size={rs(22)} strokeWidth={2.3} />
            )}
          </View>

          <View style={styles.controlInfo}>
            <Text style={[styles.controlTitle, {color: item.color}]}>
              {item.title}
            </Text>
            <Text style={styles.controlSubtitle}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.controlButton, {borderColor: item.color}]}>
            <Text style={[styles.controlButtonText, {color: item.color}]}>
              {item.action}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const OtherAdminsCard = ({admins}: {admins: AdminUser[]}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Other Admins</Text>

      {admins.map(item => (
        <View key={item.id} style={styles.adminRow}>
          <View style={styles.adminAvatar}>
            <Text style={styles.adminAvatarText}>{item.initials}</Text>
          </View>

          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>{item.name}</Text>
            <Text style={styles.blueSmallText}>{item.role}</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{item.status}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.manageButton}>
            <Text style={styles.manageText}>Manage</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.adminRow}>
        <View style={styles.addAdminCircle}>
          <Plus color="#111327" size={rs(28)} strokeWidth={2} />
        </View>

        <View style={styles.adminInfo}>
          <Text style={styles.addAdminText}>Add Backup Admin</Text>
          <Text style={styles.adminSubtitle}>Invite another super admin</Text>
        </View>
      </View>
    </View>
  );
};

const DeveloperIcon = ({type}: {type: DeveloperSetting['icon']}) => {
  const color = '#5D607E';
  const size = rs(20);

  if (type === 'api') {
    return <Code2 color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'webhook') {
    return <KeyRound color={color} size={size} strokeWidth={2} />;
  }

  return <RefreshCw color={color} size={size} strokeWidth={2} />;
};

const DeveloperSettingsCard = ({items}: {items: DeveloperSetting[]}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Developer Settings</Text>

      {items.map(item => (
        <View key={item.id} style={styles.simpleRow}>
          <DeveloperIcon type={item.icon} />

          <Text style={styles.simpleTitle}>{item.title}</Text>

          <Text style={[styles.simpleValue, item.green && styles.greenText]}>
            {item.value}
          </Text>

          {item.green ? (
            <CheckCircle2
              color="#138A36"
              size={rs(15)}
              fill="#138A36"
              strokeWidth={2}
            />
          ) : (
            <ChevronRight color="#061247" size={rs(18)} strokeWidth={2.2} />
          )}
        </View>
      ))}
    </View>
  );
};

const AnnouncementsCard = () => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Platform Announcements</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.broadcastButton}>
        <Megaphone color="#173CFF" size={rs(23)} strokeWidth={2.3} />
        <Text style={styles.broadcastText}>Send Broadcast</Text>
      </TouchableOpacity>

      <View style={styles.announcementRow}>
        <View>
          <Text style={styles.announcementTitle}>Announcement History</Text>
          <Text style={styles.announcementSubtitle}>
            3 announcements sent this month
          </Text>
        </View>

        <ChevronRight color="#061247" size={rs(20)} strokeWidth={2.2} />
      </View>
    </View>
  );
};

const SettingIcon = ({type}: {type: SettingItem['icon']}) => {
  const color = '#5D607E';
  const size = rs(20);

  if (type === 'push') {
    return <Bell color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'dark') {
    return <Moon color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'language') {
    return <Globe2 color={color} size={size} strokeWidth={2} />;
  }

  return <RefreshCw color={color} size={size} strokeWidth={2} />;
};

const SettingsCard = ({items}: {items: SettingItem[]}) => {
  const [settings, setSettings] = useState(items);

  const toggle = (id: string) => {
    setSettings(prev =>
      prev.map(item =>
        item.id === id ? {...item, enabled: !item.enabled} : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Settings</Text>

      {settings.map(item => (
        <View key={item.id} style={styles.simpleRow}>
          <SettingIcon type={item.icon} />

          <Text style={styles.simpleTitle}>{item.title}</Text>

          {item.type === 'switch' ? (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{false: '#D9DCE8', true: '#173CFF'}}
              thumbColor="#FFFFFF"
            />
          ) : (
            <>
              <Text style={styles.grayValue}>{item.value}</Text>
              <ChevronRight color="#061247" size={rs(18)} strokeWidth={2.2} />
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const HelpIcon = ({type}: {type: HelpInfo['icon']}) => {
  const color = '#5D607E';
  const size = rs(18);

  if (type === 'help') {
    return <CircleHelp color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'ticket') {
    return <Headphones color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'terms') {
    return <FileText color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'privacy') {
    return <Shield color={color} size={size} strokeWidth={2} />;
  }

  return <Clock3 color={color} size={size} strokeWidth={2} />;
};

const HelpInfoCard = ({items}: {items: HelpInfo[]}) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.cardTitle}>Help & Info</Text>

      {items.map(item => (
        <View key={item.id} style={styles.simpleRow}>
          <HelpIcon type={item.icon} />

          <Text style={styles.simpleTitle}>{item.title}</Text>

          {!!item.value && (
            <Text style={[styles.grayValue, item.orange && styles.orangeText]}>
              {item.value}
            </Text>
          )}

          <ChevronRight color="#061247" size={rs(18)} strokeWidth={2.2} />
        </View>
      ))}
    </View>
  );
};

const LogoutButton = () => {
  const navigation = useNavigation<any>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const clearAuthStorage = async () => {
    const keysToRemove = [
      'token',
      'authToken',
      'accessToken',
      'refreshToken',
      'userToken',
      'user',
      'userData',
      'role',
      'company',
      'companyId',
      'isLoggedIn',
    ];

    await Promise.all(keysToRemove.map(key => AsyncStorage.removeItem(key)));
  };

  const resetToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: LOGIN_ROUTE_NAME,
            state: {
              routes: [{ name: 'Login' }],
            },
          },
        ],
      }),
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoggingOut(true);
            await clearAuthStorage();
            resetToLogin();
          } catch (error) {
            setIsLoggingOut(false);
            Alert.alert('Logout failed', 'Please try again.'+error);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoggingOut}
      onPress={handleLogout}
      style={[styles.logoutButton, isLoggingOut && styles.disabledButton]}>
      <LogOut color="#E00014" size={rs(24)} strokeWidth={2.3} />
      <Text style={styles.logoutText}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Text>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    mockProfileApi().then(setData);
  }, []);

  if (!data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ProfileHero data={data} />

        <View style={styles.twoColumnRow}>
          <AdminDetailsCard items={data.adminDetails} />
          <PlatformLogoCard />
        </View>

        <View style={styles.twoColumnRow}>
          <AccountSecurityCard items={data.security} />

          <View style={styles.rightStack}>
            <RecentLoginsCard items={data.logins} />
            <SecurityAlertCard />
          </View>
        </View>

        <View style={styles.twoColumnRow}>
          <PlatformControlsCard items={data.controls} />
          <OtherAdminsCard admins={data.admins} />
        </View>

        <View style={styles.twoColumnRow}>
          <DeveloperSettingsCard items={data.developerSettings} />
          <AnnouncementsCard />
        </View>

        <View style={styles.twoColumnRow}>
          <SettingsCard items={data.settings} />
          <HelpInfoCard items={data.helpInfo} />
        </View>

        <LogoutButton />

        <Text style={styles.footerText}>FranchiseOS v1.0 — Super Admin</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const PAGE_PADDING = rs(20);
const CARD_GAP = rs(12);
const HALF_WIDTH = (SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(70),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(28),
    paddingTop: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(28),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(12),
    paddingBottom: rs(34),
  },
  heroCard: {
    minHeight: rs(294),
    backgroundColor: '#061B66',
    borderRadius: rs(8),
    alignItems: 'center',
    paddingTop: rs(16),
    marginBottom: rs(14),
  },
  avatarWrap: {
    width: rs(150),
    height: rs(124),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: rs(124),
    height: rs(124),
    borderRadius: rs(62),
    borderWidth: rs(3),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: rs(54),
    fontWeight: '900',
    letterSpacing: rs(6),
  },
  cameraButton: {
    position: 'absolute',
    right: rs(10),
    bottom: rs(0),
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: rs(30),
    fontWeight: '800',
    marginTop: rs(14),
  },
  profileRole: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '600',
    marginTop: rs(6),
  },
  platformPill: {
    minWidth: rs(205),
    height: rs(30),
    borderRadius: rs(15),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  platformText: {
    color: '#FFFFFF',
    fontSize: rs(14),
    fontWeight: '700',
  },
  memberSince: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '500',
    marginTop: rs(10),
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    marginBottom: rs(12),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: {width: 0, height: rs(4)},
    elevation: 3,
  },
  rightStack: {
    width: HALF_WIDTH,
  },
  cardHeader: {
    height: rs(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#111327',
    fontSize: rs(18),
    fontWeight: '900',
  },
  detailRow: {
    minHeight: rs(37),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBox: {
    width: rs(32),
  },
  detailLabel: {
    width: rs(110),
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
  },
  detailValue: {
    flex: 1,
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '900',
  },
  blueText: {
    color: '#173CFF',
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#138A36',
    fontSize: rs(12),
    fontWeight: '800',
    marginRight: rs(6),
  },
  logoBox: {
    width: rs(202),
    height: rs(132),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(12),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(18),
  },
  logoMark: {
    color: '#173CFF',
    fontSize: rs(58),
    fontWeight: '900',
    lineHeight: rs(58),
  },
  logoText: {
    color: '#061247',
    fontSize: rs(28),
    fontWeight: '800',
    marginTop: rs(4),
  },
  tapLogoText: {
    color: '#5D607E',
    fontSize: rs(13),
    textAlign: 'center',
    marginTop: rs(12),
  },
  uploadButton: {
    width: rs(202),
    height: rs(34),
    borderWidth: 1,
    borderColor: '#173CFF',
    borderRadius: rs(4),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(12),
  },
  uploadButtonText: {
    color: '#173CFF',
    fontSize: rs(14),
    fontWeight: '800',
  },
  securityRow: {
    minHeight: rs(48),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityTextBox: {
    flex: 1,
    marginLeft: rs(14),
  },
  securityTitle: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  securitySubtitle: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
    marginTop: rs(2),
  },
  securityValue: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '800',
    marginRight: rs(10),
  },
  greenText: {
    color: '#138A36',
  },
  loginRow: {
    minHeight: rs(58),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginDot: {
    width: rs(9),
    height: rs(9),
    borderRadius: rs(5),
    marginRight: rs(16),
  },
  loginInfo: {
    flex: 1,
  },
  loginDevice: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  loginLocation: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
    marginTop: rs(4),
  },
  loginRight: {
    alignItems: 'flex-end',
  },
  loginTime: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
  },
  redText: {
    color: '#E00014',
  },
  reviewButton: {
    width: rs(78),
    height: rs(30),
    borderWidth: 1,
    borderColor: '#173CFF',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(12),
  },
  reviewText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '800',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    marginBottom: rs(12),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: {width: 0, height: rs(4)},
    elevation: 3,
  },
  alertBox: {
    minHeight: rs(65),
    borderWidth: 1,
    borderColor: '#F8C9A8',
    backgroundColor: '#FFF4EA',
    borderRadius: rs(6),
    marginTop: rs(12),
    paddingHorizontal: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTextBox: {
    flex: 1,
    marginLeft: rs(14),
  },
  alertTitle: {
    color: '#F06419',
    fontSize: rs(13),
    fontWeight: '900',
  },
  alertSubtitle: {
    color: '#5D607E',
    fontSize: rs(11),
    fontWeight: '600',
    marginTop: rs(4),
  },
  blockButton: {
    width: rs(94),
    height: rs(34),
    borderWidth: 1,
    borderColor: '#E00014',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockButtonText: {
    color: '#E00014',
    fontSize: rs(12),
    fontWeight: '800',
  },
  emergencyLine: {
    position: 'absolute',
    left: 0,
    top: rs(0),
    bottom: rs(0),
    width: rs(4),
    backgroundColor: '#E00014',
    borderTopLeftRadius: rs(8),
    borderBottomLeftRadius: rs(8),
  },
  emergencyNote: {
    color: '#E00014',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(8),
    marginBottom: rs(8),
  },
  controlRow: {
    minHeight: rs(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlIconBox: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    fontSize: rs(13),
    fontWeight: '900',
  },
  controlSubtitle: {
    color: '#5D607E',
    fontSize: rs(11),
    fontWeight: '600',
    marginTop: rs(3),
  },
  controlButton: {
    width: rs(72),
    height: rs(32),
    borderWidth: 1,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: rs(12),
    fontWeight: '800',
  },
  adminRow: {
    minHeight: rs(68),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: rs(45),
    height: rs(45),
    borderRadius: rs(23),
    backgroundColor: '#061B66',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  adminAvatarText: {
    color: '#FFFFFF',
    fontSize: rs(18),
    fontWeight: '900',
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  blueSmallText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  activeBadge: {
    width: rs(62),
    height: rs(28),
    borderRadius: rs(7),
    backgroundColor: '#EAF8EC',
    borderWidth: 1,
    borderColor: '#BEE7C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  activeBadgeText: {
    color: '#138A36',
    fontSize: rs(12),
    fontWeight: '800',
  },
  manageButton: {
    width: rs(76),
    height: rs(32),
    borderWidth: 1,
    borderColor: '#173CFF',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageText: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '800',
  },
  addAdminCircle: {
    width: rs(45),
    height: rs(45),
    borderRadius: rs(23),
    backgroundColor: '#E5E7EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  addAdminText: {
    color: '#173CFF',
    fontSize: rs(16),
    fontWeight: '900',
  },
  adminSubtitle: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
    marginTop: rs(4),
  },
  simpleRow: {
    minHeight: rs(36),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleTitle: {
    flex: 1,
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '800',
    marginLeft: rs(12),
  },
  simpleValue: {
    color: '#173CFF',
    fontSize: rs(12),
    fontWeight: '800',
    marginRight: rs(10),
  },
  grayValue: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    marginRight: rs(10),
  },
  orangeText: {
    color: '#F06419',
  },
  broadcastButton: {
    height: rs(38),
    borderWidth: 1,
    borderColor: '#173CFF',
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(16),
  },
  broadcastText: {
    color: '#173CFF',
    fontSize: rs(14),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  announcementRow: {
    minHeight: rs(58),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(10),
  },
  announcementTitle: {
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '800',
  },
  announcementSubtitle: {
    color: '#5D607E',
    fontSize: rs(12),
    marginTop: rs(6),
  },
  logoutButton: {
    height: rs(44),
    borderWidth: 1,
    borderColor: '#E00014',
    borderRadius: rs(5),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(2),
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutText: {
    color: '#E00014',
    fontSize: rs(17),
    fontWeight: '800',
    marginLeft: rs(12),
  },
  footerText: {
    color: '#5D607E',
    textAlign: 'center',
    fontSize: rs(13),
    fontWeight: '600',
    marginTop: rs(10),
  },
});