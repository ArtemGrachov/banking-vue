<script setup lang="ts">
import { computed, ref } from 'vue';
import { offset, useFloating } from '@floating-ui/vue';
import { directive as vClickAway } from 'vue3-click-away';

interface IProps {
  toggleTag?: string;
}

const { toggleTag = 'button' } = defineProps<IProps>();

const reference = ref(null);
const floating = ref(null);

const { floatingStyles } = useFloating(reference, floating, {
  transform: false,
  placement: 'bottom-start',
  middleware: [offset(8)],
});

const isActive = ref(true);

const toggleClassNames = computed(() => {
  const result: string[] = [];

  if (isActive.value) {
    result.push('_active');
  }

  return result;
});

const clickOutsideHandler = () => {
  isActive.value = false;
}
</script>

<template>
  <div class="dropdown" v-click-away="clickOutsideHandler">
    <component
      ref="reference"
      :is="toggleTag"
      type="button"
      class="toggle"
      :class="toggleClassNames"
      @click="isActive = !isActive"
    >
      <slot name="toggle" />
      <span class="material-symbols-outlined arrow">
        arrow_drop_down
      </span>
    </component>
    <transition name="dropdown">
      <div v-if="isActive" ref="floating" :style="floatingStyles" class="content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles//mixins/dropdowns.scss' as dropdowns;

.toggle {
  @include dropdowns.toggle();

  &._active {
    @include dropdowns.toggle-active();

    .arrow {
      @include dropdowns.arrow-active();
    }
  }
}

.content {
  @include dropdowns.dropdown();
  @include dropdowns.content();
}

.arrow {
  @include dropdowns.arrow();
}

.dropdown-enter-active,
.dropdown-leave-active {
  @include dropdowns.dropdown-open();
}

.dropdown-enter-from,
.dropdown-leave-to {
  @include dropdowns.dropdown-closed();
}
</style>
