import {API_CONFIG} from '../config';
import { DetailType, getMockCompanyNetworkDetail } from '../mock/company/companyNetworkDetail';
import { getLiveCompanyNetworkDetail } from '../services/company/companyNetwrokDetail.service';


export const getCompanyNetworkDetail = async (
  id: string,
  type: DetailType,
) => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyNetworkDetail(id, type);
  }

  return getLiveCompanyNetworkDetail(id, type);
};