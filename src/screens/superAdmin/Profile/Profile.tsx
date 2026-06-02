import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfile } from '../../../api/superadmin/profile.api';
import { AdminDetail, AdminUser, DeveloperSetting, HelpInfo, LoginItem, PlatformControl, ProfileData, SecurityItem, SettingItem } from '../../../api/mock/superadmin/profile.mock';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => Math.round((value + 6) * scale);

const LOGIN_ROUTE_NAME = 'Auth';



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

const ProfileHero = ({ data }: { data: ProfileData }) => {
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

const AdminDetailIcon = ({ type }: { type: AdminDetail['icon'] }) => {
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

const CardHeader = ({ title, edit }: { title: string; edit?: boolean }) => {
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

const AdminDetailsCard = ({ items }: { items: AdminDetail[] }) => {
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

// const PlatformLogoCard = () => {
//   return (
//     <View style={styles.halfCard}>
//       <Text style={styles.cardTitle}>Platform Logo</Text>

//       <View style={styles.logoBox}>
//         <Text style={styles.logoMark}>F</Text>
//         <Text style={styles.logoText}>FranchiseOS</Text>
//       </View>

//       <Text style={styles.tapLogoText}>Tap to change logo</Text>

//       <TouchableOpacity activeOpacity={0.8} style={styles.uploadButton}>
//         <Text style={styles.uploadButtonText}>Upload New Logo</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const SecurityIcon = ({ type }: { type: SecurityItem['icon'] }) => {
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

const AccountSecurityCard = ({ items }: { items: SecurityItem[] }) => {
  const [securityItems, setSecurityItems] = useState(items);

  const toggle = (id: string) => {
    setSecurityItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
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
                ]}
              >
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
              trackColor={{ false: '#D9DCE8', true: '#173CFF' }}
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

const RecentLoginsCard = ({ items }: { items: LoginItem[] }) => {
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
                { backgroundColor: blocked ? '#E00014' : '#138A36' },
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.reviewButton}
                >
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
          <Text style={styles.alertTitle}>
            3 failed login attempts detected
          </Text>
          <Text style={styles.alertSubtitle}>
            From IP: 203.x.x.x — 2 days ago
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.blockButton}>
          <Text style={styles.blockButtonText}>Block this IP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PlatformControlsCard = ({ items }: { items: PlatformControl[] }) => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.emergencyLine} />

      <Text style={styles.cardTitle}>Platform Controls</Text>

      <Text style={styles.emergencyNote}>
        ⚠ Use only in emergency situations
      </Text>

      {items.map(item => (
        <View key={item.id} style={styles.controlRow}>
          <View style={[styles.controlIconBox, { backgroundColor: item.bg }]}>
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
            <Text style={[styles.controlTitle, { color: item.color }]}>
              {item.title}
            </Text>
            <Text style={styles.controlSubtitle}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.controlButton, { borderColor: item.color }]}
          >
            <Text style={[styles.controlButtonText, { color: item.color }]}>
              {item.action}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const OtherAdminsCard = ({ admins }: { admins: AdminUser[] }) => {
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

const DeveloperIcon = ({ type }: { type: DeveloperSetting['icon'] }) => {
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

const DeveloperSettingsCard = ({ items }: { items: DeveloperSetting[] }) => {
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

const SettingIcon = ({ type }: { type: SettingItem['icon'] }) => {
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

const SettingsCard = ({ items }: { items: SettingItem[] }) => {
  const [settings, setSettings] = useState(items);

  const toggle = (id: string) => {
    setSettings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
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
              trackColor={{ false: '#D9DCE8', true: '#173CFF' }}
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

const HelpIcon = ({ type }: { type: HelpInfo['icon'] }) => {
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

const HelpInfoCard = ({ items }: { items: HelpInfo[] }) => {
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
            Alert.alert('Logout failed', 'Please try again.' + error);
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
      style={[styles.logoutButton, isLoggingOut && styles.disabledButton]}
    >
      <LogOut color="#E00014" size={rs(24)} strokeWidth={2.3} />
      <Text style={styles.logoutText}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Text>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getProfile();

      setData(response);
    } catch (err) {
      console.log('Profile API Error:', err);
      setError('Unable to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleRetry = () => {
    loadProfile();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />

        <Text
          style={{
            color: '#061247',
            fontSize: fs(16),
            fontWeight: '800',
            marginBottom: rs(18),
            textAlign: 'center',
          }}
        >
          {error || 'Something went wrong'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleRetry}
          style={{
            backgroundColor: '#061B66',
            paddingHorizontal: rs(28),
            paddingVertical: rs(14),
            borderRadius: rs(8),
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: fs(14),
              fontWeight: '800',
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
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

        <AdminDetailsCard items={data.adminDetails} />

        <AccountSecurityCard items={data.security} />
        <RecentLoginsCard items={data.logins} />
        <SecurityAlertCard />

        <PlatformControlsCard items={data.controls} />
        <OtherAdminsCard admins={data.admins} />

        <DeveloperSettingsCard items={data.developerSettings} />
        <AnnouncementsCard />

        <SettingsCard items={data.settings} />
        <HelpInfoCard items={data.helpInfo} />

        <LogoutButton />

        <Text style={styles.footerText}>FranchiseOS v1.0 — Super Admin</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const PAGE_PADDING = rs(20);
const FULL_WIDTH = SCREEN_WIDTH - PAGE_PADDING * 2;

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
    fontSize: fs(28),
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
    minHeight: rs(318),
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
    fontSize: fs(54),
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
    fontSize: fs(30),
    fontWeight: '800',
    marginTop: rs(14),
  },
  profileRole: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '600',
    marginTop: rs(6),
  },
  platformPill: {
    minWidth: rs(230),
    minHeight: rs(36),
    borderRadius: rs(15),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  platformText: {
    color: '#FFFFFF',
    fontSize: fs(14),
    fontWeight: '700',
  },
  memberSince: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '500',
    marginTop: rs(10),
  },
  twoColumnRow: {
    width: '100%',
  },
  halfCard: {
    width: FULL_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 3,
  },
  rightStack: {
    width: FULL_WIDTH,
  },
  cardHeader: {
    minHeight: rs(34),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(8),
  },
  cardTitle: {
    color: '#111327',
    fontSize: fs(18),
    fontWeight: '900',
  },
  detailRow: {
    minHeight: rs(56),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBox: {
    width: rs(38),
  },
  detailLabel: {
    width: rs(125),
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '600',
  },
  detailValue: {
    flex: 1,
    flexShrink: 1,
    color: '#111327',
    fontSize: fs(13),
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
    fontSize: fs(12),
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
    fontSize: fs(58),
    fontWeight: '900',
    lineHeight: fs(58),
  },
  logoText: {
    color: '#061247',
    fontSize: fs(28),
    fontWeight: '800',
    marginTop: rs(4),
  },
  tapLogoText: {
    color: '#5D607E',
    fontSize: fs(13),
    textAlign: 'center',
    marginTop: rs(12),
  },
  uploadButton: {
    width: rs(220),
    minHeight: rs(42),
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
    fontSize: fs(14),
    fontWeight: '800',
  },
  securityRow: {
    minHeight: rs(66),
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
    fontSize: fs(14),
    fontWeight: '900',
  },
  securitySubtitle: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: rs(4),
  },
  securityValue: {
    color: '#173CFF',
    fontSize: fs(12),
    fontWeight: '800',
    marginRight: rs(10),
  },
  greenText: {
    color: '#138A36',
  },
  loginRow: {
    minHeight: rs(72),
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
    fontSize: fs(14),
    fontWeight: '900',
  },
  loginLocation: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: rs(4),
  },
  loginRight: {
    alignItems: 'flex-end',
  },
  loginTime: {
    color: '#5D607E',
    fontSize: fs(12),
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
    fontSize: fs(12),
    fontWeight: '800',
  },
  alertCard: {
    width: FULL_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 3,
  },
  alertBox: {
    minHeight: rs(78),
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
    fontSize: fs(13),
    fontWeight: '900',
  },
  alertSubtitle: {
    color: '#5D607E',
    fontSize: fs(11),
    fontWeight: '600',
    marginTop: rs(4),
  },
  blockButton: {
    width: rs(118),
    minHeight: rs(40),
    borderWidth: 1,
    borderColor: '#E00014',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  blockButtonText: {
    color: '#E00014',
    fontSize: fs(12),
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
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(8),
    marginBottom: rs(8),
  },
  controlRow: {
    minHeight: rs(68),
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
    fontSize: fs(13),
    fontWeight: '900',
  },
  controlSubtitle: {
    color: '#5D607E',
    fontSize: fs(11),
    fontWeight: '600',
    marginTop: rs(3),
  },
  controlButton: {
    width: rs(90),
    minHeight: rs(38),
    borderWidth: 1,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(6),
  },
  controlButtonText: {
    fontSize: fs(12),
    fontWeight: '800',
  },
  adminRow: {
    minHeight: rs(78),
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
    fontSize: fs(18),
    fontWeight: '900',
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    color: '#111327',
    fontSize: fs(14),
    fontWeight: '900',
  },
  blueSmallText: {
    color: '#173CFF',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(4),
  },
  activeBadge: {
    width: rs(78),
    minHeight: rs(34),
    borderRadius: rs(7),
    backgroundColor: '#EAF8EC',
    borderWidth: 1,
    borderColor: '#BEE7C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
    paddingHorizontal: rs(6),
  },
  activeBadgeText: {
    color: '#138A36',
    fontSize: fs(12),
    fontWeight: '800',
  },
  manageButton: {
    width: rs(90),
    minHeight: rs(38),
    borderWidth: 1,
    borderColor: '#173CFF',
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(6),
  },
  manageText: {
    color: '#173CFF',
    fontSize: fs(12),
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
    fontSize: fs(16),
    fontWeight: '900',
  },
  adminSubtitle: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: rs(4),
  },
  simpleRow: {
    minHeight: rs(56),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleTitle: {
    flex: 1,
    color: '#111327',
    fontSize: fs(13),
    fontWeight: '800',
    marginLeft: rs(12),
  },
  simpleValue: {
    color: '#173CFF',
    fontSize: fs(12),
    fontWeight: '800',
    marginRight: rs(10),
  },
  grayValue: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginRight: rs(10),
  },
  orangeText: {
    color: '#F06419',
  },
  broadcastButton: {
    minHeight: rs(46),
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
    fontSize: fs(14),
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
    fontSize: fs(13),
    fontWeight: '800',
  },
  announcementSubtitle: {
    color: '#5D607E',
    fontSize: fs(12),
    marginTop: rs(6),
  },
  logoutButton: {
    minHeight: rs(52),
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
    fontSize: fs(17),
    fontWeight: '800',
    marginLeft: rs(12),
  },
  footerText: {
    color: '#5D607E',
    textAlign: 'center',
    fontSize: fs(13),
    fontWeight: '600',
    marginTop: rs(10),
  },
});
