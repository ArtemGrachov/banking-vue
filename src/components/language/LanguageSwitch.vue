<script setup lang="ts">
import { LOCALES } from '@/i18n/config';

import { useLanguageSwitch } from '@/composables/language/language-switch';

import Button from '@/components/buttons/Button.vue';
import Dropdown from '@/components/dropdowns/Dropdown.vue';
import DropdownArrow from '@/components/dropdowns/DropdownArrow.vue';
import DropdownOption from '@/components/dropdowns/DropdownOption.vue';
import DropdownOptionsList from '@/components/dropdowns/DropdownOptionsList.vue';

const { switchLocale } = useLanguageSwitch();
</script>

<template>
  <Dropdown>
    <template #toggle="{ isActive, toggle }">
      <Button
        type="button"
        variant="transparent"
        class="language-switch"
        @click="toggle"
      >
        {{ $i18n.locale }}
        <DropdownArrow :is-active="isActive" />
      </Button>
    </template>
    <DropdownOptionsList :slots="LOCALES">
      <template v-for="locale in LOCALES" :key="locale" #[locale]>
        <DropdownOption
          type="button"
          @click="switchLocale(locale)"
        >
          {{ locale }}
        </DropdownOption>
      </template>
    </DropdownOptionsList>
  </Dropdown>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.language-switch {
  text-transform: uppercase;
}
</style>
