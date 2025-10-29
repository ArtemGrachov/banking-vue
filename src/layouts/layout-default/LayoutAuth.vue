<template>
  <div class="page">
    <div class="col _form">
      <div class="content-wrap">
        <router-view></router-view>
      </div>
    </div>
    <div class="col _image">
    </div>
    <div class="author">
      Photo by <a href="https://unsplash.com/@3dparadise?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Braňo</a> on <a href="https://unsplash.com/photos/pink-pig-coin-bank-on-brown-wooden-table-heYdDdq0cbE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/themes.scss' as themes;

.page {
  @include layout.page-default();
  flex: 1 1 auto;
  min-width: 0; // workaround for flexbox width issue
  display: flex;
  align-items: stretch;
  position: relative;
}

.col {
  &._form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 16px 16px 72px;
    position: relative;

    &:before {
      position: absolute;
      display: block;
      content: '';
      filter: var(--background-filter);
      background-image: url('/src/assets/brano-heYdDdq0cbE-unsplash.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      @include breakpoints.sm() {
        display: none;
      }
    }
  }

  &._image {
    display: none;
  }

  @include breakpoints.sm() {
    &._form {
      width: 35%;
      min-width: 400px;
      flex: 0 0 auto;
    }
  
    &._image {
      flex: 1 1 auto;
      background: black;
      position: relative;
      background-image: url('/src/assets/brano-heYdDdq0cbE-unsplash.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: block;
      filter: var(--background-filter);
    }
  }
}

.content-wrap {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: var(--content-background);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;

  @include breakpoints.sm() {
    background: none;
  }
}

.author {
  --link-color: red;

  position: absolute;
  color: black;
  text-shadow: 0 0 1px orange;
  text-align: center;
  left: 8px;
  right: 8px;
  bottom: 8px;

  @include breakpoints.sm() {
    text-align: right;
    right: 24px;
    bottom: 24px;
  }
}

@include themes.component-theme-dark() {
  .content-wrap {
    --content-background: #{rgba(black, 0.75)};
    --background-filter: brightness(50%);
  }
}

@include themes.component-theme-light() {
  .content-wrap {
    --content-background: #{rgba(white, 0.5)};
    --background-filter: none;
  }
}
</style>
