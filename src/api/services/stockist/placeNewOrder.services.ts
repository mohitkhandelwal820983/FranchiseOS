import {API_CONFIG} from '../../config';
import { PlaceNewOrderData } from '../../mock/stockist/placeNewOrder.mock';


export const getLivePlaceNewOrder =
  async (): Promise<PlaceNewOrderData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.PLACE_NEW_ORDER}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch place new order data');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };