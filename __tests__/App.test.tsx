import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/navigation/RootNavigator', () => {
  const MockReact = require('react');
  const { View } = require('react-native');

  return function MockRootNavigator() {
    return MockReact.createElement(View, { testID: 'root-navigator' });
  };
});

jest.mock('../src/services/crashlyticsService', () => ({
  initCrashlytics: jest.fn(),
}));

jest.mock('../src/services/notificationService', () => ({
  requestNotificationPermission: jest.fn(),
  createNotificationChannel: jest.fn(),
  getFcmToken: jest.fn(),
  listenForegroundMessages: jest.fn(() => jest.fn()),
  listenNotificationOpenedApp: jest.fn(),
  listenFcmTokenRefresh: jest.fn(() => jest.fn()),
}));

jest.mock('../src/services/appUpdateService', () => ({
  checkAppUpdate: jest.fn(),
}));

jest.mock('../src/navigation/navigationService', () => ({
  isAuthRouteActive: jest.fn(() => false),
  resetToLogin: jest.fn(),
}));

describe('App', () => {
  it('renders root navigator', async () => {
    const screen = await render(<App />);

    expect(screen.getByTestId('root-navigator')).toBeTruthy();
  });
});
