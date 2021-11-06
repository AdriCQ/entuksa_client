<template>
  <q-page class="q-gutter-y-sm" padding>
    <q-card class="no-box-shadow">
      <q-card-section>
        <div class="text-h6">User Profile</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit</q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfilePage'
});
</script>