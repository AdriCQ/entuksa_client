<template>
  <div class="q-gutter-y-sm" v-if="data && Array.isArray(data) && data.length">
    <q-card-section class="no-padding">
      <div class="row q-col-gutter-sm justify-evenly">
        <div :class="colClass" v-for="(store, key) in dataModified" :key="`shop-store-${key}`">
          <store-widget :data="store" :config="config" />
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs } from 'vue';
import { uiHelper, WidgetProps } from 'src/helpers';
import { useQuasar } from 'quasar';
import { IShopStore } from 'src/modules';
/**
 * STORE_GROUP
 */
export default defineComponent({
  name: 'StoreGroup',
  props: {
    ...WidgetProps,
  },
  setup (_props)
  {
    const { config, data } = toRefs(_props);
    const $q = useQuasar();
    const { isMobile } = uiHelper($q);

    const dataModified = computed<IShopStore[]>(() =>
    {
      const length = (data.value as IShopStore[]).length;
      if (length > 4)
        return (data.value as IShopStore[]).slice(0, 4);
      return data.value;

    });
    const colClass = computed(() =>
    {
      if (isMobile)
      {
        return config.value?.displayDense
          ? 'col-xs-6 col-sm-4 col-md-3'
          : 'col-xs-12 col-sm-6 col-md-4'
      }
      const length = (data.value as IShopStore[]).length;
      if (length >= 4)
      {
        return 'col'
      }
      return 'col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1'
    }
    );
    return { ..._props, colClass, dataModified };
  },
});
</script>