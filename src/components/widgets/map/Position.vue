<template>
  <q-card class="no-box-shadow">
    <q-card-section>
      <div class="text-body1">{{ pos.title }}</div>
      <div class="text-body2">{{ pos.position.address }}</div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        size="sm"
        color="negative"
        @click="onDelete"
        icon="mdi-delete"
        outline
        label="Eliminar"
      />
      <q-btn
        size="sm"
        color="primary"
        @click="edit"
        text-color="dark"
        icon="mdi-pencil"
        label="Editar"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang='ts'>
import { useQuasar } from 'quasar';
import { IMapUserPosition } from 'src/modules';
import { defineComponent, PropType, toRefs } from 'vue';

/**
 * MapPositionWidget
 */
export default defineComponent({
  name: 'MapPositionWidget',
  props: {
    pos: {
      type: Object as PropType<IMapUserPosition>,
      required: true
    }
  },
  emits: ['delete-position', 'edit-position'],
  setup (_props, $ctx)
  {
    const $props = toRefs(_props);
    const $q = useQuasar();

    function edit () { $ctx.emit('edit-position', $props.pos.value) }
    function onDelete ()
    {
      $q.dialog({
        title: 'Eliminar Localización',
        message: 'Usted va a eliminar una localización. Esta acción es irreversible. Desea continuar?',
        ok: true,
        cancel: true
      }).onOk(() => { $ctx.emit('delete-position', $props.pos.value) })
    }
    return {
      ..._props, edit,
      onDelete
    }
  }
});
</script>