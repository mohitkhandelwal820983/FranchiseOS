import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleProp, TextStyle, View, TouchableOpacity } from 'react-native';
import { colors } from '../common/Colors';
import { LucideIcon } from 'lucide-react-native';

interface CustomInputProps extends TextInputProps {
  extraStyle?: StyleProp<TextStyle>;
  StartIcon?: LucideIcon;
  EndIcon?: LucideIcon;
  onEndIconPress?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({ 
  value, 
  onChangeText, 
  placeholder, 
  extraStyle,
  StartIcon,
  EndIcon,
  onEndIconPress,
  ...restProps 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Fallback calculations to ensure an undefined color never crashes the app
  const activeBorderColor = colors?.primary || '#007AFF';
  const inactiveBorderColor = colors?.border || '#E0E0E0';
  const textColor = colors?.black || '#000000';
  const placeholderColor = colors?.border || '#999999';

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: isFocused ? activeBorderColor : inactiveBorderColor, 
          borderRadius: 8,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
        },
        extraStyle
      ]}
    >
      {StartIcon && (
        <StartIcon 
          size={20} 
          color={isFocused ? activeBorderColor : '#999999'} 
          style={{ marginRight: 12 }}
        />
      )}

      <TextInput
        style={{
          flex: 1,
          height: '100%',
          fontSize: 16,
          color: textColor,
          fontFamily: 'PoppinsRegular',
          paddingVertical: 0,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...restProps} 
      />

      {EndIcon && (
        <TouchableOpacity
          onPress={onEndIconPress}
          disabled={!onEndIconPress} // If no function passed, disables press animations
          activeOpacity={0.6}
          style={{ marginLeft: 12 }}
        >
          <EndIcon 
            size={20} 
            color={isFocused ? activeBorderColor : '#999999'} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};