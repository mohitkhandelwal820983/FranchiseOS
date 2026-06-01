export const mockLogin = async (emailOrPhone: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (emailOrPhone === 'superadmin@gmail.com' ||
          emailOrPhone === '9999999999') &&
        password === '12345'
      ) {
        resolve({
          success: true,
          data: {
            id: 1,
            name: 'Super Admin',
            email: 'admin@franchiseos.com',
            role: 'SUPER_ADMIN',
            token: 'mock-super-admin-token',
          },
        });
        return;
      }

      if (
        (emailOrPhone === 'dealer@gmail.com' ||
          emailOrPhone === '8209832668') &&
        password === '12345'
      ) {
        resolve({
          success: true,
          data: {
            id: 4,
            name: 'ABC Dealers',
            email: 'dealer@franchiseos.com',
            role: 'DEALER',
            token: 'mock-dealer-token',
          },
        });
        return;
      }

      if (
        (emailOrPhone === 'company@gmail.com' ||
          emailOrPhone === '8209832665') &&
        password === '12345'
      ) {
        resolve({
          success: true,
          data: {
            id: 2,
            name: 'Reliance Industries',
            email: 'company@franchiseos.com',
            role: 'COMPANY',
            token: 'mock-company-token',
          },
        });
        return;
      }

      if (
        (emailOrPhone === 'stockist@gmail.com' ||
          emailOrPhone === '8209832667') &&
        password === '12345'
      ) {
        resolve({
          success: true,
          data: {
            id: 3,
            name: 'Stockist Network',
            email: 'stockist@franchiseos.com',
            role: 'STOCKIST',
            token: 'mock-stockist-token',
          },
        });
        return;
      }

      reject({
        success: false,
        message: 'Invalid Credentials',
      });
    }, 1500);
  });
};
