export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  color: string;
};

export type PlaceNewOrderData = {
  products: Product[];
  defaultCustomer: string;
  defaultDeliveryAddress: string;
  defaultQuantities: Record<string, number>;
};

export const placeNewOrderMock: PlaceNewOrderData = {
  defaultCustomer: '',
  defaultDeliveryAddress:
    '123 Business Park, Jaipur Road,\nMumbai, Maharashtra - 400001',
  defaultQuantities: {
    '1': 1,
    '2': 0,
    '3': 0,
  },
  products: [
    {
      id: '1',
      name: 'Product A',
      sku: 'PRD-A',
      price: 500,
      stock: 248,
      color: '#173CFF',
    },
    {
      id: '2',
      name: 'Product B',
      sku: 'PRD-B',
      price: 900,
      stock: 110,
      color: '#138A36',
    },
    {
      id: '3',
      name: 'Product C',
      sku: 'PRD-C',
      price: 1200,
      stock: 72,
      color: '#F06419',
    },
  ],
};

export const getMockPlaceNewOrder =
  async (): Promise<PlaceNewOrderData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(placeNewOrderMock);
      }, 300);
    });
  };