import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  Award,
  Building2,
  CalendarDays,
  ChevronRight,
  Crown,
  Download,
  Edit3,
  FileText,
  Globe2,
  Headphones,
  HelpCircle,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Target,
  Trophy,
  TrendingUp,
  Users,
  WalletCards,
  IndianRupee,
} from 'lucide-react-native';
import {
  BusinessInfoItem,
  DealerProfileData,
  PerformanceItem,
  RowItem,
} from '../../api/mock/dealer/dealerProfile.mock';
import {getDealerProfile} from '../../api/dealer/dealerProfile.api';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const LOGIN_ROUTE_NAME = 'Auth';



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

const ProfileHero = ({profile}: {profile: DealerProfileData['profile']}) => {
  return (
    <View style={styles.heroCard}>
      <Image source={{uri: profile.image}} style={styles.profileImage} />

      <View style={styles.heroInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileBusiness}>{profile.business}</Text>

        <View style={styles.goldBadge}>
          <Crown color="#FFD84D" size={rs(19)} fill="#FFD84D" />
          <Text style={styles.goldBadgeText}>{profile.badge}</Text>
        </View>
      </View>
    </View>
  );
};

const CardTitle = ({title, icon}: {title: string; icon: string}) => {
  return (
    <View style={styles.cardTitleRow}>
      <View style={styles.titleIconBox}>
        <SectionIcon type={icon} />
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const SectionIcon = ({type}: {type: string}) => {
  const size = rs(22);

  if (type === 'business') {
    return <Building2 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'performance') {
    return <TrendingUp color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'account') {
    return <SlidersHorizontal color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'documents') {
    return <FileText color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'support') {
    return <Headphones color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'achievements') {
    return <Trophy color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  return <SlidersHorizontal color="#173CFF" size={size} strokeWidth={2.2} />;
};

const BusinessIcon = ({type}: {type: BusinessInfoItem['icon']}) => {
  const size = rs(19);

  if (type === 'business') {
    return <Building2 color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'address') {
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

const RowIcon = ({type}: {type: string}) => {
  const size = rs(20);

  if (type === 'lock') {
    return <Lock color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'shield') {
    return <ShieldCheck color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'device') {
    return <Smartphone color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'settings') {
    return <SlidersHorizontal color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color="#138A36" size={size} strokeWidth={2.2} />;
  }

  if (type === 'pan') {
    return <KeyRound color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'license') {
    return <FileText color="#F06419" size={size} strokeWidth={2.2} />;
  }

  if (type === 'bank') {
    return <Building2 color="#7B22EA" size={size} strokeWidth={2.2} />;
  }

  if (type === 'help') {
    return <HelpCircle color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'ticket') {
    return <Edit3 color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'terms') {
    return <FileText color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'privacy') {
    return <ShieldCheck color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'reward') {
    return <Award color="#F06419" size={size} strokeWidth={2.2} />;
  }

  if (type === 'target') {
    return <Target color="#173CFF" size={size} strokeWidth={2.2} />;
  }

  if (type === 'rank') {
    return <Trophy color="#F06419" size={size} strokeWidth={2.2} />;
  }

  if (type === 'dark') {
    return <Moon color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'language') {
    return <Globe2 color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  if (type === 'payment') {
    return <WalletCards color="#5D607E" size={size} strokeWidth={2.2} />;
  }

  return <FileText color="#5D607E" size={size} strokeWidth={2.2} />;
};

const BusinessInfoCard = ({items}: {items: BusinessInfoItem[]}) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle title="Business Information" icon="business" />

      {items.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.businessRow}>
          <View style={styles.smallIconBox}>
            <BusinessIcon type={item.icon} />
          </View>

          <Text style={styles.businessLabel}>{item.label}</Text>

          <Text style={styles.businessValue}>{item.value}</Text>

          <ChevronRight color="#5D607E" size={rs(18)} strokeWidth={2.2} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const PerformanceIcon = ({item}: {item: PerformanceItem}) => {
  const size = rs(25);

  if (item.icon === 'revenue') {
    return <IndianRupee color={item.color} size={size} strokeWidth={2.2} />;
  }

  if (item.icon === 'customers') {
    return <Users color={item.color} size={size} strokeWidth={2.2} />;
  }

  if (item.icon === 'success') {
    return <TrendingUp color={item.color} size={size} strokeWidth={2.2} />;
  }

  return <ShieldCheck color={item.color} size={size} strokeWidth={2.2} />;
};

const BusinessPerformanceCard = ({items}: {items: PerformanceItem[]}) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle title="Business Performance" icon="performance" />

      <View style={styles.performanceRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.performanceItem}>
            <View style={[styles.performanceIconCircle, {backgroundColor: `${item.color}16`}]}>
              <PerformanceIcon item={item} />
            </View>

            <Text style={styles.performanceLabel}>{item.label}</Text>
            <Text style={styles.performanceValue}>{item.value}</Text>
            <Text style={styles.performanceGrowth}>{item.growth}</Text>

            {index !== items.length - 1 && <View style={styles.performanceDivider} />}
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
  items: RowItem[];
}) => {
  const [localItems, setLocalItems] = useState(items);

  const toggle = (id: string) => {
    setLocalItems(prev =>
      prev.map(item =>
        item.id === id ? {...item, enabled: !item.enabled} : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <CardTitle title={title} icon={icon} />

      {localItems.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.settingRow}>
          <View style={styles.smallIconBox}>
            <RowIcon type={item.icon} />
          </View>

          <Text style={styles.settingLabel}>{item.label}</Text>

          {!!item.value && (
            <Text style={[styles.settingValue, item.green && styles.greenValue]}>
              {item.value}
            </Text>
          )}

          {item.type === 'switch' && (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{false: '#D0D3DA', true: '#173CFF'}}
              thumbColor="#FFFFFF"
            />
          )}

          {item.type === 'download' && (
            <Download color="#173CFF" size={rs(20)} strokeWidth={2.3} />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color="#5D607E" size={rs(18)} strokeWidth={2.2} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const PreferencesCard = ({items}: {items: RowItem[]}) => {
  const [localItems, setLocalItems] = useState(items);

  const toggle = (id: string) => {
    setLocalItems(prev =>
      prev.map(item =>
        item.id === id ? {...item, enabled: !item.enabled} : item,
      ),
    );
  };

  return (
    <View style={styles.fullCard}>
      <CardTitle title="Preferences" icon="preferences" />

      {localItems.map(item => (
        <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.preferenceRow}>
          <View style={styles.smallIconBox}>
            <RowIcon type={item.icon} />
          </View>

          <Text style={styles.settingLabel}>{item.label}</Text>

          {!!item.value && <Text style={styles.settingValue}>{item.value}</Text>}

          {item.type === 'switch' && (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{false: '#D0D3DA', true: '#173CFF'}}
              thumbColor="#FFFFFF"
            />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color="#5D607E" size={rs(18)} strokeWidth={2.2} />
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

const DealerProfileScreen = () => {
  const [data, setData] = useState<DealerProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await getDealerProfile();
      setData(response);
    } catch (error) {
      console.log('Dealer Profile API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const cards = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      [
        {
          title: 'Account Settings',
          icon: 'account',
          items: data.accountSettings,
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
          title: 'Achievements',
          icon: 'achievements',
          items: data.achievements,
        },
      ],
    ];
  }, [data]);

  if (loading || !data) {
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
        <ProfileHero profile={data.profile} />

        <BusinessInfoCard items={data.businessInfo} />

        <BusinessPerformanceCard items={data.performance} />

        {cards.map((row, index) => (
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

        <PreferencesCard items={data.preferences} />

        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DealerProfileScreen;

const PAGE_PADDING = rs(28);

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
    fontSize: fs(30),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(24),
    paddingBottom: rs(118),
  },
  heroCard: {
    minHeight: rs(246),
    backgroundColor: '#061B66',
    borderRadius: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(56),
    marginBottom: rs(18),
    overflow: 'hidden',
  },
  profileImage: {
    width: rs(178),
    height: rs(178),
    borderRadius: rs(89),
    borderWidth: rs(3),
    borderColor: '#FFFFFF',
    backgroundColor: '#D9DCE8',
    marginRight: rs(50),
  },
  heroInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: fs(31),
    fontWeight: '900',
    marginBottom: rs(14),
  },
  profileBusiness: {
    color: '#FFFFFF',
    fontSize: fs(20),
    fontWeight: '700',
    marginBottom: rs(26),
  },
  goldBadge: {
    height: rs(40),
    minWidth: rs(174),
    alignSelf: 'flex-start',
    borderRadius: rs(5),
    backgroundColor: '#1465E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(16),
  },
  goldBadgeText: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  halfCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  twoColumnRow: {
    flexDirection: 'column',
  },
  cardTitleRow: {
    height: rs(42),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  titleIconBox: {
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
    fontSize: fs(20),
    fontWeight: '900',
  },
  businessRow: {
    minHeight: rs(45),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIconBox: {
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
    fontSize: fs(14),
    fontWeight: '800',
  },
  businessValue: {
    flex: 1,
    color: '#252943',
    fontSize: fs(14),
    fontWeight: '600',
    lineHeight: rs(20),
  },
  performanceRow: {
    flexDirection: 'row',
    marginTop: rs(10),
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingVertical: rs(8),
  },
  performanceIconCircle: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(14),
  },
  performanceLabel: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: rs(8),
  },
  performanceValue: {
    color: '#061247',
    fontSize: fs(20),
    fontWeight: '900',
    marginBottom: rs(7),
  },
  performanceGrowth: {
    color: '#138A36',
    fontSize: fs(12),
    fontWeight: '900',
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
  preferenceRow: {
    minHeight: rs(42),
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    color: '#061247',
    fontSize: fs(14),
    fontWeight: '800',
  },
  settingValue: {
    color: '#5D607E',
    fontSize: fs(13),
    fontWeight: '700',
    marginRight: rs(10),
    textAlign: 'right',
  },
  greenValue: {
    color: '#138A36',
  },
  logoutButton: {
    height: rs(50),
    borderWidth: 1,
    borderColor: '#E00014',
    borderRadius: rs(6),
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
    fontSize: fs(17),
    fontWeight: '900',
    marginLeft: rs(12),
  },
});