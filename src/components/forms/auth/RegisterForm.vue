<template>
  <q-form
    @submit="submit"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    class="q-px-sm"
  >
    <q-card-section>
      <!-- First Name -->
      <q-input
        v-model="form.name"
        label="Nombre"
        color="grey-6"
        label-slot
        :rules="rules.name"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Nombre</span>
        </template>
      </q-input>
      <!-- / First Name -->
      <!-- Last Name -->
      <q-input
        v-model="form.lastName"
        label="Apellidos"
        color="grey-6"
        label-slot
        :rules="rules.lastName"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Apellidos</span>
        </template>
      </q-input>
      <!-- / Last Name -->
      <!-- Email -->
      <q-input
        v-model="form.email"
        label="Correo"
        color="grey-6"
        label-slot
        :rules="rules.email"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Correo</span>
        </template>
      </q-input>
      <!-- / Email -->
      <!-- Mobile Phone -->
      <q-input
        v-model="form.mobilePhone"
        label="Teléfono"
        color="grey-6"
        label-slot
        :rules="rules.mobilePhone"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Teléfono</span>
        </template>
      </q-input>
      <!-- / Mobile Phone -->

      <q-input
        v-model="form.password"
        color="grey-6"
        :type="show_password ? 'text' : 'password'"
        label-slot
        :rules="rules.password"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Constraseña</span>
        </template>

        <template v-slot:append>
          <q-icon
            :name="show_password ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            class="cursor-pointer"
            @click="togglePwdVisibility"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section class="q-pt-none q-pl-sm">
      <q-checkbox v-model="rememberMe" color="primary" size="sm">
        <span class="text-grey-8 text-body2">Recordar contraseña</span>
      </q-checkbox>
    </q-card-section>

    <q-card-section class="q-gutter-y-sm">
      <q-btn
        label="Entrar"
        type="submit"
        color="primary"
        text-color="white"
        class="full-width"
        padding="sm"
        rounded
        unelevated
      />
      <q-btn
        :to="{ name: 'auth.pwd-recover' }"
        class="full-width text-body1 text-bold"
        color="grey-9"
        padding="sm"
        rounded
        flat
        no-caps
      >Olvidaste tu contraseña?</q-btn>
    </q-card-section>
  </q-form>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { Validations } from 'src/helpers/validations';
import { injectStrict } from 'src/helpers/injections';
import { ErrorData, } from 'src/types';
import { userInjectionKey, UserServices, IAuthSignupReq } from 'src/modules';
import { ROUTE_NAME } from 'src/helpers';

export default defineComponent({
  name: 'AuthRegisterForm',
  setup ()
  {
    /**
     * Form
     */
    const form = ref<IAuthSignupReq>({
      name: '',
      lastName: '',
      email: '',
      mobilePhone: '',
      password: '',
    });

    // Validations
    const { required, isEmail, lengthMore, lengthEqual } = Validations();

    const rules = {
      name: [
        required('El nombre es necesario')
      ],
      lastName: [
        required('El apellido es necesario')
      ],
      email: [
        required('El correo electrónico no puede estar vacío.'),
        isEmail('El correo electrónico debe ser válido.'),
      ],
      mobilePhone: [
        required('El número de teléfono no puede estar vacío'),
        lengthEqual(8, 'El teléfono debe tener 8 números')
      ],
      password: [
        required('La contraseña no puede estar vacía.'),
        lengthMore(6, 'La contraseña debe tener 6 o más caracteres.'),
      ],
    };

    // Password Visibility
    const show_password = ref(false);

    function togglePwdVisibility ()
    {
      show_password.value = !show_password.value;
    }

    const rememberMe = ref(false);

    const { signUp } = UserServices();

    // Quasar Plugins
    const $q = useQuasar();

    const $router = useRouter();

    const User = injectStrict(userInjectionKey);

    /**
     * Submit form
     */
    function submit ()
    {
      signUp(form.value)
        .then((response) =>
        {
          if (response.data)
          {
            const { user, token } = response.data;
            User.profile = user;
            User.authToken = token;

            // Show notification
            $q.notify({
              type: 'positive',
              icon: 'mdi-check-circle-outline',
              message: `Bienvenido ${User.profile.name} a Palrey`,
            });

            setTimeout(() => void $router.push({ name: ROUTE_NAME.MAIN_HOME }), 1000);
          }
        })
        .catch((error: AxiosError<ErrorData>) =>
        {
          if (error.response && error.response.data)
          {
            // Show notification
            $q.notify({
              type: 'negative',
              icon: 'mdi-alert-circle-outline',
              message: error.response.data.message,
            });
          }
        });
    }

    return {
      form,
      rememberMe,
      submit,
      show_password,
      togglePwdVisibility,
      rules,
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