<template>
  <div class="placeholder">
    <div class="content">
      <div class="icon">
        <slot name="icon" />
      </div>
      <div class="title">
        <slot name="title" />
      </div>
      <div class="subtitle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/headings.scss' as headings;

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 32px 16px;
  color: #434343;
}

.content {
  text-align: center;
}

.title {
  @include headings.h4();
  color: #434343;
}

.subtitle {
  @include headings.h5();
  color: #434343;
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #b3b3b3;
}
</style>
