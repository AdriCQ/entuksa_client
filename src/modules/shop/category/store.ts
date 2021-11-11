import { InjectionKey, reactive } from 'vue';
import { IShopCategory } from './types';
// import { ShopCategoryService } from './service';
/**
 * ShopCategory
 */
export class ShopCategory
{
  // private service = ShopCategoryService();
  private _categories = reactive<IShopCategory[]>([]);
  /**
   * Setters & Getters
   */
  get categories () { return this._categories; }
  set categories (_cat: IShopCategory[]) { this._categories = _cat }
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