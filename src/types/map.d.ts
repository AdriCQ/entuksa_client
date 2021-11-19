import { LatLng } from 'leaflet';
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