import { boot } from 'quasar/wrappers';
import ShopOfferWidget from 'components/widgets/shop/Offer.vue';
import ShopStoreWidget from 'components/widgets/shop/StoreWidget.vue';
import TitleWidget from 'src/components/widgets/Title.vue';

export default boot(({ app }) =>
{
  app.component('offer-widget', ShopOfferWidget);
  app.component('store-widget', ShopStoreWidget);
  // Title Widget
  app.component('title-widget', TitleWidget);
})
