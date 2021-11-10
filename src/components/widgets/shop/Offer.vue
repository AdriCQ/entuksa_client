<template>
  <q-card
    class="q-mx-auto full-height justify-center no-box-shadow"
    @click="goToProduct"
    v-if="show"
  >
    <q-img
      :src="imageHandler(dataTyped.image, 'sm')"
      placeholder-src="images/default.jpg"
      :alt="dataTyped.title"
      :title="dataTyped.title"
      :ratio="`${config && config.ratio ? config.ratio : 4 / 3}`"
      spinner-color="primary"
      spinner-size="3rem"
      loading="lazy"
    >
      <div class="absolute-top-left" style="padding:0px; background-color: transparent">
        <q-chip dense>
          <span>{{ dataTyped.rating }}</span>
          <q-icon name="mdi-star" color="orange" size="1rem" />
        </q-chip>
      </div>
      <div class="absolute-bottom-right" style="padding:0px; background-color: transparent">
        <q-chip
          text-color="grey-9"
          icon="mdi-cash-usd"
          :label="Number(dataTyped.prices.sell).toFixed(2)"
        />
      </div>
      <div
        v-if="dataTyped.stock.status === 'SOLD_OUT'"
        class="absolute-top-right"
        style="padding: 3px; font-size: 0.6rem; background: rgba(0,0,0,0.8)"
      >AGOTADO</div>
    </q-img>
    <q-card-section class="q-pa-xs">
      <q-chip text-color="grey-9" icon="mdi-cart" :label="dataTyped.title" />
    </q-card-section>
    <q-inner-loading :showing="config?.loading">
      <q-spinner-tail size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { uiHelper, WidgetProps } from 'src/helpers';
import { IShopOffer } from 'src/modules';
import { useQuasar } from 'quasar';
/**
 * ProductWidget
 */
export default defineComponent({
  name: 'ProductWidget',
  props: {
    ...WidgetProps,
  },
  setup (props)
  {
    const { data, config } = toRefs(props);
    const $q = useQuasar();
    const { imageHandler, isDesktop, isMobile } = uiHelper($q)
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const dataTyped = computed<IShopOffer>(() => (data.value as IShopOffer));
    /**
     * show
     */
    const show = computed(() =>
    {
      if (data.value)
      {
        if (config.value && config.value.displayOnly)
        {
          console.log({
            config: config.value.displayOnly,
            isMobile, isDesktop
          })
          if (
            (config.value.displayOnly === 'DESKTOP' && isMobile) ||
            (config.value.displayOnly === 'MOBILE' && isDesktop)
          )
            return false;
        }
        return true;
      }
      return false;
    });
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */

    function goToProduct ()
    {
      console.log('Go To Product');
    }


    return {
      ...props,
      // Data
      dataTyped,
      show,
      // Methods
      imageHandler,
      goToProduct,
    };
  },
});
</script>
