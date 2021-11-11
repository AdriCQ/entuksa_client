import { IShopOffer } from 'src/modules';
import { DataBase } from 'src/types';
/**
 * IShopOrder
 */
export interface IShopOrder extends DataBase
{
  orderOffers: IShopOrderOffer[];
  status: IShopOrderStatus;
  deliver: IShopOrderDeliver
}
/**
 * IShopOrderDeliver
 */
export interface IShopOrderDeliver
{
  enabled: boolean;
  address?: string;
  requestTime?: Date;
  time?: Date;
}
/**
 * IShopOrderOffer
 */
export interface IShopOrderOffer
{
  offer: IShopOffer;
  qty: number;
}
/**
 * IShopOrderStatus
 */
export type IShopOrderStatus = '';