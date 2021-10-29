import { api } from 'src/boot/axios';
import { IUser } from 'src/types';
/**
 * UserServices
 * @returns 
 */
export function UserServices ()
{
  const signIn = (params: IUser.SignInParams) => api.post<IUser.SignInRes>('/users/auth/signin', params)

  return {
    signIn
  }
}