import { api } from 'src/boot/axios';
import { IShopStore } from 'src/modules';
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
  const getById = (_storeId: number) => api.get<IShopStore>(API + `/${_storeId}`);

  return {
    getById
  }
}