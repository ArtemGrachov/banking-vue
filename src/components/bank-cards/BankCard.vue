<template>
  <div class="bank-card">
    <div class="top">
      <div class="bank-name">
        Bank name
      </div>
    </div>
    <div class="bottom">
      <div class="number">
        <span>1234</span>
        <span>5678</span>
        <span>9012</span>
        <span>3456</span>
      </div>
      <div class="expire">
        <div class="expire-label">
          Month/Year
        </div>
        <div class="row">
          <span class="cell">
            EXP
          </span>
          <span class="cell">
            00/00
          </span>
        </div>
      </div>
      <div class="cardholder">
        Cardholder Name
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.bank-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(163deg, darkred 27%, black 100%);
  color: white;
  max-width: 340px;
  min-height: 200px;

  @include breakpoints.sm() {
    max-width: 400px;
  }
}

.top, .bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top {
  margin-bottom: 24px;

  @include breakpoints.sm() {
    margin-bottom: 48px;
  }
}

.bank-name {
  align-self: flex-end;
  text-transform: uppercase;
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
  text-transform: uppercase;
  font-size: 10px;

  @include breakpoints.sm() {
    font-size: 12px;
  }
}

.cardholder {
  font-size: 12px;
  text-transform: uppercase;

  @include breakpoints.sm() {
    font-size: 14px;
  }
}
</style>
