<script lang="ts" setup>
import { computed } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';

interface IProps {
  time?: number | null;
}

type Emits = {
  (e: 'end'): void;
  (e: 'progress', data: any): void;
}

const { time } = defineProps<IProps>();
const emit = defineEmits<Emits>();

const timeSeconds = computed(() => time == null ? 0 : time / 1000);
</script>

<template>
  <VueCountdown
    v-slot="{ seconds }"
    tag="div"
    :time="time ?? 0"
    @end="emit('end')"
    @progress="emit('progress', $event)"
  >
    <div class="progress">
      <div class="bar" :style="{ width: time == null ? 0 : `${(seconds / timeSeconds) * 100}%` }"></div>
    </div>
  </VueCountdown>
</template>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 4px;
  background: #d4cdcd;
  position: relative;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  background: red;
}
</style>
