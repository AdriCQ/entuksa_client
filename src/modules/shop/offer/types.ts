import { DataBase, IOnlyId } from 'src/types';
// import { IShopStore } from '../store/types';
/**
 * Ishop offer
 */
export interface IShopOffer extends DataBase
{
  title: string;
  description: string;
  smallDescription: string;
  type: IShopOfferType;
  prices: IShopOfferPrice;
  rating: number;
  attributes: IShopOfferAttribute[];
  configurables: IShopOfferConfigurable[];
  // configurableWithPrice: unknown
  onsale: boolean;
  stock: IShopOfferStock;
  validatedAt: Date | null;
  // Relations
  category: IOnlyId<string>;
  image: IOnlyId;
}
/**
 * Ishop offer attribute
 */
export interface IShopOfferAttribute
{
  name: string;
  value: string | number;
}
/**
 * Ishop offer configurable
 */
export interface IShopOfferConfigurable
{
  name: string;
  value: Array<string | number>;
}
/**
 * Ishop offer price
 */
export interface IShopOfferPrice
{
  sell: number;
  production: number;
  vendor: number;
}
/**
 * @type IShopOfferStatus
 */
export type IShopOfferStatus = 'INFINITY' | 'SOLD_OUT' | 'LIMITED';
/**
 * Ishop offer stock
 */
export interface IShopOfferStock
{
  status: IShopOfferStatus;
  qty: number;
}
/**
 * @type IShopOfferType
 */
export type IShopOfferType = 'PRODUCT' | 'SERVICE';
