export const getDashboardData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        welcomeName: 'Super Admin',

        overview: {
          totalCompanies: 24,
          activeToday: 18,
          activeMonth: 22,
          newThisMonth: 3,
          inactive30Days: 2,
        },

        systemHealth: {
          uptime: 99.9,
          activeUsers: 92,
          orderSuccessRate: 96,
          tenantIsolation: 100,
        },

        revenue: {
          total: 240000,
          collected: 180000,
          due: 60000,
          overdue: 0,
        },

        attention: [
          {
            id: 1,
            title: 'ABC Corp subscription overdue',
            subtitle: '3 days overdue',
            action: 'Send Reminder',
          },
          {
            id: 2,
            title: '2 companies pending approval',
            subtitle: 'Waiting since yesterday',
            action: 'Review Now',
          },
        ],

        companies: [
          {
            id: 1,
            name: 'TechCorp India',
            owner: 'Rajesh Sharma',
            city: 'Mumbai',
            status: 'Active',
            plan: 'Professional',
          },
          {
            id: 2,
            name: 'Reliance Industries',
            owner: 'Amit Shah',
            city: 'Delhi',
            status: 'Active',
            plan: 'Enterprise',
          },
        ],
      });
    }, 1000);
  });
};