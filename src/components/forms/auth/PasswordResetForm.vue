<template>
  <q-form @submit="submit" class="q-px-sm">
    <q-card-section>
      <q-input
        v-model="form.password"
        color="grey-7"
        :type="show.password ? 'text' : 'password'"
        label-slot
        :rules="rules.password"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Contraseña</span>
        </template>

        <template v-slot:append>
          <q-icon
            :name="show.password ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            class="cursor-pointer"
            @click="togglePwdVisibility('password')"
          />
        </template>
      </q-input>

      <q-input
        v-model="form.password_repeat"
        color="grey-6"
        :type="show.password_repeat ? 'text' : 'password'"
        label-slot
        :rules="rules.password_repeat"
        lazy-rules
        reactive-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Confirmar contraseña</span>
        </template>

        <template v-slot:append>
          <q-icon
            :name="show.password_repeat ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            class="cursor-pointer"
            @click="togglePwdVisibility('password_repeat')"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section>
      <q-btn
        label="Cambiar contraseña"
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
import { defineComponent, ref, watch } from 'vue'
import { Validations } from 'src/helpers/validations';

export default defineComponent({
  name: 'AuthPasswordResetForm',
  setup ()
  {
    /**
     * State
     */
    const form = ref({
      password: '',
      password_repeat: '',
    });

    const show = ref({ password: false, password_repeat: false });

    const { required, lengthMore, sameAs } = Validations();

    const rules = {
      password: [
        required('La contraseña no puede estar vacía.'),
        lengthMore(6, 'La contraseña debe tener 6 o más caracteres.'),
      ],
      password_repeat: [
        required('La contraseña no puede estar vacía.'),
        sameAs(form.value.password, 'Ambas contraseñas deben ser idénticas.'),
      ],
    };

    watch(
      () => form.value.password,
      (newPassword) =>
      (rules.password_repeat = [
        required('La contraseña no puede estar vacía.'),
        sameAs(newPassword, 'Ambas contraseñas deben ser idénticas.'),
      ])
    );

    /**
     * Methods
     */
    function togglePwdVisibility (type: 'password' | 'password_repeat')
    {
      if (type == 'password')
      {
        show.value.password = !show.value.password;
      } else if (type == 'password_repeat')
      {
        show.value.password_repeat = !show.value.password_repeat;
      }
    }

    function submit ()
    {
      console.log('Submit my new password, for reset it.', form.value);
    }

    return {
      form,
      show,
      rules,
      togglePwdVisibility,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-login {
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}
</style>