import {API_CONFIG} from '../../config';
import { DealerCustomerData } from '../../mock/dealer/dealerCustomer.mock';


export const getLiveDealerCustomer =
  async (): Promise<DealerCustomerData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.DEALER_CUSTOMER}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dealer customer data');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };