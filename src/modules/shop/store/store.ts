import { IShopStore } from 'src/modules';
import { InjectionKey } from 'vue';
/**
 * 
 */
export class ShopStore
{
  private _store: IShopStore | null = null;
  private _stores: IShopStore[] = [];
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
}
/**
 * 
 */
export const shopStore = new ShopStore();
/**
 * 
 */
export const shopStoreKey: InjectionKey<ShopStore> = Symbol('ShopStore');