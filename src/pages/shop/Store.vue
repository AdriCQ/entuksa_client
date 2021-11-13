<template>
  <q-page class="q-gutter-y-sm row" padding>
    <!-- Store Description -->
    <section class="col-xs-12 col-sm-4">
      <q-card class="no-shadow-box" v-if="store">
        <template v-if="store.image">
          <q-img
            :src="imageHandler(store.imageId, 'md')"
            spinner-color="primary"
            :ratio="16 / 9"
            spinner-size="82px"
            :alt="`${store.title}-Cover`"
            :title="`${store.title}-Cover`"
          >
            <div class="absolute-top-left" style="padding:0px; background-color: transparent">
              <q-chip class="glossy">
                <q-icon name="mdi-star" color="orange" />
                <span>{{ store.score }}</span>
              </q-chip>
            </div>
          </q-img>
        </template>
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-9">{{ store.title }}</div>
        </q-card-section>
        <q-card-section>
          <p class="text-justify text-grey-9">{{ store.description }}</p>
        </q-card-section>
      </q-card>
    </section>
    <!-- / Store Description -->
    <!-- Store Offers -->
    <section
      class="col-xs-12 col-sm-8 q-gutter-y-xs"
      v-if="store && store.offers && store.offers.length"
    >
      <title-widget data="Ofertas" />
      <offers-group :data="store.offers" :config="{ displayDense: true }" />
    </section>
    <!-- / Store Offers -->
  </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { injectStrict, uiHelper } from 'src/helpers';
import { shopStoreKey } from 'src/modules'

export default defineComponent({
  name: 'ShopStorePage',
  components: {
    'offers-group': defineAsyncComponent(() => import('components/groups/ShopOffers.vue'))
  },
  setup ()
  {
    const $q = useQuasar();
    const $route = useRoute();
    // UI Helper
    const { errorHandler, imageHandler } = uiHelper($q);
    // ShopStore
    const ShopStore = injectStrict(shopStoreKey);
    // Before MOunt
    onBeforeMount(() =>
    {
      console.log('On Before Mount');
      const params = $route.params;
      if (params.id && !isNaN(Number(params.id)))
      {
        ShopStore.getById(Number(params.id))
          .then(_r => { console.log(_r) })
          .catch(_e => { errorHandler(_e, 'No se pudo cargar los datos de la Tienda') });
      }
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const store = computed(() => ShopStore.store);

    return {
      store,
      // Methods
      imageHandler
    }
  }
});
</script>