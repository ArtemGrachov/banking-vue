<script lang="ts" setup>
import { ref, watch } from 'vue';
import { vIntersectionObserver, type IntersectionCallback } from '@/directives/intersection-observer';

interface IProps {
  isDisabled?: boolean;
}

type Emits = {
  (e: 'scroll'): void;
}

const isIntersecting = ref(false);
const { isDisabled } = defineProps<IProps>();
const emit = defineEmits<Emits>();

const handleIntersection = () => {
  if (isDisabled || !isIntersecting.value) {
    return;
  }

  emit('scroll');
}

const scrollCallback: IntersectionCallback = (entry) => {
  isIntersecting.value = entry.isIntersecting;
  handleIntersection();
}

watch(() => isDisabled, (newValue, oldValue) => {
  if (oldValue && !newValue) {
    setTimeout(handleIntersection, 10);
  }
})
</script>

<template>
  <div class="infinite-scroll" v-intersection-observer="{ callback: scrollCallback }"></div>
</template>
