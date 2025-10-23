<script setup lang="ts">
import FormForgotPassword from '@/components/forms/FormForgotPassword.vue';

</script>

<template>
  <div class="page">
    <div class="container">
      <FormForgotPassword />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
}

.container {
  @include layout.container(400px);
}
</style>
