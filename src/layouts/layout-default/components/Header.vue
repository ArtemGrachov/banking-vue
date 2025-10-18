<template>
  <header class="header">
    <div class="container">
      <button type="button" class="menu-toggle">
        <span class="material-symbols-outlined">
          more_vert
        </span>
      </button>
      <div class="title">
        Page title
      </div>
      <span class="cell-placeholder"></span>
      <div class="switch">
        @todo language and theme switch
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/buttons.scss' as buttons;
@use '/src/styles/mixins/headings.scss' as headings;

.header {
  --header-height: 74px;

  height: var(--header-height);
  border-bottom: 4px solid red;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 5px 16px 0 rgba(black, 0.1);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  @include breakpoints.lg() {
    @include layout.container();
  }
}

.menu-toggle,
.cell-placeholder {
  flex: 0 0 auto;
  height: var(--header-height);
  width: var(--header-height);

  @include breakpoints.lg() {
    --button-display: none;
    display: none;
  }
}

.menu-toggle {
  @include breakpoints.lg() {
    --button-display: none;
  }
}

.cell-placeholder {
  @include breakpoints.lg() {
    display: none;
  }
}

.menu-toggle {
  @include buttons.icon();
}

.title {
  @include headings.h3();

  margin: 0;
  text-transform: uppercase;
  text-align: center;
  flex: 1 1 auto;

  @include breakpoints.lg() {
    text-align: left;
  }
}

.switch {
  display: none;

  @include breakpoints.lg() {
    display: block;
  }
}
</style>
