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
  shopCategoryKey, shopCategoryStore,
  shopOfferKey, shopOffer,
  shopStoreKey, shopStore,
  userStore, userInjectionKey
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
    provide(shopStoreKey, shopStore);
    provide(shopOfferKey, shopOffer);
    provide(shopCategoryKey, shopCategoryStore);
  },
});
</script>
