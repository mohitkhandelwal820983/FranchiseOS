import {API_CONFIG} from '../config';
import {
  DealerCustomerData,
  getMockDealerCustomer,
} from '../mock/dealer/dealerCustomer.mock';
import {getLiveDealerCustomer} from '../services/dealer/dealerCustomer.services';

export const getDealerCustomer =
  async (): Promise<DealerCustomerData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockDealerCustomer();
    }

    return getLiveDealerCustomer();
  };