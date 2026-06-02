import {API_CONFIG} from '../config';
import { getMockCompanyProfile } from '../mock/company/companyProfile.mock';
import { getLiveCompanyProfile } from '../services/company/companyProfile.service';


export const getCompanyProfile = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyProfile();
  }

  return getLiveCompanyProfile();
};