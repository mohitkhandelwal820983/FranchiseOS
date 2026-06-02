import {API_CONFIG} from '../../config';
import { StockistInventoryData } from '../../mock/stockist/stockistInventory.mock';


export const getLiveStockistInventory =
  async (): Promise<StockistInventoryData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.STOCKIST_INVENTORY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stockist inventory');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };