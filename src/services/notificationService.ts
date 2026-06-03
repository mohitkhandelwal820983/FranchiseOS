import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return false;
      }
    }

    await messaging().requestPermission();
    await notifee.requestPermission();

    console.log('Notification permission granted');
    return true;
  } catch (error) {
    console.log('Notification permission error:', error);
    return false;
  }
};

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
};

export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.log('FCM token error:', error);
    return null;
  }
};

export const displayLocalNotification = async (remoteMessage: any) => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title || 'New Notification',
    body: remoteMessage.notification?.body || remoteMessage.data?.body || 'You have a new message',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
    data: remoteMessage.data,
  });
};

export const listenForegroundMessages = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);

    // This shows notification even when app is open
    await displayLocalNotification(remoteMessage);
  });
};

export const listenNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification opened from closed state:', remoteMessage);
      }
    });
};

export const listenFcmTokenRefresh = () => {
  return messaging().onTokenRefresh(token => {
    console.log('FCM Token refreshed:', token);
  });
};