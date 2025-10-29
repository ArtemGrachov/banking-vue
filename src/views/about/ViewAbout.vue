<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n';

const ContentUK = defineAsyncComponent(() => import('./translations/UK.vue'));
const ContentSK = defineAsyncComponent(() => import('./translations/SK.vue'));
const ContentPL = defineAsyncComponent(() => import('./translations/PL.vue'));
const ContentLT = defineAsyncComponent(() => import('./translations/LT.vue'));
const ContentEN = defineAsyncComponent(() => import('./translations/EN.vue'));
const ContentDE = defineAsyncComponent(() => import('./translations/DE.vue'));
const ContentCS = defineAsyncComponent(() => import('./translations/CS.vue'));
const ContentBE = defineAsyncComponent(() => import('./translations/BE.vue'));

const { locale } = useI18n()

const contentComponent = computed(() => {
  switch (locale.value) {
    case 'uk': {
      return ContentUK;
    }
    case 'sk': {
      return ContentSK;
    }
    case 'pl': {
      return ContentPL;
    }
    case 'lt': {
      return ContentLT;
    }
    case 'en': {
      return ContentEN;
    }
    case 'de': {
      return ContentDE;
    }
    case 'cs': {
      return ContentCS;
    }
    case 'be': {
      return ContentBE;
    }
    default: {
      return null;
    }
  }
});
</script>

<template>
  <div class="page">
    <div class="container">
      <component v-if="contentComponent" :is="contentComponent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container();
}
</style>
