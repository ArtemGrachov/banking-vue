<script setup lang="ts">
import { computed, ref } from 'vue';
import { offset, useFloating } from '@floating-ui/vue';
import { directive as vClickAway } from 'vue3-click-away';

const reference = ref(null);
const floating = ref(null);

const { floatingStyles } = useFloating(reference, floating, {
  transform: false,
  placement: 'bottom-start',
  middleware: [offset(8)],
});

const isActive = ref(false);

const clickOutsideHandler = () => {
  isActive.value = false;
}

const toggleHandler = () => {
  isActive.value = !isActive.value;
}
</script>

<template>
  <div ref="reference" class="dropdown" v-click-away="clickOutsideHandler">
    <slot name="toggle" :is-active="isActive" :toggle="toggleHandler" />
  </div>
  <transition name="dropdown">
    <div v-if="isActive" ref="floating" :style="floatingStyles" class="content">
      <slot />
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
</style>
