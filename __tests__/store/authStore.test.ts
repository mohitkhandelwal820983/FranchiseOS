import {useAuthStore} from '../../src/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('stores user and token on login', () => {
    const user = {id: 2, name: 'Reliance Industries', role: 'COMPANY'};

    useAuthStore.getState().login(user, 'company-token');

    expect(useAuthStore.getState()).toMatchObject({
      user,
      token: 'company-token',
      isAuthenticated: true,
    });
  });

  it('clears auth state on logout', () => {
    useAuthStore.getState().login({id: 4, role: 'DEALER'}, 'dealer-token');

    useAuthStore.getState().logout();

    expect(useAuthStore.getState()).toMatchObject({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });
});
