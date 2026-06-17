import AsyncStorage from '@react-native-async-storage/async-storage';
import {clear, getItem, removeItem, setItem} from '../../src/services/storageService';

describe('storageService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('sets and gets a value', async () => {
    await setItem('role', 'DEALER');

    await expect(getItem('role')).resolves.toBe('DEALER');
  });

  it('removes a value', async () => {
    await setItem('authToken', 'token-123');
    await removeItem('authToken');

    await expect(getItem('authToken')).resolves.toBeNull();
  });

  it('clears all values', async () => {
    await setItem('authToken', 'token-123');
    await setItem('role', 'COMPANY');

    await clear();

    await expect(getItem('authToken')).resolves.toBeNull();
    await expect(getItem('role')).resolves.toBeNull();
  });
});
