import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  PREFERENCES: 'preferences',
  THEME: 'theme',
} as const;

export const storageUtils = {
  async setAuthToken(token: string) {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async clearAuthToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async setUser(user: any) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  async getUser() {
    const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  async clearUser() {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  },

  async setPreferences(preferences: any) {
    await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  },

  async getPreferences() {
    const prefs = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return prefs ? JSON.parse(prefs) : {};
  },

  async clear() {
    await AsyncStorage.clear();
  },
};
