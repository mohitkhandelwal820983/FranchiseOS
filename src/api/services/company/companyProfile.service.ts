import {API_CONFIG} from '../../config';
import { CompanyProfileData } from '../../mock/company/companyProfile.mock';


export const getLiveCompanyProfile =
  async (): Promise<CompanyProfileData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_PROFILE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company profile');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };