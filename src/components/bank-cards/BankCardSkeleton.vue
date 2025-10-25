<template>
  <div class="bank-card">
    <div class="top">
      <div class="bank-name">
        <span class="bank-name-skeleton" />
      </div>
    </div>
    <div class="bottom">
      <div class="number">
        <span v-for="part in 4" :key="part">
          <span class="number-skeleton" />
        </span>
      </div>
      <div class="expire">
        <div class="expire-label">
          <span class="expire-label-skeleton" />
        </div>
        <div class="row">
          <span class="expire-skeleton" />
        </div>
      </div>
      <div class="cardholder">
        <span class="cardholder-skeleton" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/skeleton.scss' as skeleton;

.bank-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  padding: 16px;
  background-image: linear-gradient(
    163deg,
    rgb(232, 228, 228) 0%,
    rgb(179, 179, 179) 50%,
    rgb(179, 179, 179) 70%,
    rgb(148, 148, 148) 100%,
  );
  max-width: 340px;
  min-height: 200px;
  height: 100%;

  @include breakpoints.sm() {
    max-width: 400px;
    min-height: 240px;
  }
}

.top, .bottom {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top {
  margin-bottom: 24px;

  @include breakpoints.sm() {
    margin-bottom: 48px;
  }
}

.bank-name {
  align-self: flex-end;
  font-weight: 500;
  font-size: 12px;

  @include breakpoints.sm() {
    font-size: 16px;
  }
}

.number {
  font-size: 16px;
  display: flex;
  gap: 8px;

  @include breakpoints.sm() {
    font-size: 24px;
    gap: 16px;
  }
}

.expire {
  margin: 0 auto;
}

.expire-label {
  font-size: 10px;

  @include breakpoints.sm() {
    font-size: 12px;
  }
}

.cardholder {
  font-size: 12px;

  @include breakpoints.sm() {
    font-size: 14px;
  }
}

.bank-name-skeleton,
.number-skeleton,
.expire-label-skeleton,
.expire-skeleton,
.cardholder-skeleton {
  @include skeleton.skeleton();
}

.bank-name-skeleton {
  width: 80px;
}

.number-skeleton {
  width: 45px;
}

.expire-label-skeleton {
  margin-bottom: 2px;
}

.expire-skeleton,
.expire-label-skeleton {
  width: 50px;
}

.cardholder-skeleton {
  width: 250px;
}
</style>
