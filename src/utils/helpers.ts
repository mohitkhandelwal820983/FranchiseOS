export const helpers = {
  formatCurrency: (value: number, currency: string = '₹'): string => {
    return `${currency}${value.toLocaleString('en-IN')}`;
  },

  formatDate: (date: string | Date, format: string = 'DD/MM/YYYY'): string => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return format.replace('DD', day).replace('MM', month).replace('YYYY', String(year));
  },

  truncateString: (str: string, length: number = 20): string => {
    return str.length > length ? `${str.substring(0, length)}...` : str;
  },

  capitalizeFirst: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getInitials: (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  },

  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
};
