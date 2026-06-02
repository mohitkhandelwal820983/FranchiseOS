export const API_CONFIG = {
  /**
   * true  = use local dummy/static data
   * false = call real backend API
   */
  USE_DUMMY_API: true,

  LIVE_BASE_URL: 'https://your-domain.com/api',

  ENDPOINTS: {
    SUPER_ADMIN_DASHBOARD: '/super-admin/dashboard',
    SUPER_ADMIN_COMPANIES: '/super-admin/companies',
    SUPER_ADMIN_PAYMENTS: '/super-admin/payments',
    COMPANY_DASHBOARD: '/company/dashboard',
    COMPANY_NETWORK: '/company/network',
    COMPANY_NETWORK_DETAIL: '/company/network/detail',
    COMPANY_ORDERS: '/company/orders',
    COMPANY_FINANCE: '/company/finance',
  },
};
