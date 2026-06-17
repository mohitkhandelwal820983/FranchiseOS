import {authAPI} from '../../src/api/auth.api';
import {authService} from '../../src/services/authService';
import * as storageService from '../../src/services/storageService';
import {clearAuthStorage, saveSessionExpiry} from '../../src/utils/sessionManager';

jest.mock('../../src/api/auth.api', () => ({
  authAPI: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock('../../src/services/storageService', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('../../src/utils/sessionManager', () => ({
  clearAuthStorage: jest.fn(() => Promise.resolve()),
  saveSessionExpiry: jest.fn(() => Promise.resolve()),
}));

const mockedAuthAPI = authAPI as jest.Mocked<typeof authAPI>;
const mockedStorage = storageService as jest.Mocked<typeof storageService>;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs in, saves tokens/user data, saves session expiry, and returns user with token', async () => {
    mockedAuthAPI.login.mockResolvedValue({
      success: true,
      data: {
        id: 1,
        name: 'Super Admin',
        email: 'admin@franchiseos.com',
        role: 'SUPER_ADMIN',
        token: 'mock-super-admin-token',
      },
    });

    const result = await authService.login('superadmin@gmail.com', '12345');

    expect(mockedAuthAPI.login).toHaveBeenCalledWith('superadmin@gmail.com', '12345');
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      'authToken',
      'mock-super-admin-token',
    );
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      'token',
      'mock-super-admin-token',
    );
    expect(saveSessionExpiry).toHaveBeenCalledTimes(1);
    expect(mockedStorage.setItem).toHaveBeenCalledWith('role', 'SUPER_ADMIN');
    expect(mockedStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
    expect(result).toMatchObject({
      id: 1,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      token: 'mock-super-admin-token',
    });
  });

  it('gets authToken first and falls back to token', async () => {
    mockedStorage.getItem.mockImplementation(async key => {
      if (key === 'authToken') {
        return null;
      }
      if (key === 'token') {
        return 'fallback-token';
      }
      return null;
    });

    await expect(authService.getToken()).resolves.toBe('fallback-token');
  });

  it('gets stored user and falls back to stored role when user role is missing', async () => {
    mockedStorage.getItem.mockImplementation(async key => {
      if (key === 'user') {
        return JSON.stringify({id: 4, name: 'ABC Dealers'});
      }
      if (key === 'role') {
        return 'DEALER';
      }
      return null;
    });

    await expect(authService.getUser()).resolves.toEqual({
      id: 4,
      name: 'ABC Dealers',
      role: 'DEALER',
    });
  });

  it('returns role-only user data when no user JSON is saved', async () => {
    mockedStorage.getItem.mockImplementation(async key => {
      if (key === 'role') {
        return 'STOCKIST';
      }
      return null;
    });

    await expect(authService.getUser()).resolves.toEqual({role: 'STOCKIST'});
  });

  it('returns true from isAuthenticated when token exists', async () => {
    mockedStorage.getItem.mockImplementation(async key => {
      if (key === 'authToken') {
        return 'token-123';
      }
      return null;
    });

    await expect(authService.isAuthenticated()).resolves.toBe(true);
  });

  it('clears auth storage during logout', async () => {
    mockedAuthAPI.logout.mockResolvedValue({success: true});

    await authService.logout();

    expect(mockedAuthAPI.logout).toHaveBeenCalledTimes(1);
    expect(clearAuthStorage).toHaveBeenCalledTimes(1);
  });

  it('clears auth storage and rethrows when logout API fails', async () => {
    const error = new Error('Logout failed');
    mockedAuthAPI.logout.mockRejectedValue(error);

    await expect(authService.logout()).rejects.toThrow('Logout failed');
    expect(clearAuthStorage).toHaveBeenCalledTimes(1);
  });
});
