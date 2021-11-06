import axios from "axios";
import { IShopStore } from "src/modules";
/**
 * ShopStoreService
 * @returns 
 */
export function ShopStoreService ()
{
  const API = '/api/shop/stores';
  /**
   * getById
   * @param _storeId 
   * @returns 
   */
  const getById = (_storeId: number) => axios.get<IShopStore>(API, { params: { id: _storeId } });

  return {
    getById
  }
}