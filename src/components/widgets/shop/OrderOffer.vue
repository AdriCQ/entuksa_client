<template>
  <q-card class="q-pa-sm q-mx-auto full-height" style="max-width: 25rem;">
    <q-card-section horizontal class="items-center q-gutter-x-sm q-py-none">
      <div class="absolute-top-right q-pz-xs" style="z-index: 5" v-if="!noEditable">
        <q-btn
          icon="mdi-delete"
          text-color="grey-6"
          padding="4px 4px"
          size="12px"
          unelevated
          @click="remove"
        />
      </div>
      <!-- Image -->
      <q-avatar size="6rem" class="rounded-circle" @click="offerDetails">
        <q-img
          :src="imageHandler(dataTyped.offer.imageId, 'sm')"
          :alt="dataTyped.offer.title"
          :title="dataTyped.offer.title"
          spinner-color="primary"
          spinner-size="82px"
          placeholder-src="images/default.jpg"
          loading="lazy"
        />
      </q-avatar>
      <!-- / Image -->

      <!-- Content -->
      <q-card-section class="full-width q-py-none">
        <div>
          <q-chip :label="`$${Number(dataTyped.offer.prices.sell).toFixed(2)}`" />
        </div>
        <div class="text-body2">{{ dataTyped.offer.title }}</div>
        <div v-if="!noEditable">
          <cant-input
            class="q-pl-sm"
            :model-value="dataTyped.qty"
            @update:model-value="updateQty"
            :size="10"
            :key="`order-offer-input-${dataTyped.offer.id}-${dataTyped.qty}`"
            :min-value="1"
            btn-rounded
          />
        </div>
      </q-card-section>
      <q-card-section class="full-width q-py-none" v-if="noEditable">
        <div>
          <q-chip :label="`x${Number(dataTyped.qty)}`" />
        </div>
      </q-card-section>
      <!-- / Content -->
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ROUTE_NAME, WidgetProps, uiHelper, injectStrict } from 'src/helpers';
import { IShopOrderOffer, shopOrderKey } from 'src/modules';
/**
 * OrderOfferWidget
 */
export default defineComponent({
  name: 'OrderOfferWidget',
  components: {
    'cant-input': defineAsyncComponent(() => import('src/components/forms/CantInput.vue'))
  },
  props: {
    ...WidgetProps,
    noEditable: {
      type: Boolean as PropType<boolean>,
      default: () => false
    }
  },
  setup (_props)
  {
    const { data } = toRefs(_props);
    const $q = useQuasar();
    const $router = useRouter();
    const { imageHandler } = uiHelper($q);
    const ShopOrder = injectStrict(shopOrderKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const dataTyped = computed<IShopOrderOffer>(() => data.value as unknown as IShopOrderOffer);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * offerDetails
     */
    function offerDetails () { void $router.push({ name: ROUTE_NAME.SHOP_OFFER, params: { id: dataTyped.value.offer.id } }) }
    /**
     * remove
     */
    function remove ()
    {
      $q.dialog({
        title: 'Eliminar',
        message: `¿Desea eliminar ${dataTyped.value.offer.title} del carrito?`,
        cancel: true,
      }).onOk(() =>
      {
        ShopOrder.removeOrderOffer(dataTyped.value);
      })
    }
    /**
     * updateQty
     */
    function updateQty (_qty: number)
    {
      ShopOrder.changeOrderOfferQty({
        offerId: dataTyped.value.offer.id as number,
        qty: _qty
      })
    }
    return {
      ..._props, dataTyped,
      // methods
      imageHandler, offerDetails, remove, updateQty
    };
  },
});
</script>