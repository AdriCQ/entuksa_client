import { DataBase } from 'src/types';

declare namespace IUser
{
  type rol = 'DEVELOPER' | 'ADMIN' | 'VENDOR' | 'MODERATOR' | 'DELIVER' | 'CLIENT'

  interface Profile extends DataBase
  {
    name: string,
    lastName: string,
    email: string,
    mobilePhone: string,
    password: string,
    roles: rol[]
  }

  /**
   * Services
   */
  export interface SignInParams
  {
    email: string,
    password: string
  }

  export interface SignInRes
  {
    user: Profile,
    token: string
  }
}