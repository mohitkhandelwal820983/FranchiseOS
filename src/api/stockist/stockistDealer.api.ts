import {API_CONFIG} from '../config';
import {
  getMockStockistDealer,
  StockistDealerData,
} from '../mock/stockist/stockistDealer.mock';
import {getLiveStockistDealer} from '../services/stockist/stockistDealer.services';

export const getStockistDealer =
  async (): Promise<StockistDealerData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockStockistDealer();
    }

    return getLiveStockistDealer();
  };