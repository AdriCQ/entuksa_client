import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { IPlatformHelper } from './types';
/**
 * -----------------------------------------
 *	CapacitorPlatformHelper
 * -----------------------------------------
 */
export class CapacitorPlatformHelper implements IPlatformHelper
{
  /**
   * GeolocationCurrentPosition
   * @returns 
   */
  async GeolocationCurrentPosition (): Promise<Position>
  {
    try
    {
      if (!await Geolocation.checkPermissions())
        await this.GeolocationPermission();
      return await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      })
    } catch (error) { throw error; }
  }
  /**
   * GeolocationPermission
   * @returns 
   */
  async GeolocationPermission (): Promise<PermissionStatus>
  {
    try
    {
      return await Geolocation.requestPermissions();
    } catch (error) { throw error; }
  }
  /**
   * StorageExists
   * @param _key 
   * @returns 
   */
  async StorageExists (_key: string): Promise<boolean>
  {
    try
    {
      const keys = (await Storage.keys()).keys;
      return keys.includes(_key);
    } catch (error) { throw error; }

  }
  /**
   * StorageGet
   * @param _key 
   * @returns 
   */
  async StorageGet<T> (_key: string): Promise<null | T>
  {
    try
    {
      if (await this.StorageExists(_key))
      {
        const resp = await Storage.get({ key: _key });
        return resp.value ? (JSON.parse(resp.value) as T) : null;
      } return null
    } catch (error) { throw error; }

  }
  /**
   * storageSet
   * @param _p 
   * @returns 
   */
  async StorageSet<T = unknown> (_p: { key: string, value: T }): Promise<void>
  {
    try
    {
      return await Storage.set({
        key: _p.key,
        value: JSON.stringify(_p.value)
      });
    } catch (error) { throw error; }
  }
}