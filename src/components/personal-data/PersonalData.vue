<script lang="ts" setup>
import type { IPersonalInfo } from '@/types/models/personal-info';

interface IProps {
  data: IPersonalInfo;
}

defineProps<IProps>();
</script>

<template>
  <div class="personal-data">
    <ul class="list">
      <li class="item">
        <div class="label">{{ $t('personal_info.full_name') }}</div>
        <div class="value">{{ data.fullName }}</div>
      </li>
      <li class="item">
        <div class="label">{{ $t('personal_info.country') }}</div>
        <div class="value">{{ data.country }}</div>
      </li>
      <li class="item">
        <div class="label">{{ $t('personal_info.address') }}</div>
        <div class="value">{{ data.address }}</div>
      </li>
      <li class="item">
        <div class="label">{{ $t('personal_info.id_number') }}</div>
        <div class="value">{{ data.idNumber }}</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/texts.scss' as texts;

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  margin-bottom: 16px;
}

.label {
  @include texts.secondary();
  margin-bottom: 4px;
}

.value {
  @include texts.primary();

  font-weight: 500;
}
</style>
