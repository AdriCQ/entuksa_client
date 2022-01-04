import { InjectionKey, ref } from 'vue';
import { IShopOffer } from './types';
import { ShopOfferService } from './service';
/**
 * Shop offer store
 */
export class ShopOfferStore
{
    private service = ShopOfferService();
    private _offer = ref<IShopOffer | null>(null);
    private _offers = ref<IShopOffer[]>([]);
    /**
     * Offer Setter & Getter
     */
    get offer () { return this._offer.value; }
    set offer (_offer: IShopOffer | null) { this._offer.value = _offer; }
    /**
     * Offers Setter & Getter
     */
    get offers () { return this._offers.value; }
    set offers (_offers: IShopOffer[]) { this._offers.value = _offers; }
    /**
     * -----------------------------------------
     *	Actions
     * -----------------------------------------
     */
    /**
     * actionFindOffer
     * @param _offerId 
     */
    async actionFindOffer (_offerId: number): Promise<IShopOffer>
    {
        try
        {
            const _resp = await this.service.find(_offerId);
            this.offer = _resp.data;
            return _resp.data;
        } catch (error) { this.offer = null; throw error; }
    }
}
/**
 * @const shopOffer instance
 */
export const shopOffer = new ShopOfferStore();
/**
 * shopOfferKey
 */
export const shopOfferKey: InjectionKey<ShopOfferStore> = Symbol('ShopOffer');
