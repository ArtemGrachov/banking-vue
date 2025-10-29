<script setup lang="ts">
import Error from '@/components/error/Error.vue';

</script>

<template>
  <div class="page">
    <Error>
      <template #title>
        404
      </template>
    </Error>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
