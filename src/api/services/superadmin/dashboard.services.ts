import { API_CONFIG } from "../../config";


export const getLiveSuperAdminDashboard = async () => {
  const response = await fetch(
    `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.SUPER_ADMIN_DASHBOARD}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const result = await response.json();

  /**
   * If your API returns:
   * {
   *   success: true,
   *   data: {...}
   * }
   */
  if (result?.data) {
    return result.data;
  }

  /**
   * If your API directly returns dashboard object
   */
  return result;
};