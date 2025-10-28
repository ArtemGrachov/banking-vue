<template>
  <div class="bank-card-skeleton">
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
@use '/src/styles/functions/px-to-em.scss' as *;
@use '/src/styles/mixins/skeleton.scss' as skeleton;
@use '/src/styles/mixins/bank-card.scss' as bank-card;

.bank-card-skeleton {
  @include bank-card.container();

  font-size: var(--bank-card-font-size, 16px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: px-to-em(12px);
  padding: px-to-em(16px);
  background-image: linear-gradient(
    163deg,
    rgb(232, 228, 228) 0%,
    rgb(179, 179, 179) 50%,
    rgb(179, 179, 179) 70%,
    rgb(148, 148, 148) 100%,
  );
}

.top, .bottom {
  display: flex;
  flex-direction: column;
  gap: px-to-em(24px);
}

.top {
  margin-bottom: px-to-em(24px);
}

.bank-name {
  align-self: flex-end;
  font-weight: 500;
  font-size: px-to-em(12px);
}

.number {
  font-size: px-to-em(16px);
  display: flex;
  gap: px-to-em(8px);
}

.expire {
  margin: 0 auto;
}

.expire-label {
  font-size: px-to-em(10px);
}

.cardholder {
  font-size: px-to-em(12px);
}

.bank-name-skeleton,
.number-skeleton,
.expire-label-skeleton,
.expire-skeleton,
.cardholder-skeleton {
  @include skeleton.skeleton();
}

.bank-name-skeleton {
  width: px-to-em(80px);
}

.number-skeleton {
  width: px-to-em(45px);
}

.expire-label-skeleton {
  margin-bottom: px-to-em(2px);
}

.expire-skeleton,
.expire-label-skeleton {
  width: px-to-em(50px);
}

.cardholder-skeleton {
  width: px-to-em(250px);
}
</style>
