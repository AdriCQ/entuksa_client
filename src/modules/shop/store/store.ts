import { IShopStore } from 'src/modules';
import { InjectionKey } from 'vue';
import { ShopStoreService } from './service';
/**
 * 
 */
export class ShopStore
{
  private _store: IShopStore | null = null;
  private _stores: IShopStore[] = [];
  private service = ShopStoreService();
  /**
   * Store getter & setter
   */
  get store () { return this._store }
  set store (s: IShopStore | null) { this._store = s; }
  /**
   * Stores getter & setter
   */
  get stores () { return this._stores }
  set stores (s: IShopStore[]) { this._stores = s; }
  /**
   * getById
   * @param _storeId 
   * @returns 
   */
  getById (_storeId: number): Promise<IShopStore>
  {
    return new Promise((_resolve, _reject) =>
    {
      this.service.getById(_storeId).then(_resp =>
      {
        this._store = _resp.data;
        _resolve(_resp.data);
      }).catch(_e => { _reject(_e) })

    })
  }
}
/**
 * 
 */
export const shopStore = new ShopStore();
/**
 * 
 */
export const shopStoreKey: InjectionKey<ShopStore> = Symbol('ShopStore');