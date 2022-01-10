<template>
  <q-drawer
    :model-value="sidebarOpen"
    @update:model-value="updateSidebarOpen"
    show-if-above
    side="left"
    :mini="sidebarConfig.mini"
    :width="280"
  >
    <div class="text-right gt-sm" v-if="!sidebarConfig.mini">
      <q-btn icon="mdi-close" text-color="primary" flat @click="setSidebarMini(true)" />
    </div>
    <div class="text-center gt-sm" v-else>
      <q-btn icon="mdi-menu" text-color="primary" flat @click="setSidebarMini(false)" />
    </div>
    <!-- profile -->
    <div class="text-center q-mt-md gt-xs">
      <div
        class="text-grey-9 text-body1"
        v-if="userName && !sidebarConfig.mini"
      >Hola, {{ userName }}</div>
    </div>
    <!-- / profile -->

    <!-- list -->
    <div class="q-gutter-sm q-mt-md">
      <q-list class="rounded-borders" style="max-width: 350px">
        <!-- Mi Perfil -->
        <q-item clickable v-ripple v-if="sidebarConfig.mini">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-account-circle" color="primary" text-color="secondary" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Mi Cuenta</q-item-label>
          </q-item-section>

          <!-- <q-item-section side v-if="orderCounter">
            <q-badge rounded :label="orderCounter" color="primary" text-color="secondary" />
          </q-item-section>-->
        </q-item>
        <!-- / Mi Perfil -->
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
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAP_MY_LOCATIONS }">
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
import { injectStrict, ROUTE_NAME } from 'src/helpers';
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
    function setSidebarMini (_mini: boolean)
    {
      if (!sidebarOpen.value) updateSidebarOpen(true);
      App.leftDrawerConfg.mini = _mini;
    }
    /**
     * updateSidebarOpen
     */
    function updateSidebarOpen (_open: boolean) { App.leftDrawer = _open }

    return {
      // Data
      sidebarConfig, sidebarOpen, userName,
      // Methods
      setSidebarMini, updateSidebarOpen, ROUTE_NAME
    }
  },
});
</script>