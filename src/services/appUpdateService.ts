import {Alert, Linking, Platform} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false);

let isUpdatePopupVisible = false;

const compareVersions = (current: string, required: string) => {
  const currentParts = current.split('.').map(Number);
  const requiredParts = required.split('.').map(Number);

  const maxLength = Math.max(currentParts.length, requiredParts.length);

  for (let i = 0; i < maxLength; i++) {
    const currentValue = currentParts[i] || 0;
    const requiredValue = requiredParts[i] || 0;

    if (currentValue < requiredValue) {
      return -1;
    }

    if (currentValue > requiredValue) {
      return 1;
    }
  }

  return 0;
};

const openIosStore = async () => {
  try {
    const iosStoreUrl = remoteConfig().getValue('ios_app_store_url').asString();

    if (iosStoreUrl) {
      await Linking.openURL(iosStoreUrl);
    }
  } catch {
    // Silent fail
  }
};

const startAndroidUpdate = async (forceUpdate: boolean) => {
  if (Platform.OS !== 'android') {
    await openIosStore();
    return;
  }

  try {
    const result = await inAppUpdates.checkNeedsUpdate();

    if (result.shouldUpdate) {
      const updateOptions: StartUpdateOptions = {
        updateType: forceUpdate
          ? IAUUpdateKind.IMMEDIATE
          : IAUUpdateKind.FLEXIBLE,
      };

      await inAppUpdates.startUpdate(updateOptions);
      return;
    }

    Alert.alert(
      'Update Not Available',
      'In-app update is not available right now. Please try again later.',
    );
  } catch {
    Alert.alert(
      'Update Not Available',
      'In-app update can start only when the app is installed from Google Play.',
    );
  }
};

const showForceUpdatePopup = (message: string) => {
  if (isUpdatePopupVisible) {
    return;
  }

  isUpdatePopupVisible = true;

  Alert.alert(
    'Update Required',
    message || 'A new version is required. Please update the app.',
    [
      {
        text: 'Update Now',
        onPress: () => {
          isUpdatePopupVisible = false;

          if (Platform.OS === 'android') {
            startAndroidUpdate(true);
          } else {
            openIosStore();
          }
        },
      },
    ],
    {
      cancelable: false,
    },
  );
};

const showOptionalUpdatePopup = (message: string) => {
  if (isUpdatePopupVisible) {
    return;
  }

  isUpdatePopupVisible = true;

  Alert.alert(
    'Update Available',
    message || 'A new version is available. Do you want to update now?',
    [
      {
        text: 'Later',
        style: 'cancel',
        onPress: () => {
          isUpdatePopupVisible = false;
        },
      },
      {
        text: 'Update Now',
        onPress: () => {
          isUpdatePopupVisible = false;

          if (Platform.OS === 'android') {
            startAndroidUpdate(false);
          } else {
            openIosStore();
          }
        },
      },
    ],
  );
};

export const checkAppUpdate = async () => {
  try {
    await remoteConfig().setDefaults({
      android_latest_version: '1.0.0',
      android_min_version: '1.0.0',
      ios_latest_version: '1.0.0',
      ios_min_version: '1.0.0',
      force_update_message: 'A new version is required. Please update the app.',
      optional_update_message:
        'A new version is available. Do you want to update now?',
      ios_app_store_url: '',
    });

    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: __DEV__ ? 0 : 60 * 60 * 1000,
    });

    await remoteConfig().fetchAndActivate();

    const currentVersion = DeviceInfo.getVersion();

    const latestVersion =
      Platform.OS === 'android'
        ? remoteConfig().getValue('android_latest_version').asString()
        : remoteConfig().getValue('ios_latest_version').asString();

    const minVersion =
      Platform.OS === 'android'
        ? remoteConfig().getValue('android_min_version').asString()
        : remoteConfig().getValue('ios_min_version').asString();

    const forceMessage = remoteConfig()
      .getValue('force_update_message')
      .asString();

    const optionalMessage = remoteConfig()
      .getValue('optional_update_message')
      .asString();

    const isForceUpdate = compareVersions(currentVersion, minVersion) < 0;

    const isOptionalUpdate = compareVersions(currentVersion, latestVersion) < 0;

    if (isForceUpdate) {
      showForceUpdatePopup(forceMessage);
      return;
    }

    if (isOptionalUpdate) {
      showOptionalUpdatePopup(optionalMessage);
    }
  } catch {
    // Silent fail to avoid blocking app startup
  }
};