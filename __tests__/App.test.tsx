/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/navigation/RootNavigator', () => () => null);
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/services/crashlyticsService', () => ({
  initCrashlytics: jest.fn(),
}));
jest.mock('../src/services/appUpdateService', () => ({
  checkAppUpdate: jest.fn(),
}));
jest.mock('../src/services/notificationService', () => ({
  requestNotificationPermission: jest.fn(),
  createNotificationChannel: jest.fn(),
  getFcmToken: jest.fn(),
  listenForegroundMessages: jest.fn(() => () => {}),
  listenNotificationOpenedApp: jest.fn(),
  listenFcmTokenRefresh: jest.fn(() => () => {}),
}));
jest.mock('../src/utils/sessionManager', () => ({
  clearAuthStorage: jest.fn(),
  isSessionExpired: jest.fn(() => false),
}));
jest.mock('../src/navigation/navigationService', () => ({
  isAuthRouteActive: jest.fn(() => false),
  resetToLogin: jest.fn(),
}));
jest.mock('../src/utils/toast', () => ({
  showErrorToast: jest.fn(),
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
