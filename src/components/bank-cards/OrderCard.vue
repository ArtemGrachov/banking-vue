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
@use '/src/styles/functions/px-to-em.scss' as *;
@use '/src/styles/mixins/bank-card.scss' as bank-card;

.order-card {
  @include bank-card.container();

  font-size: var(--bank-card-font-size, 16px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: px-to-em(12px);
  gap: px-to-em(16px);
  padding: px-to-em(16px);
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
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  transition: ease-in-out 400ms;

  &:hover {
    background-size: 800%;
  }
}

.title {
  font-size: 18px;
}

.icon {
  width: px-to-em(48px);
  height: px-to-em(48px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: red;
}
</style>
