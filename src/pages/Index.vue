<template>
  <q-page padding>
    <div class="q-gutter-y-sm" v-if="blocks && blocks.length">
      <component
        :is="block.type"
        v-for="(block, bKey) in blocks"
        :key="`block-${block.type}-${bKey}`"
        :data="block.data"
        :config="block.config"
      />
    </div>
  </q-page>
</template>

<script lang='ts'>
import { injectStrict } from 'src/helpers';
import { appInjectionKey } from 'src/modules';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MainIndexPage',
  setup ()
  {
    const AppStore = injectStrict(appInjectionKey);
    // On Created
    AppStore.setup().then(_resp => { console.log('SetupResp', _resp) }).catch(_e => { console.log('SetupError', _e) })
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const blocks = computed(() => AppStore.homeBlocks);

    return {
      blocks
    }
  }
});
</script>