<template>
  <q-field borderless no-error-icon dense>
    <div class="flex wrap items-center">
      <template v-if="type === 'arrow'">
        <q-input
          type="number"
          :model-value="modelValue"
          :input-style="inputStyles"
          input-class="text-body1 text-weight-bold"
          :readonly="inputReadonly"
          borderless
          @update:model-value="handleInput"
        />
        <div class="column">
          <div class="col-auto">
            <q-btn
              :color="btnColor"
              icon="mdi-chevron-up"
              :size="`${size}px`"
              padding="xs"
              :round="btnRounded"
              :disable="maxValue !== undefined ? modelValue >= maxValue : false"
              unelevated
              flat
              :class="btnBorderClass"
              @click="plus"
            />
          </div>
          <div class="col-auto">
            <q-btn
              :color="btnColor"
              icon="mdi-chevron-down"
              :size="`${size}px`"
              padding="xs"
              :round="btnRounded"
              :disable="modelValue <= minValue"
              unelevated
              flat
              :class="btnBorderClass"
              @click="minus"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <q-btn
          :color="btnColor"
          icon="mdi-minus"
          :size="`${size}px`"
          padding="xs"
          :round="btnRounded"
          :disable="modelValue <= minValue"
          unelevated
          flat
          :class="btnBorderClass"
          @click="minus"
        />
        <q-input
          type="number"
          :model-value="modelValue"
          :input-style="inputStyles"
          input-class="text-body1 text-weight-bold"
          :readonly="inputReadonly"
          borderless
          @update:modelValue="handleInput"
        />

        <q-btn
          :color="btnColor"
          icon="mdi-plus"
          :size="`${size}px`"
          padding="xs"
          :round="btnRounded"
          :disable="maxValue !== undefined ? modelValue >= maxValue : false"
          unelevated
          flat
          :class="btnBorderClass"
          @click="plus"
        />
      </template>
    </div>
  </q-field>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  name: 'CantInput',
  props: {
    btnBorder: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: false,
    },
    btnColor: { type: String as PropType<string>, default: 'black' },
    btnRounded: { type: Boolean as PropType<boolean>, default: false },
    inputReadonly: { type: Boolean as PropType<boolean>, default: false },
    maxValue: { type: Number as PropType<number> },
    minValue: { type: Number as PropType<number>, default: 0 },
    size: { type: Number as PropType<number>, default: 14 },
    type: { type: String as PropType<'plus-minus'>, default: 'plus-minus' },
    modelValue: {
      type: [Number, String] as PropType<number | string>,
      default: 0,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const { btnBorder, maxValue, minValue, size, modelValue } = toRefs(_props);
    /**
     * BTN_BORDER_CLASS
     */
    const btnBorderClass = computed(() => {
      if (typeof btnBorder.value == 'string')
        return `border-${btnBorder.value}`;
      else if (btnBorder.value) return 'border-dark';
      return '';
    });
    /**
     * INPUT_STYLES
     */
    const inputStyles = computed(() => ({
      maxWidth: '20px',
      textAlign: 'center',
      fontSize: `${size.value + 2}px`,
    }));

    /**
     * EMIT_EVENT
     */
    function emitEvent(_value: number) {
      emit('update:modelValue', _value);
    }

    /**
     * HANDLE_INPUT
     */
    function handleInput(_value: number) {
      emitEvent(Number(_value));
    }

    /**
     * MINUS
     */
    function minus() {
      if (Number(modelValue.value) > minValue.value) {
        emitEvent(Number(modelValue.value) - 1);
      }
    }
    /**
     * PLUS
     */
    function plus() {
      if (
        (maxValue.value && Number(modelValue.value) + 1 <= maxValue.value) ||
        !maxValue.value
      )
        emitEvent(Number(modelValue.value) + 1);
    }
    return {
      // Props
      ..._props,
      // Computed
      btnBorderClass,
      inputStyles,
      // Methods
      handleInput,
      minus,
      plus,
    };
  },
});
</script>
