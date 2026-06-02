import {API_CONFIG} from '../config';
import {
  DealerProfileData,
  getMockDealerProfile,
} from '../mock/dealer/dealerProfile.mock';
import {getLiveDealerProfile} from '../services/dealer/dealerProfile.services';

export const getDealerProfile = async (): Promise<DealerProfileData> => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockDealerProfile();
  }

  return getLiveDealerProfile();
};