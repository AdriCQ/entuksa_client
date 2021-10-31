import { boot } from 'quasar/wrappers';
import ShopStoreWidget from 'components/widgets/shop/StoreWidget.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) =>
{
  app.component('store-widget', ShopStoreWidget);
})
