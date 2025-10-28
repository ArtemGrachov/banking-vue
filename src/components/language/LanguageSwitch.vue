<script setup lang="ts">
import { LOCALE_EMOJI, LOCALES } from '@/i18n/config';

import { useLanguageSwitch } from '@/composables/language/language-switch';

import Button from '@/components/buttons/Button.vue';
import Dropdown from '@/components/dropdowns/Dropdown.vue';
import DropdownArrow from '@/components/dropdowns/DropdownArrow.vue';
import DropdownOption from '@/components/dropdowns/DropdownOption.vue';
import DropdownOptionsList from '@/components/dropdowns/DropdownOptionsList.vue';

const { localeOptions, switchLocale } = useLanguageSwitch();
</script>

<template>
  <Dropdown :options="{ placement: 'bottom-end' }">
    <template #toggle="{ isActive, toggle }">
      <Button
        type="button"
        variant="transparent"
        class="language-switch"
        @click="toggle"
      >
        {{ LOCALE_EMOJI[$i18n.locale] }} {{ $i18n.locale }}
        <DropdownArrow :is-active="isActive" />
      </Button>
    </template>
    <DropdownOptionsList :slots="LOCALES">
      <template v-for="locale in localeOptions" :key="locale" #[locale.localeCode]>
        <DropdownOption
          type="button"
          class="option"
          @click="switchLocale(locale.localeCode)"
        >
          {{ locale.emoji }} {{ locale.label }}
        </DropdownOption>
      </template>
    </DropdownOptionsList>
  </Dropdown>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.language-switch {
  --button-text-color: var(--text-color);

  text-transform: uppercase;
  color: var(--text-color);
}

.option {
  white-space: nowrap;
}
</style>
