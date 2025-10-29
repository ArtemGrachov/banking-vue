<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/routes';
import { useGetRoute } from '@/composables/routing/get-route';

interface IProps {
  isLogin?: boolean;
  isRegistration?: boolean;
  isResetPassword?: boolean;
}

defineProps<IProps>();

const getRoute = useGetRoute();

</script>

<template>
  <div class="auth-links">
    <div v-if="!isRegistration" class="row">
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.REGISTRATION })">
        {{ $t('common_auth.registration_link') }}
      </RouterLink>
    </div>
    <div v-if="!isLogin" class="row">
      {{ $t('common_auth.login_label') }}
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.LOGIN })">
        {{ $t('common_auth.login_link') }}
      </RouterLink>
    </div>
    <div v-if="!isResetPassword" class="row">
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD })">
        {{ $t('common_auth.forgot_password') }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-links {
  margin-top: 32px;
  text-align: center;
}

.row {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
