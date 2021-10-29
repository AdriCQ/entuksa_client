<template>
  <q-form @submit="submit" class="q-px-sm">
    <q-card-section>
      <q-input
        v-model="email"
        label="Correo Electrónico"
        color="grey-6"
        label-slot
        :rules="emailRules"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Correo Electrónico</span>
        </template>
      </q-input>
    </q-card-section>
    <q-card-section>
      <q-btn
        label="Enviar"
        type="submit"
        color="primary"
        text-color="white"
        class="full-width"
        padding="sm"
        rounded
        unelevated
      />
    </q-card-section>
  </q-form>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Validations } from 'src/helpers/validations';

/**
 * 
 */
export default defineComponent({
  name: 'PasswordRecoveryForm',
  setup ()
  {
    const email = ref('');
    const { isEmail, required } = Validations();
    const emailRules = [
      required('El correo electrónico no puede estar vacío.'),
      isEmail('El correo electrónico debe ser válido.'),
    ];
    function submit ()
    {
      console.log('Submit email for recover my password');
    }
    return {
      email,
      emailRules,
      submit,
    };
  },
});
</script>