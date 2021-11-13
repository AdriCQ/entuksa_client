<template>
  <div class="q-gutter-md row items-start">
    <q-date
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      :options="calendarOptions"
      mask="YYYY-MM-DD HH:mm"
      color="primary"
    />
    <q-time
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      mask="YYYY-MM-DD HH:mm"
      color="primary"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { date } from 'quasar';
/**
 * DateTimeSelector
 */
export default defineComponent({
  name: 'DateTimeSelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
  },
  emits: ['update:model-value'],
  setup (_props, $ctx)
  {

    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * calendarOptions
     */
    function calendarOptions (_date: string)
    {
      return _date >= date.formatDate(Date.now(), 'YYYY/MM/DD');
    }
    /**
     * updateModelValue
     */
    function updateModelValue (_date: unknown) { $ctx.emit('update:model-value', _date) }

    return { ..._props, calendarOptions, updateModelValue }
  }
});
</script>