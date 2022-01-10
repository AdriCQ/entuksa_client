import { InjectionKey, ref } from 'vue';
import { LatLng, latLng } from 'leaflet';
import { IMapCoordinate, IMapSettings, IMapUserPosition } from './types';
import { CFG_COORDINATES, PlatformInstance } from 'src/helpers';
import { MapService } from './service';
import { FakeMapPositions } from './default';
/**
 * MapStore
 */
export class MapStore
{
  private $service = new MapService();
  private _center = ref<LatLng>(latLng(CFG_COORDINATES.CIENFUEGOS.lat, CFG_COORDINATES.CIENFUEGOS.lng));
  private _currentPosition = ref<null | IMapCoordinate>(null);
  private _currentGPSPosition = ref<null | IMapCoordinate>(null);
  private _markers = ref<IMapCoordinate[]>([]);
  private _popupOpen = ref(false);
  private _popupMode = ref<'set-marker' | 'setup-app'>('setup-app');
  private _settings = ref<IMapSettings>({
    back: false,
    hideMarker: false,
    minZoom: 5,
    maxZoom: 17,
    noEdit: false,
    noMove: false,
  });
  private _userPositions = ref<IMapUserPosition[]>(FakeMapPositions());
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
   * Popup mode setter & getter
   */
  get popupMode () { return this._popupMode.value }
  set popupMode (_mode: 'set-marker' | 'setup-app') { this._popupMode.value = _mode }
  /**
   * PopupOpen Getters & Setter
   */
  get popupOpen () { return this._popupOpen.value }
  set popupOpen (_open: boolean) { this._popupOpen.value = _open; }
  /**
   * Settings Getter & Setter
   */
  get settings () { return this._settings.value; }
  set settings (_s: IMapSettings) { this._settings.value = _s; }
  /**
   * userPositions Getter & Setter
   */
  get userPositions () { return this._userPositions.value; }
  set userPositions (_pos: IMapUserPosition[]) { this._userPositions.value = _pos; }
  /**
   * Zoom Getter & Setter
   */
  get zoom () { return this._zoom.value; }
  set zoom (_zoom: number) { this._zoom.value = _zoom; }
  /**
   * Creates user position
   */
  async createUserPosition (_p: { position: IMapUserPosition; title: string })
  {
    try
    {
      const resp = await this.$service.createUserPosition(_p);
      this.userPositions.unshift(resp.data);
      return this.userPositions;
    } catch (error) { throw error; }
  }
  /**
   * Gets current gps position
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
   * Gets user positions
   */
  async getUserPositions ()
  {
    try
    {
      const resp = await this.$service.getUserPositions();
      this.userPositions = resp.data;
      return this.userPositions;
    } catch (error) { throw error; }
  }
  /**
   * setAllCurrentPosition
   * @param _pos IMapCoordinate
   */
  setAllCurrentPosition (_pos: IMapCoordinate)
  {
    this.currentGPSPosition = _pos;
    this.currentPosition = _pos;
  }

  setCenter (_center: LatLng)
  {
    this.center = _center;
    this.markers = [this.center];
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