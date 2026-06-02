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
    SUPER_ADMIN_PROFILE: '/super-admin/profile',
    COMPANY_DASHBOARD: '/company/dashboard',
    COMPANY_NETWORK: '/company/network',
    COMPANY_NETWORK_DETAIL: '/company/network/detail',
    COMPANY_ORDERS: '/company/orders',
    COMPANY_FINANCE: '/company/finance',
    COMPANY_PROFILE: '/company/profile',
    STOCKIST_DASHBOARD: '/stockist/dashboard',
    STOCKIST_INVENTORY: '/stockist/inventory',
    STOCKIST_ORDERS: '/stockist/orders',
    PLACE_NEW_ORDER: '/stockist/place-new-order',
    STOCKIST_DEALER: '/stockist/dealers',
    STOCKIST_PROFILE: '/stockist/profile',
    DEALER_DASHBOARD: '/dealer/dashboard',
    DEALER_ORDERS: '/dealer/orders',
    DEALER_PAYMENT: '/dealer/payment',
    DEALER_PROFILE: '/dealer/profile',
  },
};
