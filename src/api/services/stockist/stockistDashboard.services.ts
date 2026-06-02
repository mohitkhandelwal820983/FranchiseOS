import {API_CONFIG} from '../../config';
import { StockistDashboardData } from '../../mock/stockist/stockistDashboard.mock';

export const getLiveStockistDashboard =
  async (): Promise<StockistDashboardData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.STOCKIST_DASHBOARD}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stockist dashboard');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };