<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';

const getRoute = useGetRoute();

</script>

<template>
  <RouterLink class="order-card" :to="getRoute({ name: ROUTE_NAMES.ORDER_CARD })">
    <div class="icon">
      <span class="material-symbols-outlined">
        add_card
      </span>
    </div>
    <div class="title">
      {{ $t('order_card.title') }}
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.order-card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  gap: 16px;
  padding: 16px;
  background-image: linear-gradient(
    163deg,
    rgb(232, 228, 228) 0%,
    rgb(179, 179, 179) 50%,
    rgb(179, 179, 179) 69%,
    rgb(232, 228, 228) 70%,
    rgb(148, 148, 148) 100%,
  );
  background-size: 100%;
  background-position: center;
  color: #1c1c1c;
  max-width: 340px;
  min-height: 200px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: ease-in-out 400ms;

  @include breakpoints.sm() {
    max-width: 400px;
  }

  &:hover {
    background-size: 800%;
  }
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: red;
}
</style>
