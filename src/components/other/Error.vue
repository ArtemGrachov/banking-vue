<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import Button from '@/components/buttons/Button.vue';
import { useGetRoute } from '@/composables/routing/get-route';

const getRoute = useGetRoute();

</script>

<template>
  <div class="error">
    <span class="material-symbols-outlined icon">
      warning
    </span>
    <div v-if="$slots.title" class="title">
      <slot name="title" />
    </div>
    <div class="subtitle">
      <slot name="subtitle" />
      <template v-if="!$slots.subtitle">
        {{ $t('error.subtitle') }}
      </template>
    </div>
    <Button :as="RouterLink" :to="getRoute({ name: ROUTE_NAMES.HOME })">
      {{ $t('error.return') }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/headings.scss' as headings;
@use '/src/styles/mixins/texts.scss' as texts;

.error {
  text-align: center;
  line-height: 1;
}

.icon {
  font-size: 96px;
  color: grey;
}

.title {
  @include headings.h1();

  margin-top: 8px;
}

.subtitle {
  @include headings.h2();

  color: grey;
}

</style>
