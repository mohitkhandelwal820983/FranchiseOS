import {API_CONFIG} from '../config';
import { getMockCompanyOrders } from '../mock/company/companyOrders.mock';
import { getLiveCompanyOrders } from '../services/company/companyOrders.services';


export const getCompanyOrders = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockCompanyOrders();
  }

  return getLiveCompanyOrders();
};