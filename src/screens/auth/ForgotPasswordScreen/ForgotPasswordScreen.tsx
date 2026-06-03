import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Phone} from 'lucide-react-native';
import {showErrorToast, showSuccessToast} from '../../../utils/toast';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const DESIGN_WIDTH = 263;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(45);

  const otpRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (!otpSent || seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, seconds]);

  const goToLogin = () => {
    navigation.replace('Login');
  };

  const onSendOtp = () => {
    if (!emailOrPhone.trim()) {
      showErrorToast('Please enter Mobile Number or Email');
      return;
    }

    setOtpSent(true);
    setSeconds(45);
    setOtp(['', '', '', '', '', '']);

    showSuccessToast('OTP sent successfully');

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 200);
  };

  const onResendOtp = () => {
    if (seconds > 0) {
      return;
    }

    setSeconds(45);
    setOtp(['', '', '', '', '', '']);

    showSuccessToast('OTP has been resent successfully.');
  };

  const onVerifyOtp = () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      showErrorToast('Please enter valid OTP');
      return;
    }

    showSuccessToast('OTP Verified Successfully');
  };

  const handleOtpChange = (text: string, index: number) => {
    const value = text.replace(/[^0-9]/g, '');

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0D3696" barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.screenWrap}>
            <View style={styles.topSection}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backButton}
                onPress={goToLogin}>
                <ArrowLeft color="#FFFFFF" size={rs(11)} strokeWidth={2.4} />
              </TouchableOpacity>

              <View style={styles.logoRow}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoMark}>F</Text>
                </View>
                <Text style={styles.logoText}>FranchiseOS</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.heading}>Forgot Password?</Text>

              <Text style={styles.subTitle}>
                Enter your registered mobile number or email{'\n'}
                and we will send you an OTP
              </Text>

              <View style={styles.inputBox}>
                <Phone color="#8A8F99" size={rs(11)} strokeWidth={2} />

                <TextInput
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  placeholder="Mobile Number or Email"
                  placeholderTextColor="#5F6670"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.primaryButton}
                onPress={onSendOtp}>
                <Text style={styles.primaryButtonText}>Send OTP</Text>
              </TouchableOpacity>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => {
                      otpRefs.current[index] = ref;
                    }}
                    value={digit}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={styles.otpInput}
                    onChangeText={text => handleOtpChange(text, index)}
                    onKeyPress={({nativeEvent}) =>
                      handleOtpKeyPress(nativeEvent.key, index)
                    }
                  />
                ))}
              </View>

              <View style={styles.resendRow}>
                <Text style={styles.timerText}>
                  Resend OTP in 0:{seconds.toString().padStart(2, '0')}
                </Text>

                <TouchableOpacity activeOpacity={0.8} onPress={onResendOtp}>
                  <Text
                    style={[
                      styles.resendText,
                      seconds === 0 && styles.resendActiveText,
                    ]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.verifyButton}
                onPress={onVerifyOtp}>
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={goToLogin}>
                <Text style={styles.backText}>
                  Remember password? Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D3696',
  },

  container: {
    flex: 1,
    backgroundColor: '#EEF2F3',
  },

  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
    backgroundColor: '#F7F9FA',
  },

  screenWrap: {
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT,
    backgroundColor: '#F7F9FA',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: rs(14),
    shadowOffset: {width: 0, height: rs(8)},
    elevation: 10,
  },

  topSection: {
    height: rs(92),
    backgroundColor: '#0D3696',
    borderTopLeftRadius: rs(4),
    borderTopRightRadius: rs(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: rs(18),
  },

  backButton: {
    position: 'absolute',
    left: rs(12),
    top: rs(18),
    width: rs(18),
    height: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: rs(13),
    height: rs(13),
    borderRadius: rs(6.5),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(4),
  },

  logoMark: {
    color: '#0D3696',
    fontSize: rs(8),
    fontWeight: '900',
    marginTop: -rs(1),
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: rs(11),
    fontWeight: '800',
    letterSpacing: rs(0.2),
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: rs(14),
    marginTop: -rs(18),
    borderRadius: rs(2),
    paddingHorizontal: rs(10),
    paddingTop: rs(18),
    paddingBottom: rs(14),
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: rs(8),
    shadowOffset: {width: 0, height: rs(4)},
    elevation: 6,
  },

  heading: {
    color: '#111827',
    fontSize: rs(14),
    fontWeight: '900',
    textAlign: 'center',
  },

  subTitle: {
    color: '#6B7280',
    fontSize: rs(7),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: rs(10),
    marginTop: rs(6),
    marginBottom: rs(12),
  },

  inputBox: {
    height: rs(22),
    borderWidth: 1,
    borderColor: '#D8DDE5',
    borderRadius: rs(11),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    color: '#111827',
    fontSize: rs(8),
    fontWeight: '600',
    paddingVertical: 0,
    marginLeft: rs(7),
  },

  primaryButton: {
    height: rs(23),
    backgroundColor: '#1F5CC1',
    borderRadius: rs(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: rs(7),
    fontWeight: '800',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(42),
  },

  otpInput: {
    width: rs(23),
    height: rs(23),
    borderWidth: 1.4,
    borderColor: '#1F5CC1',
    borderRadius: rs(2),
    color: '#111827',
    fontSize: rs(12),
    fontWeight: '800',
    textAlign: 'center',
    padding: 0,
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rs(12),
  },

  timerText: {
    color: '#7A808A',
    fontSize: rs(7),
    fontWeight: '500',
  },

  resendText: {
    color: '#9CA3AF',
    fontSize: rs(7),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  resendActiveText: {
    color: '#1F5CC1',
  },

  verifyButton: {
    height: rs(23),
    backgroundColor: '#1F5CC1',
    borderRadius: rs(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(31),
  },

  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: rs(7),
    fontWeight: '800',
  },

  backText: {
    color: '#111827',
    fontSize: rs(7),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: rs(12),
  },
});