import { InjectionKey, ref, reactive } from 'vue';
import { LatLng, latLng } from 'leaflet';
import { IMapCoordinate, IMapSettings } from 'src/types';
import { CFG_COORDINATES, PlatformInstance } from 'src/helpers';
/**
 * MapStore
 */
export class MapStore
{
  private _center = ref<LatLng>(latLng(CFG_COORDINATES.CIENFUEGOS.lat, CFG_COORDINATES.CIENFUEGOS.lng));
  private _currentPosition = ref<null | IMapCoordinate>(null);
  private _currentGPSPosition = ref<null | IMapCoordinate>(null);
  private _markers = ref<IMapCoordinate[]>([]);
  private _popupOpen = ref(false);
  private _settings = reactive<IMapSettings>({
    back: false,
    hideMarker: false,
    minZoom: 5,
    maxZoom: 17,
    noEdit: false,
    noMove: false,
  });
  private _zoom = ref(14);
  /**
   * Center Getter & Setter
   */
  get center () { return this._center.value; }
  set center (_c: LatLng) { this._center.value = _c }
  /**
   * Current Position
   */
  get currentPosition () { return this._currentPosition.value; }
  set currentPosition (_p: null | IMapCoordinate) { this._currentPosition.value = _p; }
  /**
   * Current GPS Position
   */
  get currentGPSPosition () { return this._currentGPSPosition.value; }
  set currentGPSPosition (_p: null | IMapCoordinate) { this._currentGPSPosition.value = _p; }
  /**
   * Markers Setters  & Getters
   */
  get markers () { return this._markers.value; }
  set markers (_m: IMapCoordinate[]) { this._markers.value = _m; }
  /**
   * PopupOpen Getters & Setter
   */
  get popupOpen () { return this._popupOpen.value }
  set popupOpen (_open: boolean) { this._popupOpen.value = _open; }
  /**
   * Settings Getter & Setter
   */
  get settings () { return this._settings; }
  set settings (_s: IMapSettings) { this._settings = _s; }
  /**
   * Zoom Getter & Setter
   */
  get zoom () { return this._zoom.value; }
  set zoom (_zoom: number) { this._zoom.value = _zoom; }
  /**
   * getCurrentGpsPosition
   */
  async getCurrentGpsPosition ()
  {
    try
    {
      const gps = await PlatformInstance.GeolocationCurrentPosition();
      this.setAllCurrentPosition({
        lat: gps.coords.latitude,
        lng: gps.coords.longitude
      })
    } catch (error) { throw error; }
  }
  /**
   * setAllCurrentPosition
   * @param _pos 
   */
  setAllCurrentPosition (_pos: IMapCoordinate)
  {
    this.currentGPSPosition = _pos;
    this.currentPosition = _pos;
  }
}
/**
 * mapStoreInstance
 */
export const mapStoreInstance = new MapStore();
/**
 * mapInjectionKey
 */
export const mapInjectionKey: InjectionKey<MapStore> = Symbol('MapStore')