<template>
  <q-card-section>
    <div class="row q-col-gutter-none gt-xs">
      <div class="col-6">
        <auth-slider />
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="px-none card-login" flat>
          <q-card-section>
            <div class="text-center text-bold text-grey-9 text-h5">Iniciar Sesión</div>
          </q-card-section>
          <q-card-section>
            <login-form />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="xs">
      <q-card class="px-none card-login" flat>
        <q-card-section>
          <div class="text-center text-bold text-grey-9 text-h5">Iniciar Sesión</div>
        </q-card-section>
        <q-card-section>
          <login-form />
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from 'src/components/forms/auth/LoginForm.vue';
import AuthSlider from 'src/components/sliders/AuthSlider.vue';

export default defineComponent({
  components: {
    LoginForm,
    AuthSlider
  },
  name: 'LoginPage',

});
</script>