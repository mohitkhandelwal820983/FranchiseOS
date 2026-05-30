// src/api/config.ts

export const API_CONFIG = {
  IS_DEMO: true,

  DEMO_BASE_URL: 'https://dummyjson.com',
  LIVE_BASE_URL: 'https://yourdomain.com/api',
};

export const BASE_URL = API_CONFIG.IS_DEMO
  ? API_CONFIG.DEMO_BASE_URL
  : API_CONFIG.LIVE_BASE_URL;