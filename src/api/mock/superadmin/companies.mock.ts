export type CompanyStatus = 'Active' | 'Pending' | 'Inactive' | 'Suspended';

export type Company = {
  id: string;
  name: string;
  owner: string;
  city: string;
  initials: string;
  avatarColor: string;
  status: CompanyStatus;
  franchises: number;
  revenue: number;
  revenueLabel: string;
  addedLabel: string;
  addedDaysAgo: number;
};

export type CompaniesData = {
  companies: Company[];
};

export const statusOptions: CompanyStatus[] = [
  'Active',
  'Pending',
  'Inactive',
  'Suspended',
];

export const mockCompaniesData: CompaniesData = {
  companies: [
    {
      id: '1',
      name: 'TechCorp India',
      owner: 'Rajesh Sharma',
      city: 'Mumbai',
      initials: 'TC',
      avatarColor: '#061B66',
      status: 'Active',
      franchises: 24,
      revenue: 2400000,
      revenueLabel: '₹24L MTD',
      addedLabel: 'Jan 2024',
      addedDaysAgo: 120,
    },
    {
      id: '2',
      name: 'Reliance Industries',
      owner: 'Amit Shah',
      city: 'Delhi',
      initials: 'RI',
      avatarColor: '#008A36',
      status: 'Pending',
      franchises: 0,
      revenue: 0,
      revenueLabel: '₹0 MTD',
      addedLabel: '3 days ago',
      addedDaysAgo: 3,
    },
    {
      id: '3',
      name: 'ABC Distributors',
      owner: 'Priya Patel',
      city: 'Pune',
      initials: 'AB',
      avatarColor: '#E00014',
      status: 'Suspended',
      franchises: 12,
      revenue: 800000,
      revenueLabel: '₹8L MTD',
      addedLabel: 'Oct 2023',
      addedDaysAgo: 220,
    },
    {
      id: '4',
      name: 'MNO Brands',
      owner: 'Suresh Kumar',
      city: 'Chennai',
      initials: 'MN',
      avatarColor: '#5C28B8',
      status: 'Inactive',
      franchises: 6,
      revenue: 200000,
      revenueLabel: '₹2L MTD',
      addedLabel: 'Aug 2023',
      addedDaysAgo: 280,
    },
  ],
};

export const getMockCompanies = async (): Promise<CompaniesData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCompaniesData);
    }, 300);
  });
};