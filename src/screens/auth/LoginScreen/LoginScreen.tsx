import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Eye, EyeOff, User} from 'lucide-react-native';

import {authService} from '../../../services/authService';
import {showErrorToast} from '../../../utils/toast';
import {colors, fonts, mobileSize as rs} from '../../../theme';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim()) {
      showErrorToast('Please enter Email or Phone Number');
      return;
    }

    if (!password.trim()) {
      showErrorToast('Please enter Password');
      return;
    }

    try {
      setLoading(true);

      const userData = await authService.login(email.trim(), password);
      const userRole = userData?.role || '';

      if (userRole === 'COMPANY' || userRole === 'COMPANY_ADMIN') {
        navigation.replace('CompanyTabs');
      } else if (userRole === 'STOCKIST') {
        navigation.replace('StockistTabs');
      } else if (userRole === 'DEALER') {
        navigation.replace('DealerTabs');
      } else {
        navigation.replace('SuperAdminTabs');
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Invalid Email/Phone or Password';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor={colors.loginPrimary} barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.mainContainer}>
            <View style={styles.blueSection}>
              <View style={styles.logoRow}>
                <View style={styles.logoBox}>
                  <View style={styles.logoShape}>
                    <View style={styles.logoLineLarge} />
                    <View style={styles.logoLineMedium} />
                    <View style={styles.logoLineSmall} />
                  </View>
                </View>

                <Text style={styles.logoText}>FranchiseOS</Text>
              </View>
            </View>

            <View style={styles.bottomSection} />

            <View style={styles.loginCard}>
              <Text style={styles.heading}>Welcome Back</Text>

              <View style={styles.formArea}>
                <View style={styles.inputBox}>
                  <User color={colors.loginInputIcon} size={rs(22)} strokeWidth={2.1} />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email or Phone Number"
                    placeholderTextColor={colors.loginInputIcon}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>

                <View style={styles.passwordBox}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.loginInputIcon}
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.passwordInput}
                  />

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSecureText(!secureText)}>
                    {secureText ? (
                      <EyeOff
                        color={colors.loginInputIcon}
                        size={rs(24)}
                        strokeWidth={2.1}
                      />
                    ) : (
                      <Eye
                        color={colors.loginInputIcon}
                        size={rs(24)}
                        strokeWidth={2.1}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loading}
                  onPress={onLogin}
                  style={[styles.loginButton, loading && styles.disabledButton]}>
                  {loading ? (
                    <ActivityIndicator color={colors.white} size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.footerText}>
                  First time? Contact your admin
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.loginBg,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
    backgroundColor: colors.loginBg,
  },

  mainContainer: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: colors.loginBg,
  },

  blueSection: {
    height: SCREEN_HEIGHT * 0.36,
    minHeight: rs(250),
    backgroundColor: colors.loginPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },

  bottomSection: {
    flex: 1,
    minHeight: SCREEN_HEIGHT * 0.64,
    backgroundColor: colors.loginBottomBg,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rs(50),
  },

  logoBox: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(8),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },

  logoShape: {
    width: rs(25),
    height: rs(26),
    justifyContent: 'center',
  },

  logoLineLarge: {
    width: rs(25),
    height: rs(6),
    backgroundColor: colors.loginPrimary,
    borderRadius: rs(2),
    marginBottom: rs(4),
  },

  logoLineMedium: {
    width: rs(20),
    height: rs(6),
    backgroundColor: colors.loginPrimary,
    borderRadius: rs(2),
    marginBottom: rs(4),
  },

  logoLineSmall: {
    width: rs(11),
    height: rs(6),
    backgroundColor: colors.loginPrimary,
    borderRadius: rs(2),
  },

  logoText: {
    color: colors.white,
    fontSize: rs(28),
    fontFamily: fonts.extraBold,
    letterSpacing: rs(0.2),
  },

  loginCard: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25,
    alignSelf: 'center',
    width: SCREEN_WIDTH - rs(40),
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: rs(12),
    paddingHorizontal: rs(24),
    paddingTop: rs(32),
    paddingBottom: rs(28),
    shadowColor: colors.black,
    shadowOpacity: 0.13,
    shadowRadius: rs(18),
    shadowOffset: {width: 0, height: rs(8)},
    elevation: 10,
  },

  heading: {
    color: colors.loginText,
    fontSize: rs(30),
    fontFamily: fonts.extraBold,
    marginBottom: rs(42),
  },

  formArea: {
    width: '100%',
  },

  inputBox: {
    height: rs(58),
    borderWidth: 1.2,
    borderColor: colors.loginInputBorder,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(20),
  },

  input: {
    flex: 1,
    marginLeft: rs(12),
    color: colors.loginText,
    fontSize: rs(16),
    fontFamily: fonts.regular,
    paddingVertical: 0,
  },

  passwordBox: {
    height: rs(58),
    borderWidth: 1.2,
    borderColor: colors.loginInputBorder,
    borderRadius: rs(6),
    backgroundColor: colors.white,
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },

  passwordInput: {
    flex: 1,
    color: colors.loginText,
    fontSize: rs(16),
    fontFamily: fonts.regular,
    paddingVertical: 0,
  },

  forgotText: {
    color: colors.loginForgot,
    fontSize: rs(15),
    fontFamily: fonts.extraBold,
  },

  loginButton: {
    height: rs(56),
    backgroundColor: colors.loginButton,
    borderRadius: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(36),
  },

  disabledButton: {
    opacity: 0.7,
  },

  loginButtonText: {
    color: colors.white,
    fontSize: rs(17),
    fontFamily: fonts.extraBold,
  },

  divider: {
    height: 1,
    backgroundColor: colors.loginDivider,
    marginTop: rs(46),
  },

  footerText: {
    color: colors.loginText,
    fontSize: rs(15),
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: rs(24),
  },
});
