
import { API_CONFIG } from '../config';
import {
  getMockStockistInventory,
  StockistInventoryData,
} from '../mock/stockist/stockistInventory.mock';
import { getLiveStockistInventory } from '../services/stockist/stockistInventory.services';


export const getStockistInventory =
  async (): Promise<StockistInventoryData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockStockistInventory();
    }

    return getLiveStockistInventory();
  };