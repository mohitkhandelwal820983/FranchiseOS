import React, {useEffect} from 'react';
import {AppState, Platform, StatusBar, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

import {initCrashlytics} from './src/services/crashlyticsService';
import {checkAppUpdate} from './src/services/appUpdateService';
import Toast from 'react-native-toast-message';

import {
  requestNotificationPermission,
  createNotificationChannel,
  getFcmToken,
  listenForegroundMessages,
  listenNotificationOpenedApp,
  listenFcmTokenRefresh,
} from './src/services/notificationService';

import {clearAuthStorage, isSessionExpired} from './src/utils/sessionManager';

import {
  isAuthRouteActive,
  resetToLogin,
} from './src/navigation/navigationService';
import {showErrorToast} from './src/utils/toast';
import { colors } from './src/theme';

const STATUS_BAR_COLOR = colors.primary

const AppContent = () => {
  const insets = useSafeAreaInsets();

  const checkSessionExpiry = async () => {
    try {
      const expired = await isSessionExpired();

      if (!expired) {
        return;
      }

      if (isAuthRouteActive()) {
        return;
      }

      await clearAuthStorage();

      resetToLogin();
    } catch {
      showErrorToast('Session check failed. Please restart the app.');
    }
  };

  useEffect(() => {
    initCrashlytics();

    checkAppUpdate();

    const setupNotifications = async () => {
      try {
        await requestNotificationPermission();
        await createNotificationChannel();

        await getFcmToken();

        listenNotificationOpenedApp();
      } catch (_error) {
        showErrorToast('Notification setup failed.');
      }
    };

    setupNotifications();

    checkSessionExpiry();

    const sessionInterval = setInterval(() => {
      checkSessionExpiry();
    }, 5000);

    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active') {
          checkSessionExpiry();
          checkAppUpdate();
        }
      },
    );

    const unsubscribeForeground = listenForegroundMessages();
    const unsubscribeTokenRefresh = listenFcmTokenRefresh();

    return () => {
      clearInterval(sessionInterval);
      unsubscribeForeground();
      unsubscribeTokenRefresh();
      appStateSubscription.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: STATUS_BAR_COLOR}}>
      <StatusBar
        backgroundColor={STATUS_BAR_COLOR}
        barStyle="light-content"
        translucent={false}
      />

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height:
            insets.top ||
            (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0),
          backgroundColor: STATUS_BAR_COLOR,
          zIndex: 9999,
          elevation: 9999,
        }}
      />

      <RootNavigator />

      <Toast />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

export default App;