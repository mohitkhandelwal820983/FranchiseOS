import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface OTPInputProps {
  length?: number;
  onOTPComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onOTPComplete }) => {
  const [otp, setOtp] = React.useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<React.RefObject<TextInput>[]>(
    Array.from({ length }, () => React.createRef<TextInput>())
  );

  const handleOTPChange = (index: number, value: string) => {
    if (!value || /^\d+$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.current?.focus();
      }

      if (newOtp.every((digit) => digit)) {
        onOTPComplete(newOtp.join(''));
      }
    }
  };

  const handleKeyPress = (index: number) => (event: any) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          // Narrow cast to satisfy React Native ref typing
          <TextInput
            key={index}
            ref={inputRefs.current[index] as any}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={otp[index]}
            onChangeText={(value) => handleOTPChange(index, value)}
            onKeyPress={handleKeyPress(index)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
});

export default OTPInput;
