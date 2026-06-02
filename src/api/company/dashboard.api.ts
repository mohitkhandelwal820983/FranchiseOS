import {API_CONFIG} from '../config';
import { getMockCompanyDashboard } from '../mock/company/companyDashboard.mock';
import { getLiveCompanyDashboard } from '../services/company/dashboard.services';


export const getCompanyDashboard = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyDashboard();
  }

  return getLiveCompanyDashboard();
};