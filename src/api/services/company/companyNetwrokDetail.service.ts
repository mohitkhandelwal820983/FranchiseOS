import {API_CONFIG} from '../../config';
import { CompanyNetworkDetailData, DetailType } from '../../mock/company/companyNetworkDetail';


export const getLiveCompanyNetworkDetail = async (
  id: string,
  type: DetailType,
): Promise<CompanyNetworkDetailData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_NETWORK_DETAIL}?id=${id}&type=${type}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch company network detail');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};