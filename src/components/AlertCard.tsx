import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { commonStyle } from '../common/CommonStyle';
import { colors } from '../common/Colors';


interface AlertCardProps {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor: string;
  textColor: string;
  accentColor:string;
  buttonText?: string;
  onPress?: () => void;
}

const AlertCard = ({
  Icon,
  title,
  subtitle,
  iconColor,
  accentColor,
  textColor,
  buttonText = 'Send Reminder',
  onPress,
}: AlertCardProps) => {
  return (
    <View
      style={[
        commonStyle.shadow,
        {
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 8,
        },
      ]}
    >
      <View
        style={{
          width: 5,
          backgroundColor: accentColor,
        }}
      />

      <View
        style={{
          padding: 12,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Icon size={28} color={iconColor} />

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text
            style={[
              commonStyle.medium,
              {
                fontSize: 9,
                color: colors.black,
                lineHeight: 14,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 7,
                color: textColor,
                marginTop: 2,
                lineHeight: 11,
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.skyBlue,
            paddingHorizontal: 8,
            paddingVertical: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 8,
                color:colors.skyBlue,
              },
            ]}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertCard;