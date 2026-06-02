import {API_CONFIG} from '../../config';
import { StockistOrdersData } from '../../mock/stockist/stockistOrders.mock';


export const getLiveStockistOrders =
  async (): Promise<StockistOrdersData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.STOCKIST_ORDERS}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stockist orders');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };