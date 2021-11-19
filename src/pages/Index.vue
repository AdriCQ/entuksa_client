<template>
  <q-page padding>
    <q-pull-to-refresh @refresh="refresh">
      <div class="q-gutter-y-sm" v-if="blocks && blocks.length">
        <component
          :is="block.type"
          v-for="(block, bKey) in blocks"
          :key="`block-${block.type}-${bKey}`"
          :data="block.data"
          :config="block.config"
        />
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { injectStrict, uiHelper } from 'src/helpers';
import { appInjectionKey } from 'src/modules';
/**
 * MainIndexPage
 */
export default defineComponent({
  name: 'MainIndexPage',
  setup ()
  {
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler } = uiHelper($q, $router);
    const AppStore = injectStrict(appInjectionKey);
    // On Created
    refresh(() => console.log('Init Data'));
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const blocks = computed(() => AppStore.homeBlocks);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function refresh (done: CallableFunction) { AppStore.setup().catch(_e => { errorHandler(_e, 'No tenemos conexión') }).finally(() => { done() }) }

    return {
      blocks, refresh
    }
  }
});
</script>