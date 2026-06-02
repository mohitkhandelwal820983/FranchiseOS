import {API_CONFIG} from '../config';
import {
  getMockPlaceNewOrder,
  PlaceNewOrderData,
} from '../mock/stockist/placeNewOrder.mock';
import {getLivePlaceNewOrder} from '../services/stockist/placeNewOrder.services';

export const getPlaceNewOrder =
  async (): Promise<PlaceNewOrderData> => {
    if (API_CONFIG.USE_DUMMY_API) {
      return getMockPlaceNewOrder();
    }

    return getLivePlaceNewOrder();
  };