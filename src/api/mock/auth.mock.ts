export const mockLogin = async (
  emailOrPhone: string,
  password: string,
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (emailOrPhone === 'admin@franchiseos.com' ||
          emailOrPhone === '9876543210') &&
        password === 'Admin@123'
      ) {
        resolve({
          success: true,
          data: {
            id: 1,
            name: 'Super Admin',
            email: 'admin@franchiseos.com',
            role: 'SUPER_ADMIN',
            token: 'mock-token',
          },
        });
      } else {
        reject({
          success: false,
          message: 'Invalid Credentials',
        });
      }
    }, 1500);
  });
};