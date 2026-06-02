import {API_CONFIG} from '../config';
import { getMockCompanyFinance, PeriodType } from '../mock/company/companyFinance.mock';
import { getLiveCompanyFinance } from '../services/company/companyFinance.services';


export const getCompanyFinance = async (period: PeriodType) => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyFinance(period);
  }

  return getLiveCompanyFinance(period);
};