export type NetworkStatus = 'Active' | 'Inactive' | 'Overdue' | 'At Risk';

export type Stockist = {
  id: string;
  type: 'stockist';
  initials: string;
  name: string;
  city: string;
  zone: string;
  dealers: number;
  revenue: number;
  revenueLabel: string;
  target: number;
  targetLabel: string;
  score: number;
  status: NetworkStatus;
  payment: string;
  lastActive: string;
  color: string;
  statusColor: string;
  statusBg: string;
  statusBorder: string;
  progressColor: string;
  riskNote?: string;
  orders: number;
  pinCode: string;
};

export type DirectDealer = {
  id: string;
  type: 'dealer';
  initials: string;
  name: string;
  city: string;
  revenue: number;
  revenueLabel: string;
  status: NetworkStatus;
  color: string;
  orders: number;
  score: number;
  pinCode: string;
};

export type CompanyNetworkData = {
  notificationCount: string;
  stockists: Stockist[];
  dealers: DirectDealer[];
};

export type FilterChip = {
  id: string;
  label: string;
  value:
    | 'all'
    | 'stockists'
    | 'dealers'
    | 'active'
    | 'inactive'
    | 'overdue'
    | 'risk';
};

export type SortOption = 'revenue' | 'name' | 'score' | 'orders';

export const mockCompanyNetworkData: CompanyNetworkData = {
  notificationCount: '8',
  stockists: [
    {
      id: 'stockist-a',
      type: 'stockist',
      initials: 'SA',
      name: 'Stockist A',
      city: 'Mumbai',
      zone: 'Zone A',
      dealers: 12,
      revenue: 24,
      revenueLabel: '₹24L MTD',
      target: 85,
      targetLabel: '85% target',
      score: 88,
      status: 'Active',
      payment: 'All Clear',
      lastActive: '2 hours ago',
      color: '#061B66',
      statusColor: '#087A22',
      statusBg: '#EAF8EC',
      statusBorder: '#BEE7C5',
      progressColor: '#173CFF',
      orders: 42,
      pinCode: '400001',
    },
    {
      id: 'stockist-b',
      type: 'stockist',
      initials: 'SB',
      name: 'Stockist B',
      city: 'Delhi',
      zone: 'Zone B',
      dealers: 8,
      revenue: 18,
      revenueLabel: '₹18L MTD',
      target: 75,
      targetLabel: '75% target',
      score: 82,
      status: 'Active',
      payment: 'All Clear',
      lastActive: '4 hours ago',
      color: '#7412D9',
      statusColor: '#087A22',
      statusBg: '#EAF8EC',
      statusBorder: '#BEE7C5',
      progressColor: '#173CFF',
      orders: 35,
      pinCode: '110001',
    },
    {
      id: 'stockist-c',
      type: 'stockist',
      initials: 'SC',
      name: 'Stockist C',
      city: 'Chennai',
      zone: 'Zone C',
      dealers: 15,
      revenue: 3.8,
      revenueLabel: '₹3.8L MTD',
      target: 48,
      targetLabel: '48% target',
      score: 38,
      status: 'At Risk',
      payment: 'Pending',
      lastActive: '2 months ago',
      color: '#C80016',
      statusColor: '#D90014',
      statusBg: '#FFF0F0',
      statusBorder: '#FFC7C7',
      progressColor: '#E00014',
      riskNote: 'Below target 2 months — action needed',
      orders: 9,
      pinCode: '600001',
    },
  ],
  dealers: [
    {
      id: 'dealer-1',
      type: 'dealer',
      initials: 'DD1',
      name: 'Direct Dealer 1',
      city: 'Pune',
      revenue: 6,
      revenueLabel: '₹6L',
      status: 'Active',
      color: '#173CFF',
      orders: 18,
      score: 79,
      pinCode: '411001',
    },
    {
      id: 'dealer-2',
      type: 'dealer',
      initials: 'DD2',
      name: 'Direct Dealer 2',
      city: 'Nashik',
      revenue: 4.2,
      revenueLabel: '₹4.2L',
      status: 'Active',
      color: '#173CFF',
      orders: 13,
      score: 73,
      pinCode: '422001',
    },
  ],
};

export const filterChips: FilterChip[] = [
  {id: '1', label: 'All 108', value: 'all'},
  {id: '2', label: 'Stockists 12', value: 'stockists'},
  {id: '3', label: 'Dealers 96', value: 'dealers'},
  {id: '4', label: 'Active', value: 'active'},
  {id: '5', label: 'Inactive', value: 'inactive'},
  {id: '6', label: 'Overdue', value: 'overdue'},
  {id: '7', label: 'At Risk', value: 'risk'},
];

export const getMockCompanyNetwork = async (): Promise<CompanyNetworkData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCompanyNetworkData);
    }, 300);
  });
};