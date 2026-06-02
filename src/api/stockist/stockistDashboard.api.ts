
import { API_CONFIG } from '../config';
import {
  getMockStockistDashboard,
  StockistDashboardData,
} from '../mock/stockist/stockistDashboard.mock';

export const getStockistDashboard =
  async (): Promise<StockistDashboardData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockStockistDashboard();
    }

    // Live API will be connected later.
    return getMockStockistDashboard();
  };