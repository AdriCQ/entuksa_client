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
  </q-layout>
</template>

<script lang='ts'>
import { useQuasar } from 'quasar';
import { computed, defineComponent } from 'vue'
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
    LeftDrawer
  },
  setup ()
  {
    const $q = useQuasar();
    // Data
    const isMobile = computed(() => Boolean($q.platform.is.mobile));
    const showHeader = computed(() => true)

    return {
      isMobile, showHeader
    }
  }
});
</script>