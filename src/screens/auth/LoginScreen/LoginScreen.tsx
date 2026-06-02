import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Eye, EyeOff, User} from 'lucide-react-native';

import {login} from '../../../api/auth.api';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const DESIGN_WIDTH = 768;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter Email or Phone Number');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation', 'Please enter Password');
      return;
    }

    try {
      setLoading(true);

      const response: any = await login(email.trim(), password);

      const userData = response?.data || response?.user || response;
      const userRole =
        response?.data?.role ||
        response?.role ||
        response?.data?.user?.role ||
        '';

      if (userData?.token) {
        await AsyncStorage.setItem('token', userData.token);
      }

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('role', userRole);

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
      Alert.alert(
        'Login Failed',
        error?.message || 'Invalid Email/Phone or Password',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F4F8F9" barStyle="dark-content" />

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
                  <User color="#606773" size={rs(28)} strokeWidth={2.1} />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email or Phone Number"
                    placeholderTextColor="#606773"
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
                    placeholderTextColor="#606773"
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.passwordInput}
                  />

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSecureText(!secureText)}>
                    {secureText ? (
                      <EyeOff color="#606773" size={rs(31)} strokeWidth={2.1} />
                    ) : (
                      <Eye color="#606773" size={rs(31)} strokeWidth={2.1} />
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
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.footerText}>First time? Contact your admin</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const CARD_WIDTH = SCREEN_WIDTH - rs(148);
const LOGIN_CARD_WIDTH = SCREEN_WIDTH - rs(202);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F8F9',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rs(90),
  },
  mainContainer: {
    width: CARD_WIDTH,
    minHeight: rs(1184),
    borderRadius: rs(14),
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: rs(26),
    shadowOffset: {width: 0, height: rs(15)},
    elevation: 12,
  },
  blueSection: {
    height: rs(368),
    backgroundColor: '#103A94',
    borderTopLeftRadius: rs(14),
    borderTopRightRadius: rs(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    minHeight: rs(816),
    backgroundColor: '#F7FAFB',
    borderBottomLeftRadius: rs(14),
    borderBottomRightRadius: rs(14),
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rs(24),
  },
  logoBox: {
    width: rs(49),
    height: rs(49),
    borderRadius: rs(8),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(14),
  },
  logoShape: {
    width: rs(28),
    height: rs(29),
    justifyContent: 'center',
  },
  logoLineLarge: {
    width: rs(28),
    height: rs(7),
    backgroundColor: '#103A94',
    borderRadius: rs(2),
    marginBottom: rs(4),
  },
  logoLineMedium: {
    width: rs(23),
    height: rs(7),
    backgroundColor: '#103A94',
    borderRadius: rs(2),
    marginBottom: rs(4),
  },
  logoLineSmall: {
    width: rs(12),
    height: rs(7),
    backgroundColor: '#103A94',
    borderRadius: rs(2),
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: rs(34),
    fontWeight: '800',
    letterSpacing: rs(0.2),
  },
  loginCard: {
    position: 'absolute',
    top: rs(252),
    left: (CARD_WIDTH - LOGIN_CARD_WIDTH) / 2,
    width: LOGIN_CARD_WIDTH,
    minHeight: rs(722),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(8),
    paddingHorizontal: rs(40),
    paddingTop: rs(42),
    paddingBottom: rs(36),
    shadowColor: '#000000',
    shadowOpacity: 0.13,
    shadowRadius: rs(18),
    shadowOffset: {width: 0, height: rs(8)},
    elevation: 10,
  },
  heading: {
    color: '#111827',
    fontSize: rs(40),
    fontWeight: '800',
    marginBottom: rs(78),
  },
  formArea: {
    width: '100%',
  },
  inputBox: {
    height: rs(84),
    borderWidth: 1.2,
    borderColor: '#818894',
    borderRadius: rs(5),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(28),
  },
  input: {
    flex: 1,
    marginLeft: rs(18),
    color: '#111827',
    fontSize: rs(28),
    fontWeight: '400',
    paddingVertical: 0,
  },
  passwordBox: {
    height: rs(84),
    borderWidth: 1.2,
    borderColor: '#818894',
    borderRadius: rs(5),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(20),
  },
  passwordInput: {
    flex: 1,
    color: '#111827',
    fontSize: rs(28),
    fontWeight: '400',
    paddingVertical: 0,
  },
  forgotText: {
    color: '#1E4F95',
    fontSize: rs(25),
    fontWeight: '800',
  },
  loginButton: {
    height: rs(80),
    backgroundColor: '#1F5CC1',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(52),
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: rs(25),
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#D5D8DE',
    marginTop: rs(80),
  },
  footerText: {
    color: '#111827',
    fontSize: rs(25),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: rs(34),
  },
});