<template>
  <q-page class="q-gutter-y-sm" padding>
    <!-- Offer Data -->
    <section v-if="offer" style="padding-bottom: 6rem" class="q-gutter-y-sm">
      <q-card class="no-box-shadow row">
        <!-- Offer image -->
        <q-img
          class="col-xs-12 col-sm-6 col-md-4"
          :src="imageHandler(offer.image, 'lg')"
          spinner-color="primary"
          :ratio="4 / 3"
          spinner-size="82px"
          :alt="`${offer.title}-Cover`"
          :title="`${offer.title}-Cover`"
        >
          <div class="absolute-top-left" style="padding:0px; background-color: transparent">
            <q-chip class="glossy">
              <q-icon name="mdi-star" color="orange" />
              <span>{{ offer.rating }}</span>
            </q-chip>
          </div>
          <div
            class="absolute-bottom-right"
            style="padding:0px; background-color: transparent"
            v-if="offer.category"
          >
            <q-chip
              class="glossy"
              v-if="getCategory(offer.category.id)"
              :icon="getCategory(offer.category.id)?.icon"
              :label="getCategory(offer.category.id)?.title"
            />
          </div>
          <!--  /Offer image -->
        </q-img>
        <q-card-section class="col-xs-12 col-sm-6 col-md-8">
          <div class="text-h6 text-grey-9">
            {{ offer.title }}
            <q-chip class="glossy" :label="`$${Number(offer.prices.sell).toFixed(2)}`" />
          </div>
          <q-expansion-item
            expand-separator
            icon="mdi-format-float-left"
            label="Descripción"
            :caption="offer.title"
          >
            <q-card class="no-box-shadow">
              <q-card-section class="q-pa-xs">
                <p class="text-grey-9">{{ offer.description }}</p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
      <!-- Other Offers -->
      <title-widget data="Ofertas Similares" />
      <offer-widget :data="offer" />
      <!-- / Other Offers -->
    </section>
    <!-- / Offer Data -->

    <section class="fixed-bottom" :style="`padding-bottom: 3rem`">
      <q-card class="q-px-sm q-pb-md no-box-shadow">
        <q-card-section class="text-subtitle1 text-weight-medium q-pb-none q-pt-xs">
          <div class="row">
            <cant-input
              class="q-pl-sm"
              v-model="cant"
              :key="`cant-input${cant}`"
              :size="15"
              :min-value="1"
              btn-rounded
            />
            <q-space />
            <q-chip class="glossy" icon="mdi-currency-usd" :label="Number(subtotal).toFixed(2)" />
          </div>
        </q-card-section>

        <q-card-actions class="q-py-none">
          <q-btn
            :disable="offer?.stock.status === 'SOLD_OUT'"
            unelevated
            no-caps
            class="text-weight-medium full-width"
            rounded
            text-color="dark"
            color="primary"
          >
            <q-icon name="mdi-cart-plus" size="sm" left />Añadir al Carrito
          </q-btn>
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script lang='ts'>
import { computed, defineComponent, defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { injectStrict, uiHelper } from 'src/helpers';
import { shopOfferKey, shopCategoryKey } from 'src/modules';
/**
 * ShopOfferPage
 */
export default defineComponent({
  name: 'ShopOfferPage',
  components: {
    'cant-input': defineAsyncComponent(() => import('src/components/forms/CantInput.vue'))
  },
  setup ()
  {
    const $q = useQuasar();
    const $route = useRoute();
    const { imageHandler } = uiHelper($q);
    const OfferStore = injectStrict(shopOfferKey);
    const CategoryStore = injectStrict(shopCategoryKey);
    // OnBeforeMount
    onBeforeMount(() =>
    {
      const offerId = $route.params && $route.params.id ? Number($route.params.id) : 0;
      OfferStore.actionFindOffer(offerId).then((_r) => { console.log(_r) }).catch(_e => { console.log(_e) });
    })
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const cant = ref(0);
    const offer = computed(() => OfferStore.offer);
    const subtotal = computed(() => (offer.value ? offer.value.prices.sell * cant.value : 0));
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function getCategory (_tag: string) { return CategoryStore.getCategory(_tag); }

    return {
      // Data
      cant, offer, subtotal,
      // Methods
      getCategory, imageHandler,
    }
  }
});
</script>