<template>
  <div>
    <background-vue />
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { appInjectionKey, appStore, userStore, userInjectionKey } from 'src/modules';
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
    provide(userInjectionKey, userStore);
    provide(appInjectionKey, appStore);
  },
});
</script>
