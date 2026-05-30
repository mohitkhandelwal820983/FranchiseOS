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

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
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