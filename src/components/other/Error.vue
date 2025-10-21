<script setup lang="ts">
import { RouterLink } from 'vue-router';

import Button from '@/components/buttons/Button.vue';

</script>

<template>
  <div class="error">
    <span class="material-symbols-outlined icon">
      warning
    </span>
    <div class="title">
      <slot name="title" />
      <template v-if="!$slots.title">
        Error title
      </template>
    </div>
    <div class="subtitle">
      <slot name="subtitle" />
      <template v-if="!$slots.subtitle">
        Error subtitle
      </template>
    </div>
    <Button :as="RouterLink" :to="'/'">
      Return to the home page
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
