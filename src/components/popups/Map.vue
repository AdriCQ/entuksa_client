<template>
  <q-dialog :model-value="popup" @update:model-value="updatePopupOpen" maximized>
    <l-map
      ref="map"
      id="map--pageleaflet"
      class="full-heigth"
      :zoom="Number(zoom)"
      :center="center"
      :min-zoom="Number(settings.minZoom)"
      :max-zoom="Number(settings.maxZoom)"
      @click="addMarker"
      @update:center="doMoveCenter"
      @update:zoom="doMoveZoom"
    >
      <l-tile-layer :url="MAP_URL" :attribution="ATTRIBUTION" />
      <l-control>
        <q-btn v-if="settings.back" color="white" text-color="black" icon="mdi-keyboard-backspace" />
        <q-btn
          v-if="!settings.noEdit"
          color="white"
          :text-color="`${currentGPSPosition ? 'info' : 'black'}`"
          :icon="`${currentGPSPosition ? 'mdi-crosshairs-gps' : 'mdi-crosshairs'}`"
          @click="getCurrentGPSPosition"
        />
      </l-control>

      <l-marker
        :key="`marker-${markerKey}`"
        v-for="(marker, markerKey) in markers"
        :lat-lng="marker"
      />
    </l-map>
  </q-dialog>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import 'leaflet/dist/leaflet.css';
import { LatLng, LocationEvent, Icon } from 'leaflet';
import
{
  LControl,
  // LControlZoom,
  LMap,
  LMarker,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import { injectStrict, uiHelper } from 'src/helpers';
import { appInjectionKey, mapInjectionKey } from 'src/modules';

/* Fix leaflet icons */
type D = Icon.Default & {
  _getIconUrl: string;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete (Icon.Default.prototype as D)._getIconUrl;
Icon.Default.mergeOptions({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/**
 * ATTRIBUTION
 */
const ATTRIBUTION =
  '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
/**
 * MAP_URL
 */
const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
/**
 * COMPONENT
 */
export default defineComponent({
  name: 'MapLayout',
  components: {
    LControl,
    // LControlZoom,
    LMap,
    LMarker,
    LTileLayer,
  },
  emits: ['position-modified'],
  setup ()
  {
    const $q = useQuasar();
    const { errorHandler } = uiHelper($q);
    const $appStore = injectStrict(appInjectionKey);
    const $mapStore = injectStrict(mapInjectionKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const center = computed(() => $mapStore.center);
    // const currentPosition = computed(() => $mapStore.currentPosition);
    const currentGPSPosition = computed(() => $mapStore.currentGPSPosition);
    const markers = computed(() => $mapStore.markers);
    const popup = computed(() => $mapStore.popupOpen);
    const popupMode = computed(() => $mapStore.popupMode);
    const settings = computed(() => $mapStore.settings);
    const zoom = computed(() => $mapStore.zoom);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * addMarker
     */
    function addMarker (event: LocationEvent | Event)
    {
      if (!settings.value.noEdit && (event as LocationEvent).latlng)
      {
        $mapStore.markers[0] = (event as LocationEvent).latlng;
        $mapStore.center = (event as LocationEvent).latlng;
        if (popupMode.value === 'setup-app')
        {
          $appStore.setup()
            .catch(_e => { errorHandler(_e, 'Error actualizando información') })
            .finally(() => { $mapStore.popupOpen = false; });
        }
        setTimeout(() =>
        {
          $mapStore.popupOpen = false;
        }, 750);
      }
    }
    /**
     * doMoveCenter
     * @param _center
     */
    function doMoveCenter (_center: LatLng)
    {
      $mapStore.center = _center;
    }
    /**
     * doMoveZoom
     * @param _zoom
     */
    function doMoveZoom (_zoom: number)
    {
      $mapStore.zoom = _zoom;
    }
    /**
     * getCurrentGPSPosition
     */
    async function getCurrentGPSPosition ()
    {
      try
      {
        await $mapStore.getCurrentGpsPosition()
      } catch (error) { errorHandler(undefined, 'Error en GPS') }
    }
    /**
     * updatePopupOpen
     * @param _popup
     */
    function updatePopupOpen (_popup: boolean) { $mapStore.popupOpen = _popup; }

    return {
      ATTRIBUTION, MAP_URL, center, currentGPSPosition, markers, popup, settings, zoom,
      // Methods
      addMarker, doMoveCenter, doMoveZoom, getCurrentGPSPosition, updatePopupOpen
    }
  }
});
</script>