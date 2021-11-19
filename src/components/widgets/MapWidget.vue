<template>
  <l-map
    ref="map"
    id="map--pageleaflet"
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
</template>

<script lang='ts'>
import { defineComponent, PropType, toRefs } from 'vue';
import 'leaflet/dist/leaflet.css';
import { LatLng, latLng, LocationEvent, Icon } from 'leaflet';
import
{
  // LControl,
  // LControlZoom,
  LMap,
  LMarker,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import { IMapSettings } from 'src/types';
import { CFG_COORDINATES } from 'src/helpers';

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
  emits: ['add-marker', 'set-center', 'set-zoom'],
  props: {
    center: {
      type: Object as PropType<LatLng>,
      default: () => (latLng(CFG_COORDINATES.CIENFUEGOS.lat, CFG_COORDINATES.CIENFUEGOS.lng))
    },
    markers: {
      type: Array as PropType<LatLng[]>,
      default: () => []
    },
    settings: {
      type: Object as PropType<IMapSettings>,
      default: () => ({
        back: false,
        hideMarker: false,
        minZoom: 5,
        maxZoom: 17,
        noEdit: false,
        noMove: false,
      })
    },
    zoom: {
      type: Number,
      default: () => 14
    }
  },
  setup (_props, $ctx)
  {
    const $props = toRefs(_props);
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
      if (!$props.settings.value.noEdit && (event as LocationEvent).latlng)
      {
        $ctx.emit('add-marker', latLng((event as LocationEvent).latlng.lat, (event as LocationEvent).latlng.lng))
      }
    }
    /**
     * doMoveCenter
     */
    function doMoveCenter (_center: LatLng)
    {
      emitCenter(_center);
    }
    /**
     * doMoveZoom
     */
    function doMoveZoom (_zoom: number)
    {
      $ctx.emit('set-zoom', _zoom);
    }
    /**
     * emitCenter
     */
    function emitCenter (_center: LatLng)
    {
      console.log('Emit Center', _center)
      $ctx.emit('set-center', _center);
    }
    return {
      ..._props, ATTRIBUTION, MAP_URL,
      // Methods
      addMarker, doMoveCenter, doMoveZoom, emitCenter
    }
  }
});
</script>