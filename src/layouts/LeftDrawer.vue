<template>
  <q-drawer
    :model-value="sidebarOpen"
    @update:model-value="updateSidebarOpen"
    show-if-above
    bordered
    overlay
    :width="280"
  >
    <!-- profile -->
    <div class="text-center q-mt-md">
      <q-avatar size="4rem" font-size="52px">
        <q-img
          src="img/icons/favicon-128x128.png"
          alt="Kodal-Logo-Spartan-128x128"
          title="Kodal-Logo-Spartan-128x128"
        />
      </q-avatar>
      <div class="text-grey-9 text-body1 q-mt-xs">Hola, {{ userName }}</div>
    </div>
    <!-- / profile -->

    <!-- list -->
    <div class="q-gutter-sm q-mt-md">
      <q-list class="rounded-borders" style="max-width: 350px">
        <!-- Mis Pedidos -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-cart-outline" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Pedidos</q-item-label>
          </q-item-section>

          <!-- <q-item-section side v-if="orderCounter">
            <q-badge rounded :label="orderCounter" color="primary" text-color="white" />
          </q-item-section>-->
        </q-item>
        <!-- / Mis Pedidos -->

        <!-- Mis Marcadores -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-map-marker-outline" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Localizaciones</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Profile -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-wrench" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Ajustes</q-item-label>
          </q-item-section>
        </q-item>
        <!-- / Profile -->
      </q-list>
    </div>
    <!-- / list -->
  </q-drawer>
</template>

<script lang='ts'>
import { injectStrict } from 'src/helpers';
import { appInjectionKey, userInjectionKey } from 'src/modules';
import { computed, defineComponent } from 'vue';

/**
 * ClientDrawer
 */
export default defineComponent({
  name: 'LeftDrawer',
  setup ()
  {
    // Init Store
    const App = injectStrict(appInjectionKey);
    const User = injectStrict(userInjectionKey);
    // Data
    const sidebarOpen = computed(() => App.leftDrawer);
    const userName = computed(() => User.profile.name);
    /**
     * updateSidebarOpen
     */
    function updateSidebarOpen (_open: boolean) { App.leftDrawer = _open }

    return {
      // Data
      sidebarOpen, userName,
      // Methods
      updateSidebarOpen
    }
  },
});
</script>