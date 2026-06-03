import AsyncStorage from '@react-native-async-storage/async-storage';

export const SESSION_EXPIRY_KEY = 'sessionExpiryTime';

// For testing: 45 seconds
export const SESSION_DURATION = 45 * 1000;

// For production, use this instead:
// export const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const saveSessionExpiry = async () => {
  const expiryTime = Date.now() + SESSION_DURATION;
  await AsyncStorage.setItem(SESSION_EXPIRY_KEY, String(expiryTime));
};

export const isSessionExpired = async () => {
  const expiryTime = await AsyncStorage.getItem(SESSION_EXPIRY_KEY);

  if (!expiryTime) {
    return true;
  }

  return Date.now() > Number(expiryTime);
};

export const clearAuthStorage = async () => {
  const keysToRemove = [
    'token',
    'authToken',
    'accessToken',
    'refreshToken',
    'userToken',
    'user',
    'userData',
    'role',
    'company',
    'companyId',
    'isLoggedIn',
    SESSION_EXPIRY_KEY,
  ];

  await Promise.all(keysToRemove.map(key => AsyncStorage.removeItem(key)));
};