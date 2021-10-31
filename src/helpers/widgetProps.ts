import { IAppBlockConfig, IShopStore } from 'src/modules';
import { PropType } from 'vue';

export const WidgetProps = {
  data: {
    type: Object as PropType<IShopStore> | PropType<IShopStore[]>,
  },
  config: {
    type: Object as PropType<IAppBlockConfig>
  }
}