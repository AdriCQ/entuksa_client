<template>
  <q-card class="no-box-shadow">
    <q-card-section class="text-center text-grey-9 q-py-xs">
      <div class="text-h6">{{ data }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
/**
 * TITLE_WIDGET
 */
export default defineComponent({
  name: 'TitleWidget',
  props: {
    data: { type: String as PropType<string>, required: true },
  },
  setup (props) { return { ...props } }
});
</script>