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
      <q-btn-toggle
        v-model="formMode"
        dense
        push
        rounded
        spread
        toggle-color="secondary"
        :options="[
          { value: 'email', slot: 'email' },
          { value: 'mobile', slot: 'mobile' },
        ]"
      >
        <template v-slot:email>
          <div class="row items-center no-wrap">
            <div class="text-center">Email</div>
            <q-icon right name="mdi-email" />
          </div>
        </template>

        <template v-slot:mobile>
          <div class="row items-center no-wrap">
            <div class="text-center">Teléfono</div>
            <q-icon right name="mdi-phone" />
          </div>
        </template>
      </q-btn-toggle>
      <!-- Email Input -->
      <q-input
        v-if="formMode === 'email'"
        class="q-mt-sm"
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
      <!-- / Email Input -->
      <!-- MobilePhone Input -->
      <q-input
        v-if="formMode === 'mobile'"
        class="q-mt-sm"
        v-model="form.mobilePhone"
        type="tel"
        label="Teléfono"
        color="grey-6"
        label-slot
        :rules="rules.phone"
        lazy-rules
        no-error-icon
      >
        <template v-slot:label>
          <span class="text-grey-8 text-subtitle2">Teléfono</span>
        </template>
      </q-input>
      <!-- / MobilePhone Input -->

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
        text-color="dark"
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
import { userInjectionKey, IAuthSignInReq, IAuthRes } from 'src/modules';
import { ROUTE_NAME } from 'src/helpers';

export default defineComponent({
  name: 'AuthLoginForm',
  setup ()
  {
    const rememberMe = ref(false);
    const $q = useQuasar();
    const $router = useRouter();
    const UserStore = injectStrict(userInjectionKey);
    const { isEmail, isPhone, lengthMore, required } = Validations();
    const rules = {
      email: [
        required('El correo electrónico no puede estar vacío.'),
        isEmail('El correo electrónico debe ser válido.'),
      ],
      password: [
        required('La contraseña no puede estar vacía.'),
        lengthMore(6, 'La contraseña debe tener 6 o más caracteres.'),
      ],
      phone: [
        required('El Teléfono vacío.'),
        isPhone('El Teléfono debe ser válido.'),
      ],
    };
    // Form
    const form = ref<IAuthSignInReq>({
      email: '',
      mobilePhone: '',
      password: '',
    });
    // Form Mode
    const formMode = ref<'mobile' | 'email'>('email');
    // Password Visibility
    const show_password = ref(false);

    function togglePwdVisibility () { show_password.value = !show_password.value; }

    /**
     * Submit form
     */
    function submit ()
    {
      let signIn: Promise<IAuthRes>;
      if (formMode.value === 'email')
      {
        signIn = UserStore.singIn({
          email: form.value.email,
          password: form.value.password
        });
      } else
      {
        signIn = UserStore.singIn({
          mobilePhone: form.value.mobilePhone,
          password: form.value.password
        })
      }
      signIn.then(_r =>
      {
        $q.notify({
          type: 'positive',
          icon: 'mdi-check',
          message: `${_r.user.name}, te doy la bienvenida a EnTuKsa`,
        });
        void $router.push({ name: ROUTE_NAME.MAIN_HOME });
      }).catch((error: AxiosError<ErrorData>) =>
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
      form, formMode,
      rememberMe,
      submit,
      show_password,
      togglePwdVisibility,
      rules,
    };
  }
});
</script>

<style lang="scss" scoped>
.card-login {
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}
</style>