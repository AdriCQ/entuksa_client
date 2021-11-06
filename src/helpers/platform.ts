import { LocalStorage, Platform } from 'quasar';
/**
 * PlatformHelper
 */
export class PlatformHelper
{
  /**
   * handler
   * @param _p 
   * @returns 
   */
  private handler<T> (_p: { onDesktop?: CallableFunction, onMobileBrowser?: CallableFunction, onMobileApp?: CallableFunction }): T | null | Promise<T | null>
  {
    if (Platform.is.mobile)
    {
      if (Platform.is.capacitor)
        return _p.onMobileApp ? _p.onMobileApp() : null
      return _p.onMobileBrowser ? _p.onMobileBrowser() : null
    } else
      return _p.onDesktop ? _p.onDesktop() : null
  }
  /**
   * -----------------------------------------
   *	Helpers
   * -----------------------------------------
   */
  /**
   * Storage Get
   * @param _key 
   * @returns 
   */
  storageGet<T> (_key: string)
  {
    const onWeb = () => (LocalStorage.has(_key) ? LocalStorage.getItem(_key) : null);
    return this.handler<T>({
      onDesktop: onWeb,
      onMobileApp: onWeb,
      onMobileBrowser: onWeb
    });
  }
  /**
   * Storage Set
   * @param _p 
   * @returns 
   */
  storageSet (_p: { key: string; value: any })
  {
    const onWeb = () => (LocalStorage.set(_p.key, _p.value));
    return this.handler<boolean>({
      onDesktop: onWeb,
      onMobileApp: onWeb,
      onMobileBrowser: onWeb
    });
  }
}