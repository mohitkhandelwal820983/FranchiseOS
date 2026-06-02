import {API_CONFIG} from '../../config';
import { CompanyOrdersData } from '../../mock/company/companyOrders.mock';


export const getLiveCompanyOrders = async (): Promise<CompanyOrdersData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_ORDERS}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch company orders');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};