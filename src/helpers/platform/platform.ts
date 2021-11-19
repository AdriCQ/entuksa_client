import { Position } from '@capacitor/geolocation';
import { Platform } from 'quasar';
import { BrowserPlatformHelper } from './browser';
import { CapacitorPlatformHelper } from './capacitor';
import { IPlatformHelper } from './types';

/**
 * -----------------------------------------
 *	PlatformHelper
 * -----------------------------------------
 */
export class PlatformHelper implements IPlatformHelper
{
  private readonly $capacitor = new CapacitorPlatformHelper();
  private readonly $browser = new BrowserPlatformHelper();
  /**
   * GeolocationCurrentPosition
   * @returns 
   */
  GeolocationCurrentPosition (): Promise<Position>
  {
    return Platform.is.capacitor ? this.$capacitor.GeolocationCurrentPosition() : this.$browser.GeolocationCurrentPosition();
  }
  /**
   * StorageGet
   * @param _key 
   * @returns 
   */
  StorageGet<T> (_key: string): Promise<T | null>
  {
    return Platform.is.capacitor ? this.$capacitor.StorageGet(_key) : this.$browser.StorageGet(_key);
  }
  /**
   * StorageSet
   * @param _p 
   * @returns 
   */
  StorageSet<T = unknown> (_p: { key: string; value: T; }): Promise<void>
  {
    return Platform.is.capacitor ? this.$capacitor.StorageSet(_p) : this.$browser.StorageSet(_p);
  }
}
/**
 * PlatformInstance
 */
export const PlatformInstance = new PlatformHelper();