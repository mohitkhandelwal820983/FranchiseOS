import {API_CONFIG} from '../../config';
import { PaymentData, PeriodTab } from '../../mock/superadmin/payment.mock';


export const getLivePayments = async (): Promise<
  Record<PeriodTab, PaymentData>
> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.SUPER_ADMIN_PAYMENTS}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};