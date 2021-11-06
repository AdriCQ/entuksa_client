import { DataBase } from 'src/types';
import { IUserProfile } from 'src/modules/user/types';
import { IShopOffer } from 'src/modules/shop/offer/types';
/**
 * Ishop store
 */
export interface IShopStore extends DataBase
{
  title: string;
  description: string;
  image: { id: number };
  score: number;
  owner?: IUserProfile;
  offers?: IShopOffer[];
}