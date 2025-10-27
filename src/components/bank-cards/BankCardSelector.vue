<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type SwiperType from 'swiper';
import 'swiper/css';

import BankCard from '@/components/bank-cards/BankCard.vue';
import BankCardSkeleton from '@/components/bank-cards/BankCardSkeleton.vue';

import type { ICard } from '@/types/models/card';
import { computed, ref } from 'vue';

interface IProps {
  mobileFullPage?: boolean;
  cards?: ICard[] | null;
  isProcessing?: boolean;
  disabled?: boolean;
}

const { mobileFullPage, cards, isProcessing } = defineProps<IProps>();

const activeIndex = ref(-1);
const model = defineModel<number | null | undefined>();

const selectedCard = computed(() => {
  return cards?.[activeIndex.value];
});

const initialSlide = computed(() => {
  return 0; // cards?.map(c => c.id).findIndex(model.value);
});

const changeHandler = (e: SwiperType) => {
  activeIndex.value = e.realIndex;
  model.value = selectedCard.value?.id;
}
</script>

<template>
  <div class="bank-card-selector" :class="{ '_mobile-full-page': mobileFullPage }">
    <Swiper
      class="swiper"
      :slides-per-view="'auto'"
      :space-between="-50"
      :loop="true"
      :center-insufficient-slides="true"
      :centered-slides="true"
      :initial-slide="initialSlide"
      :slide-to-clicked-slide="true"
      :allowSlidePrev="!disabled"
      :allowSlideNext="!disabled"
      @slide-change="changeHandler"
    >
      <template v-if="isProcessing">
        <SwiperSlide v-for="i in 4" :key="i" class="slide">
          <BankCardSkeleton />
        </SwiperSlide>
      </template>
      <SwiperSlide v-for="(card, index) in cards" :key="card.id" class="slide">
        <BankCard :card="card" />
        <div class="balance">
          {{ card.balance }} {{ card.currency }}
        </div>
      </SwiperSlide>
      <SwiperSlide v-if="$slots.default" class="slide">
        <slot />
      </SwiperSlide>
      <SwiperSlide v-if="$slots.placeholder" class="slide">
        <slot name="placeholder" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/layout.scss' as layout;

.bank-card-selector {
  &._mobile-full-page {
    @media (max-width: #{map.get(breakpoints.$breakpoints, 'large') - 1px}) {
      margin-left: -(layout.$layout-container-padding);
      margin-right: -(layout.$layout-container-padding);

      .swiper {
        padding-left: layout.$layout-container-padding;
        padding-right: layout.$layout-container-padding;
      }
    }
  }
}

.slide {
  width: 340px;
  max-width: calc(100svw - #{layout.$layout-container-padding * 2});
  min-height: 200px;
  height: auto;
  transition: transform 200ms, opacity 200ms;

  @include breakpoints.sm() {
    width: 400px;
    min-height: 240px;
  }

  &.swiper-slide-active {
    position: relative;
    z-index: 10;
  }

  &:not(.swiper-slide-active) {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

.balance {
  text-align: center;
  padding: 8px;
  font-weight: 600;
}
</style>
