<script setup lang="ts">
import { RouterLink } from 'vue-router';

import FormRegistration from '@/components/forms/FormRegistration.vue';
import { useGetRoute } from '@/composables/routing/get-route';
import { ROUTE_NAMES } from '@/router/routes';

import type { IFormRegistration } from '@/types/forms/form-registration';

const getRoute = useGetRoute();

const submitHandler = (formValue: IFormRegistration) => {
  console.log(formValue);
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormRegistration @submit="submitHandler" />
      <div class="footer">
        <div class="login">
          {{ $t('view_registration.login_label') }}
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.LOGIN })">
            {{ $t('view_registration.login_link') }}
          </RouterLink>
        </div>
        <div class="forgot">
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD })">
            {{ $t('view_registration.forgot_password') }}
          </RouterLink>
        </div>
      </div>
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

.footer {
  text-align: center;
  margin-top: 32px;
}

.login {
  margin-bottom: 16px;
}
</style>
