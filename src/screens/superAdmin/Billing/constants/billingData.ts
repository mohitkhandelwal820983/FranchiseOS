export const periods = ['Today', 'Week', 'Month', 'Quarter'];

export const summaryStats = [
  {
    title: 'Subscription Revenue MTD',
    value: '₹2,40,000',
    subtitle: 'Your platform earnings',
    note: '↑ +12% vs last month',
    type: 'revenue',
    color: '#087A26',
    bg: '#EAF8EE',
  },
  {
    title: 'Outstanding Subscriptions',
    value: '₹60,000',
    subtitle: '3 companies due',
    type: 'clock',
    color: '#E85B10',
    bg: '#FFF0E8',
  },
  {
    title: 'Overdue Subscriptions',
    value: '₹20,000',
    subtitle: '1 company overdue',
    type: 'warning',
    color: '#D71920',
    bg: '#FFECEC',
  },
  {
    title: 'Annual Recurring Revenue',
    value: '₹28,80,000',
    subtitle: 'Projected ARR',
    type: 'chart',
    color: '#1557F5',
    bg: '#EDF2FF',
  },
];

export const plans = [
  {name: 'Basic', price: '₹5,000/month', companies: '8 companies', color: '#001F63'},
  {name: 'Professional', price: '₹15,000/month', companies: '12 companies', color: '#1557F5'},
  {name: 'Enterprise', price: '₹40,000/month', companies: '4 companies', color: '#6D28D9'},
];

export const subscriptions = [
  {initials: 'TC', name: 'TechCorp India', desc: 'Professional — ₹15,000/month', date: 'Renewal: 15 Jun 2026', status: 'Paid', color: '#001F63'},
  {initials: 'RI', name: 'Reliance Industries', desc: 'Enterprise — ₹40,000/month', date: 'Renewal: 30 Jun 2026', status: 'Paid', color: '#008D46'},
  {initials: 'MN', name: 'MNO Brands', desc: 'Professional — ₹15,000/month', date: 'Overdue since: 1 May 2026', status: 'Overdue', action: 'Send Reminder', color: '#F15A24'},
  {initials: 'AB', name: 'ABC Distributors', desc: 'Basic — ₹5,000/month', date: 'Trial expires: 25 May 2026', status: 'Trial', action: 'Upgrade Plan', color: '#555555'},
];

export const transactions = [
  {name: 'TechCorp India', desc: 'Professional Plan — Monthly', date: '15 May 2026', amount: '₹15,000', status: 'Paid', type: 'paid'},
  {name: 'Reliance Industries', desc: 'Enterprise Plan — Monthly', date: '10 May 2026', amount: '₹40,000', status: 'Paid', type: 'paid'},
  {name: 'MNO Brands', desc: 'Professional Plan — Monthly', date: 'Due: 1 May 2026', amount: '₹15,000', status: 'Overdue', action: 'Send Invoice', type: 'overdue'},
  {name: 'ABC Distributors', desc: 'Basic Plan — Trial Ending', date: 'Due: 25 May 2026', amount: '₹5,000', status: 'Due Soon', type: 'due'},
];
