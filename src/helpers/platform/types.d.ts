import { Position } from '@capacitor/geolocation';
/**
 * IPlatformHelper
 */
export interface IPlatformHelper
{
  GeolocationCurrentPosition (): Promise<Position>;
  StorageGet<T> (_key: string): Promise<null | T>;
  StorageSet<T = unknown> (_p: { key: string, value: T }): Promise<void>;
}