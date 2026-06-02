import {API_CONFIG} from '../config';
import {
  DealerOrdersData,
  getMockDealerOrders,
} from '../mock/dealer/dealerOrders.mock';
import {getLiveDealerOrders} from '../services/dealer/dealerOrders.services';

export const getDealerOrders = async (): Promise<DealerOrdersData> => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockDealerOrders();
  }

  return getLiveDealerOrders();
};