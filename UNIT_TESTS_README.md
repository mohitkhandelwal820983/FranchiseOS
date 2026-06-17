# FranchiseOS Unit Tests Patch

Copy these files into the root of your React Native project.

## Files included

- `jest.config.js` — updated Jest configuration to load setup mocks.
- `jest.setup.js` — common mocks for AsyncStorage, Toast, and Safe Area.
- `__tests__/App.test.tsx` — safer app render test with heavy services mocked.
- `__tests__/utils/sessionManager.test.ts` — session expiry and auth cleanup tests.
- `__tests__/services/storageService.test.ts` — AsyncStorage wrapper tests.
- `__tests__/services/authService.test.ts` — login/logout/user/token tests.
- `__tests__/api/auth.api.test.ts` — dummy API vs live API selection tests.
- `__tests__/api/mockLogin.test.ts` — mock role login tests.
- `__tests__/api/liveDashboardServices.test.ts` — live dashboard fetch/error tests.
- `__tests__/store/authStore.test.ts` — Zustand auth store tests.
- `__tests__/store/userStore.test.ts` — Zustand user profile/preferences tests.
- `__tests__/utils/toast.test.ts` — toast and API error message tests.

## Run command

```bash
npm test -- --watchAll=false
```

Your GitHub Actions step already runs:

```bash
npm run test --if-present -- --watchAll=false
```
