import {API_CONFIG} from '../../config';
import { StockistProfileData } from '../../mock/stockist/stockistProfile.mock';


export const getLiveStockistProfile =
  async (): Promise<StockistProfileData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.STOCKIST_PROFILE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stockist profile');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };