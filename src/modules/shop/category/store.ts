import { InjectionKey, ref } from 'vue';
import { IShopCategory } from './types';
// import { ShopCategoryService } from './service';
/**
 * ShopCategory
 */
export class ShopCategory
{
    // private service = ShopCategoryService();
    private _categories = ref<IShopCategory[]>([]);
    /**
     * Setters & Getters
     */
    get categories () { return this._categories.value; }
    set categories (_cat: IShopCategory[]) { this._categories.value = _cat }
    /**
     * getCategory
     * @param _tag 
     * @returns 
     */
    getCategory (_tag: string): IShopCategory | undefined
    {
        return this.categories.find(_cat => (_cat.id === _tag));
    }
}

export const shopCategoryStore = new ShopCategory();
export const shopCategoryKey: InjectionKey<ShopCategory> = Symbol('ShopCategoryStore')