import {API_CONFIG} from '../config';
import { getMockCompanyNetwork } from '../mock/company/companyNetwork.mock';
import { getLiveCompanyNetwork } from '../services/company/companyNetwork.services';


export const getCompanyNetwork = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyNetwork();
  }

  return getLiveCompanyNetwork();
};