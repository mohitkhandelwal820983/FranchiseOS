import {API_CONFIG} from '../../src/api/config';
import {login, logout} from '../../src/api/auth.api';
import {mockLogin} from '../../src/api/mock/auth.mock';
import {loginApi} from '../../src/api/services/auth.services';

jest.mock('../../src/api/mock/auth.mock', () => ({
  mockLogin: jest.fn(),
}));

jest.mock('../../src/api/services/auth.services', () => ({
  loginApi: jest.fn(),
}));

const mockedMockLogin = mockLogin as jest.MockedFunction<typeof mockLogin>;
const mockedLoginApi = loginApi as jest.MockedFunction<typeof loginApi>;

describe('auth.api', () => {
  const originalUseDummyApi = API_CONFIG.USE_DUMMY_API;

  afterEach(() => {
    API_CONFIG.USE_DUMMY_API = originalUseDummyApi;
    jest.clearAllMocks();
  });

  it('uses mock login when USE_DUMMY_API is true', async () => {
    API_CONFIG.USE_DUMMY_API = true;
    mockedMockLogin.mockResolvedValue({success: true, data: {role: 'DEALER'}} as any);

    await expect(login('dealer@gmail.com', '12345')).resolves.toEqual({
      success: true,
      data: {role: 'DEALER'},
    });

    expect(mockedMockLogin).toHaveBeenCalledWith('dealer@gmail.com', '12345');
    expect(mockedLoginApi).not.toHaveBeenCalled();
  });

  it('uses live login API when USE_DUMMY_API is false', async () => {
    API_CONFIG.USE_DUMMY_API = false;
    mockedLoginApi.mockResolvedValue({success: true, data: {role: 'COMPANY'}} as any);

    await expect(login('company@gmail.com', '12345')).resolves.toEqual({
      success: true,
      data: {role: 'COMPANY'},
    });

    expect(mockedLoginApi).toHaveBeenCalledWith('company@gmail.com', '12345');
    expect(mockedMockLogin).not.toHaveBeenCalled();
  });

  it('returns success from logout in dummy mode', async () => {
    API_CONFIG.USE_DUMMY_API = true;

    await expect(logout()).resolves.toEqual({success: true});
  });
});
