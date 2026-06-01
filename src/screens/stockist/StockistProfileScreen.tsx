import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
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
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  Bell,
  Boxes,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  Edit3,
  FileText,
  Grid2X2,
  Headphones,
  Home,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  WalletCards,
  Warehouse,
  Globe2,
  CircleHelp,
  MessageSquareText,
  IndianRupee,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

const LOGIN_ROUTE_NAME = 'Auth';

type BusinessInfoItem = {
  id: string;
  label: string;
  value: string;
  icon: 'business' | 'gst' | 'warehouse' | 'phone' | 'email' | 'calendar';
};

type PerformanceItem = {
  id: string;
  label: string;
  value: string;
  icon: 'revenue' | 'dealers' | 'fulfillment' | 'payment';
  color: string;
};

type SettingRow = {
  id: string;
  label: string;
  value?: string;
  icon: string;
  type: 'arrow' | 'switch' | 'download';
  enabled?: boolean;
  green?: boolean;
};

type ProfileData = {
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

const mockProfileData: ProfileData = {
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

const mockProfileApi = async (): Promise<ProfileData> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProfileData), 300);
  });
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Text style={styles.headerTitle}>My Profile</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Edit3 color="#FFFFFF" size={rs(32)} strokeWidth={2.3} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileHero = ({ data }: { data: ProfileData }) => {
  return (
    <View style={styles.heroCard}>
      <Image source={{ uri: data.profile.image }} style={styles.profileImage} />

      <View style={styles.heroInfo}>
        <Text style={styles.profileName}>{data.profile.name}</Text>
        <Text style={styles.profileRole}>{data.profile.role}</Text>

        <View style={styles.premiumBadge}>
          <ShieldCheck color="#FFFFFF" size={rs(18)} strokeWidth={2.3} />
          <Text style={styles.premiumText}>{data.profile.badge}</Text>
        </View>
      </View>
    </View>
  );
};

const BusinessIcon = ({ type }: { type: BusinessInfoItem['icon'] }) => {
  const size = rs(20);

  if (type === 'business') {
    return <Building2 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'warehouse') {
    return <MapPin color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'phone') {
    return <Phone color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'email') {
    return <Mail color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  return <CalendarDays color="#173CFF" size={size} strokeWidth={2.2} />;
};

const SectionIcon = ({ type }: { type: string }) => {
  const size = rs(21);

  if (type === 'business') {
    return <Building2 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'performance') {
    return <TrendingUp color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'warehouse') {
    return <Home color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'security') {
    return <ShieldCheck color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'notifications') {
    return <Bell color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'documents') {
    return <FileText color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'support') {
    return <Headphones color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  return <Grid2X2 color="#173CFF" size={size} strokeWidth={2.2} />;
};

const SmallIcon = ({ type }: { type: string }) => {
  const size = rs(20);

  if (type === 'warehouse') {
    return <Warehouse color="#7B22EA" size={size} strokeWidth={2.2} />;
  }

  if (type === 'chart') {
    return <TrendingUp color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'location') {
    return <MapPin color="#F06419" size={size} strokeWidth={2.2} />;
  }

  if (type === 'clock') {
    return <Clock3 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'lock') {
    return <Lock color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'shield') {
    return <ShieldCheck color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'device') {
    return <Smartphone color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'history') {
    return <Clock3 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'orders') {
    return <Boxes color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'payment') {
    return <WalletCards color="#E00014" size={size} strokeWidth={2.2} />;
  }

  if (type === 'stock') {
    return <Boxes color="#A36A2A" size={size} strokeWidth={2.2} />;
  }

  if (type === 'dealers') {
    return <Users color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'pan') {
    return <KeyRound color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'bank') {
    return <Building2 color="#7B22EA" size={size} strokeWidth={2.2} />;
  }

  if (type === 'license') {
    return <FileText color="#F06419" size={size} strokeWidth={2.2} />;
  }

  if (type === 'help') {
    return <CircleHelp color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'ticket') {
    return <Edit3 color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'chat') {
    return <MessageSquareText color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'privacy') {
    return <ShieldCheck color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'dark') {
    return <Moon color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'language') {
    return <Globe2 color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  return <Grid2X2 color="#5D607E" size={size} strokeWidth={2.2} />;
};

const CardTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <View style={styles.cardTitleRow}>
      <View style={styles.sectionIconBox}>
        <SectionIcon type={icon} />
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const BusinessInformationCard = ({ items }: { items: BusinessInfoItem[] }) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle icon="business" title="Business Information" />

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.businessRow}
        >
          <View style={styles.rowIconSoft}>
            <BusinessIcon type={item.icon} />
          </View>

          <Text style={styles.businessLabel}>{item.label}</Text>

          <Text style={styles.businessValue}>{item.value}</Text>

          <ChevronRight color="#5D607E" size={rs(19)} strokeWidth={2.2} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const PerformanceIcon = ({ item }: { item: PerformanceItem }) => {
  const size = rs(25);

  if (item.icon === 'revenue') {
    return <IndianRupee color={item.color} size={size} strokeWidth={2.2} />;
  }

  if (item.icon === 'dealers') {
    return <Users color={item.color} size={size} strokeWidth={2.2} />;
  }

  if (item.icon === 'fulfillment') {
    return <Clock3 color={item.color} size={size} strokeWidth={2.2} />;
  }

  return <WalletCards color={item.color} size={size} strokeWidth={2.2} />;
};

const PerformanceSummaryCard = ({ items }: { items: PerformanceItem[] }) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle icon="performance" title="Performance Summary" />

      <View style={styles.performanceRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.performanceItem}>
            <View
              style={[styles.performanceIconBox, { borderColor: item.color }]}
            >
              <PerformanceIcon item={item} />
            </View>

            <Text style={styles.performanceValue}>{item.value}</Text>
            <Text style={styles.performanceLabel}>{item.label}</Text>

            {index !== items.length - 1 && (
              <View style={styles.performanceDivider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const SettingsCard = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: SettingRow[];
}) => {
  const [localItems, setLocalItems] = useState(items);

  const toggle = (id: string) => {
    setLocalItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <CardTitle icon={icon} title={title} />

      {localItems.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.settingRow}
        >
          <View style={styles.smallIconSoft}>
            <SmallIcon type={item.icon} />
          </View>

          <Text style={styles.settingLabel}>{item.label}</Text>

          {!!item.value && (
            <Text
              style={[styles.settingValue, item.green && styles.greenValue]}
            >
              {item.value}
            </Text>
          )}

          {item.type === 'switch' && (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{ false: '#D0D3DA', true: '#173CFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color="#5D607E" size={rs(18)} strokeWidth={2.2} />
          )}

          {item.type === 'download' && (
            <Download color="#173CFF" size={rs(20)} strokeWidth={2.3} />
          )}
        </TouchableOpacity>
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
      'stockistId',
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
          } catch (error: any) {
            setIsLoggingOut(false);
            Alert.alert('Logout failed', 'Please try again.', error);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isLoggingOut}
      onPress={handleLogout}
      style={[styles.logoutButton, isLoggingOut && styles.disabledButton]}
    >
      <LogOut color="#E00014" size={rs(24)} strokeWidth={2.4} />
      <Text style={styles.logoutText}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Text>
    </TouchableOpacity>
  );
};

const StockistProfileScreen = () => {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    mockProfileApi().then(setData);
  }, []);

  const cardRows = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      [
        {
          title: 'Warehouse Settings',
          icon: 'warehouse',
          items: data.warehouseSettings,
        },
        {
          title: 'Security Settings',
          icon: 'security',
          items: data.securitySettings,
        },
      ],
      [
        {
          title: 'Notifications',
          icon: 'notifications',
          items: data.notifications,
        },
        {
          title: 'Documents',
          icon: 'documents',
          items: data.documents,
        },
      ],
      [
        {
          title: 'Support',
          icon: 'support',
          items: data.support,
        },
        {
          title: 'App Preferences',
          icon: 'preferences',
          items: data.preferences,
        },
      ],
    ];
  }, [data]);

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
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHero data={data} />

        <BusinessInformationCard items={data.businessInfo} />

        <PerformanceSummaryCard items={data.performance} />

        {cardRows.map((row, index) => (
          <View key={index} style={styles.twoColumnRow}>
            {row.map(card => (
              <SettingsCard
                key={card.title}
                title={card.title}
                icon={card.icon}
                items={card.items}
              />
            ))}
          </View>
        ))}

        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockistProfileScreen;

const PAGE_PADDING = rs(28);
const CARD_GAP = rs(16);
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
    height: rs(78),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(28),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: rs(32),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(30),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(20),
    paddingBottom: rs(110),
  },
  heroCard: {
    minHeight: rs(224),
    backgroundColor: '#061B66',
    borderRadius: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(48),
    marginBottom: rs(18),
    overflow: 'hidden',
  },
  profileImage: {
    width: rs(170),
    height: rs(170),
    borderRadius: rs(85),
    borderWidth: rs(3),
    borderColor: '#FFFFFF',
    marginRight: rs(34),
    backgroundColor: '#D9DCE8',
  },
  heroInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: rs(30),
    fontWeight: '900',
    marginBottom: rs(14),
  },
  profileRole: {
    color: '#FFFFFF',
    fontSize: rs(18),
    fontWeight: '700',
    marginBottom: rs(22),
  },
  premiumBadge: {
    height: rs(38),
    minWidth: rs(210),
    alignSelf: 'flex-start',
    borderRadius: rs(5),
    backgroundColor: '#1465E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(16),
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  halfCard: {
    width: HALF_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitleRow: {
    height: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  sectionIconBox: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(10),
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  cardTitle: {
    color: '#061247',
    fontSize: rs(20),
    fontWeight: '900',
  },
  businessRow: {
    minHeight: rs(45),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIconSoft: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  businessLabel: {
    width: rs(350),
    color: '#061247',
    fontSize: rs(15),
    fontWeight: '800',
  },
  businessValue: {
    flex: 1,
    color: '#252943',
    fontSize: rs(14),
    fontWeight: '600',
    lineHeight: rs(20),
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(10),
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  performanceIconBox: {
    width: rs(50),
    height: rs(50),
    borderRadius: rs(25),
    borderWidth: 1,
    backgroundColor: '#F9FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(12),
  },
  performanceValue: {
    color: '#061247',
    fontSize: rs(20),
    fontWeight: '900',
    marginBottom: rs(6),
  },
  performanceLabel: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '700',
    textAlign: 'center',
  },
  performanceDivider: {
    position: 'absolute',
    right: 0,
    top: rs(5),
    bottom: rs(5),
    width: 1,
    backgroundColor: '#EEF0F6',
  },
  settingRow: {
    minHeight: rs(45),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIconSoft: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  settingLabel: {
    flex: 1,
    color: '#061247',
    fontSize: rs(14),
    fontWeight: '800',
  },
  settingValue: {
    color: '#5D607E',
    fontSize: rs(13),
    fontWeight: '700',
    marginRight: rs(10),
    textAlign: 'right',
  },
  greenValue: {
    color: '#138A36',
  },
  logoutButton: {
    height: rs(48),
    borderWidth: 1,
    borderColor: '#E00014',
    borderRadius: rs(6),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(6),
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutText: {
    color: '#E00014',
    fontSize: rs(17),
    fontWeight: '900',
    marginLeft: rs(12),
  },
});
