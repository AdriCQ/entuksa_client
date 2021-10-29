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
          <q-card-section>
            <password-recovery-form />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="xs">
      <q-card class="px-none card-login" flat>
        <q-card-section>
          <div class="text-center text-bold text-grey-9 text-h5">Restablecer Contraseña</div>
        </q-card-section>
        <q-card-section>
          <password-reset-form />
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import PasswordRecoveryForm from 'src/components/forms/auth/PasswordResetForm.vue';
/**
 * PasswordResetPage
 */
export default defineComponent({
  name: 'PasswordResetPage',
  components: {
    'auth-slider': defineAsyncComponent(() => import('components/sliders/AuthSlider.vue')),
    PasswordRecoveryForm
  }
});
</script>