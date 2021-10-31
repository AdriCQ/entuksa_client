<template>
  <q-card-section>
    <div class="row q-col-gutter-none gt-xs">
      <div class="col-6">
        <auth-slider />
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="px-none card-login" flat>
          <q-card-section>
            <div class="text-center text-bold text-grey-9 text-h5">Registro</div>
          </q-card-section>
          <q-card-section>
            <register-form />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="xs">
      <q-card class="px-none card-login" flat>
        <q-card-section>
          <div class="text-center text-bold text-grey-9 text-h5">Registro</div>
        </q-card-section>
        <q-card-section>
          <register-form />
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import RegisterForm from 'components/forms/auth/RegisterForm.vue';

export default defineComponent({
  name: 'AuthRegisterPage',
  components: {
    'auth-slider': defineAsyncComponent(() => import('components/sliders/AuthSlider.vue')),
    RegisterForm,
  },

});
</script>