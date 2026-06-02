import { API_CONFIG } from "../config";
import { getMockSuperAdminDashboard } from "../mock/superadmin/dashboard.mock";

import { getLiveSuperAdminDashboard } from "../services/superadmin/dashboard.services";


export const getSuperAdminDashboard = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return getMockSuperAdminDashboard();
  }

  return getLiveSuperAdminDashboard();
};