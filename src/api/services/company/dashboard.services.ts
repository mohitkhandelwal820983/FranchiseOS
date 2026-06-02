import {API_CONFIG} from '../../config';
import { CompanyDashboardData } from '../../mock/company/companyDashboard.mock';


export const getLiveCompanyDashboard =
  async (): Promise<CompanyDashboardData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_DASHBOARD}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company dashboard');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };