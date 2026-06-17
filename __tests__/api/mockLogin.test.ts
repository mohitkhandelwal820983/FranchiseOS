import {mockLogin} from '../../src/api/mock/auth.mock';

describe('mockLogin', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it.each([
    ['superadmin@gmail.com', 'SUPER_ADMIN', 'mock-super-admin-token'],
    ['company@gmail.com', 'COMPANY', 'mock-company-token'],
    ['stockist@gmail.com', 'STOCKIST', 'mock-stockist-token'],
    ['dealer@gmail.com', 'DEALER', 'mock-dealer-token'],
  ])('logs in %s with correct role and token', async (email, role, token) => {
    const promise = mockLogin(email, '12345');

    jest.advanceTimersByTime(1500);

    await expect(promise).resolves.toMatchObject({
      success: true,
      data: {
        role,
        token,
      },
    });
  });

  it('rejects invalid credentials', async () => {
    const promise = mockLogin('wrong@gmail.com', 'wrong-password');

    jest.advanceTimersByTime(1500);

    await expect(promise).rejects.toEqual({
      success: false,
      message: 'Invalid Credentials',
    });
  });
});
