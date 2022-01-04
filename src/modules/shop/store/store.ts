import { IShopStore } from 'src/modules';
import { InjectionKey, ref } from 'vue';
import { ShopStoreService } from './service';
/**
 * 
 */
export class ShopStore
{
    private _store = ref<IShopStore | null>(null);
    private _stores = ref<IShopStore[]>([]);
    private service = ShopStoreService();
    /**
     * Store getter & setter
     */
    get store () { return this._store.value }
    set store (s: IShopStore | null) { this._store.value = s; }
    /**
     * Stores getter & setter
     */
    get stores () { return this._stores.value }
    set stores (s: IShopStore[]) { this._stores.value = s; }
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
                this.store = _resp.data;
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