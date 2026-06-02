export type InventoryFilter =
  | 'All'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Fast Moving'
  | 'Expiring Soon'
  | 'High Value';

export type ProductStatus =
  | 'Fast Moving'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Expiring Soon';

export type InventoryProduct = {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  image: string;
  status: ProductStatus;
  available: number;
  reserved: number;
  incoming: number;
  progress: number;
  soldThisWeek?: number;
  alertText?: string;
  alertSubText?: string;
  suggestedReorder?: string;
  affectedUnits?: string;
};

export type InventorySummary = {
  products: string;
  stockValue: string;
  lowStockAlerts: string;
};

export type StockistInventoryData = {
  summary: InventorySummary;
  products: InventoryProduct[];
};

export const stockistInventoryMock: StockistInventoryData = {
  summary: {
    products: '1,248',
    stockValue: '₹12.4L',
    lowStockAlerts: '8',
  },
  products: [
    {
      id: '1',
      name: 'Parle-G Biscuits 500g',
      sku: 'PRL-500',
      warehouse: 'Warehouse A-12',
      image: 'https://dummyimage.com/145x105/f7c94a/111111&text=Parle-G',
      status: 'Fast Moving',
      available: 248,
      reserved: 32,
      incoming: 120,
      progress: 78,
      soldThisWeek: 324,
    },
    {
      id: '2',
      name: 'Tata Salt 1kg',
      sku: 'TTS-1KG',
      warehouse: 'Warehouse B-05',
      image: 'https://dummyimage.com/145x105/f2762e/ffffff&text=Tata+Salt',
      status: 'Low Stock',
      available: 12,
      reserved: 8,
      incoming: 50,
      progress: 14,
      alertText: 'Only 12 units remaining',
      suggestedReorder: 'Minimum 100 units',
    },
    {
      id: '3',
      name: 'Coca Cola 750ml',
      sku: 'CCL-750',
      warehouse: 'Warehouse C-02',
      image: 'https://dummyimage.com/145x105/470000/ffffff&text=Coca+Cola',
      status: 'Out of Stock',
      available: 0,
      reserved: 48,
      incoming: 0,
      progress: 0,
      alertText: 'Out of Stock',
      alertSubText: '48 reserved orders waiting',
    },
    {
      id: '4',
      name: 'Amul Butter 100g',
      sku: 'AML-100',
      warehouse: 'Warehouse A-08',
      image: 'https://dummyimage.com/145x105/f5e69b/111111&text=Amul',
      status: 'Expiring Soon',
      available: 84,
      reserved: 16,
      incoming: 0,
      progress: 42,
      alertText: 'Expires in 12 days',
      alertSubText: '84 units affected',
      affectedUnits: '84 units affected',
    },
  ],
};

export const getMockStockistInventory =
  async (): Promise<StockistInventoryData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(stockistInventoryMock);
      }, 300);
    });
  };