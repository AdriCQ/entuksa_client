import { IShopStore } from '../shop/store/types';
import { IShopOffer } from '../shop/offer/types';
import { IUserProfile } from '../user/types';

export type BlockType = 'offers-group' | 'offers-slider' | 'offer-widget' | 'stores-group' | 'stores-slider' | 'store-widget' | 'title-widget';
/**
 * IApp
 */
export interface IApp
{
  id: number
  title: string;
  package: string;
  settings: IAppSettings;
  roadmap: string[];
  token: string;
}
/**
 * IAppBlock
 */
export interface IAppBlock
{
  type: BlockType;
  data: IShopStore | IShopStore[] | IShopOffer | IShopOffer[];
  config: IAppBlockConfig;
}
/**
 * Iapp block config
 */
export interface IAppBlockConfig
{
  displayDense?: boolean;
  ratio?: number;
  displayOnly?: 'MOBILE' | 'DESKTOP';
}
/**
 * IAppLeftDrawerConfig
 */
export interface IAppLeftDrawerConfig
{
  mini: boolean;
}
/**
 * IAppResponseSetup
 */
export interface IAppResponseSetup
{
  blocks: IAppBlock[];
  stores?: IShopStore[];
  user?: IUserProfile;
  locality: unknown;
}
/**
 * IAppSettings
 */
export interface IAppSettings
{
  open?: boolean;
  delivery?: IAppSettingsDelivery;
}
/**
 * IAppSettingsDelivery
 */
export interface IAppSettingsDelivery
{
  type: 'STATIC' | 'DYNAMIC_DISTANCE',
  value: number;
}