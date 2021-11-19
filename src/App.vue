<template>
  <div>
    <background-vue />
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import
{
  appInjectionKey, appStore,
  mapInjectionKey, mapStoreInstance,
  shopCategoryKey, shopCategoryStore,
  shopOfferKey, shopOffer,
  shopStoreKey, shopStore,
  userStore, userInjectionKey, shopOrder, shopOrderKey
} from 'src/modules';
// background
import BackgroundVue from './components/Background.vue';
/**
 * App
 */
export default defineComponent({
  name: 'App',
  components: {
    BackgroundVue
  },
  setup ()
  {
    provide(appInjectionKey, appStore);
    provide(userInjectionKey, userStore);
    provide(mapInjectionKey, mapStoreInstance);
    provide(shopStoreKey, shopStore);
    provide(shopOfferKey, shopOffer);
    provide(shopCategoryKey, shopCategoryStore);
    provide(shopOrderKey, shopOrder);
  },
});
</script>
