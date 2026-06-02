import {API_CONFIG} from '../config';
import {
  getMockStockistProfile,
  StockistProfileData,
} from '../mock/stockist/stockistProfile.mock';
import {getLiveStockistProfile} from '../services/stockist/stockistProfile.services';

export const getStockistProfile =
  async (): Promise<StockistProfileData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockStockistProfile();
    }

    return getLiveStockistProfile();
  };