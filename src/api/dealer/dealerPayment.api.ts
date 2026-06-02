
import { API_CONFIG } from '../config';
import {
  DealerPaymentData,
  getMockDealerPayment,
} from '../mock/dealer/dealerPayment.mock';
import { getLiveDealerPayment } from '../services/dealer/dealerPayment.services';


export const getDealerPayment = async (): Promise<DealerPaymentData> => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockDealerPayment();
  }

  return getLiveDealerPayment();
};