<script setup lang="ts">
import { onMounted } from 'vue';

import { usePersonalInfo } from './composables/personal-info';
import { useToast } from '@/composables/toast/toast';
import { useGetErrorMessage } from '@/composables/common/get-error-message';
import PersonalData from '@/components/personal-data/PersonalData.vue';
import PersonalDataSkeleton from '@/components/personal-data/PersonalDataSkeleton.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';

const { data, isProcessing, isError, statusMessage, getData } = usePersonalInfo();

const toast = useToast();
const getErrorMessage = useGetErrorMessage();

const getPersonalInfo = async () => {
  if (isProcessing.value) {
    return;
  }

  try {
    await getData();
  } catch (err) {
    console.error(err);
    toast.error(getErrorMessage(err));
  }
}

const getPageData = () => {
  getPersonalInfo();
}

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <div class="container">
      <PersonalDataSkeleton v-if="isProcessing" />
      <ErrorPlaceholder v-else-if="isError">
        <p>
          {{ statusMessage }}
        </p>
      </ErrorPlaceholder>
      <PersonalData v-else-if="data" :data="data" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container();
}
</style>