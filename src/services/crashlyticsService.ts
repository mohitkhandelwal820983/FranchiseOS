import crashlytics from '@react-native-firebase/crashlytics';

export const initCrashlytics = async () => {
  try {
    await crashlytics().setCrashlyticsCollectionEnabled(true);
    crashlytics().log('Crashlytics initialized');
  } catch (error) {
    // Silent fail to avoid blocking app startup
  }
};

export const recordCrashError = (error: unknown, screenName?: string) => {
  try {
    if (screenName) {
      crashlytics().setAttribute('screen', screenName);
    }

    if (error instanceof Error) {
      crashlytics().recordError(error);
    } else {
      crashlytics().recordError(new Error(String(error)));
    }
  } catch (err) {
    // Silent fail to avoid app crash while recording error
  }
};

export const forceTestCrash = async () => {
  await crashlytics().setCrashlyticsCollectionEnabled(true);
  crashlytics().log('Force test crash clicked');

  crashlytics().crash();
};