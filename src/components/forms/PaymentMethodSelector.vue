<template>
  <q-list>
    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio
          :model-value="modelValue"
          @update:model-value="updateModelValue"
          val="cash"
          color="primary"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Efectivo</q-item-label>
        <q-item-label caption>Pago en efectivo al recibir el producto o servicio</q-item-label>
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio
          :model-value="modelValue"
          @update:model-value="updateModelValue"
          val="enzona"
          color="primary"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Enzona</q-item-label>
        <q-item-label caption>Pago mediante la plataforma Enzona</q-item-label>
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section avatar top>
        <q-radio
          :model-value="modelValue"
          @update:model-value="updateModelValue"
          val="tf"
          color="primary"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Transfermóvil</q-item-label>
        <q-item-label caption>Pago mediante Transfermóvil</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentMethodSelector',
  props: {
    modelValue: {
      type: String
    },
  },
  emits: ['update:model-value'],
  setup (_props, _ctx)
  {
    function updateModelValue (_value: string)
    {
      _ctx.emit('update:model-value', _value)
    }
    return { ..._props, updateModelValue }
  }
});
</script>