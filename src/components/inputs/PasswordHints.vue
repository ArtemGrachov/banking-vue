<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { offset, useFloating } from '@floating-ui/vue';
import type { Validation } from '@vuelidate/core';

interface IProps {
  input?: Validation<any, any> | Record<string, any>;
}

const { input } = defineProps<IProps>();
const { t } = useI18n();

const reference = ref(null);
const floating = ref(null);

const { floatingStyles } = useFloating(reference, floating, {
  transform: false,
  placement: 'bottom-start',
  middleware: [offset(8)],
});

const isActive = ref(false);

const onFocus = () => {
  isActive.value = true;
}

const onBlur = () => {
  isActive.value = false;
}

const validationList = computed(() => {
  const hasValue = !!input?.$model;

  return [
    {
      key: 'onlyLatin',
      label: t('password_hints.only_latin'),
      isValid: hasValue && input?.onlyLatin.$invalid === false,
    },
    {
      key: 'containLowerCase',
      label: t('password_hints.contain_lower_case'),
      isValid: hasValue && input?.containLowerCase.$invalid === false,
    },
    {
      key: 'containUpperCase',
      label: t('password_hints.contain_upper_case'),
      isValid: hasValue && input?.containUpperCase.$invalid === false,
    },
    {
      key: 'containNumber',
      label: t('password_hints.contan_number'),
      isValid: hasValue && input?.containNumber.$invalid === false,
    },
    {
      key: 'specialSymbol',
      label: t('password_hints.special_symbol'),
      isValid: hasValue && input?.specialSymbol.$invalid === false,
    },
    {
      key: 'minLength',
      label: t('password_hints.min_length', { min: input?.minLength.$params.min }),
      isValid: hasValue && input?.minLength.$invalid === false,
    },
  ];
});
</script>

<template>
  <div ref="reference" class="password-hints">
    <slot :on-focus="onFocus" :on-blur="onBlur" />
  </div>
  <transition name="dropdown">
    <div v-if="isActive" ref="floating" :style="floatingStyles" class="content">
      <ul class="list">
        <li
          v-for="item in validationList"
          :key="item.key"
          class="item"
          :class="{ _valid: item.isValid }"
        >
          <span class="check material-symbols-outlined">
            check
          </span>
          <span>
            {{ item.label }}
          </span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.content {
  @include dropdowns.dropdown();
  @include dropdowns.content();
}

.dropdown-enter-active,
.dropdown-leave-active {
  @include dropdowns.dropdown-open();
}

.dropdown-enter-from,
.dropdown-leave-to {
  @include dropdowns.dropdown-closed();
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.item {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
  align-items: flex-start;

  &:last-child {
    margin-bottom: 0;
  }

  &._valid {
    color: green;

    .check {
      opacity: 1;
    }
  }
}

.check {
  flex: 0 0 auto;
  opacity: 0;
  color: green;
  font-size: 15px;
}
</style>
