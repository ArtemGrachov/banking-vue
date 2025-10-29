<script setup lang="ts">
import FormSecurity from '@/components/forms/FormSecurity.vue';

import type { IFormRegistration } from '@/types/forms/form-registration';

const submitHandler = async (formValue: IFormRegistration) => {
  console.log(formValue);
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormSecurity
        @submit="submitHandler"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container(400px);
}
</style>
