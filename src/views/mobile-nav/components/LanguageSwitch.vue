<script setup lang="ts">
import { useLanguageSwitch } from '@/composables/language/language-switch';

import Button from '@/components/buttons/Button.vue';

type Emits = {
  (e: 'return'): void;
}

const emit = defineEmits<Emits>();

const { localeOptions, switchLocale } = useLanguageSwitch();

const switchLocaleHandler = (localeCode: string) => {
  switchLocale(localeCode);
  emit('return');
}
</script>

<template>
  <div class="language-switch">
    <ul class="list">
      <li
        v-for="locale in localeOptions"
        :key="locale.localeCode"
        class="item"
      >
        <Button
          variant="transparent"
          class="link"
          @click="switchLocaleHandler(locale.localeCode)"
        >
          {{ locale.emoji }} {{ locale.label }}
        </Button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link {
  --button-justify-content: flex-start;
  --button-text-align: left;
  --button-border-radius: 0;
  width: 100%;
}
</style>
