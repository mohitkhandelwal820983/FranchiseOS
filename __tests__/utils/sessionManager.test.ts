import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SESSION_DURATION,
  SESSION_EXPIRY_KEY,
  clearAuthStorage,
  isSessionExpired,
  saveSessionExpiry,
} from '../../src/utils/sessionManager';

describe('sessionManager', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.restoreAllMocks();
  });

  it('saves session expiry using current time plus configured duration', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);

    await saveSessionExpiry();

    await expect(AsyncStorage.getItem(SESSION_EXPIRY_KEY)).resolves.toBe(
      String(1000 + SESSION_DURATION),
    );
  });

  it('treats missing expiry as expired', async () => {
    await expect(isSessionExpired()).resolves.toBe(true);
  });

  it('returns false when expiry time is in the future', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    await AsyncStorage.setItem(SESSION_EXPIRY_KEY, '2000');

    await expect(isSessionExpired()).resolves.toBe(false);
  });

  it('returns true when expiry time is in the past', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(3000);
    await AsyncStorage.setItem(SESSION_EXPIRY_KEY, '2000');

    await expect(isSessionExpired()).resolves.toBe(true);
  });

  it('clears all authentication/session related storage keys', async () => {
    const keysToCheck = [
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

    await Promise.all(keysToCheck.map(key => AsyncStorage.setItem(key, 'value')));

    await clearAuthStorage();

    for (const key of keysToCheck) {
      await expect(AsyncStorage.getItem(key)).resolves.toBeNull();
    }
  });
});
