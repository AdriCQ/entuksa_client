import { InjectionKey, ref, reactive } from 'vue';
import { LatLng, latLng } from 'leaflet';
import { IMapCoordinate, IMapSettings } from 'src/types';
import { CFG_COORDINATES } from 'src/helpers';
/**
 * MapStore
 */
export class MapStore
{
  private _center = ref<LatLng>(latLng(CFG_COORDINATES.CIENFUEGOS.lat, CFG_COORDINATES.CIENFUEGOS.lng));
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
}
/**
 * mapStoreInstance
 */
export const mapStoreInstance = new MapStore();
/**
 * mapInjectionKey
 */
export const mapInjectionKey: InjectionKey<MapStore> = Symbol('MapStore')