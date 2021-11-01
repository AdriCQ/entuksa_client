import { IShopOffer } from 'src/modules';
import { InjectionKey } from 'vue';
/**
 * Shop offer store
 */
export class ShopOfferStore
{
  private _offer: IShopOffer | null = null;
  private _offers: IShopOffer[] = [];
  /**
   * Offer Setter & Getter
   */
  get offer () { return this._offer; }
  set offer (_offer: IShopOffer | null) { this._offer = _offer; }
  /**
   * Offers Setter & Getter
   */
  get offers () { return this._offers; }
  set offers (_offers: IShopOffer[]) { this._offers = _offers; }
}
/**
 * @const shopOffer instance
 */
export const shopOffer = new ShopOfferStore();
/**
 * shopOfferKey
 */
export const shopOfferKey: InjectionKey<ShopOfferStore> = Symbol('ShopOffer');
