import { api } from 'src/boot/axios';
import { IAuthRes, IAuthSignInReq, IAuthSignupReq } from './types';
/**
 * UserServices
 * @returns 
 */
export function UserServices ()
{
  const API = '/users/auth';
  const signIn = (params: IAuthSignInReq) => api.post<IAuthRes>(API + '/signin', params)
  const signUp = (params: IAuthSignupReq) => api.post<IAuthRes>(API + '/signup', params)

  return {
    signIn, signUp
  }
}