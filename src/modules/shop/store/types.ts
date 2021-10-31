import { IUserProfile } from 'src/modules/user/types';
import { DataBase } from 'src/types';
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
}