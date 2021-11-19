<template>
  <q-layout view="lHh lpR fFf">
    <app-header v-if="showHeader" />
    <q-page-container>
      <!-- <div
        class="full-width q-pa-xs text-dark text-caption bg-warning text-center"
        v-if="!emailVerified"
        @click="goToProfile"
      >Complete su perfil. Aún no ha verificado su email</div>
      <q-pull-to-refresh @refresh="refresh" :disable="disablePullToRefresh">-->
      <router-view />
      <!-- </q-pull-to-refresh> -->
    </q-page-container>

    <!-- leftDrawer -->
    <left-drawer />
    <!-- / leftDrawer -->

    <!-- Footer -->
    <app-footer v-if="isMobile" />
    <!-- / Footer -->

    <!-- MapPopup -->
    <map-popup />
    <!-- / MapPopup -->
  </q-layout>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar';
import { injectStrict, PlatformInstance, uiHelper } from 'src/helpers';
import { mapInjectionKey } from 'src/modules';
import AppFooter from './Footer.vue';
import AppHeader from './Header.vue';
import LeftDrawer from './LeftDrawer.vue';
/**
 * MainLayout Component
 */
export default defineComponent({
  name: 'MainLayout',
  components: {
    AppFooter,
    AppHeader,
    LeftDrawer,
    'map-popup': defineAsyncComponent(() => import('src/components/popups/Map.vue'))
  },
  setup ()
  {
    const $q = useQuasar();
    const $mapStore = injectStrict(mapInjectionKey);
    const { errorHandler, isMobile } = uiHelper($q);
    // Lifecycle
    onBeforeMount(() =>
    {
      PlatformInstance.GeolocationCurrentPosition().then(_pos =>
      {
        $mapStore.setAllCurrentPosition({
          lat: _pos.coords.latitude,
          lng: _pos.coords.longitude
        });
      }).catch(_e => { errorHandler(_e, 'Error en GPS') })
    })
    // Data
    const showHeader = computed(() => true)

    return {
      isMobile, showHeader
    }
  }
});
</script>