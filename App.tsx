import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {initCrashlytics, forceTestCrash} from './src/services/crashlyticsService';
import {
  requestNotificationPermission,
  createNotificationChannel,
  getFcmToken,
  listenForegroundMessages,
  listenNotificationOpenedApp,
  listenFcmTokenRefresh,
} from './src/services/notificationService';

const App = () => {
  useEffect(() => {
    initCrashlytics();

    const setupNotifications = async () => {
      await requestNotificationPermission();
      await createNotificationChannel();

      const token = await getFcmToken();

      // Later send this token to backend
      console.log('Device FCM Token:', token);

      listenNotificationOpenedApp();
    };

    setupNotifications();

    const unsubscribeForeground = listenForegroundMessages();
    const unsubscribeTokenRefresh = listenFcmTokenRefresh();

    return () => {
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <Button
        title="Test Crash"
        onPress={() => {
          console.log('Test Crash button pressed');
          forceTestCrash();
        }}
      /> */}
      <Button
  title="Test New JS Crash"
  onPress={() => {
    setTimeout(() => {
      throw new Error('New logout crash test ' + Date.now());
    }, 100);
  }}
/>

      <RootNavigator />
    </View>
  );
};

export default App;