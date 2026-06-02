import { dashboardData } from "../../../screens/superAdmin/Dashboard/constants/dashboardData";


export const getMockSuperAdminDashboard = async () => {
  return new Promise<typeof dashboardData>(resolve => {
    setTimeout(() => {
      resolve(dashboardData);
    }, 500);
  });
};