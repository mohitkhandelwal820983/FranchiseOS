import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors, fonts, size as themeSize, textSize} from '../../theme';

import {
  Bell,
  Building2,
  Camera,
  ChevronRight,
  CircleHelp,
  Clock3,
  Edit3,
  FileText,
  Headphones,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Shield,
  Smartphone,
  User,
  CheckCircle2,
  Plus,
  Laptop,
} from 'lucide-react-native';
import {
  BusinessDetail,
  CommissionRule,
  CompanyProfileData,
  DocumentItem,
  HelpItem,
  NotificationItem,
  SecurityItem,
  TargetItem,
} from '../../api/mock/company/companyProfile.mock';
import { getCompanyProfile } from '../../api/company/companyProfile.api';
import { clearAuthStorage } from '../../utils/sessionManager';
import { resetToLogin } from '../../navigation/navigationService';
import { showErrorToast } from '../../utils/toast';


const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Text style={styles.headerTitle}>Company Profile</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.headerEditButton}>
        <Edit3 color={colors.white} size={themeSize(32)} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileHero = ({ data }: { data: CompanyProfileData }) => {
  return (
    <View style={styles.profileHero}>
      <View style={styles.logoWrap}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>{data.company.initials}</Text>
        </View>

        <View style={styles.cameraButton}>
          <Camera color={colors.financeBlue} size={themeSize(22)} strokeWidth={2.3} />
        </View>
      </View>

      <Text style={styles.companyName}>{data.company.name}</Text>
      <Text style={styles.companyRole}>{data.company.role}</Text>

      <View style={styles.badgeRow}>
        <View style={styles.statusPill}>
          <View style={styles.greenDot} />
          <Text style={styles.statusPillText}>{data.company.status}</Text>
        </View>

        <View style={styles.planPill}>
          <Text style={styles.planPillText}>Plan: {data.company.plan}</Text>
        </View>
      </View>

      <Text style={styles.memberSince}>
        Member since: {data.company.memberSince}
      </Text>
    </View>
  );
};

const DetailIcon = ({ type }: { type: BusinessDetail['icon'] }) => {
  const color = colors.slateText;
  const size = themeSize(22);

  if (type === 'company') {
    return <Building2 color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'owner') {
    return <User color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'email') {
    return <Mail color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'phone') {
    return <Phone color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'location') {
    return <MapPin color={color} size={size} strokeWidth={2} />;
  }

  return <FileText color={color} size={size} strokeWidth={2} />;
};

const SectionHeader = ({
  title,
  action,
  edit,
}: {
  title: string;
  action?: string;
  edit?: boolean;
}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action ? (
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.sectionActionText}>{action}</Text>
        </TouchableOpacity>
      ) : null}

      {edit ? (
        <TouchableOpacity activeOpacity={0.8}>
          <Edit3 color={colors.financeBlue} size={themeSize(20)} strokeWidth={2.2} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const BusinessDetailsCard = ({ details }: { details: BusinessDetail[] }) => {
  return (
    <View style={styles.fullCard}>
      <SectionHeader title="Business Details" edit />

      {details.map(item => (
        <View key={item.id} style={styles.businessRow}>
          <View style={styles.businessIcon}>
            <DetailIcon type={item.icon} />
          </View>

          <Text style={styles.businessLabel}>{item.label}</Text>

          <Text style={styles.businessValue}>{item.value}</Text>

          {item.verified ? (
            <View style={styles.verifiedWrap}>
              <Text style={styles.verifiedText}>Verified</Text>
              <CheckCircle2
                color={colors.success}
                size={themeSize(17)}
                fill={colors.success}
                strokeWidth={2}
              />
            </View>
          ) : (
            <View style={styles.verifiedPlaceholder} />
          )}
        </View>
      ))}
    </View>
  );
};

const CommissionRulesCard = ({ rules }: { rules: CommissionRule[] }) => {
  return (
    <View style={styles.halfCard}>
      <SectionHeader title="Commission Rules" action="Manage" />

      {rules.map(item => (
        <View key={item.id} style={styles.ruleRow}>
          <View style={styles.ruleTextBox}>
            <Text style={styles.ruleCategory}>{item.category}</Text>
            <Text style={styles.ruleSubText}>
              {item.stockist} | {item.dealer}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <Edit3 color={colors.slateText} size={themeSize(18)} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity activeOpacity={0.8} style={styles.addRuleButton}>
        <Plus color={colors.financeBlue} size={themeSize(18)} strokeWidth={2.4} />
        <Text style={styles.addRuleText}>Add New Rule</Text>
      </TouchableOpacity>
    </View>
  );
};

const NetworkTargetsCard = ({ targets }: { targets: TargetItem[] }) => {
  return (
    <View style={styles.halfCard}>
      <SectionHeader title="Network Targets" edit />

      {targets.map(item => (
        <View key={item.id} style={styles.targetRow}>
          <Text style={styles.targetLabel}>{item.label}</Text>
          <Text style={styles.targetValue}>{item.value}</Text>
        </View>
      ))}

      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.setTargetText}>Set Individual Targets</Text>
      </TouchableOpacity>
    </View>
  );
};

const PlanCard = ({ plan }: { plan: CompanyProfileData['plan'] }) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.sectionTitle}>Your Plan</Text>

      <View style={styles.planCardInner}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>{plan.price}</Text>
        <Text style={styles.renewalText}>{plan.renewal}</Text>

        <View style={styles.planButtonRow}>
          <View style={styles.activePlanBadge}>
            <Text style={styles.activePlanText}>{plan.status}</Text>
            <CheckCircle2
              color={colors.success}
              size={themeSize(15)}
              fill={colors.success}
              strokeWidth={2}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.viewPlanButton}>
            <Text style={styles.viewPlanText}>View Plan Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DocumentsCard = ({ documents }: { documents: DocumentItem[] }) => {
  return (
    <View style={styles.halfCard}>
      <Text style={styles.sectionTitle}>Uploaded Documents</Text>

      <View style={styles.documentList}>
        {documents.map(item => (
          <View key={item.id} style={styles.documentRow}>
            <CheckCircle2
              color={colors.success}
              size={themeSize(20)}
              fill={colors.success}
              strokeWidth={2}
            />

            <Text style={styles.documentName}>{item.name}</Text>

            <Text style={styles.documentVerified}>Verified</Text>

            <CheckCircle2
              color={colors.success}
              size={themeSize(17)}
              fill={colors.success}
              strokeWidth={2}
            />

            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.documentView}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const SecurityIcon = ({ type }: { type: SecurityItem['icon'] }) => {
  const color = colors.slateText;
  const size = themeSize(20);

  if (type === 'password') {
    return <Lock color={color} size={size} strokeWidth={2} />;
  }

  if (type === '2fa') {
    return <Shield color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'otp') {
    return <Smartphone color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'sessions') {
    return <Laptop color={color} size={size} strokeWidth={2} />;
  }

  return <Clock3 color={color} size={size} strokeWidth={2} />;
};

const AccountSecurityCard = ({ items }: { items: SecurityItem[] }) => {
  const [securityItems, setSecurityItems] = useState(items);

  const toggleSecurity = (id: string) => {
    setSecurityItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <Text style={styles.sectionTitle}>Account Security</Text>

      {securityItems.map(item => (
        <View key={item.id} style={styles.settingRow}>
          <SecurityIcon type={item.icon} />

          <Text style={styles.settingTitle}>{item.title}</Text>

          {item.type === 'switch' ? (
            <Switch
              value={!!item.enabled}
              onValueChange={() => toggleSecurity(item.id)}
              trackColor={{ false: colors.inputBorder, true: colors.financeBlue }}
              thumbColor={colors.white}
            />
          ) : (
            <ChevronRight color={colors.primaryText} size={themeSize(19)} strokeWidth={2.2} />
          )}
        </View>
      ))}
    </View>
  );
};

const AlertsCard = ({ items }: { items: NotificationItem[] }) => {
  const [notifications, setNotifications] = useState(items);

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <View style={styles.halfCard}>
      <Text style={styles.sectionTitle}>Alerts & Notifications</Text>

      {notifications.map(item => (
        <View key={item.id} style={styles.settingRow}>
          <Bell color={colors.slateText} size={themeSize(20)} strokeWidth={2} />

          <Text style={styles.settingTitle}>{item.title}</Text>

          <Switch
            value={item.enabled}
            onValueChange={() => toggleNotification(item.id)}
            trackColor={{ false: colors.inputBorder, true: colors.financeBlue }}
            thumbColor={colors.white}
          />
        </View>
      ))}
    </View>
  );
};

const HelpIcon = ({ type }: { type: HelpItem['icon'] }) => {
  const color = colors.slateText;
  const size = themeSize(18);

  if (type === 'ticket') {
    return <MessageSquareText color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'docs') {
    return <CircleHelp color={color} size={size} strokeWidth={2} />;
  }

  if (type === 'contact') {
    return <Headphones color={color} size={size} strokeWidth={2} />;
  }

  return <Clock3 color={color} size={size} strokeWidth={2} />;
};

const HelpCard = ({ items }: { items: HelpItem[] }) => {
  return (
    <View style={styles.fullCard}>
      <Text style={styles.sectionTitle}>Help</Text>

      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.helpRow}
        >
          <HelpIcon type={item.icon} />

          <Text style={styles.helpTitle}>{item.title}</Text>

          {item.subtitle ? (
            <Text
              style={[
                styles.helpSubtitle,
                item.title === 'Support Tickets' && styles.openTicketText,
              ]}
            >
              {item.subtitle}
            </Text>
          ) : null}

          {item.arrow ? (
            <ChevronRight color={colors.primaryText} size={themeSize(18)} strokeWidth={2.2} />
          ) : null}
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
      activeOpacity={0.8}
      style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
      disabled={isLoggingOut}
      onPress={handleLogout}
    >
      <LogOut color={colors.dangerDark} size={themeSize(24)} strokeWidth={2.3} />
      <Text style={styles.logoutText}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </Text>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const [data, setData] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getCompanyProfile();

      setData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to load company profile';

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
            fontSize: textSize(18),
            fontFamily: fonts.bold,
            marginBottom: themeSize(18),
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
            paddingHorizontal: themeSize(28),
            paddingVertical: themeSize(14),
            borderRadius: themeSize(8),
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: textSize(14),
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

        <BusinessDetailsCard details={data.businessDetails} />

        <View style={styles.twoColumnRow}>
          <CommissionRulesCard rules={data.commissionRules} />
          <NetworkTargetsCard targets={data.networkTargets} />
        </View>

        <View style={styles.twoColumnRow}>
          <PlanCard plan={data.plan} />
          <DocumentsCard documents={data.documents} />
        </View>

        <View style={styles.twoColumnRow}>
          <AccountSecurityCard items={data.security} />
          <AlertsCard items={data.notifications} />
        </View>

        <HelpCard items={data.help} />

        <LogoutButton />

        <Text style={styles.footerText}>{data.footerText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const PAGE_PADDING = themeSize(22);

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
    height: themeSize(74),
    backgroundColor: colors.primary,
    paddingHorizontal: themeSize(28),
    paddingTop: themeSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: themeSize(32),
  },
  headerEditButton: {
    width: themeSize(32),
    height: themeSize(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: textSize(27),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: themeSize(20),
    paddingBottom: themeSize(34),
  },
  profileHero: {
    minHeight: themeSize(335),
    backgroundColor: colors.primary,
    borderRadius: themeSize(8),
    alignItems: 'center',
    paddingVertical: themeSize(18),
    marginBottom: themeSize(14),
  },
  logoWrap: {
    width: themeSize(164),
    height: themeSize(142),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: themeSize(152),
    height: themeSize(142),
    borderRadius: themeSize(20),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.primaryText,
    fontSize: textSize(74),
    fontFamily: fonts.extraBold,
    letterSpacing: themeSize(2),
  },
  cameraButton: {
    position: 'absolute',
    right: themeSize(0),
    bottom: themeSize(0),
    width: themeSize(38),
    height: themeSize(38),
    borderRadius: themeSize(19),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    color: colors.white,
    fontSize: textSize(33),
    lineHeight: themeSize(39),
    fontFamily: fonts.extraBold,
    marginTop: themeSize(10),
  },
  companyRole: {
    color: colors.white,
    fontSize: textSize(17),
    lineHeight: themeSize(23),
    fontFamily: fonts.medium,
    marginTop: themeSize(8),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: themeSize(16),
  },
  statusPill: {
    minWidth: themeSize(105),
    height: themeSize(36),
    borderRadius: themeSize(18),
    borderWidth: 1,
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: themeSize(16),
  },
  greenDot: {
    width: themeSize(12),
    height: themeSize(12),
    borderRadius: themeSize(6),
    backgroundColor: colors.activeGreen,
    marginRight: themeSize(10),
  },
  statusPillText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.bold,
  },
  planPill: {
    minWidth: themeSize(158),
    height: themeSize(36),
    borderRadius: themeSize(18),
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planPillText: {
    color: colors.white,
    fontSize: textSize(15),
    fontFamily: fonts.bold,
  },
  memberSince: {
    color: colors.white,
    fontSize: textSize(16),
    fontFamily: fonts.medium,
    marginTop: themeSize(12),
  },
  fullCard: {
    backgroundColor: colors.white,
    borderRadius: themeSize(8),
    paddingHorizontal: themeSize(22),
    paddingVertical: themeSize(16),
    marginBottom: themeSize(10),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: themeSize(10),
    shadowOffset: { width: 0, height: themeSize(4) },
    elevation: 3,
  },
  halfCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: themeSize(8),
    paddingHorizontal: themeSize(16),
    paddingVertical: themeSize(14),
    marginBottom: themeSize(10),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: themeSize(10),
    shadowOffset: { width: 0, height: themeSize(4) },
    elevation: 3,
  },
  twoColumnRow: {
    flexDirection: 'column',
  },
  sectionHeader: {
    height: themeSize(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: themeSize(8),
  },
  sectionTitle: {
    color: colors.text,
    fontSize: textSize(18),
    lineHeight: themeSize(25),
    fontFamily: fonts.extraBold,
  },
  sectionActionText: {
    color: colors.financeBlue,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
  },
  businessRow: {
    minHeight: themeSize(44),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: themeSize(6),
  },
  businessIcon: {
    width: themeSize(30),
  },
  businessLabel: {
    width: themeSize(205),
    color: colors.slateText,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.semiBold,
  },
  businessValue: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(15),
    lineHeight: themeSize(22),
    fontFamily: fonts.extraBold,
  },
  verifiedWrap: {
    width: themeSize(110),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  verifiedPlaceholder: {
    width: themeSize(110),
  },
  verifiedText: {
    color: colors.success,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
    marginRight: themeSize(8),
  },
  ruleRow: {
    minHeight: themeSize(62),
    borderWidth: 1,
    borderColor: colors.financeDivider,
    borderRadius: themeSize(6),
    paddingHorizontal: themeSize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleTextBox: {
    flex: 1,
  },
  ruleCategory: {
    color: colors.text,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.extraBold,
  },
  ruleSubText: {
    color: colors.slateText,
    fontSize: textSize(12),
    lineHeight: themeSize(19),
    fontFamily: fonts.semiBold,
    marginTop: themeSize(2),
  },
  addRuleButton: {
    height: themeSize(36),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRuleText: {
    color: colors.financeBlue,
    fontSize: textSize(15),
    fontFamily: fonts.extraBold,
    marginLeft: themeSize(6),
  },
  targetRow: {
    minHeight: themeSize(56),
    borderBottomWidth: 1,
    borderBottomColor: colors.financeDivider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetLabel: {
    color: colors.text,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.bold,
  },
  targetValue: {
    color: colors.text,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.extraBold,
  },
  setTargetText: {
    color: colors.financeBlue,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    textAlign: 'center',
    marginTop: themeSize(14),
  },
  planCardInner: {
    marginTop: themeSize(10),
    backgroundColor: colors.profilePlanBlue,
    borderRadius: themeSize(6),
    paddingHorizontal: themeSize(18),
    paddingVertical: themeSize(14),
  },
  planName: {
    color: colors.white,
    fontSize: textSize(22),
    fontFamily: fonts.extraBold,
  },
  planPrice: {
    color: colors.white,
    fontSize: textSize(16),
    fontFamily: fonts.bold,
    marginTop: themeSize(6),
  },
  renewalText: {
    color: colors.white,
    fontSize: textSize(13),
    fontFamily: fonts.medium,
    marginTop: themeSize(6),
  },
  planButtonRow: {
    marginTop: themeSize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activePlanBadge: {
    minWidth: themeSize(96),
    height: themeSize(34),
    borderRadius: themeSize(4),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlanText: {
    color: colors.success,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
    marginRight: themeSize(6),
  },
  viewPlanButton: {
    minWidth: themeSize(156),
    height: themeSize(34),
    borderRadius: themeSize(4),
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPlanText: {
    color: colors.white,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
  },
  documentList: {
    marginTop: themeSize(12),
  },
  documentRow: {
    minHeight: themeSize(56),
    borderWidth: 1,
    borderColor: colors.financeDivider,
    borderRadius: themeSize(6),
    paddingHorizontal: themeSize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentName: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(14),
    fontFamily: fonts.extraBold,
    marginLeft: themeSize(10),
  },
  documentVerified: {
    color: colors.success,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
    marginRight: themeSize(8),
  },
  documentView: {
    color: colors.financeBlue,
    fontSize: textSize(13),
    fontFamily: fonts.extraBold,
    marginLeft: themeSize(22),
  },
  settingRow: {
    minHeight: themeSize(46),
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    flex: 1,
    color: colors.text,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.bold,
    marginLeft: themeSize(14),
  },
  helpRow: {
    minHeight: themeSize(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpTitle: {
    color: colors.text,
    fontSize: textSize(14),
    lineHeight: themeSize(21),
    fontFamily: fonts.bold,
    marginLeft: themeSize(14),
  },
  helpSubtitle: {
    flex: 1,
    color: colors.slateText,
    fontSize: textSize(14),
    fontFamily: fonts.bold,
    marginLeft: themeSize(8),
  },
  openTicketText: {
    color: colors.profileOrange,
  },
  logoutButton: {
    height: themeSize(46),
    borderRadius: themeSize(5),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: themeSize(8),
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutText: {
    color: colors.dangerDark,
    fontSize: textSize(17),
    fontFamily: fonts.extraBold,
    marginLeft: themeSize(12),
  },
  footerText: {
    color: colors.slateText,
    fontSize: textSize(13),
    lineHeight: themeSize(19),
    fontFamily: fonts.semiBold,
    textAlign: 'center',
    marginTop: themeSize(12),
  },
});
