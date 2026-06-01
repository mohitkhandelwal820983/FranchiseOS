import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import images from '../../../assets/images';
import { authService } from '../../../services/authService';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        if (!mounted) return;

        if (!authenticated) {
          navigation.replace('Login');
          return;
        }

        const user = await authService.getUser();
        const role = user?.role || '';

        if (role === 'COMPANY' || role === 'COMPANY_ADMIN') {
          navigation.replace('CompanyTabs');
        } else if (role === 'STOCKIST') {
          navigation.replace('StockistTabs');
        } else {
          navigation.replace('SuperAdminTabs');
        }
      } catch (error) {
        navigation.replace('Login');
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [navigation]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F3D9E"
      />

      <ImageBackground
        source={images.background}
        style={styles.container}
        resizeMode="cover">

        <View style={styles.content}>

          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            FranchiseOS
          </Text>

          <Text style={styles.subtitle}>
            Manage Smarter
          </Text>

        </View>

      </ImageBackground>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3D9E',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 240,
    height: 240,
    marginBottom: 24,
  },

  title: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '400',
  },
});