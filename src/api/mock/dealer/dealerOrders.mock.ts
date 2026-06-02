export type MainTab = 'customer' | 'stock';

export type OrderFilter =
  | 'All'
  | 'Pending'
  | 'Processing'
  | 'Delivered'
  | 'Cancelled';

export type CustomerOrderStatus = 'Processing' | 'Delivered' | 'Cancelled';

export type StockOrderStatus =
  | 'In Transit'
  | 'Approval Pending'
  | 'Delivered'
  | 'Cancelled';

export type CustomerOrder = {
  id: string;
  customer: string;
  location: string;
  status: CustomerOrderStatus;
  amount: string;
  date: string;
  items: string;
  paymentStatus: string;
  invoice: string;
};

export type StockOrder = {
  id: string;
  stockist: string;
  location: string;
  status: StockOrderStatus;
  amount: string;
  dateLabel: string;
  sku: string;
  orderStatus: string;
  expectedDelivery: string;
};

export type SummaryItem = {
  id: string;
  label: string;
  value: string;
  icon: 'customer' | 'pending' | 'inventory' | 'cancelled';
  color: string;
  bg: string;
};

export type DealerOrdersData = {
  customerOrders: CustomerOrder[];
  stockOrders: StockOrder[];
  summary: SummaryItem[];
};

export const dealerOrdersMock: DealerOrdersData = {
  customerOrders: [
    {
      id: '#CUST-2201',
      customer: 'Rahul Kirana Store',
      location: 'Jaipur, Rajasthan',
      status: 'Processing',
      amount: '₹4,200',
      date: '21 May 2026, 10:30 AM',
      items: '8 items',
      paymentStatus: 'Partial Paid',
      invoice: '#INV-2201',
    },
    {
      id: '#CUST-2200',
      customer: 'Sharma General Store',
      location: 'Jaipur, Rajasthan',
      status: 'Delivered',
      amount: '₹6,850',
      date: '20 May 2026, 06:15 PM',
      items: '12 items',
      paymentStatus: 'Paid Full',
      invoice: '#INV-2200',
    },
  ],
  stockOrders: [
    {
      id: '#PO-8821',
      stockist: 'Rajesh Stockist',
      location: 'Jaipur, Rajasthan',
      status: 'In Transit',
      amount: '₹42,000',
      dateLabel: 'Expected: Tomorrow',
      sku: '32 SKUs',
      orderStatus: 'In Transit',
      expectedDelivery: '22 May 2026',
    },
    {
      id: '#PO-8820',
      stockist: 'Mohan Stockist',
      location: 'Jaipur, Rajasthan',
      status: 'Approval Pending',
      amount: '₹18,750',
      dateLabel: 'Placed: 21 May 2026',
      sku: '24 SKUs',
      orderStatus: 'Approval Pending',
      expectedDelivery: '--',
    },
  ],
  summary: [
    {
      id: '1',
      label: 'Customer Orders Today',
      value: '18',
      icon: 'customer',
      color: '#173CFF',
      bg: '#173CFF',
    },
    {
      id: '2',
      label: 'Pending Deliveries',
      value: '7',
      icon: 'pending',
      color: '#F06419',
      bg: '#F06419',
    },
    {
      id: '3',
      label: 'Incoming Inventory',
      value: '₹68,500',
      icon: 'inventory',
      color: '#138A36',
      bg: '#138A36',
    },
    {
      id: '4',
      label: 'Cancelled Orders',
      value: '2',
      icon: 'cancelled',
      color: '#E00014',
      bg: '#E00014',
    },
  ],
};

export const getMockDealerOrders = async (): Promise<DealerOrdersData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dealerOrdersMock);
    }, 300);
  });
};