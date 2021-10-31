import { InjectionKey } from 'vue';
/**
 * 
 */
export class ShopStore
{

}
/**
 * 
 */
export const shopStore = new ShopStore();
/**
 * 
 */
export const shopStoreKey: InjectionKey<ShopStore> = Symbol('ShopStore');