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
import {
  AdminDetail,
  AdminUser,
  DeveloperSetting,
  HelpInfo,
  LoginItem,
  PlatformControl,
  ProfileData,
  SecurityItem,
  SettingItem,
} from '../../../api/mock/superadmin/profile.mock';
import { clearAuthStorage } from '../../../utils/sessionManager';
import { resetToLogin } from '../../../navigation/navigationService';
import { showErrorToast } from '../../../utils/toast';
import { colors, fonts, size as rs, superAdminProfileTextSize as fs } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(35)} strokeWidth={2.6} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>My Profile</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Edit3 color={colors.white} size={rs(32)} strokeWidth={2.3} />
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
          <Camera color={colors.financeBlue} size={rs(22)} strokeWidth={2.4} />
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
  const color = colors.slateText;
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
          <Edit3 color={colors.primaryText} size={rs(20)} strokeWidth={2.2} />
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

          <Text numberOfLines={1} style={styles.detailLabel}>{item.label}</Text>

          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={[styles.detailValue, item.blue && styles.blueText]}>
            {item.value}
          </Text>

          {item.verified ? (
            <View style={styles.verifiedBox}>
              <Text style={styles.verifiedText}>Verified</Text>
              <CheckCircle2
                color={colors.success}
                size={rs(15)}
                fill={colors.success}
                strokeWidth={2}
              />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const SecurityIcon = ({ type }: { type: SecurityItem['icon'] }) => {
  const color = colors.slateText;
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
            <Text numberOfLines={1} style={styles.securityTitle}>{item.title}</Text>
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
            <Text numberOfLines={1} style={styles.securityValue}>{item.value}</Text>
          )}

          {item.type === 'switch' ? (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{ false: colors.inputBorder, true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          ) : (
            <ChevronRight color={colors.primaryText} size={rs(20)} strokeWidth={2.2} />
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
                { backgroundColor: blocked ? colors.dangerDark : colors.success },
              ]}
            />

            <View style={styles.loginInfo}>
              <Text numberOfLines={1} style={styles.loginDevice}>{item.device}</Text>
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
        <ShieldAlert color={colors.profileOrange} size={rs(30)} fill={colors.profileOrange} />

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
            <Text numberOfLines={1} style={styles.adminName}>{item.name}</Text>
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
          <Plus color={colors.text} size={rs(28)} strokeWidth={2} />
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
  const color = colors.slateText;
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

          <Text numberOfLines={1} style={styles.simpleTitle}>{item.title}</Text>

          <Text numberOfLines={1} style={[styles.simpleValue, item.green && styles.greenText]}>
            {item.value}
          </Text>

          {item.green ? (
            <CheckCircle2
              color={colors.success}
              size={rs(15)}
              fill={colors.success}
              strokeWidth={2}
            />
          ) : (
            <ChevronRight color={colors.primaryText} size={rs(18)} strokeWidth={2.2} />
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
        <Megaphone color={colors.financeBlue} size={rs(23)} strokeWidth={2.3} />
        <Text style={styles.broadcastText}>Send Broadcast</Text>
      </TouchableOpacity>

      <View style={styles.announcementRow}>
        <View>
          <Text style={styles.announcementTitle}>Announcement History</Text>
          <Text style={styles.announcementSubtitle}>
            3 announcements sent this month
          </Text>
        </View>

        <ChevronRight color={colors.primaryText} size={rs(20)} strokeWidth={2.2} />
      </View>
    </View>
  );
};

const SettingIcon = ({ type }: { type: SettingItem['icon'] }) => {
  const color = colors.slateText;
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

          <Text numberOfLines={1} style={styles.simpleTitle}>{item.title}</Text>

          {item.type === 'switch' ? (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{ false: colors.inputBorder, true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          ) : (
            <>
              <Text numberOfLines={1} style={styles.grayValue}>{item.value}</Text>
              <ChevronRight color={colors.primaryText} size={rs(18)} strokeWidth={2.2} />
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const HelpIcon = ({ type }: { type: HelpInfo['icon'] }) => {
  const color = colors.slateText;
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

          <Text numberOfLines={1} style={styles.simpleTitle}>{item.title}</Text>

          {!!item.value && (
            <Text numberOfLines={1} style={[styles.grayValue, item.orange && styles.orangeText]}>
              {item.value}
            </Text>
          )}

          <ChevronRight color={colors.primaryText} size={rs(18)} strokeWidth={2.2} />
        </View>
      ))}
    </View>
  );
};

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

            Alert.alert('Logout failed', error?.message || 'Please try again.');
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
      <LogOut color={colors.dangerDark} size={rs(24)} strokeWidth={2.3} />
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
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load profile data';

      showErrorToast(errorMessage);

      setError(errorMessage);
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
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Text
          style={{
            color: colors.primaryText,
            fontSize: fs(16),
            fontFamily: fonts.extraBold,
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
            backgroundColor: colors.primary,
            paddingHorizontal: rs(28),
            paddingVertical: rs(14),
            borderRadius: rs(8),
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fs(14),
              fontFamily: fonts.extraBold,
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
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

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
    backgroundColor: colors.financeBackground,
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.financeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(70),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(28),
    paddingTop: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fs(28),
    fontFamily: fonts.extraBold,
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
    backgroundColor: colors.primary,
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
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: fs(54),
    fontFamily: fonts.extraBold,
    letterSpacing: rs(6),
  },
  cameraButton: {
    position: 'absolute',
    right: rs(10),
    bottom: rs(0),
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: colors.white,
    fontSize: fs(30),
    fontFamily: fonts.extraBold,
    marginTop: rs(14),
  },
  profileRole: {
    color: colors.white,
    fontSize: fs(15),
    fontFamily: fonts.semiBold,
    marginTop: rs(6),
  },
  platformPill: {
    minWidth: rs(230),
    minHeight: rs(36),
    borderRadius: rs(15),
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  platformText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.bold,
  },
  memberSince: {
    color: colors.white,
    fontSize: fs(15),
    fontFamily: fonts.medium,
    marginTop: rs(10),
  },
  twoColumnRow: {
    width: '100%',
  },
  halfCard: {
    width: FULL_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: colors.black,
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
    color: colors.text,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  detailRow: {
    minHeight: rs(56),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBox: {
    width: rs(38),
  },
  detailLabel: {
    width: rs(125),
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
  },
  detailValue: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  blueText: {
    color: colors.financeBlue,
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: colors.success,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginRight: rs(6),
  },
  logoBox: {
    width: rs(202),
    height: rs(132),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: rs(12),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(18),
  },
  logoMark: {
    color: colors.financeBlue,
    fontSize: fs(58),
    fontFamily: fonts.extraBold,
    lineHeight: fs(58),
  },
  logoText: {
    color: colors.primaryText,
    fontSize: fs(28),
    fontFamily: fonts.extraBold,
    marginTop: rs(4),
  },
  tapLogoText: {
    color: colors.slateText,
    fontSize: fs(13),
    textAlign: 'center',
    marginTop: rs(12),
  },
  uploadButton: {
    width: rs(220),
    minHeight: rs(42),
    borderWidth: 1,
    borderColor: colors.financeBlue,
    borderRadius: rs(4),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(12),
  },
  uploadButtonText: {
    color: colors.financeBlue,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  securityRow: {
    minHeight: rs(66),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityTextBox: {
    flex: 1,
    minWidth: 0,
    marginLeft: rs(14),
  },
  securityTitle: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  securitySubtitle: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
  },
  securityValue: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginRight: rs(10),
  },
  greenText: {
    color: colors.success,
  },
  loginRow: {
    minHeight: rs(72),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
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
    minWidth: 0,
  },
  loginDevice: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  loginLocation: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
  },
  loginRight: {
    alignItems: 'flex-end',
  },
  loginTime: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
  },
  redText: {
    color: colors.dangerDark,
  },
  reviewButton: {
    width: rs(78),
    height: rs(30),
    borderWidth: 1,
    borderColor: colors.financeBlue,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(12),
  },
  reviewText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  alertCard: {
    width: FULL_WIDTH,
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(14),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 3,
  },
  alertBox: {
    minHeight: rs(78),
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    backgroundColor: colors.superAdminAlertBg,
    borderRadius: rs(6),
    marginTop: rs(12),
    paddingHorizontal: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTextBox: {
    flex: 1,
    minWidth: 0,
    marginLeft: rs(14),
    paddingRight: rs(8),
  },
  alertTitle: {
    color: colors.profileOrange,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  alertSubtitle: {
    color: colors.slateText,
    fontSize: fs(11),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
  },
  blockButton: {
    width: rs(118),
    minHeight: rs(40),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  blockButtonText: {
    color: colors.dangerDark,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  emergencyLine: {
    position: 'absolute',
    left: 0,
    top: rs(0),
    bottom: rs(0),
    width: rs(4),
    backgroundColor: colors.dangerDark,
    borderTopLeftRadius: rs(8),
    borderBottomLeftRadius: rs(8),
  },
  emergencyNote: {
    color: colors.dangerDark,
    fontSize: fs(12),
    fontFamily: fonts.bold,
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
    minWidth: 0,
  },
  controlTitle: {
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  controlSubtitle: {
    color: colors.slateText,
    fontSize: fs(11),
    fontFamily: fonts.semiBold,
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
    fontFamily: fonts.extraBold,
  },
  adminRow: {
    minHeight: rs(78),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: rs(45),
    height: rs(45),
    borderRadius: rs(23),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  adminAvatarText: {
    color: colors.white,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
  },
  adminInfo: {
    flex: 1,
    minWidth: 0,
  },
  adminName: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  blueSmallText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginTop: rs(4),
  },
  activeBadge: {
    width: rs(78),
    minHeight: rs(34),
    borderRadius: rs(7),
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
    paddingHorizontal: rs(6),
  },
  activeBadgeText: {
    color: colors.success,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  manageButton: {
    width: rs(90),
    minHeight: rs(38),
    borderWidth: 1,
    borderColor: colors.financeBlue,
    borderRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(6),
  },
  manageText: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  addAdminCircle: {
    width: rs(45),
    height: rs(45),
    borderRadius: rs(23),
    backgroundColor: colors.superAdminAddAdminBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  addAdminText: {
    color: colors.financeBlue,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
  },
  adminSubtitle: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
  },
  simpleRow: {
    minHeight: rs(56),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleTitle: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  simpleValue: {
    color: colors.financeBlue,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginRight: rs(10),
  },
  grayValue: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    marginRight: rs(10),
  },
  orangeText: {
    color: colors.profileOrange,
  },
  broadcastButton: {
    minHeight: rs(46),
    borderWidth: 1,
    borderColor: colors.financeBlue,
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(16),
  },
  broadcastText: {
    color: colors.financeBlue,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
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
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  announcementSubtitle: {
    color: colors.slateText,
    fontSize: fs(12),
    marginTop: rs(6),
  },
  logoutButton: {
    minHeight: rs(52),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    borderRadius: rs(5),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(2),
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutText: {
    color: colors.dangerDark,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  footerText: {
    color: colors.slateText,
    textAlign: 'center',
    fontSize: fs(13),
    fontFamily: fonts.semiBold,
    marginTop: rs(10),
  },
});
