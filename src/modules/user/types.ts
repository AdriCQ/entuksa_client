import { DataBase } from 'src/types';
/**
 * IUserRole
 */
export type IUserRole = 'DEVELOPER' | 'ADMIN' | 'VENDOR' | 'MODERATOR' | 'DELIVER' | 'CLIENT'
/**
 * Iuser profile
 */
export interface IUserProfile extends DataBase
{
  name: string,
  lastName: string,
  email: string,
  mobilePhone: string,
  password: string,
  roles: IUserRole[]
}
/**
 * Iauth sign in params
 */
export interface IAuthSignInReq
{
  email: string,
  password: string
}
/**
 * Sign in res
 */
export interface IAuthRes
{
  user: IUserProfile,
  token: string
}
/**
 * Signup params
 */
export interface IAuthSignupReq
{
  name: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  password: string;
}
/**
 * IUserStorage
 */
export interface IUserStorage
{
  authToken: string;
  profile: IUserProfile;
}