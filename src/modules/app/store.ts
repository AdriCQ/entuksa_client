import { ref, InjectionKey, reactive } from 'vue';
import { IAppLeftDrawerConfig } from './types';
/**
 * 
 */
export class AppStore
{
  /**
   * Properties
   */
  private _appToken = ref('');
  private _leftDrawer = ref(false);
  private _leftDrawerConfig = reactive<IAppLeftDrawerConfig>({
    mini: true
  });
  /**
   * Gets app token
   */
  get appToken () { return this._appToken.value; }
  /**
   * Left drawer setter & getter
   */
  get leftDrawer () { return this._leftDrawer.value }
  set leftDrawer (_open: boolean) { this._leftDrawer.value = _open }
  /**
   * Left Drawer config Getter & Setter
   */
  get leftDrawerConfg () { return this._leftDrawerConfig; }
  set leftDrawerConfg (cfg: IAppLeftDrawerConfig) { this._leftDrawerConfig = cfg; }
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  toggleLeftDrawer () { this._leftDrawer.value = !this._leftDrawer.value }

}
/**
 * App instance
 */
export const appStore = new AppStore();
/**
 * App Inject Key
 */
export const appInjectionKey: InjectionKey<AppStore> = Symbol('App');