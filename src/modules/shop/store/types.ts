import { DataBaseWithImage } from 'src/types';
import { IUserProfile } from 'src/modules/user/types';
import { IShopOffer } from 'src/modules/shop/offer/types';
/**
 * Ishop store
 */
export interface IShopStore extends DataBaseWithImage
{
  title: string;
  description: string;
  score: number;
  owner?: IUserProfile;
  offers?: IShopOffer[];
}