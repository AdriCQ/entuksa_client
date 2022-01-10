import { Position } from '@capacitor/geolocation';
import { LocalStorage } from 'quasar';
import { IPlatformHelper } from './types';
/**
 * -----------------------------------------
 *	BrowserPlatformHelper
 * -----------------------------------------
 */
export class BrowserPlatformHelper implements IPlatformHelper
{
  /**
   * 
   */
  GeolocationCurrentPosition (): Promise<Position>
  {
    return new Promise((_resolve, _reject) =>
    {
      if (!navigator.geolocation)
        _reject('No se puede inicializar el GPS en su navegador');
      navigator.geolocation.getCurrentPosition(_pos =>
      {
        _resolve(_pos)
      }, _err => { _reject(_err) })
    })
  }
  /**
   * StorageGet
   * @param _key 
   * @returns 
   */
  StorageGet<T> (_key: string): Promise<null | T>
  {
    return new Promise((_resolve) =>
    {
      if (LocalStorage.has(_key))
      {
        const resp = LocalStorage.getItem(_key)?.toString();
        _resolve(resp ? JSON.parse(resp) as unknown as T : null);
      }
      _resolve(null)
    })
  }
  /**
   * storageSet
   * @param _p 
   * @returns 
   */
  StorageSet<T = unknown> (_p: { key: string, value: T }): Promise<void>
  {
    return new Promise((_resolve) =>
    {
      _resolve(LocalStorage.set(_p.key, JSON.stringify(_p.value)))
    })
  }
}