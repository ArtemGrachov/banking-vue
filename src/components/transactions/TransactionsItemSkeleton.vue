<template>
  <article class="transaction">
    <div class="icon skeleton" />
    <div class="icon skeleton" />
    <div class="details">
      <div class="datetime">
        <span class="datetime-skeleton" />
      </div>
      <div class="participant">
        <span class="participant-skeleton" />
      </div>
    </div>
    <div class="amount">
      <span class="amount-skeleton" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/skeleton.scss' as skeleton;

.skeleton,
.datetime-skeleton,
.participant-skeleton,
.amount-skeleton {
  @include skeleton.skeleton();
}

.transaction {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 4px;
  line-height: 1.3;
}

.icon {
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details {
  flex: 1 1 auto;
}

.datetime {
  font-size: 14px;
}

.participant {
  font-size: 18px;
  font-weight: 500;
}

.amount {
  flex: 0 0 auto;
}

.datetime-skeleton {
  margin-bottom: 4px;
  max-width: 100px;
}

.participant-skeleton {
  max-width: 200px;
}

.amount-skeleton {
  width: 80px;
}
</style>
