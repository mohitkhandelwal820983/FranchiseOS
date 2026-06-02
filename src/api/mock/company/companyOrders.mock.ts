export type OrderStatus =
  | 'All'
  | 'Approved'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type OrderItem = {
  id: string;
  orderNo: string;
  date: string;
  flow: string;
  product: string;
  quantity: number;
  amount: string;
  status: Exclude<OrderStatus, 'All'>;
  commission?: string;
  reason?: string;
  franchise: string;
  zone: string;
  valueType: 'low' | 'medium' | 'high';
};

export type CompanyOrdersData = {
  totalMTD: string;
  completed: string;
  orders: OrderItem[];
};

export type FilterState = {
  franchise: string;
  zone: string;
  date: string;
  value: string;
};

export const mockCompanyOrdersData: CompanyOrdersData = {
  totalMTD: '342',
  completed: '298',
  orders: [
    {
      id: '1',
      orderNo: '#ORD-003',
      date: '15 Jan 2026',
      flow: 'Dealer 2  →  Stockist A  →  Company',
      product: 'Product A',
      quantity: 200,
      amount: '₹1,60,000',
      status: 'Delivered',
      commission: 'Commission: ₹8,000 earned',
      franchise: 'Stockist A',
      zone: 'Mumbai',
      valueType: 'high',
    },
    {
      id: '2',
      orderNo: '#ORD-004',
      date: '14 Jan 2026',
      flow: 'Direct Dealer 1  →  Company',
      product: 'Product B',
      quantity: 50,
      amount: '₹45,000',
      status: 'Shipped',
      commission: 'Commission: ₹1,350 earned',
      franchise: 'Direct Dealer 1',
      zone: 'Pune',
      valueType: 'medium',
    },
    {
      id: '3',
      orderNo: '#ORD-005',
      date: '13 Jan 2026',
      flow: 'Dealer 5  →  Stockist B',
      product: 'Product C',
      quantity: 30,
      amount: '₹36,000',
      status: 'Cancelled',
      reason: 'Reason: Out of stock',
      franchise: 'Stockist B',
      zone: 'Delhi',
      valueType: 'low',
    },
    {
      id: '4',
      orderNo: '#ORD-006',
      date: '12 Jan 2026',
      flow: 'Dealer 8  →  Stockist C  →  Company',
      product: 'Product D',
      quantity: 110,
      amount: '₹92,000',
      status: 'Approved',
      commission: 'Commission: ₹4,600 earned',
      franchise: 'Stockist C',
      zone: 'Chennai',
      valueType: 'high',
    },
    {
      id: '5',
      orderNo: '#ORD-007',
      date: '11 Jan 2026',
      flow: 'Direct Dealer 2  →  Company',
      product: 'Product E',
      quantity: 25,
      amount: '₹22,000',
      status: 'Delivered',
      commission: 'Commission: ₹1,100 earned',
      franchise: 'Direct Dealer 2',
      zone: 'Nashik',
      valueType: 'low',
    },
  ],
};

export const getMockCompanyOrders = async (): Promise<CompanyOrdersData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCompanyOrdersData);
    }, 300);
  });
};