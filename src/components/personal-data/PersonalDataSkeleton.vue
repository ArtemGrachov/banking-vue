<template>
  <div class="personal-data">
    <ul class="list">
      <li class="item" v-for="i in 4" :key="i">
        <div class="label">
          <span class="label-skeleton" />
        </div>
        <div class="value">
          <span class="value-skeleton" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/texts.scss' as texts;
@use '/src/styles/mixins/skeleton.scss' as skeleton;

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
}

.label-skeleton,
.value-skeleton {
  @include skeleton.skeleton();
}

.label-skeleton {
  max-width: 120px;
}

.value-skeleton {
  max-width: 240px;
}
</style>
