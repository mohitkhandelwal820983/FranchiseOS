import {API_CONFIG} from '../../config';
import { StockistDealerData } from '../../mock/stockist/stockistDealer.mock';


export const getLiveStockistDealer =
  async (): Promise<StockistDealerData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.STOCKIST_DEALER}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stockist dealer data');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };