export type MainTab = 'dealer' | 'purchase';

export type DealerStatus =
  | 'All'
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PurchaseStatus =
  | 'All'
  | 'Pending'
  | 'Approved'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled';

export type StepStatus = 'done' | 'pending' | 'active';

export type StepItem = {
  id: string;
  label: string;
  status: StepStatus;
  sub?: string;
};

export type DealerOrder = {
  id: string;
  dealer: string;
  meta: string;
  status: Exclude<DealerStatus, 'All'> | 'Ready Dispatch';
  statusColor: string;
  statusBg: string;
  icon: 'approval' | 'dispatch' | 'delivered';
  iconBg: string;
  products?: string;
  units?: string;
  amount: string;
  amountLabel: string;
  warehouse?: string;
  paid?: boolean;
  steps: StepItem[];
};

export type PurchaseOrder = {
  id: string;
  supplier: string;
  subtitle: string;
  status: Exclude<PurchaseStatus, 'All'> | 'Approval Pending' | 'Delayed';
  statusColor: string;
  statusBg: string;
  icon: 'supplier' | 'truck' | 'warning';
  iconBg: string;
  skus?: string;
  cartons?: string;
  units: string;
  amount: string;
  lowStock?: string;
  delivery?: string;
  delayed?: string;
  impact?: string;
  aiSuggestion?: string;
  steps: StepItem[];
};

export type StockistOrdersData = {
  dealerSummary: {
    totalOrders: string;
    orderValue: string;
    pendingApprovals: string;
    dispatchToday: string;
  };
  purchaseSummary: {
    totalPOs: string;
    poValue: string;
    pendingApproval: string;
    inTransit: string;
  };
  dealerOrders: DealerOrder[];
  purchaseOrders: PurchaseOrder[];
};

export const stockistOrdersMock: StockistOrdersData = {
  dealerSummary: {
    totalOrders: '248',
    orderValue: '₹18.4L',
    pendingApprovals: '12',
    dispatchToday: '8',
  },
  purchaseSummary: {
    totalPOs: '48',
    poValue: '₹18.4L',
    pendingApproval: '12',
    inTransit: '8',
  },
  dealerOrders: [
    {
      id: '#ORD-1023',
      dealer: 'ABC Dealers',
      meta: 'Today 10:42 AM',
      status: 'Pending',
      statusColor: '#F06419',
      statusBg: '#FFF3E9',
      icon: 'approval',
      iconBg: '#F06419',
      products: '12 products',
      units: '84 units',
      amount: '₹24,400',
      amountLabel: 'Total',
      steps: [
        {id: '1', label: 'Order Placed', status: 'done'},
        {id: '2', label: 'Waiting Approval', status: 'active'},
        {id: '3', label: 'Dispatch Pending', status: 'pending'},
      ],
    },
    {
      id: '#ORD-1022',
      dealer: 'Modern Mart',
      meta: 'Delivery: Jaipur',
      status: 'Ready Dispatch',
      statusColor: '#173CFF',
      statusBg: '#F1F5FF',
      icon: 'dispatch',
      iconBg: '#173CFF',
      products: '28 items',
      amount: '₹48,200',
      amountLabel: 'Total',
      warehouse: 'A-12',
      steps: [
        {id: '1', label: 'Packed', status: 'done'},
        {id: '2', label: 'Invoice Generated', status: 'done'},
        {id: '3', label: 'Awaiting Pickup', status: 'active'},
      ],
    },
    {
      id: '#ORD-1021',
      dealer: 'Shree Krishna Traders',
      meta: 'Delivered on: 20 May 2026',
      status: 'Delivered',
      statusColor: '#138A36',
      statusBg: '#EAF8EC',
      icon: 'delivered',
      iconBg: '#138A36',
      amount: '',
      amountLabel: '',
      paid: true,
      steps: [],
    },
  ],
  purchaseOrders: [
    {
      id: '#PO-8821',
      supplier: 'Hindustan Foods Ltd',
      subtitle: 'Low stock auto replenishment',
      status: 'Approval Pending',
      statusColor: '#F06419',
      statusBg: '#FFF3E9',
      icon: 'supplier',
      iconBg: '#7B22EA',
      skus: '18 SKUs',
      units: '420 units',
      amount: '₹1,84,000',
      lowStock: '8',
      steps: [
        {id: '1', label: 'PO Created', status: 'done', sub: '21 May, 10:15 AM'},
        {id: '2', label: 'Sent to Company', status: 'done', sub: '21 May, 10:20 AM'},
        {id: '3', label: 'Approval Pending', status: 'active', sub: '—'},
        {id: '4', label: 'Dispatch Pending', status: 'pending', sub: '—'},
      ],
    },
    {
      id: '#PO-8820',
      supplier: 'Nestle Distribution',
      subtitle: 'Expected delivery: 23 May 2026',
      status: 'In Transit',
      statusColor: '#173CFF',
      statusBg: '#F1F5FF',
      icon: 'truck',
      iconBg: '#173CFF',
      cartons: '12 cartons',
      units: '280 units',
      amount: '₹96,000',
      steps: [
        {id: '1', label: 'Order Approved', status: 'done'},
        {id: '2', label: 'Packed', status: 'done'},
        {id: '3', label: 'Shipped', status: 'done'},
        {id: '4', label: 'Out for Delivery', status: 'active'},
      ],
    },
    {
      id: '#PO-8818',
      supplier: 'ITC Foods',
      subtitle: 'Expected delivery: 18 May 2026',
      status: 'Delayed',
      statusColor: '#E00014',
      statusBg: '#FFF0F0',
      icon: 'warning',
      iconBg: '#FFF0F0',
      units: '',
      amount: '',
      delayed: 'Delayed by 3 days',
      impact: '4 dealer orders may be affected',
      aiSuggestion: 'Temporarily restrict dealer ordering for affected products.',
      steps: [],
    },
  ],
};

export const getMockStockistOrders =
  async (): Promise<StockistOrdersData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(stockistOrdersMock);
      }, 300);
    });
  };