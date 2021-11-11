import { api } from 'src/boot/axios';
import { IShopOffer } from './types';

/**
 * ShopOfferService
 */
export function ShopOfferService ()
{
  const find = (_offerId: number) => api.get<IShopOffer>(`/api/shop/offers/${_offerId}`);

  return {
    find
  }
}