import {API_CONFIG} from '../config';
import {
  getMockStockistOrders,
  StockistOrdersData,
} from '../mock/stockist/stockistOrders.mock';
import { getLiveStockistOrders } from '../services/stockist/stockistOrders.services';


export const getStockistOrders =
  async (): Promise<StockistOrdersData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockStockistOrders();
    }

    return getLiveStockistOrders();
  };