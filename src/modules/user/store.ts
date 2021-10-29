import { reactive, ref, Ref, InjectionKey } from 'vue';
import { IUser } from 'src/types';
/**
 * 
 */
export class UserStore
{
  /**
   * Properties
   */
  private _profile: IUser.Profile;
  private _authToken: Ref<string | null>;

  /**
   * Constructor 
   * @description Initialize values
   */
  constructor()
  {
    this._profile = reactive({
      id: null,
      createdAt: '',
      upadateAt: '',
      name: '',
      lastName: '',
      email: '',
      mobilePhone: '',
      password: '',
      roles: []
    });

    this._authToken = ref(null);
  }

  get profile ()
  {
    return this._profile;
  }

  set profile (newUser: IUser.Profile)
  {
    this._profile = newUser;
  }

  get authToken ()
  {
    return this._authToken.value;
  }

  set authToken (newAuthToken: string | null)
  {
    this._authToken.value = newAuthToken;
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