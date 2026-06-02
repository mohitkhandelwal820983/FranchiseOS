import {API_CONFIG} from '../../config';
import { DealerProfileData } from '../../mock/dealer/dealerProfile.mock';


export const getLiveDealerProfile = async (): Promise<DealerProfileData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.DEALER_PROFILE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dealer profile');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};