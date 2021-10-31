import { reactive, ref, InjectionKey } from 'vue';
import { IUserProfile } from './types';
/**
 * 
 */
export class UserStore
{
  /**
   * Properties
   */
  private _profile = reactive<IUserProfile>({
    id: 0,
    createdAt: '',
    upadateAt: '',
    name: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    password: '',
    roles: []
  });;
  private _authToken = ref<string | null>(null);
  /**
   * Profile Getter & Setter
   */
  get profile () { return this._profile; }
  set profile (newUser: IUserProfile) { this._profile = newUser; }
  /**
   * Auth Token Getter & Setter
   */
  get authToken () { return this._authToken.value; }
  set authToken (newAuthToken: string | null) { this._authToken.value = newAuthToken; }
}
/**
 * 
 */
export const userStore = new UserStore();
/**
 * 
 */
export const userInjectionKey: InjectionKey<UserStore> = Symbol('User');