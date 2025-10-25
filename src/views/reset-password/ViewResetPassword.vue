<script setup lang="ts">
import FormResetPassword from '@/components/forms/FormResetPassword.vue';
</script>

<template>
  <div class="page">
    <div class="container">
      <FormResetPassword />
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
