import {API_CONFIG} from '../config';
import { getMockPayments } from '../mock/superadmin/payment.mock';
import { getLivePayments } from '../services/superadmin/payment.service';

export const getPayments = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockPayments();
  }

  return getLivePayments();
};