import {API_CONFIG} from '../config';
import { getMockCompanies } from '../mock/superadmin/companies.mock';
import { getLiveCompanies } from '../services/superadmin/companies.services';

export const getCompanies = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanies();
  }

  return getLiveCompanies();
};