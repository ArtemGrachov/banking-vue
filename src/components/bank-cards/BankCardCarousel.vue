<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import BankCard from '@/components/bank-cards/BankCard.vue';

import type { ICard } from '@/types/models/card';

interface IProps {
  mobileFullPage?: boolean;
  cards?: ICard[] | null;
}

defineProps<IProps>();

</script>

<template>
  <div class="bank-card-carousel" :class="{ '_mobile-full-page': mobileFullPage }">
    <Swiper
      class="swiper"
      :slides-per-view="'auto'"
      :space-between="16"
      :loop="true"
      :breakpoints="{
        768: {
          spaceBetween: 32,
        },
      }"
    >
      <SwiperSlide v-for="card in cards" :key="card.id" class="slide">
        <BankCard :card="card" />
      </SwiperSlide>
      <SwiperSlide v-if="$slots.default" class="slide">
        <slot />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/layout.scss' as layout;

.bank-card-carousel {
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
  height: auto;

  @include breakpoints.sm() {
    width: 400px;
  }
}
</style>
