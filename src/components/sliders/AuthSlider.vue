<template>
  <q-carousel
    v-model="slide"
    transition-prev="jump-right"
    transition-next="jump-left"
    swipeable
    animated
    autoplay
    infinite
    control-color="primary"
    prev-icon="mdi-arrow-left"
    next-icon="mdi-arrow-right"
    navigation-icon="mdi-radiobox-blank"
    navigation
    padding
    arrows
    class="text-dark"
  >
    <q-carousel-slide name="style" class="column no-wrap flex-center">
      <q-icon name="mdi-cart" size="56px" />
      <div class="q-mt-md text-center">{{ lorem }}</div>
    </q-carousel-slide>
    <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="mdi-cart" size="56px" />
      <div class="q-mt-md text-center">{{ lorem }}</div>
    </q-carousel-slide>
    <q-carousel-slide name="layers" class="column no-wrap flex-center">
      <q-icon name="mdi-cart" size="56px" />
      <div class="q-mt-md text-center">{{ lorem }}</div>
    </q-carousel-slide>
    <q-carousel-slide name="map" class="column no-wrap flex-center">
      <q-icon name="mdi-cart" size="56px" />
      <div class="q-mt-md text-center">{{ lorem }}</div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AuthSlider',
  setup ()
  {
    return {
      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
});
</script>