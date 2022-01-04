import { InjectionKey, ref } from 'vue';
import { IShopOrder, IShopOrderOffer } from './types';
/**
 * ShopOrder
 */
export class ShopOrder
{
    private _order = ref<IShopOrder | null>(null);
    private _orderOffers = ref<IShopOrderOffer[]>([]);
    private _orders = ref<IShopOrder[]>([]);

    get order () { return this._order.value; }
    set order (_order: IShopOrder | null) { this._order.value = _order }

    get orderOffers () { return this._orderOffers.value; }
    set orderOffers (_of: IShopOrderOffer[]) { this._orderOffers.value = _of }

    get orders () { return this._orders.value }
    set orders (_orders: IShopOrder[]) { this._orders.value = _orders }

    get totalPrice ()
    {
        let total = 0;
        this.orderOffers.forEach(_of => { total += _of.qty * _of.offer.prices.sell })
        return total;
    }

    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * addOrderOffer
     * @param _orderOffer 
     */
    addOrderOffer (_orderOffer: IShopOrderOffer)
    {
        const index = this.orderOffers.findIndex(_of => _of.offer.id === _orderOffer.offer.id);
        if (index < 0)
            this.orderOffers.push(_orderOffer);
        else
        {
            this.orderOffers[index].qty += _orderOffer.qty;
        }
    }
    /**
     * changeOrderOfferQty
     * @param _params 
     */
    changeOrderOfferQty (_params: { offerId: number, qty: number }): number
    {
        let resp = 0;
        this.orderOffers.forEach(_of =>
        {
            if (_of.offer.id === _params.offerId)
            {
                resp = _of.qty;
                if (!(_of.offer.stock.status == 'LIMITED' && _of.offer.stock.qty < _params.qty))
                {
                    _of.qty = _params.qty;
                    resp = _params.qty;
                }
            }
        });
        return resp
    }
    /**
     * removeOrderOffer
     * @param _orderOffer 
     */
    removeOrderOffer (_orderOffer: IShopOrderOffer)
    {
        const index = this.orderOffers.findIndex(_of => _of.offer.id === _orderOffer.offer.id);
        if (index >= 0)
            this.orderOffers.splice(index, 1);
    }

}

export const shopOrder = new ShopOrder();
export const shopOrderKey: InjectionKey<ShopOrder> = Symbol('ShopOrder')