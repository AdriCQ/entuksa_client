<template>
  <q-footer class="bg-white text-grey-9 xs" id="app-footer">
    <q-tabs
      align="justify"
      indicator-color="transparent"
      active-color="primary"
      id="tab-buttons"
      no-caps
    >
      <q-route-tab exact :to="{ name: ROUTE_NAME.MAIN_HOME }">
        <q-icon name="mdi-home" size="1.6rem" />
      </q-route-tab>
      <q-route-tab exact :to="{ name: ROUTE_NAME.MAIN_HOME }">
        <q-icon name="mdi-store" size="1.6rem" />
      </q-route-tab>
      <q-route-tab exact :to="{ name: ROUTE_NAME.MAIN_HOME }">
        <q-icon name="mdi-cart-outline" size="1.6rem" />
        <q-badge color="primary" floating v-if="countCart > 0">{{ countCart }}</q-badge>
      </q-route-tab>

      <!-- <q-route-tab exact icon="mdi-magnify" :to="{name: 'main.home'}">
        <span class="text-body2 text-weight-bolder">Buscar</span>
      </q-route-tab>-->
      <q-tab @click="openLeftDrawer">
        <q-icon size="1.6rem" name="mdi-apps" />
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/helpers';
import { appInjectionKey } from 'src/modules';
import { injectStrict } from 'src/helpers'
export default defineComponent({
  name: 'AppFooter',
  setup ()
  {
    const App = injectStrict(appInjectionKey);
    // Data
    const countCart = computed(() => Number(0));
    // Methods
    function openLeftDrawer ()
    {
      App.leftDrawer = true;
    }

    return {
      // Computed
      countCart,
      ROUTE_NAME,
      // Methods
      openLeftDrawer,
    };
  },
});
</script>
