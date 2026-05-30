import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors } from './Colors';
import { commonStyle } from './CommonStyle';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;              // Optional state to show a loading spinner
  disabled?: boolean;               // Optional state to lock the button interaction
  extraStyle?: StyleProp<ViewStyle>; // Overrides for button box positioning layout
  textStyle?: StyleProp<TextStyle>;  // Overrides for internal button font settings
  bgColor?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  extraStyle,
  textStyle,
  bgColor
}) => {
  // Safe color fallbacks if color declarations are missing
  const buttonBgColor = bgColor || colors?.primary || '#007AFF';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      // Blocks taps if button is deliberately disabled or currently waiting for backend response
      disabled={disabled || isLoading} 
      activeOpacity={0.8}               // Opacity change percentage during touch feedback
      style={[
        {
          backgroundColor: buttonBgColor,
          height: 50,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          opacity: (disabled || isLoading) ? 0.6 : 1, // Visual cue for unclickable states
        },
        extraStyle
      ]}
    >
      {isLoading ? (
        // Displays loading indicator wheel if state flag is enabled
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        // Standard typography string display layer
        <Text style={[commonStyle.semiBold, { color: '#FFFFFF', fontSize: 16 }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};