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
        return false;
      }
    }

    await messaging().requestPermission();
    await notifee.requestPermission();

    return true;
  } catch (error) {
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
    return token;
  } catch (error) {
    return null;
  }
};

export const displayLocalNotification = async (remoteMessage: any) => {
  await notifee.displayNotification({
    title:
      remoteMessage.notification?.title ||
      remoteMessage.data?.title ||
      'New Notification',
    body:
      remoteMessage.notification?.body ||
      remoteMessage.data?.body ||
      'You have a new message',
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
    await displayLocalNotification(remoteMessage);
  });
};

export const listenNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // Handle background notification click here if needed
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // Handle closed-state notification click here if needed
      }
    });
};

export const listenFcmTokenRefresh = () => {
  return messaging().onTokenRefresh(token => {
    // Send refreshed token to backend here if needed
  });
};