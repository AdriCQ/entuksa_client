<template>
  <q-page padding class="q-gutter-y-sm text-grey-9">
    <title-widget data="Mis Localizaciones" />
    <q-card class="no-shadow-box">
      <q-card-section class="q-ma-none q-pa-xs">
        <q-btn
          color="primary"
          text-color="dark"
          icon="mdi-map-marker-plus"
          label="Nueva Posición"
          class="full-width"
          @click="addPosition"
        />
      </q-card-section>
    </q-card>
    <div v-for="(pos, pKey) in userMapPositions" :key="`pos-${pKey}-${Number(pos.id)}`">
      <map-user-position
        :pos="pos"
        @delete-position="removePosition"
        @edit-position="editPosition"
      />
    </div>
    <!-- PopupEdit -->
    <q-dialog v-model="dialog" full-width>
      <map-position-form
        :pos-id="editMapPositionId"
        :key="`form-key-${dialog}-${editMapPositionId}`"
      />
    </q-dialog>
    <!-- / PopupEdit -->
  </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { injectStrict, uiHelper } from 'src/helpers';
import { IMapUserPosition, mapInjectionKey } from 'src/modules';
import { LatLng } from 'leaflet';

/**
 * MyLocationsPage
 */
export default defineComponent({
  name: 'MyLocationsPage',
  components: {
    'map-position-form': defineAsyncComponent(() => import('src/components/forms/map/UserLocation.vue')),
    'map-user-position': defineAsyncComponent(() => import('src/components/widgets/map/Position.vue'))
  },
  setup ()
  {
    const $mapStore = injectStrict(mapInjectionKey);
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler } = uiHelper($q, $router);
    /**
     * On BeforeMount
     */
    onBeforeMount(() =>
    {
      $mapStore.getUserPositions().catch(_e => { errorHandler(_e, 'No se pudo obtener los datos') });
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const dialog = ref(false);
    const editMapPositionId = ref<number | undefined>(undefined);
    const userMapPositions = computed(() => $mapStore.userPositions);
    /**
     * -----------------------------------------
     *	Methods 
     * -----------------------------------------
     */
    function addPosition ()
    {
      $mapStore.createUserPosition({
        title: '',
        position: {
          position: {
            address: 'Mi Ksa',
            coordinate: {
              lat: 0,
              lng: 0
            },
          },
          title: ''
        }
      }).catch(_e => { console.log(_e) })
    }
    function editPosition (_pos: IMapUserPosition)
    {
      editMapPositionId.value = _pos.id;
      $mapStore.setCenter(_pos.position.coordinate as LatLng);
      dialog.value = true;
    }
    function removePosition (_pos: IMapUserPosition)
    {
      const index = $mapStore.userPositions.findIndex(_up => _up.id === _pos.id);
      // const cpy = $mapStore.userPositions;
      $mapStore.userPositions.splice(index, 1);
    }

    return {
      userMapPositions, addPosition, removePosition, dialog, editMapPositionId, editPosition
    }
  }
});
</script>