<template>
  <q-drawer
    :model-value="sidebarOpen"
    @update:model-value="updateSidebarOpen"
    show-if-above
    side="left"
    :mini="sidebarConfig.mini"
    :width="280"
  >
    <div class="text-right gt-xs" v-if="!sidebarConfig.mini">
      <q-btn icon="mdi-close" text-color="primary" flat @click="setSidebarMini(true)" />
    </div>
    <div class="text-center gt-xs" v-else>
      <q-btn icon="mdi-menu" text-color="primary" flat @click="setSidebarMini(false)" />
    </div>
    <!-- profile -->
    <div class="text-center q-mt-md" v-if="!sidebarConfig.mini">
      <div class="text-grey-9 text-body1 q-mt-xs" v-if="userName">Hola, {{ userName }}</div>
    </div>
    <!-- / profile -->

    <!-- list -->
    <div class="q-gutter-sm q-mt-md">
      <q-list class="rounded-borders" style="max-width: 350px">
        <!-- Mis Pedidos -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-cart-outline" color="primary" text-color="secondary" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Pedidos</q-item-label>
          </q-item-section>

          <!-- <q-item-section side v-if="orderCounter">
            <q-badge rounded :label="orderCounter" color="primary" text-color="secondary" />
          </q-item-section>-->
        </q-item>
        <!-- / Mis Pedidos -->

        <!-- Mis Marcadores -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar
              size="md"
              icon="mdi-map-marker-outline"
              color="primary"
              text-color="secondary"
            />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Localizaciones</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Profile -->
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-wrench" color="primary" text-color="secondary" />
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
    const sidebarConfig = computed(() => App.leftDrawerConfg);
    const sidebarOpen = computed(() => App.leftDrawer);
    const userName = computed(() => User.profile.name);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * setSidebarMini
     */
    function setSidebarMini (_mini: boolean) { App.leftDrawerConfg.mini = _mini }
    /**
     * updateSidebarOpen
     */
    function updateSidebarOpen (_open: boolean) { App.leftDrawer = _open }

    return {
      // Data
      sidebarConfig, sidebarOpen, userName,
      // Methods
      setSidebarMini, updateSidebarOpen
    }
  },
});
</script>