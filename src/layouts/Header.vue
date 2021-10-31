<template>
  <q-header elevated class="bg-secondary text-white" height-hint="98">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="mdi-menu"
        v-if="!leftDrawer && !isMobile"
        @click="toggleLeftDrawer"
      />
      <q-toolbar-title>
        <q-input
          v-model="search"
          placeholder="Buscar oferta"
          dense
          outlined
          bg-color="white"
          type="search"
        >
          <template v-slot:before>
            <q-btn color="primary" class="q-px-xs q-mx-none" flat icon="mdi-map-marker" />
          </template>
          <template v-slot:after>
            <q-btn color="primary" class="q-px-xs q-mx-none" flat icon="mdi-magnify" />
          </template>
        </q-input>
      </q-toolbar-title>
    </q-toolbar>
    <!-- Tabs -->
    <q-tabs align="center" v-if="!isMobile">
      <q-route-tab to="/page1" label="Page One" />
      <q-route-tab to="/page2" label="Page Two" />
      <q-route-tab to="/page3" label="Page Three" />
    </q-tabs>
    <!-- /Tabs -->
  </q-header>
</template>

<script lang='ts'>
import { useQuasar } from 'quasar';
import { injectStrict, uiHelper } from 'src/helpers';
import { appInjectionKey } from 'src/modules';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  setup ()
  {
    const App = injectStrict(appInjectionKey);
    const $q = useQuasar();
    const { isMobile } = uiHelper($q);
    // Data
    const address = computed(() => 'Calle Silencio #32, Palmira, Cienfuegos');
    const leftDrawer = computed(() => App.leftDrawer);
    const search = ref('');
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function openMap () { console.log('Click OpenMap'); }
    function toggleLeftDrawer () { App.toggleLeftDrawer(); }
    return {
      address, isMobile, leftDrawer, search, openMap, toggleLeftDrawer
    }
  }
});
</script>