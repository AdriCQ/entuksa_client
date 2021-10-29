import { ref, Ref, InjectionKey } from 'vue';
/**
 * 
 */
export class AppStore
{
  /**
   * Properties
   */
  private _appToken: Ref<string>;
  private _leftDrawer: Ref<boolean>;
  /**
   * Constructor 
   * @description Initialize values
   */
  constructor()
  {
    this._appToken = ref('');
    this._leftDrawer = ref(false);
  }
  /**
   * Gets app token
   */
  get appToken () { return this._appToken.value; }
  /**
   * Left drawer setter & getter
   */
  get leftDrawer () { return this._leftDrawer.value }
  set leftDrawer (_open: boolean) { this._leftDrawer.value = _open }
}
/**
 * 
 */
export const appStore = new AppStore();
/**
 * 
 */
export const appInjectionKey: InjectionKey<AppStore> = Symbol('App');