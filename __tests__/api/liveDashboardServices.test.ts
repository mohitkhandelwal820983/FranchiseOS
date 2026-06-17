import {API_CONFIG} from '../../src/api/config';
import {getLiveCompanyDashboard} from '../../src/api/services/company/dashboard.services';
import {getLiveSuperAdminDashboard} from '../../src/api/services/superadmin/dashboard.services';

describe('live dashboard services', () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and unwraps company dashboard data', async () => {
    const data = {companyName: 'Reliance Industries'};
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({success: true, data}),
    });

    await expect(getLiveCompanyDashboard()).resolves.toEqual(data);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_DASHBOARD}`,
      expect.objectContaining({method: 'GET'}),
    );
  });

  it('throws when company dashboard request fails', async () => {
    (global as any).fetch.mockResolvedValue({ok: false});

    await expect(getLiveCompanyDashboard()).rejects.toThrow(
      'Failed to fetch company dashboard',
    );
  });

  it('fetches and unwraps super admin dashboard data', async () => {
    const data = {totalCompanies: 10};
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({success: true, data}),
    });

    await expect(getLiveSuperAdminDashboard()).resolves.toEqual(data);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_CONFIG.LIVE_BASE_URL}${API_CONFIG.ENDPOINTS.SUPER_ADMIN_DASHBOARD}`,
      expect.objectContaining({method: 'GET'}),
    );
  });

  it('throws when super admin dashboard request fails', async () => {
    (global as any).fetch.mockResolvedValue({ok: false});

    await expect(getLiveSuperAdminDashboard()).rejects.toThrow(
      'Failed to fetch dashboard data',
    );
  });
});
