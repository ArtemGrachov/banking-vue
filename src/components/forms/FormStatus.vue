<script setup lang="ts">
import { EStatus } from '@/constants/status';
import { computed } from 'vue';

const enum EFormStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IProps {
  status?: string | EStatus;
}

const { status } = defineProps<IProps>();

const hostClassNames = computed(() => {
  const result: string[] = [];

  switch (status) {
    case EStatus.SUCCESS:
    case EFormStatus.SUCCESS: {
      result.push('_success');
      break;
    }
    case EStatus.ERROR:
    case EFormStatus.ERROR: {
      result.push('_error');
      break;
    }
  }

  return result;
});

const internalMessage = computed(() => {
  switch (status) {
    case EFormStatus.SUCCESS: {
      return 'Success';
    }
    case EFormStatus.ERROR: {
      return 'An error occured';
    }
  }
});
</script>

<template>
  <div class="form-status" :class="hostClassNames">
    <slot />
    {{!$slots.default ?  internalMessage : null}}
  </div>
</template>

<style lang="scss" scoped>
.form-status {
  margin-bottom: 32px;
  display: block;
  width: 100%;
  padding: 16px;
  border: 1px solid #b1b1b1;
  transition: 200ms;
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.05em;
  color: #2a2a2a;
  line-height: 1;

  &._success {
    border-color: green;
    color: darkgreen;
  }

  &._error {
    border-color: red;
    color: darkred;
  }
}
</style>
