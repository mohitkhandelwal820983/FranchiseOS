import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const getCurrentRouteName = () => {
  if (!navigationRef.isReady()) {
    return '';
  }

  const currentRoute = navigationRef.getCurrentRoute() as
    | {name?: string}
    | undefined;

  return currentRoute?.name || '';
};

export const isLoginRouteActive = () => {
  return getCurrentRouteName() === 'Login';
};

export const isAuthRouteActive = () => {
  const routeName = getCurrentRouteName();

  return (
    routeName === 'Login' ||
    routeName === 'ForgotPassword'
  );
};

export const resetToLogin = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
            state: {
              routes: [{name: 'Login'}],
            },
          },
        ],
      }),
    );
  }
};