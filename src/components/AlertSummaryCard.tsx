import { View, Text } from 'react-native';
import { commonStyle } from '../common/CommonStyle';
import { colors } from '../common/Colors';

interface AlertSummaryCardProps {
  title?: string;
  status?: string;
  alerts?: number;
  warnings?: number;
  critical?: number;
}

const AlertSummaryCard = ({
  title = 'Alert Summary',
  status = 'Good',
  alerts = 2,
  warnings = 5,
  critical = 0,
}: AlertSummaryCardProps) => {
  const getStatusColor = (statusText: string) => {
    switch (statusText.toLowerCase()) {
      case 'critical':
        return colors.red;
      case 'warning':
        return '#FD7A07';
      case 'good':
        return '#22C55E';
      default:
        return colors.skyBlue;
    }
  };

  const statusColor = getStatusColor(status);

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
        }}
      >
        <Text
          style={[
            commonStyle.semiBold,
            {
              fontSize: 12,
              color: colors.black,
            },
          ]}
        >
          {title}
        </Text>
        <View
          style={{
            backgroundColor: statusColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 10,
                color: colors.white,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Metrics */}
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 11,
                color: colors.textGray,
              },
            ]}
          >
            Alerts
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 16,
                color: colors.black,
              },
            ]}
          >
            {alerts}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 11,
                color: colors.textGray,
              },
            ]}
          >
            Warnings
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 16,
                color: '#FD7A07',
              },
            ]}
          >
            {warnings}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 11,
                color: colors.textGray,
              },
            ]}
          >
            Critical
          </Text>
          <Text
            style={[
              commonStyle.semiBold,
              {
                fontSize: 16,
                color: critical > 0 ? colors.red : '#22C55E',
              },
            ]}
          >
            {critical}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AlertSummaryCard;
