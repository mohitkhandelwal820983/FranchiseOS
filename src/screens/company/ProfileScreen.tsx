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
import { SafeAreaView } from 'react-native-safe-area-context';

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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Text style={styles.headerTitle}>Company Profile</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.headerEditButton}>
        <Edit3 color="#FFFFFF" size={rs(32)} strokeWidth={2.2} />
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
          <Camera color="#173CFF" size={rs(22)} strokeWidth={2.3} />
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
  const color = '#5D607E';
  const size = rs(22);

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
          <Edit3 color="#173CFF" size={rs(20)} strokeWidth={2.2} />
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
                color="#138A36"
                size={rs(17)}
                fill="#138A36"
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
            <Edit3 color="#5D607E" size={rs(18)} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity activeOpacity={0.8} style={styles.addRuleButton}>
        <Plus color="#173CFF" size={rs(18)} strokeWidth={2.4} />
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
              color="#138A36"
              size={rs(15)}
              fill="#138A36"
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
              color="#138A36"
              size={rs(20)}
              fill="#138A36"
              strokeWidth={2}
            />

            <Text style={styles.documentName}>{item.name}</Text>

            <Text style={styles.documentVerified}>Verified</Text>

            <CheckCircle2
              color="#138A36"
              size={rs(17)}
              fill="#138A36"
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
  const color = '#5D607E';
  const size = rs(20);

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
              trackColor={{ false: '#D9DCE8', true: '#173CFF' }}
              thumbColor="#FFFFFF"
            />
          ) : (
            <ChevronRight color="#061247" size={rs(19)} strokeWidth={2.2} />
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
          <Bell color="#5D607E" size={rs(20)} strokeWidth={2} />

          <Text style={styles.settingTitle}>{item.title}</Text>

          <Switch
            value={item.enabled}
            onValueChange={() => toggleNotification(item.id)}
            trackColor={{ false: '#D9DCE8', true: '#173CFF' }}
            thumbColor="#FFFFFF"
          />
        </View>
      ))}
    </View>
  );
};

const HelpIcon = ({ type }: { type: HelpItem['icon'] }) => {
  const color = '#5D607E';
  const size = rs(18);

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
            <ChevronRight color="#061247" size={rs(18)} strokeWidth={2.2} />
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
      <LogOut color="#E00014" size={rs(24)} strokeWidth={2.3} />
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
            fontSize: fs(18),
            fontWeight: '700',
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

const PAGE_PADDING = rs(22);

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
    height: rs(74),
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
  headerEditButton: {
    width: rs(32),
    height: rs(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(27),
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(20),
    paddingBottom: rs(34),
  },
  profileHero: {
    minHeight: rs(335),
    backgroundColor: '#061B66',
    borderRadius: rs(8),
    alignItems: 'center',
    paddingVertical: rs(18),
    marginBottom: rs(14),
  },
  logoWrap: {
    width: rs(164),
    height: rs(142),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: rs(152),
    height: rs(142),
    borderRadius: rs(20),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#061247',
    fontSize: fs(74),
    fontWeight: '900',
    letterSpacing: rs(2),
  },
  cameraButton: {
    position: 'absolute',
    right: rs(0),
    bottom: rs(0),
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    color: '#FFFFFF',
    fontSize: fs(33),
    lineHeight: rs(39),
    fontWeight: '800',
    marginTop: rs(10),
  },
  companyRole: {
    color: '#FFFFFF',
    fontSize: fs(17),
    lineHeight: rs(23),
    fontWeight: '500',
    marginTop: rs(8),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(16),
  },
  statusPill: {
    minWidth: rs(105),
    height: rs(36),
    borderRadius: rs(18),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(16),
  },
  greenDot: {
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#0AB72B',
    marginRight: rs(10),
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
  },
  planPill: {
    minWidth: rs(158),
    height: rs(36),
    borderRadius: rs(18),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planPillText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
  },
  memberSince: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '500',
    marginTop: rs(12),
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(22),
    paddingVertical: rs(16),
    marginBottom: rs(10),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 3,
  },
  halfCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(16),
    paddingVertical: rs(14),
    marginBottom: rs(10),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(10),
    shadowOffset: { width: 0, height: rs(4) },
    elevation: 3,
  },
  twoColumnRow: {
    flexDirection: 'column',
  },
  sectionHeader: {
    height: rs(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(8),
  },
  sectionTitle: {
    color: '#111327',
    fontSize: fs(18),
    lineHeight: rs(25),
    fontWeight: '900',
  },
  sectionActionText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '800',
  },
  businessRow: {
    minHeight: rs(44),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(6),
  },
  businessIcon: {
    width: rs(30),
  },
  businessLabel: {
    width: rs(205),
    color: '#5D607E',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '600',
  },
  businessValue: {
    flex: 1,
    color: '#111327',
    fontSize: fs(15),
    lineHeight: rs(22),
    fontWeight: '800',
  },
  verifiedWrap: {
    width: rs(110),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  verifiedPlaceholder: {
    width: rs(110),
  },
  verifiedText: {
    color: '#138A36',
    fontSize: fs(13),
    fontWeight: '800',
    marginRight: rs(8),
  },
  ruleRow: {
    minHeight: rs(62),
    borderWidth: 1,
    borderColor: '#EEF0F6',
    borderRadius: rs(6),
    paddingHorizontal: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleTextBox: {
    flex: 1,
  },
  ruleCategory: {
    color: '#111327',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '900',
  },
  ruleSubText: {
    color: '#5D607E',
    fontSize: fs(12),
    lineHeight: rs(19),
    fontWeight: '600',
    marginTop: rs(2),
  },
  addRuleButton: {
    height: rs(36),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRuleText: {
    color: '#173CFF',
    fontSize: fs(15),
    fontWeight: '800',
    marginLeft: rs(6),
  },
  targetRow: {
    minHeight: rs(56),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetLabel: {
    color: '#111327',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '700',
  },
  targetValue: {
    color: '#111327',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '800',
  },
  setTargetText: {
    color: '#173CFF',
    fontSize: fs(14),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: rs(14),
  },
  planCardInner: {
    marginTop: rs(10),
    backgroundColor: '#073DD4',
    borderRadius: rs(6),
    paddingHorizontal: rs(18),
    paddingVertical: rs(14),
  },
  planName: {
    color: '#FFFFFF',
    fontSize: fs(22),
    fontWeight: '900',
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '700',
    marginTop: rs(6),
  },
  renewalText: {
    color: '#FFFFFF',
    fontSize: fs(13),
    fontWeight: '500',
    marginTop: rs(6),
  },
  planButtonRow: {
    marginTop: rs(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activePlanBadge: {
    minWidth: rs(96),
    height: rs(34),
    borderRadius: rs(4),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlanText: {
    color: '#138A36',
    fontSize: fs(13),
    fontWeight: '900',
    marginRight: rs(6),
  },
  viewPlanButton: {
    minWidth: rs(156),
    height: rs(34),
    borderRadius: rs(4),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPlanText: {
    color: '#FFFFFF',
    fontSize: fs(13),
    fontWeight: '800',
  },
  documentList: {
    marginTop: rs(12),
  },
  documentRow: {
    minHeight: rs(56),
    borderWidth: 1,
    borderColor: '#EEF0F6',
    borderRadius: rs(6),
    paddingHorizontal: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentName: {
    flex: 1,
    color: '#111327',
    fontSize: fs(14),
    fontWeight: '800',
    marginLeft: rs(10),
  },
  documentVerified: {
    color: '#138A36',
    fontSize: fs(13),
    fontWeight: '800',
    marginRight: rs(8),
  },
  documentView: {
    color: '#173CFF',
    fontSize: fs(13),
    fontWeight: '800',
    marginLeft: rs(22),
  },
  settingRow: {
    minHeight: rs(46),
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    flex: 1,
    color: '#111327',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '700',
    marginLeft: rs(14),
  },
  helpRow: {
    minHeight: rs(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpTitle: {
    color: '#111327',
    fontSize: fs(14),
    lineHeight: rs(21),
    fontWeight: '700',
    marginLeft: rs(14),
  },
  helpSubtitle: {
    flex: 1,
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '700',
    marginLeft: rs(8),
  },
  openTicketText: {
    color: '#F06419',
  },
  logoutButton: {
    height: rs(46),
    borderRadius: rs(5),
    borderWidth: 1,
    borderColor: '#E00014',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  logoutButtonDisabled: {
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
    fontSize: fs(13),
    lineHeight: rs(19),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: rs(12),
  },
});
