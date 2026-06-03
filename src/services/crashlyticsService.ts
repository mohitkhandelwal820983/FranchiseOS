import crashlytics from '@react-native-firebase/crashlytics';

export const initCrashlytics = async () => {
  try {
    await crashlytics().setCrashlyticsCollectionEnabled(true);
    crashlytics().log('Crashlytics initialized');
    console.log('Crashlytics initialized');
  } catch (error) {
    console.log('Crashlytics init error:', error);
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
    console.log('Crashlytics record error:', err);
  }
};

export const forceTestCrash = async () => {
  console.log('Force test crash clicked');

  await crashlytics().setCrashlyticsCollectionEnabled(true);
  crashlytics().log('Force test crash clicked');

  crashlytics().crash();
};