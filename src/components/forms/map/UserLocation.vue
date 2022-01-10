<template>
  <q-card class="text-grey-9">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-body1">{{ form.id ? 'Actualizar' : 'Nueva' }} Localización</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.title" type="text" label="Título" />
        <q-input v-model="form.position.address" type="text" label="Dirección" />
        <q-btn
          icon="mdi-map-marker"
          class="full-width"
          label="Seleccionar en Mapa"
          @click="openMap"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          type="submit"
          color="primary"
          text-color="dark"
          class="full-width"
          :label="form.id ? 'Actualizar' : 'Nueva'"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { injectStrict } from 'src/helpers';
import { IMapUserPosition, mapInjectionKey } from 'src/modules';
import { defineComponent, onBeforeMount, ref, toRefs } from 'vue'

/**
 * UserLocationForm
 */
export default defineComponent({
  name: 'UserLocationForm',
  props: {
    posId: {
      required: false,
      type: Number,
      default: 0
    }
  },
  setup (_props)
  {
    const $mapStore = injectStrict(mapInjectionKey);
    const $props = toRefs(_props);

    onBeforeMount(() =>
    {
      if ($props.posId.value && $mapStore.userPositions.find(_up => _up.id === $props.posId.value))
      {
        form.value = $mapStore.userPositions.find(_up => _up.id === $props.posId.value) as IMapUserPosition;
      }
    })

    const form = ref<IMapUserPosition>({
      id: 0,
      position: {
        address: '',
        coordinate: {
          lat: 0,
          lng: 0
        },
      },
      title: '',
    });

    function onSubmit ()
    {
      form.value.position.coordinate = {
        lat: $mapStore.center.lat,
        lng: $mapStore.center.lng
      };
      // Create new
      if (!form.value?.id)
      {
        console.log({
          createPosition: form.value
        })
      } else
      {
        console.log({
          updatePosition: form.value
        })
      }
    }

    function openMap ()
    {
      $mapStore.popupMode = 'set-marker';
      $mapStore.popupOpen = true;
    }

    return {
      form, onSubmit, openMap
    }
  }
});
</script>