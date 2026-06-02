import {API_CONFIG} from '../../config';
import { CompanyFinanceData, PeriodType } from '../../mock/company/companyFinance.mock';


export const getLiveCompanyFinance = async (
  period: PeriodType,
): Promise<CompanyFinanceData> => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_FINANCE}?period=${period}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch company finance');
  }

  const result = await response.json();

  if (result?.data) {
    return result.data;
  }

  return result;
};