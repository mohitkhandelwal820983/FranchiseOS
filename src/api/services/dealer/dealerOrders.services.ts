import {API_CONFIG} from '../../config';
import { DealerOrdersData } from '../../mock/dealer/dealerOrders.mock';


export const getLiveDealerOrders = async (): Promise<DealerOrdersData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.DEALER_ORDERS}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dealer orders');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};