/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

import App from './App';
import {name as appName} from './app.json';

const displayBackgroundNotification = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

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
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
    data: remoteMessage.data,
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  

  /**
   * If notification payload exists, Android may show it automatically
   * in background/closed state.
   *
   * If backend sends data-only payload, Notifee will display it here.
   */
  if (!remoteMessage.notification) {
    await displayBackgroundNotification(remoteMessage);
  }
});

AppRegistry.registerComponent(appName, () => App);