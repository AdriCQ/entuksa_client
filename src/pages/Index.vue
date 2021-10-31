<template>
  <q-page padding>
    <store-group :data="fakeStore" :config="{ displayDense: true }" v-for="i in 4" :key="i" />
  </q-page>
</template>

<script lang='ts'>
import { IShopStore } from 'src/modules';
import { defineAsyncComponent, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'MainIndexPage',
  components: {
    'store-group': defineAsyncComponent(() => import('components/groups/ShopStores.vue'))
  },
  setup ()
  {
    const fakeStore = reactive<IShopStore[]>([]);
    for (let i = 0; i < 6; i++)
    {
      fakeStore.push({
        id: 1,
        createdAt: '',
        description: 'Lorem ipsum',
        image: { id: 1 },
        score: 50,
        title: 'Shop Title extra long front',
        upadateAt: ''
      })
    }
    return {
      fakeStore
    }
  }
});
</script>