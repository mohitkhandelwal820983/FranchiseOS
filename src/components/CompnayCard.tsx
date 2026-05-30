import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, MapPin } from 'lucide-react-native';
import { commonStyle } from '../common/CommonStyle';
import { colors } from '../common/Colors';

interface StatusConfig {
  text: string;
  bgColor: string;
  textColor: string;
}

interface CompanyCardProps {
  initials: string;
  companyName: string;
  ownerName: string;
  location: string;
  status: StatusConfig;
  plan: string;
  addedText: string;
  onPress?: () => void;
}

export const COMPANY_STATUS = {
  ACTIVE: {
    text: 'Active',
    bgColor: colors.backgroundGreen,
    textColor: colors.textGreen,
  },
  PENDING: {
    text: 'Pending',
    bgColor: '#FEF3C7',
    textColor: '#D97706',
  },
  SUSPENDED: {
    text: 'Suspended',
    bgColor: '#FEECED',
    textColor: '#DC2626',
  },
  INACTIVE: {
    text: 'Inactive',
    bgColor: '#F3F4F6',
    textColor: '#6B7280',
  },
};

const CompanyCard = ({
  initials,
  companyName,
  ownerName,
  location,
  status,
  plan,
  addedText,
  onPress,
}: CompanyCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        commonStyle.shadow,
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
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
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
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
          <Text
            style={[
              commonStyle.medium,
              {
                fontSize: 15,
                color: colors.white,
              },
            ]}
          >
            {initials}
          </Text>
        </View>

        <View style={{ marginLeft: 10 }}>
          <Text
            style={[
              commonStyle.medium,
              {
                fontSize: 9,
                color: colors.black,
              },
            ]}
          >
            {companyName}
          </Text>

          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 7,
                color: colors.textGray,
              },
            ]}
          >
            Owner: {ownerName}
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
              {location}
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
            backgroundColor: status.bgColor,
          }}
        >
          <Text
            style={[
              commonStyle.regular,
              {
                fontSize: 8,
                color: status.textColor,
              },
            ]}
          >
            {status.text}
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
          Plan: {plan}
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
          {addedText}
        </Text>
      </View>

      <ChevronRight size={18} color={colors.textGray} />
    </TouchableOpacity>
  );
};

export default CompanyCard;