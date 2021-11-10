import { boot } from 'quasar/wrappers';
import ShopOfferWidget from 'components/widgets/shop/Offer.vue';
import ShopStoreWidget from 'components/widgets/shop/StoreWidget.vue';
import TitleWidget from 'src/components/widgets/Title.vue';
// Groups
import ShopOffersGroup from 'src/components/groups/ShopOffers.vue';
import ShopStoresGroup from 'src/components/groups/ShopStores.vue';
// Sliders
import ShopOffersSlider from 'src/components/sliders/ShopOffers.vue';
import ShopStoresSlider from 'src/components/sliders/ShopStores.vue';

export default boot(({ app }) =>
{
  app.component('offer-widget', ShopOfferWidget);
  app.component('store-widget', ShopStoreWidget);
  app.component('title-widget', TitleWidget);
  // Groups
  app.component('offers-group', ShopOffersGroup);
  app.component('stores-group', ShopStoresGroup);
  // Sliders
  app.component('offers-slider', ShopOffersSlider);
  app.component('stores-slider', ShopStoresSlider);
})
