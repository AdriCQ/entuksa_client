<template>
  <q-card-section>
    <div class="row q-col-gutter-none gt-xs">
      <div class="col-6">
        <auth-slider />
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="px-none card-login" flat>
          <q-card-section>
            <div class="text-center text-bold text-grey-9 text-h5">Restablecer Contraseña</div>
          </q-card-section>
          <q-card-section
            class="text-body2 text-grey-8 q-py-sm"
          >Inserte su dirección de correo electrónico y le enviaremos en un correo su contraseña inmediatamente.</q-card-section>
          <recovery-form />
        </q-card>
      </div>
    </div>
    <div class="xs">
      <q-card class="px-none card-login" flat>
        <q-card-section>
          <div class="text-center text-bold text-grey-9 text-h5">Restablecer Contraseña</div>
        </q-card-section>
        <q-card-section
          class="text-body2 text-grey-8 q-py-sm"
        >Inserte su dirección de correo electrónico y le enviaremos en un correo su contraseña inmediatamente.</q-card-section>
        <recovery-form />
      </q-card>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
/**
 * PasswordRecoverPage
 */
export default defineComponent({
  name: 'PasswordRecoverPage',
  components: {
    'auth-slider': defineAsyncComponent(() => import('components/sliders/AuthSlider.vue')),
    'recovery-form': defineAsyncComponent(() => import('components/forms/auth/PasswordRecoveryForm.vue'))
  },
});
</script>

<style lang="scss" scoped>
.card-login {
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}
</style>