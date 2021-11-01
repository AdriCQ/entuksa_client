import { boot } from 'quasar/wrappers';
import ShopOfferWidget from 'components/widgets/shop/Offer.vue';
import ShopStoreWidget from 'components/widgets/shop/StoreWidget.vue';

export default boot(({ app }) =>
{
  app.component('offer-widget', ShopOfferWidget);
  app.component('store-widget', ShopStoreWidget);
})
