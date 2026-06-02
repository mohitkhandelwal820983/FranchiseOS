import { API_CONFIG } from '../config';
import { getMockProfile } from '../mock/superadmin/profile.mock';
import { getLiveProfile } from '../services/superadmin/profile.services';

export const getProfile = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockProfile();
  }

  return getLiveProfile();
};