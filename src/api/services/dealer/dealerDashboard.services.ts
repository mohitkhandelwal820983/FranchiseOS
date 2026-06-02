import {API_CONFIG} from '../../config';
import { DealerDashboardData } from '../../mock/dealer/dealerDashboard.mock';


export const getLiveDealerDashboard =
  async (): Promise<DealerDashboardData> => {
    const response = await fetch(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.DEALER_DASHBOARD}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dealer dashboard');
    }

    const result = await response.json();

    if (result?.data) {
      return result.data;
    }

    return result;
  };