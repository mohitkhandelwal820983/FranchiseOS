import {API_CONFIG} from '../../config';
import { DealerPaymentData } from '../../mock/dealer/dealerPayment.mock';


export const getLiveDealerPayment = async (): Promise<DealerPaymentData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.DEALER_PAYMENT}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dealer payment');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};