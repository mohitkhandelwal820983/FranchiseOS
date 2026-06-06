import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, size as rs, textSize as fs } from '../../theme';

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
import { getDealerProfile } from '../../api/dealer/dealerProfile.api';
import { clearAuthStorage } from '../../utils/sessionManager';
import { resetToLogin } from '../../navigation/navigationService';
import { showErrorToast } from '../../utils/toast';


const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Text style={styles.headerTitle}>My Profile</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Edit3 color={colors.white} size={rs(32)} strokeWidth={2.3} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileHero = ({
  profile,
}: {
  profile: DealerProfileData['profile'];
}) => {
  return (
    <View style={styles.heroCard}>
      <Image source={{ uri: profile.image }} style={styles.profileImage} />

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

const CardTitle = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <View style={styles.cardTitleRow}>
      <View style={styles.titleIconBox}>
        <SectionIcon type={icon} />
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const SectionIcon = ({ type }: { type: string }) => {
  const size = rs(22);

  if (type === 'business') {
    return <Building2 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'performance') {
    return <TrendingUp color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'account') {
    return <SlidersHorizontal color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'documents') {
    return <FileText color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'support') {
    return <Headphones color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'achievements') {
    return <Trophy color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  return <SlidersHorizontal color={colors.financeBlue} size={size} strokeWidth={2.2} />;
};

const BusinessIcon = ({ type }: { type: BusinessInfoItem['icon'] }) => {
  const size = rs(19);

  if (type === 'business') {
    return <Building2 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'address') {
    return <MapPin color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'phone') {
    return <Phone color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'email') {
    return <Mail color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  return <CalendarDays color={colors.financeBlue} size={size} strokeWidth={2.2} />;
};

const RowIcon = ({ type }: { type: string }) => {
  const size = rs(20);

  if (type === 'lock') {
    return <Lock color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'shield') {
    return <ShieldCheck color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'device') {
    return <Smartphone color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'settings') {
    return <SlidersHorizontal color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'pan') {
    return <KeyRound color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'license') {
    return <FileText color={colors.profileOrange} size={size} strokeWidth={2.2} />;
  }

  if (type === 'bank') {
    return <Building2 color={colors.purple} size={size} strokeWidth={2.2} />;
  }

  if (type === 'help') {
    return <HelpCircle color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'ticket') {
    return <Edit3 color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'terms') {
    return <FileText color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'privacy') {
    return <ShieldCheck color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'reward') {
    return <Award color={colors.profileOrange} size={size} strokeWidth={2.2} />;
  }

  if (type === 'target') {
    return <Target color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'rank') {
    return <Trophy color={colors.profileOrange} size={size} strokeWidth={2.2} />;
  }

  if (type === 'dark') {
    return <Moon color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'language') {
    return <Globe2 color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'payment') {
    return <WalletCards color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  return <FileText color={colors.slateText} size={size} strokeWidth={2.2} />;
};

const BusinessInfoCard = ({ items }: { items: BusinessInfoItem[] }) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle title="Business Information" icon="business" />

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.businessRow}
        >
          <View style={styles.smallIconBox}>
            <BusinessIcon type={item.icon} />
          </View>

          <Text style={styles.businessLabel}>{item.label}</Text>

          <Text style={styles.businessValue}>{item.value}</Text>

          <ChevronRight color={colors.slateText} size={rs(18)} strokeWidth={2.2} />
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

  if (item.icon === 'customers') {
    return <Users color={item.color} size={size} strokeWidth={2.2} />;
  }

  if (item.icon === 'success') {
    return <TrendingUp color={item.color} size={size} strokeWidth={2.2} />;
  }

  return <ShieldCheck color={item.color} size={size} strokeWidth={2.2} />;
};

const BusinessPerformanceCard = ({ items }: { items: PerformanceItem[] }) => {
  return (
    <View style={styles.fullCard}>
      <CardTitle title="Business Performance" icon="performance" />

      <View style={styles.performanceRow}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.performanceItem}>
            <View
              style={[
                styles.performanceIconCircle,
                { backgroundColor: `${item.color}16` },
              ]}
            >
              <PerformanceIcon item={item} />
            </View>

            <Text style={styles.performanceLabel}>{item.label}</Text>
            <Text style={styles.performanceValue}>{item.value}</Text>
            <Text style={styles.performanceGrowth}>{item.growth}</Text>

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
  items: RowItem[];
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
      <CardTitle title={title} icon={icon} />

      {localItems.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.settingRow}
        >
          <View style={styles.smallIconBox}>
            <RowIcon type={item.icon} />
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
              trackColor={{ false: '#D0D3DA', true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          )}

          {item.type === 'download' && (
            <Download color={colors.financeBlue} size={rs(20)} strokeWidth={2.3} />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color={colors.slateText} size={rs(18)} strokeWidth={2.2} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const PreferencesCard = ({ items }: { items: RowItem[] }) => {
  const [localItems, setLocalItems] = useState(items);

  const toggle = (id: string) => {
    setLocalItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <View style={styles.fullCard}>
      <CardTitle title="Preferences" icon="preferences" />

      {localItems.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.preferenceRow}
        >
          <View style={styles.smallIconBox}>
            <RowIcon type={item.icon} />
          </View>

          <Text style={styles.settingLabel}>{item.label}</Text>

          {!!item.value && (
            <Text style={styles.settingValue}>{item.value}</Text>
          )}

          {item.type === 'switch' && (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggle(item.id)}
              trackColor={{ false: '#D0D3DA', true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color={colors.slateText} size={rs(18)} strokeWidth={2.2} />
          )}
        </TouchableOpacity>
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
      activeOpacity={0.85}
      disabled={isLoggingOut}
      onPress={handleLogout}
      style={[styles.logoutButton, isLoggingOut && styles.disabledButton]}
    >
      <LogOut color={colors.dangerDark} size={rs(24)} strokeWidth={2.4} />
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
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load dealer profile. Please try again.';

      showErrorToast(errorMessage);
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
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
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
    backgroundColor: colors.financeBackground,
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.financeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(78),
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontSize: fs(30),
    fontFamily: fonts.extraBold,
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
    backgroundColor: colors.primary,
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
    borderColor: colors.white,
    backgroundColor: colors.inputBorder,
    marginRight: rs(50),
  },
  heroInfo: {
    flex: 1,
  },
  profileName: {
    color: colors.white,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
    marginBottom: rs(14),
  },
  profileBusiness: {
    color: colors.white,
    fontSize: fs(20),
    fontFamily: fonts.bold,
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
    color: colors.white,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
    marginLeft: rs(10),
  },
  fullCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  halfCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(18),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
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
    backgroundColor: colors.dealerBlueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  cardTitle: {
    color: colors.primaryText,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
  },
  businessRow: {
    minHeight: rs(45),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIconBox: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: colors.dealerBlueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  businessLabel: {
    width: rs(350),
    color: colors.primaryText,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  businessValue: {
    flex: 1,
    color: '#252943',
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
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
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: rs(8),
  },
  performanceValue: {
    color: colors.primaryText,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
    marginBottom: rs(7),
  },
  performanceGrowth: {
    color: colors.success,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  performanceDivider: {
    position: 'absolute',
    right: 0,
    top: rs(5),
    bottom: rs(5),
    width: 1,
    backgroundColor: colors.financeDivider,
  },
  settingRow: {
    minHeight: rs(45),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceRow: {
    minHeight: rs(42),
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    color: colors.primaryText,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  settingValue: {
    color: colors.slateText,
    fontSize: fs(13),
    fontFamily: fonts.bold,
    marginRight: rs(10),
    textAlign: 'right',
  },
  greenValue: {
    color: colors.success,
  },
  logoutButton: {
    height: rs(50),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    borderRadius: rs(6),
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
});
