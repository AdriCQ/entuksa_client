<template>
  <Carousel :breakpoints="breakpoints" :settings="settings" :autoplay="7500">
    <Slide v-for="(s, pKey) in dataTyped" :key="`shop-store-slider-${pKey}`" class="q-px-xs">
      <store-widget :data="s" :config="config" style="width:100%" />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script lang='ts'>
import 'vue3-carousel/dist/carousel.css';
import { computed, defineComponent, ref, toRefs } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { CAROUSEL_BREAKPOINTS, WidgetProps } from 'src/helpers';
import { IVueCarouselSettings } from 'src/types';
import { IShopStore } from 'src/modules';

export default defineComponent({
  name: 'ShopStoreSlider',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    ...WidgetProps,
  },
  setup (_props)
  {
    const { data, config } = toRefs(_props);

    const breakpoints = ref(CAROUSEL_BREAKPOINTS);
    const dataTyped = computed<IShopStore[]>(() => (data.value as IShopStore[]));
    const settings = computed<IVueCarouselSettings>(() => ({
      itemsToShow: Number(config.value ? config.value : 2),
      itemsToScroll: 1,
      wrapAround: true,
      snapAlign: 'center',
      transition: 500,
      mouseDrag: true,
      touchDrag: true,
    }));
    return { ..._props, dataTyped, breakpoints, settings };
  },
});
</script>