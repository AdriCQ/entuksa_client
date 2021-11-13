<template>
  <q-page class="q-gutter-y-sm" padding>
    <section class="q-gutter-y-xs">
      <order-offer :data="of" v-for="(of, pKey) in orderOffers" :key="`order-offer-${pKey}`" />
    </section>
    <section class="fixed-bottom" v-if="orderOffers.length">
      <q-card class="no-box-shadow" style="padding-bottom: 3rem">
        <q-card-actions class="justify-center q-mx-sm">
          <q-btn
            color="primary"
            text-color="dark"
            :label="`Total $${Number(totalPrice).toFixed(2)}`"
            rounded
            class="full-width"
            icon-right="mdi-arrow-right-thick"
            @click="checkOrder"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { injectStrict, ROUTE_NAME } from 'src/helpers';
import { shopOrderKey } from 'src/modules';
/**
 * ShopCartPage
 */
export default defineComponent({
  name: 'ShopCartPage',
  components: {
    'order-offer': defineAsyncComponent(() => import('src/components/widgets/shop/OrderOffer.vue'))
  },
  setup ()
  {
    const ShopOrder = injectStrict(shopOrderKey);
    const $router = useRouter();
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const loading = ref(false);
    const orderOffers = computed(() => ShopOrder.orderOffers);
    const totalPrice = computed(() => ShopOrder.totalPrice);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function checkOrder () { console.log('CheckOrder'); void $router.push({ name: ROUTE_NAME.SHOP_CHECKOUT }) }

    return {
      loading, orderOffers, totalPrice,
      // Methods
      checkOrder
    }
  }
});
</script>