export type CompanyStatus = 'Active' | 'Pending' | 'Suspended' | 'Inactive';

export type CompanyItem = {
  id: number;
  initials: string;
  name: string;
  owner: string;
  location: string;
  franchises: string;
  revenue: string;
  added: string;
  status: CompanyStatus;
  avatarColor: string;
};

export const statusTabs = ['All', 'Active', 'Pending', 'Inactive', 'Suspended'];

export const dateTabs = ['This Month', 'Last Month', 'Last 3 Months', 'Custom Range'];

export const sortItems = ['Name', 'Date Added', 'Revenue'];

export const companies: CompanyItem[] = [
  {
    id: 1,
    initials: 'TC',
    name: 'TechCorp India',
    owner: 'Rajesh Sharma',
    location: 'Mumbai',
    franchises: '24 Franchises',
    revenue: '₹24L MTD',
    added: 'Added: Jan 2024',
    status: 'Active',
    avatarColor: '#001F63',
  },
  {
    id: 2,
    initials: 'RI',
    name: 'Reliance Industries',
    owner: 'Amit Shah',
    location: 'Delhi',
    franchises: '0 Franchises',
    revenue: '₹0 MTD',
    added: 'Added: 3 days ago',
    status: 'Pending',
    avatarColor: '#008D46',
  },
  {
    id: 3,
    initials: 'AB',
    name: 'ABC Distributors',
    owner: 'Priya Patel',
    location: 'Pune',
    franchises: '12 Franchises',
    revenue: '₹8L MTD',
    added: 'Added: Oct 2023',
    status: 'Suspended',
    avatarColor: '#E50914',
  },
  {
    id: 4,
    initials: 'MN',
    name: 'MNO Brands',
    owner: 'Suresh Kumar',
    location: 'Chennai',
    franchises: '6 Franchises',
    revenue: '₹2L MTD',
    added: 'Added: Aug 2023',
    status: 'Inactive',
    avatarColor: '#5E2BC6',
  },
];
