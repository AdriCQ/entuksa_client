import { ref, InjectionKey, reactive } from 'vue';
// Local
import { AppService } from './service';
import { IApp, IAppBlock, IAppLeftDrawerConfig, IAppResponseSetup } from './types';
// Others modules
import { userStore, shopStore } from 'src/modules';
import { IMapCoordinate, IRoute } from 'src/types';
/**
 * STORAGE_KEY
 */
// const STORAGE_KEY = 'storage/app';
/**
 * AppStore
 */
export class AppStore
{
  private service = AppService();
  /**
   * Properties
   */
  private _app = reactive<IApp>({
    id: 1,
    package: 'net.nairda.entuksa',
    roadmap: [],
    settings: {},
    title: 'EnTuKsa',
    token: '1|$argon2i$v=19$m=4096,t=3,p=1$EOHefdy1LeKmgLhRRj7Qow$rRPr4sO3+O9Aa/8YqZDnxTMPzQ/BUo4ZShXn5P5oeBE'
  });
  private _currentPosition = ref<null | IMapCoordinate>(null);
  private _homeBlocks = ref<IAppBlock[] | null>(null);
  private _leftDrawer = ref(false);
  private _leftDrawerConfig = reactive<IAppLeftDrawerConfig>({
    mini: true
  });
  private _redirect: IRoute | null = null;
  /**
   * App setters & getters
   */
  get app () { return this._app }
  set app (_app: IApp) { this._app = _app; }
  /**
   * Gets app token
   */
  get appToken () { return this._app.token; }
  /**
   * Current Position
   */
  get currentPosition () { return this._currentPosition.value; }
  set currentPosition (_p: null | IMapCoordinate) { this._currentPosition.value = _p; }
  /**
   * Home Blocks getter & setter
   */
  get homeBlocks () { return this._homeBlocks.value; }
  set homeBlocks (_blocks: IAppBlock[] | null) { this._homeBlocks.value = _blocks; }
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
   * Redirect getter & setter
   */
  get redirect () { return this._redirect }
  set redirect (_redirect: IRoute | null) { this._redirect = _redirect; }
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  /**
   * toggleLeftDrawer
   */
  toggleLeftDrawer () { this._leftDrawer.value = !this._leftDrawer.value }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */
  /**
   * setup
   * @returns Promise<IAppResponseSetup>
   */
  setup (): Promise<IAppResponseSetup>
  {
    return new Promise((_resolve, _reject) =>
    {
      this.service.setup().then(_resp =>
      {
        this._homeBlocks.value = _resp.data.blocks;
        // Set user
        if (_resp.data.user)
          userStore.profile = _resp.data.user;
        // Set Stores
        if (_resp.data.stores)
          shopStore.stores = _resp.data.stores;
        _resolve(_resp.data)
      }).catch(_e => { _reject(_e) })
    })
  }

}
/**
 * App instance
 */
export const appStore = new AppStore();
/**
 * App Inject Key
 */
export const appInjectionKey: InjectionKey<AppStore> = Symbol('App');