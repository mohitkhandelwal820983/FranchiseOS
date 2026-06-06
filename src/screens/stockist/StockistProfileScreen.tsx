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
import {
  BusinessInfoItem,
  PerformanceItem,
  SettingRow,
  StockistProfileData,
} from '../../api/mock/stockist/stockistProfile.mock';
import { getStockistProfile } from '../../api/stockist/stockistProfile.api';
import { clearAuthStorage } from '../../utils/sessionManager';
import { resetToLogin } from '../../navigation/navigationService';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size as rs, stockistProfileTextSize as fs } from '../../theme';

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

const ProfileHero = ({ data }: { data: StockistProfileData }) => {
  return (
    <View style={styles.heroCard}>
      <Image source={{ uri: data.profile.image }} style={styles.profileImage} />

      <View style={styles.heroInfo}>
        <Text style={styles.profileName}>{data.profile.name}</Text>
        <Text style={styles.profileRole}>{data.profile.role}</Text>

        <View style={styles.premiumBadge}>
          <ShieldCheck color={colors.white} size={rs(18)} strokeWidth={2.3} />
          <Text style={styles.premiumText}>{data.profile.badge}</Text>
        </View>
      </View>
    </View>
  );
};

const BusinessIcon = ({ type }: { type: BusinessInfoItem['icon'] }) => {
  const size = rs(20);

  if (type === 'business') {
    return <Building2 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'warehouse') {
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

const SectionIcon = ({ type }: { type: string }) => {
  const size = rs(21);

  if (type === 'business') {
    return <Building2 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'performance') {
    return <TrendingUp color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'warehouse') {
    return <Home color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'security') {
    return <ShieldCheck color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'notifications') {
    return <Bell color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'documents') {
    return <FileText color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'support') {
    return <Headphones color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  return <Grid2X2 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
};

const SmallIcon = ({ type }: { type: string }) => {
  const size = rs(20);

  if (type === 'warehouse') {
    return <Warehouse color={colors.purple} size={size} strokeWidth={2.2} />;
  }

  if (type === 'chart') {
    return <TrendingUp color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'location') {
    return <MapPin color={colors.profileOrange} size={size} strokeWidth={2.2} />;
  }

  if (type === 'clock') {
    return <Clock3 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'lock') {
    return <Lock color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'shield') {
    return <ShieldCheck color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'device') {
    return <Smartphone color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'history') {
    return <Clock3 color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'orders') {
    return <Boxes color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'payment') {
    return <WalletCards color={colors.dangerDark} size={size} strokeWidth={2.2} />;
  }

  if (type === 'stock') {
    return <Boxes color={colors.stockistBrown} size={size} strokeWidth={2.2} />;
  }

  if (type === 'dealers') {
    return <Users color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'gst') {
    return <FileText color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'pan') {
    return <KeyRound color={colors.financeBlue} size={size} strokeWidth={2.2} />;
  }

  if (type === 'bank') {
    return <Building2 color={colors.purple} size={size} strokeWidth={2.2} />;
  }

  if (type === 'license') {
    return <FileText color={colors.profileOrange} size={size} strokeWidth={2.2} />;
  }

  if (type === 'help') {
    return <CircleHelp color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'ticket') {
    return <Edit3 color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'chat') {
    return <MessageSquareText color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'privacy') {
    return <ShieldCheck color={colors.success} size={size} strokeWidth={2.2} />;
  }

  if (type === 'dark') {
    return <Moon color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  if (type === 'language') {
    return <Globe2 color={colors.slateText} size={size} strokeWidth={2.2} />;
  }

  return <Grid2X2 color={colors.slateText} size={size} strokeWidth={2.2} />;
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

          <ChevronRight color={colors.slateText} size={rs(19)} strokeWidth={2.2} />
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
    <View style={styles.settingFullCard}>
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
              trackColor={{ false: colors.switchTrackOff, true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          )}

          {item.type === 'arrow' && (
            <ChevronRight color={colors.slateText} size={rs(18)} strokeWidth={2.2} />
          )}

          {item.type === 'download' && (
            <Download color={colors.financeBlue} size={rs(20)} strokeWidth={2.3} />
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

const StockistProfileScreen = () => {
  const [data, setData] = useState<StockistProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await getStockistProfile();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load stockist profile. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const cardRows = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
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
        <ProfileHero data={data} />

        <BusinessInformationCard items={data.businessInfo} />

        <PerformanceSummaryCard items={data.performance} />

        {cardRows.map(card => (
          <SettingsCard
            key={card.title}
            title={card.title}
            icon={card.icon}
            items={card.items}
          />
        ))}

        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockistProfileScreen;

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
    paddingTop: rs(20),
    paddingBottom: rs(110),
  },
  heroCard: {
    minHeight: rs(224),
    backgroundColor: colors.primary,
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
    borderColor: colors.white,
    marginRight: rs(34),
    backgroundColor: colors.inputBorder,
  },
  heroInfo: {
    flex: 1,
  },
  profileName: {
    color: colors.white,
    fontSize: fs(30),
    fontFamily: fonts.extraBold,
    marginBottom: rs(14),
  },
  profileRole: {
    color: colors.white,
    fontSize: fs(18),
    fontFamily: fonts.bold,
    marginBottom: rs(22),
  },
  premiumBadge: {
    height: rs(38),
    minWidth: rs(210),
    alignSelf: 'flex-start',
    borderRadius: rs(5),
    backgroundColor: colors.stockistProfileBadgeBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(16),
  },
  premiumText: {
    color: colors.white,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
  fullCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingHorizontal: rs(22),
    paddingVertical: rs(16),
    marginBottom: rs(16),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  settingFullCard: {
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
  rowIconSoft: {
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
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  businessValue: {
    flex: 1,
    color: colors.stockistProfileValueText,
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
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
    backgroundColor: colors.stockistProfileIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(12),
  },
  performanceValue: {
    color: colors.primaryText,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
    marginBottom: rs(6),
  },
  performanceLabel: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.bold,
    textAlign: 'center',
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
  smallIconSoft: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: colors.dealerBlueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
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
    height: rs(48),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(6),
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
