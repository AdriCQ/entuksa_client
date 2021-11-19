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
      <!-- <l-control>
      <q-btn
        v-if="settings.back"
        color="white"
        text-color="black"
        icon="mdi-keyboard-backspace"
        @click="goBack"
      />
      <q-btn
        v-if="!settings.noEdit"
        color="white"
        :text-color="`${currentGPSPosition ? 'info' : 'black'}`"
        :icon="`${currentGPSPosition ? 'mdi-crosshairs-gps' : 'mdi-crosshairs'}`"
        @click="searchCurrentPosition"
      />
      </l-control>-->

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
import 'leaflet/dist/leaflet.css';
import { LatLng, LocationEvent, Icon } from 'leaflet';
import
{
  // LControl,
  // LControlZoom,
  LMap,
  LMarker,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import { injectStrict } from 'src/helpers';
import { mapInjectionKey } from 'src/modules';

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
    // LControl,
    // LControlZoom,
    LMap,
    LMarker,
    LTileLayer,
  },
  setup ()
  {
    const $mapStore = injectStrict(mapInjectionKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const center = computed(() => $mapStore.center);
    const markers = computed(() => $mapStore.markers);
    const popup = computed(() => $mapStore.popupOpen);
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
        // setTimeout(() => { $mapStore.popupOpen = false }, 500);
      }
    }
    /**
     * doMoveCenter
     */
    function doMoveCenter (_center: LatLng)
    {
      $mapStore.center = _center;
    }
    /**
     * doMoveZoom
     */
    function doMoveZoom (_zoom: number)
    {
      $mapStore.zoom = _zoom;
    }
    function updatePopupOpen (_popup: boolean) { $mapStore.popupOpen = _popup; }
    return {
      ATTRIBUTION, MAP_URL, center, markers, popup, settings, zoom,
      // Methods
      addMarker, doMoveCenter, doMoveZoom, updatePopupOpen
    }
  }
});
</script>