import React, {useEffect} from 'react';
import {AppState, StatusBar, View} from 'react-native';
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

import {
  clearAuthStorage,
  isSessionExpired,
} from './src/utils/sessionManager';

import {
  isLoginRouteActive,
  resetToLogin,
} from './src/navigation/navigationService';

const App = () => {
  const checkSessionExpiry = async () => {
    try {
      const expired = await isSessionExpired();

      if (!expired) {
        return;
      }

      await clearAuthStorage();

      if (isLoginRouteActive()) {
        return;
      }

      resetToLogin();
    } catch (error) {
      // Silent fail
    }
  };

  useEffect(() => {
    initCrashlytics();

    // Check app update on app launch
    checkAppUpdate();

    const setupNotifications = async () => {
      try {
        await requestNotificationPermission();
        await createNotificationChannel();

        await getFcmToken();

        listenNotificationOpenedApp();
      } catch (error) {
        // Silent fail
      }
    };

    setupNotifications();

    // Check session when app starts
    checkSessionExpiry();

    // Check session every 5 seconds while app is open
    const sessionInterval = setInterval(() => {
      checkSessionExpiry();
    }, 5000);

    // Check session and update when app comes back from background
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
    <View style={{flex: 1}}>
      <StatusBar
      backgroundColor="#0D3696"
      barStyle="light-content"
      translucent={false}
    />
      <RootNavigator />
       <Toast />
    </View>
  );
};

export default App;