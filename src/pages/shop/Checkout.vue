<template>
    <q-page padding>
        <!-- Config Section -->
        <section class="q-gutter-y-sm" style="padding-bottom: 3.5rem;">
            <!-- Display OrderOffers -->
            <title-widget data="Ofertas" />
            <order-offer
                :data="of"
                :no-editable="true"
                v-for="(of, ofKey) in orderOffers"
                :key="`order-offer-${ofKey}`"
            />
            <!-- / Display OrderOffers -->

            <!-- Config Address -->
            <title-widget data="Dirección" :config="{ icon: 'mdi-map-marker' }" />
            <!-- /Config Address -->

            <!-- Config DateTime -->
            <q-card class="no-box-shadow">
                <title-widget data="Fecha/Hora de Entrega" :config="{ icon: 'mdi-calendar' }" />
                <q-card-section>
                    <q-toggle
                        v-model="configDate"
                        color="primary"
                        :label="`${configDate ? 'Manual' : 'Automático'}`"
                    />
                    <datetime-selector
                        v-model="requestTime"
                        v-if="configDate"
                        :key="`request-time-${requestTime.toString()}`"
                    />
                </q-card-section>
            </q-card>
            <!-- /Config DateTime -->

            <!-- Config PaymnetMethod -->
            <!-- <q-card class="no-box-shadow">
                <title-widget data="Método de Pago" :config="{ icon: 'mdi-wallet' }" />
                <q-card-section>
                    <payment-selector v-model="payment" :key="`payment-selector-${payment}`" />
                </q-card-section>
            </q-card>-->
            <!-- /Config PaymnetMethod -->
        </section>
        <!-- / Config Section -->

        <!-- fixed-bottom -->
        <section class="fixed-bottom">
            <q-card class="no-box-shadow" style="padding-bottom: 3rem">
                <q-card-actions class="justify-center q-mx-sm">
                    <q-btn
                        color="primary"
                        text-color="dark"
                        @click="makeOrder"
                        :loading="loading"
                        rounded
                        label="Completar Órden"
                        style="width: 100%"
                    />
                    <!-- <q-btn color="grey-9" icon="mdi-clock" /> -->
                </q-card-actions>
            </q-card>
        </section>
        <!-- / fixed-bottom -->
        <!-- Address Selector -->
        <!-- <address-selector-popup v-model="showAddressSelector" /> -->
        <!-- / Address Selector -->
    </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';
// import { useQuasar } from 'quasar';
import { injectStrict } from 'src/helpers';
import { shopOrderKey } from 'src/modules';
/**
 * CHECKOUT_PAGE
 */
export default defineComponent({
    name: 'ShopCheckoutPage',
    components: {
        'order-offer': defineAsyncComponent(() => import('src/components/widgets/shop/OrderOffer.vue')),
        // 'payment-selector': defineAsyncComponent(() => import('src/components/forms/PaymentMethodSelector.vue')),
        'datetime-selector': defineAsyncComponent(() => import('src/components/forms/DateTimeSelector.vue'))
    },
    setup ()
    {
        // const $q = useQuasar();
        // const { errorHandler } = uiHelper($q);
        const ShopOrder = injectStrict(shopOrderKey);
        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const configDate = ref(false);
        const loading = ref(false);
        const orderOffers = computed(() => ShopOrder.orderOffers);
        const payment = ref('cash');
        const requestTime = ref('');
        /**
         * -----------------------------------------
         *	Methods
         * -----------------------------------------
         */
        function makeOrder () { console.log('MakeOrder') }
        return {
            configDate, loading, orderOffers, payment, requestTime,
            // methods
            makeOrder,
        }
    },
});
</script>