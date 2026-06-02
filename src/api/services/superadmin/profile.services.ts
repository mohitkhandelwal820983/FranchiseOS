import { API_CONFIG } from '../../config';
import type { ProfileData } from '../../mock/superadmin/profile.mock';

export const getLiveProfile = async (): Promise<ProfileData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.SUPER_ADMIN_PROFILE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};