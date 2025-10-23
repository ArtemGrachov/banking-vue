<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import FormLogin from '@/components/forms/FormLogin.vue';

import type { IFormLogin } from '@/types/forms/form-login';

const getRoute = useGetRoute();

</script>

<template>
  <div class="page">
    <div class="container">
      <FormLogin />
      <div class="footer">
        <div class="login">
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.REGISTRATION })">
            {{ $t('view_login.registration_link') }}
          </RouterLink>
        </div>
        <div class="forgot">
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD })">
            {{ $t('view_login.forgot_password') }}
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
