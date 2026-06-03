import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const isLoginRouteActive = () => {
  if (!navigationRef.isReady()) {
    return false;
  }

  const currentRoute = navigationRef.getCurrentRoute() as
    | {name?: string}
    | undefined;

  return currentRoute?.name === 'Login';
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
