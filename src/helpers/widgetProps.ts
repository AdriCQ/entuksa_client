import { IAppBlockConfig, IShopOffer, IShopOrderOffer, IShopStore } from 'src/modules';
import { PropType } from 'vue';

export const WidgetProps = {
  data: {
    type: Object as PropType<IShopStore> | PropType<IShopStore[]> | PropType<IShopOffer> | PropType<IShopOffer[]> | PropType<IShopOrderOffer>,
  },
  config: {
    type: Object as PropType<IAppBlockConfig>
  }
}