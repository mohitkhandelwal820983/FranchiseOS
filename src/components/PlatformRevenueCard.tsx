import { View, Text } from 'react-native';
import { Info } from 'lucide-react-native';
import { commonStyle } from '../common/CommonStyle';
import { colors } from '../common/Colors';

interface PlatformRevenueCardProps {
  totalMTD?: number;
  collected?: number;
  due?: number;
  overdue?: number;
}

const PlatformRevenueCard = ({
  totalMTD = 240000,
  collected = 180000,
  due = 60000,
  overdue = 0,
}: PlatformRevenueCardProps) => {
  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)},${(value % 1000)
      .toString()
      .padStart(3, '0')}`;
  };

  return (
    <View
      style={[
        commonStyle.shadow,
        {
          flex: 1,
          padding: 16,
          backgroundColor: colors.white,
          borderRadius: 10,
          gap: 12,
        },
      ]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight:8
        }}
      >
        <Text
          style={[
            commonStyle.semiBold,
            {
              fontSize: 13,
              color: colors.black,
            },
          ]}
        >
          Your Platform Revenue
        </Text>
        <Info size={18} color={colors.skyBlue} />
      </View>

      {/* Info Text */}
      <Text
        style={[
          commonStyle.regular,
          {
            fontSize: 10,
            color: colors.textGray,
            lineHeight: 13,
          },
        ]}
      >
        This is FranchiseOS earnings only — not company business revenue
      </Text>

      {/* MTD Label */}
      <Text
        style={[
          commonStyle.regular,
          {
            fontSize: 11,
            color: colors.textGray,
            marginTop: 4,
          },
        ]}
      >
        Total Subscriptions MTD
      </Text>

      {/* Total Amount */}
      <Text
        style={[
          commonStyle.semiBold,
          {
            fontSize: 28,
            color: colors.skyBlue,
            marginVertical: 2,
          },
        ]}
      >
        {formatCurrency(totalMTD)}
      </Text>

      {/* Status Cards */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginTop: 8,
        }}
      >
        {/* Collected */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#EEF9EF',
            borderRadius: 8,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize:8,
                color: '#22C55E',
                marginBottom: 4,
              },
            ]}
          >
            Collected
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 9,
                color: '#22C55E',
              },
            ]}
          >
            {formatCurrency(collected)}
          </Text>
        </View>

        {/* Due */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FEF3E2',
            borderRadius: 4,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 8,
                color: '#FD7A07',
                marginBottom: 4,
              },
            ]}
          >
            Due
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 9,
                color: '#FD7A07',
              },
            ]}
          >
            {formatCurrency(due)}
          </Text>
        </View>

        {/* Overdue */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FEE8E8',
            borderRadius: 8,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 8,
                color: '#E70816',
                marginBottom: 4,
              },
            ]}
          >
            Overdue
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 9,
                color: '#E70816',
              },
            ]}
          >
            {formatCurrency(overdue)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PlatformRevenueCard;
