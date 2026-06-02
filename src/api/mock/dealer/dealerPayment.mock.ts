export type SummaryCardType = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: 'collected' | 'outstanding' | 'supplier' | 'incentive';
  color: string;
  bg: string;
  trend: 'up' | 'down';
};

export type CollectionStatus = 'Overdue' | 'Due Soon' | 'Pending';

export type CustomerCollection = {
  id: string;
  initials: string;
  name: string;
  city: string;
  amount: string;
  dueDate: string;
  dueMeta: string;
  status: CollectionStatus;
  avatarBg: string;
  avatarColor: string;
};

export type SupplierPayment = {
  id: string;
  logo: string;
  name: string;
  amount: string;
  dueDate: string;
  dueMeta: string;
  status: CollectionStatus;
  logoBg: string;
  logoColor: string;
};

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  icon: 'received' | 'paid' | 'refund' | 'failed';
  color: string;
  bg: string;
};

export type DealerPaymentData = {
  summary: SummaryCardType[];
  collections: CustomerCollection[];
  suppliers: SupplierPayment[];
  transactions: Transaction[];
};

export const dealerPaymentMock: DealerPaymentData = {
  summary: [
    {
      id: '1',
      title: 'Collected This Month',
      value: '₹2,84,000',
      subtitle: '↑ 18% vs last month',
      icon: 'collected',
      color: '#138A36',
      bg: '#138A36',
      trend: 'up',
    },
    {
      id: '2',
      title: 'Outstanding Amount',
      value: '₹42,000',
      subtitle: '↓ 12% vs last month',
      icon: 'outstanding',
      color: '#E00014',
      bg: '#E00014',
      trend: 'down',
    },
    {
      id: '3',
      title: 'Pending Supplier Payments',
      value: '₹68,000',
      subtitle: '↑ 8% vs last month',
      icon: 'supplier',
      color: '#173CFF',
      bg: '#173CFF',
      trend: 'up',
    },
    {
      id: '4',
      title: 'Incentives Received',
      value: '₹8,400',
      subtitle: '↑ 15% vs last month',
      icon: 'incentive',
      color: '#7B22EA',
      bg: '#7B22EA',
      trend: 'up',
    },
  ],
  collections: [
    {
      id: '1',
      initials: 'RK',
      name: 'Rahul Kirana Store',
      city: 'Jaipur, Rajasthan',
      amount: '₹12,000',
      dueDate: '22 May 2026',
      dueMeta: 'Overdue',
      status: 'Overdue',
      avatarBg: '#EAF8EC',
      avatarColor: '#138A36',
    },
    {
      id: '2',
      initials: 'MR',
      name: 'Modern Retail Shop',
      city: 'Jaipur, Rajasthan',
      amount: '₹8,500',
      dueDate: '25 May 2026',
      dueMeta: '2 days left',
      status: 'Due Soon',
      avatarBg: '#FFF1E7',
      avatarColor: '#F06419',
    },
    {
      id: '3',
      initials: 'GS',
      name: 'Ganesh Supermarket',
      city: 'Jaipur, Rajasthan',
      amount: '₹6,200',
      dueDate: '28 May 2026',
      dueMeta: '5 days left',
      status: 'Pending',
      avatarBg: '#EEF3FF',
      avatarColor: '#173CFF',
    },
    {
      id: '4',
      initials: 'SK',
      name: 'Shree Krishna Store',
      city: 'Jaipur, Rajasthan',
      amount: '₹5,300',
      dueDate: '02 Jun 2026',
      dueMeta: '10 days left',
      status: 'Pending',
      avatarBg: '#F7F0FF',
      avatarColor: '#7B22EA',
    },
  ],
  suppliers: [
    {
      id: '1',
      logo: '🏢',
      name: 'Rajesh Stockist',
      amount: '₹42,000',
      dueDate: '23 May 2026',
      dueMeta: 'Overdue',
      status: 'Overdue',
      logoBg: '#F7F0FF',
      logoColor: '#7B22EA',
    },
    {
      id: '2',
      logo: 'Nestle',
      name: 'Nestle Supplier',
      amount: '₹18,500',
      dueDate: '26 May 2026',
      dueMeta: '2 days left',
      status: 'Due Soon',
      logoBg: '#EEF3FF',
      logoColor: '#173CFF',
    },
    {
      id: '3',
      logo: 'PARLE',
      name: 'Parle Distributor',
      amount: '₹7,500',
      dueDate: '30 May 2026',
      dueMeta: '6 days left',
      status: 'Pending',
      logoBg: '#F3F3F3',
      logoColor: '#E00014',
    },
  ],
  transactions: [
    {
      id: '1',
      title: 'Payment Received from Rahul Kirana Store',
      subtitle: 'Order #CUST-2198',
      amount: '+ ₹12,000',
      date: '21 May 2026, 10:30 AM',
      icon: 'received',
      color: '#138A36',
      bg: '#EAF8EC',
    },
    {
      id: '2',
      title: 'Payment Made to Rajesh Stockist',
      subtitle: 'Invoice #INV-8820',
      amount: '- ₹42,000',
      date: '20 May 2026, 04:15 PM',
      icon: 'paid',
      color: '#173CFF',
      bg: '#EEF3FF',
    },
    {
      id: '3',
      title: 'Refund to Modern Retail Shop',
      subtitle: 'Order #CUST-2190',
      amount: '+ ₹2,500',
      date: '19 May 2026, 11:20 AM',
      icon: 'refund',
      color: '#7B22EA',
      bg: '#F7F0FF',
    },
    {
      id: '4',
      title: 'Payment Failed from Sharma Store',
      subtitle: 'Order #CUST-2187',
      amount: '₹8,000',
      date: '18 May 2026, 09:45 AM',
      icon: 'failed',
      color: '#E00014',
      bg: '#FFF0F0',
    },
  ],
};

export const getMockDealerPayment = async (): Promise<DealerPaymentData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dealerPaymentMock);
    }, 300);
  });
};