import {useUserStore} from '../../src/store/userStore';

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.setState({
      profile: null,
      preferences: {},
    });
  });

  it('sets and updates profile', () => {
    useUserStore.getState().setProfile({
      id: '1',
      name: 'Super Admin',
      email: 'admin@franchiseos.com',
      role: 'SUPER_ADMIN',
    });

    useUserStore.getState().updateProfile({name: 'Updated Admin'});

    expect(useUserStore.getState().profile).toEqual({
      id: '1',
      name: 'Updated Admin',
      email: 'admin@franchiseos.com',
      role: 'SUPER_ADMIN',
    });
  });

  it('does not create profile when updating without an existing profile', () => {
    useUserStore.getState().updateProfile({name: 'Should Not Apply'});

    expect(useUserStore.getState().profile).toBeNull();
  });

  it('sets and merges preferences', () => {
    useUserStore.getState().setPreferences({theme: 'light'});
    useUserStore.getState().updatePreferences({language: 'en'});

    expect(useUserStore.getState().preferences).toEqual({
      theme: 'light',
      language: 'en',
    });
  });

  it('resets profile and preferences', () => {
    useUserStore.getState().setProfile({
      id: '4',
      name: 'ABC Dealers',
      email: 'dealer@franchiseos.com',
      role: 'DEALER',
    });
    useUserStore.getState().setPreferences({theme: 'dark'});

    useUserStore.getState().reset();

    expect(useUserStore.getState()).toMatchObject({
      profile: null,
      preferences: {},
    });
  });
});
