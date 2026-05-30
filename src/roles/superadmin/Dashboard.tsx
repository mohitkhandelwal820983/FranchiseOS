import { ScrollView, Text, View } from 'react-native';
import { commonStyle } from '../../common/CommonStyle';
import { colors } from '../../common/Colors';
import {
  Activity,
  Bell,
  Building2,
  Calendar,
  Clock,
  Folder,
  Headset,
  Megaphone,
  Menu,
  Moon,
  Plus,
  TriangleAlert,
} from 'lucide-react-native';
import AlertCard from '../../components/AlertCard';
import CompanyCard, { COMPANY_STATUS } from '../../components/CompnayCard';
import SystemHealthCard from '../../components/SystemHealthCard';
import PlatformRevenueCard from '../../components/PlatformRevenueCard';

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
              marginTop: 16,
            }}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
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

            <View style={{ flex: 1, marginLeft: 8 }}>
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
              marginTop: 16,
            }}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
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

            <View style={{ flex: 1, marginLeft: 8 }}>
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

           <View style={{marginTop:16}}>
            <SystemHealthCard />
           </View>

          <View style={{marginTop:16}}>
             <PlatformRevenueCard />
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

          <CompanyCard
            initials="TC"
            companyName="TechCorp India"
            ownerName="Rajesh Sharma"
            location="Mumbai, Maharashtra"
            status={COMPANY_STATUS.ACTIVE}
            plan="Professional"
            addedText="Added 2 days ago"
          />

          <CompanyCard
            initials="RI"
            companyName="Reliance Industries"
            ownerName="Amit Shah"
            location="Delhi, NCR"
            status={COMPANY_STATUS.ACTIVE}
            plan="Enterprise"
            addedText="Added 5 days ago"
          />

          <CompanyCard
            initials="AB"
            companyName="ABC Distributors"
            ownerName="Priya Patel"
            location="Pune, Maharashtra"
            status={COMPANY_STATUS.PENDING}
            plan="Basic"
            addedText="Added 1 week ago"
          />

          <CompanyCard
            initials="XY"
            companyName="XYZ Traders"
            ownerName="Vikas Gupta"
            location="Jaipur, Rajasthan"
            status={COMPANY_STATUS.SUSPENDED}
            plan="Enterprise"
            addedText="Added 3 months ago"
          />

          <CompanyCard
            initials="MN"
            companyName="MN Enterprises"
            ownerName="Neha Sharma"
            location="Bangalore, Karnataka"
            status={COMPANY_STATUS.INACTIVE}
            plan="Professional"
            addedText="Added 2 weeks ago"
          />

          <Text
            style={[
              commonStyle.semiBold,
              { fontSize: 13, color: colors.black, marginTop: 16 },
            ]}
          >
            Broadcast Message
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 5,
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
              borderColor: colors.skyBlue,
            }}
          >
            <Megaphone size={24} color={colors.skyBlue} />
            <Text
              style={[
                commonStyle.medium,
                { fontSize: 9, color: colors.skyBlue },
              ]}
            >
              Send Announcement to All Companies
            </Text>
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
          flex: 1,
          minHeight: 120,
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
          flexShrink: 0,
        }}
      >
        <Icon size={30} color={iconColor} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text
          numberOfLines={2}
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
              marginVertical: 2,
            },
          ]}
        >
          {value}
        </Text>

        <Text
          numberOfLines={1}
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
