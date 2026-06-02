import {API_CONFIG} from '../../config';
import { CompanyNetworkData } from '../../mock/company/companyNetwork.mock';


export const getLiveCompanyNetwork =
  async (): Promise<CompanyNetworkData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_NETWORK}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company network');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };