<template>
  <q-card class="no-box-shadow" style="height:100%" v-if="data" @click="goToStore">
    <q-img
      :src="imageHandler(1, 'sm')"
      :alt="dataTyped.title"
      :title="dataTyped.title"
      :ratio="`${config && config.ratio ? config.ratio : 4 / 3}`"
      spinner-color="primary"
      spinner-size="3rem"
      placeholder-src="img/default.jpg"
      loading="lazy"
    >
      <div class="absolute-top-left" style="padding:0px; background-color: transparent">
        <q-chip>
          <span style="font-size: 1.rem">{{ dataTyped.score }}</span>
          <q-icon name="mdi-star" color="orange" size="1.2rem" />
        </q-chip>
      </div>
      <!-- <div
        class="absolute-bottom-right"
        style="padding:0px; background-color: transparent"
        v-if="data.category"
      >
        <q-chip>
          <q-icon :name="data.category.icon" size="sm" color="grey-9" />
        </q-chip>
      </div>-->
    </q-img>
    <q-card-section class="text-grey-9 q-pa-xs" v-if="config && config.displayDense">
      <q-chip text-color="grey-9" icon="mdi-store" :label="dataTyped.title" />
    </q-card-section>
    <q-card-section class="row justify-between q-pa-xs" v-else>
      <div>
        <q-chip text-color="grey-9" icon="mdi-store" :label="dataTyped.title" />
      </div>
      <q-space />
      <div>
        <q-btn color="secondary" icon="mdi-map-marker" flat />
      </div>
    </q-card-section>

    <q-inner-loading :showing="config && config.loading">
      <q-spinner-tail size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs } from 'vue';
import { useQuasar } from 'quasar';
import { WidgetProps, uiHelper } from 'src/helpers';
import { IShopStore } from 'src/modules';

export default defineComponent({
  name: 'StoreWidget',
  props: {
    ...WidgetProps,
  },
  setup (props)
  {
    const $q = useQuasar();
    const { imageHandler } = uiHelper($q);
    const { data } = toRefs(props);
    const dataTyped = computed<IShopStore>(() => (data.value as IShopStore));
    function goToStore ()
    {
      console.log('GoTO');
    }
    return {
      ...props,
      dataTyped,
      imageHandler,
      goToStore,
    };
  },
});
</script>