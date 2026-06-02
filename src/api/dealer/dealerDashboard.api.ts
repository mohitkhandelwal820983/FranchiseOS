import {API_CONFIG} from '../config';
import {
  DealerDashboardData,
  getMockDealerDashboard,
} from '../mock/dealer/dealerDashboard.mock';
import {getLiveDealerDashboard} from '../services/dealer/dealerDashboard.services';

export const getDealerDashboard =
  async (): Promise<DealerDashboardData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockDealerDashboard();
    }

    return getLiveDealerDashboard();
  };