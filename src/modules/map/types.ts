import { LatLng } from 'leaflet';
import { DataBase } from 'src/types';
/**
 * IMapCenter
 */
export interface IMapCenter
{
  center: LatLng,
  zoom: number;
}
/**
 * IMapCoordinate
 */
export interface IMapCoordinate
{
  lat: number;
  lng: number;
}
/**
 * Imap position
 */
export interface IMapPosition extends DataBase
{
  address: string;
  coordinate: IMapCoordinate;
  validatedAt?: Date;
}
/**
 * IMapSettings
 */
export interface IMapSettings
{
  back?: boolean,
  hideMarker?: boolean,
  minZoom?: number,
  maxZoom?: number,
  noEdit?: boolean,
  noMove?: boolean,
}
/**
 * IMapUserPosition
 */
export interface IMapUserPosition extends DataBase
{
  title: string;
  position: IMapPosition;
}