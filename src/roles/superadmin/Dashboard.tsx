import { ScrollView, Text, View } from 'react-native';
import { commonStyle } from '../../common/CommonStyle';
import { colors } from '../../common/Colors';
import {
  Activity,
  Bell,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Folder,
  Headset,
  MapPin,
  Menu,
  Moon,
  Plus,
  TriangleAlert,
} from 'lucide-react-native';
import AlertCard from '../../components/AlertCard';

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Menu size={24} color={colors.white} />
          <Text style={[commonStyle.semiBold, { fontSize: 16 }]}>
            Dashboard
          </Text>
          <Bell size={24} color={colors.white} />
        </View>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <View
            style={[
              commonStyle.shadow,
              {
                flexDirection: 'row',
                borderRadius: 8,
                marginTop: 8,
                backgroundColor: colors.white,
                overflow: 'hidden',
              },
            ]}
          >
            {/* Left Indicator */}
            <View
              style={{
                width: 6,
                backgroundColor: colors.skyBlue,
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 12,
              }}
            >
              <Text
                style={[
                  commonStyle.semiBold,
                  { fontSize: 13, color: colors.black },
                ]}
              >
                Welcome back, Super Admin 👋
              </Text>

              <Text
                style={[
                  commonStyle.regular,
                  { fontSize: 8, color: colors.textGray },
                ]}
              >
                Thursday, 21 May 2026
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                commonStyle.semiBold,
                { fontSize: 13, color: colors.black },
              ]}
            >
              Platform Overview
            </Text>
            <Text
              style={[
                commonStyle.semiBold,
                { fontSize: 10, color: colors.skyBlue },
              ]}
            >
              View All
            </Text>
          </View>

          <View style={{ marginTop: 16 }}>
            <DashboardStatCard
              Icon={Building2}
              iconColor={colors.skyBlue}
              iconBackgroundColor={colors.white}
              title="Total Companies"
              value="24"
              subtitle="On platform"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              columnGap: 16,
              marginTop: 16,
              alignItems: 'stretch',
            }}
          >
            <View style={{ flex: 1 }}>
              <DashboardStatCard
                Icon={Activity}
                iconColor="#22C55E"
                iconBackgroundColor="#EEF9EF"
                title="Active Today"
                value="18"
                subtitle="Companies"
                textColor="#0A7822"
              />
            </View>

            <View style={{ flex: 1 }}>
              <DashboardStatCard
                Icon={Calendar}
                iconColor="#3B82F6"
                iconBackgroundColor="#EBF1FE"
                title="Total Companies"
                value="24"
                subtitle="On platform"
                textColor="#0B37E7"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              columnGap: 16,
              marginTop: 16,
              alignItems: 'stretch',
            }}
          >
            <View style={{ flex: 1 }}>
              <DashboardStatCard
                Icon={Plus}
                iconColor="#22C55E"
                iconBackgroundColor="#EEF9EF"
                title="New This Month"
                value="3"
                subtitle="+3 added"
                textColor="#0A7822"
                subtitleColor="#219A3C"
              />
            </View>

            <View style={{ flex: 1 }}>
              <DashboardStatCard
                Icon={Moon}
                iconColor="#EF4444"
                iconBackgroundColor="#FEECED"
                title="Inactive 30 Days"
                value="2"
                subtitle="No activity"
                textColor="#E70816"
                subtitleColor="#E70816"
              />
            </View>
          </View>

          <View
            style={[
              commonStyle.shadow,
              {
                padding: 16,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginTop: 16,
              },
            ]}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={[
                  commonStyle.semiBold,
                  { fontSize: 13, color: colors.black },
                ]}
              >
                Needs Your Attention Today
              </Text>
              <View
                style={{
                  backgroundColor: '#E81717',
                  padding: 4,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[commonStyle.semiBold, { fontSize: 12 }]}>4</Text>
              </View>
            </View>

            <AlertCard
              Icon={TriangleAlert}
              title="ABC Corp subscription overdue"
              subtitle="3 days overdue"
              iconColor={colors.red}
              accentColor={colors.red}
              textColor={colors.red}
            />
            <AlertCard
              Icon={Clock}
              title="2 companies pending approval"
              subtitle="Waiting since yesterday"
              iconColor="#FD7A07"
              accentColor="#FF4F09"
              textColor={colors.textGray}
              buttonText="Review Now"
            />
            <AlertCard
              Icon={Folder}
              title="TechCorp onboarding 40% complete"
              subtitle="Setup incomplete"
              iconColor="#FD7A07"
              accentColor="#FC7907"
              textColor={colors.textGray}
              buttonText="Send Nudge"
            />
            <AlertCard
              Icon={Headset}
              title="5 support tickets open"
              subtitle="2 urgent"
              iconColor={colors.skyBlue}
              accentColor={colors.skyBlue}
              textColor={colors.red}
              buttonText="View Tickets"
            />
          </View>

          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                commonStyle.semiBold,
                { fontSize: 13, color: colors.black },
              ]}
            >
              Recent Companies
            </Text>
            <Text
              style={[
                commonStyle.semiBold,
                { fontSize: 10, color: colors.skyBlue },
              ]}
            >
              View All
            </Text>
          </View>

          <View
            style={[
              commonStyle.shadow,
              {
                padding: 16,
                marginTop: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.white,
              },
            ]}
          >
            {/* Left Section */}
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[commonStyle.medium, { fontSize: 15 }]}>TC</Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={[
                    commonStyle.medium,
                    { fontSize: 9, color: colors.black },
                  ]}
                >
                  TechCorp India
                </Text>

                <Text
                  style={[
                    commonStyle.regular,
                    { fontSize: 7, color: colors.textGray },
                  ]}
                >
                  Owner: Rajesh Sharma
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                  }}
                >
                  <MapPin size={10} color={colors.textGray} />

                  <Text
                    style={[
                      commonStyle.regular,
                      {
                        fontSize: 7,
                        color: colors.textGray,
                        marginLeft: 3,
                      },
                    ]}
                  >
                    Mumbai, Maharashtra
                  </Text>
                </View>
              </View>
            </View>

            {/* Right Section */}
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: 8,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 20,
                  backgroundColor: colors.backgroundGreen,
                }}
              >
                <Text
                  style={[
                    commonStyle.regular,
                    {
                      fontSize: 8,
                      color: colors.textGreen,
                    },
                  ]}
                >
                  Active
                </Text>
              </View>

              <Text
                style={[
                  commonStyle.medium,
                  {
                    fontSize: 6,
                    color: colors.skyBlue,
                    marginTop: 3,
                  },
                ]}
              >
                Plan: Professional
              </Text>

              <Text
                style={[
                  commonStyle.regular,
                  {
                    fontSize: 6,
                    color: colors.textGray,
                  },
                ]}
              >
                Added 2 days ago
              </Text>
            </View>

            {/* Arrow */}
            <ChevronRight size={18} color={colors.textGray} />
          </View>
          
        </View>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const DashboardStatCard = ({
  Icon,
  iconColor,
  iconBackgroundColor,
  title,
  value,
  subtitle,
  textColor = colors.black,
  subtitleColor = colors.textGray,
}: any) => {
  return (
    <View
      style={[
        commonStyle.shadow,
        {
          minHeight: 120, // Add this
          padding: 16,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
        },
      ]}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          backgroundColor: iconBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        <Icon size={30} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            commonStyle.regular,
            {
              fontSize: 11,
              color: colors.textGray,
              lineHeight: 14,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            commonStyle.semiBold,
            {
              fontSize: 27,
              color: textColor,
              lineHeight: 30,
            },
          ]}
        >
          {value}
        </Text>

        <Text
          style={[
            commonStyle.regular,
            {
              fontSize: 11,
              color: subtitleColor,
              lineHeight: 14,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
