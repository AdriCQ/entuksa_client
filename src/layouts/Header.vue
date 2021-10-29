<template>
  <q-header reveal elevated class="bg-white text-secondary">
    <q-toolbar>
      <q-toolbar-title @click="openMap">
        <q-input v-model="address" readonly>
          <template v-slot:prepend>
            <q-icon name="mdi-map-marker-outline" />
          </template>
        </q-input>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  setup ()
  {
    // Data
    const address = computed(() => 'Calle Silencio #32, Palmira, Cienfuegos');
    // Methods
    /**
     * openMap
     */
    function openMap ()
    {
      console.log('Click OpenMap');
    }
    return {
      address, openMap
    }
  }
});
</script>