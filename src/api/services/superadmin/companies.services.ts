import {API_CONFIG} from '../../config';
import { CompaniesData } from '../../mock/superadmin/companies.mock';

export const getLiveCompanies = async (): Promise<CompaniesData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.SUPER_ADMIN_COMPANIES}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};