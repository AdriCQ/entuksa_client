import { PlatformInstance } from 'src/helpers';
import { reactive, ref, InjectionKey } from 'vue';
import { UserServices } from './service';
import { IUserProfile, IUserStorage, IAuthSignInReq, IAuthRes } from './types';
/**
 * STORAGE_KEY
 */
const STORAGE_KEY = 'storage/users';
/**
 * UserStore
 */
export class UserStore
{
  private services = UserServices();
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
   * Auth Token Getter & Setter
   */
  get authToken () { return this._authToken.value; }
  set authToken (newAuthToken: string | null) { this._authToken.value = newAuthToken; }
  /**
   * Is Auth
   */
  get isAuth () { return this._authToken ? true : false }
  /**
   * Profile Getter & Setter
   */
  get profile () { return this._profile; }
  set profile (newUser: IUserProfile) { this._profile = newUser; }
  /**
   * Load From storage
   */
  async load ()
  {
    const get = PlatformInstance.storageGet<IUserStorage>(STORAGE_KEY);
    if (get)
    {
      if ((get as Promise<IUserStorage>).then)
      {
        const { authToken, profile } = await (get as Promise<IUserStorage>);
        this._authToken.value = authToken;
        this._profile = profile;
      } else
      {
        const { authToken, profile } = get as IUserStorage;
        this._authToken.value = authToken;
        this._profile = profile;
      }
    }
  }
  /**
   * saveOnStorage
   */
  save ()
  {
    void PlatformInstance.storageSet({
      key: STORAGE_KEY,
      value: {
        authToken: this.authToken,
        profile: this.profile,
      }
    })
  }
  /**
   * singIn
   * @param _p 
   * @returns 
   */
  async singIn (_p: IAuthSignInReq): Promise<IAuthRes>
  {
    try
    {
      const data = (await this.services.signIn(_p)).data;
      this._authToken.value = data.token;
      this._profile = data.user;
      this.save();
      return data;
    } catch (error)
    {
      throw error;
    }
  }
}
/**
 * 
 */
export const userStore = new UserStore();
/**
 * 
 */
export const userInjectionKey: InjectionKey<UserStore> = Symbol('User');