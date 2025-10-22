<script setup lang="ts">
import { EMobileNavViews } from '../constants';

import Button from '@/components/buttons/Button.vue';
import { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import NavMenu from '@/components/nav/NavMenu.vue';

type Emits = FullScreenModalEmits & {
  (e: 'view', view: EMobileNavViews): void;
};

const emit = defineEmits<Emits>();

</script>

<template>
  <div class="actions _top">
    <NavMenu class="nav-menu" @navigate="emit('close')" />
  </div>
  <div class="actions _bottom">
    <Button
      type="button"
      class="language-switch"
      variant="transparent"
      @click="emit('view', EMobileNavViews.LANGUAGE_SWITCH)"
    >
      Language switch
    </Button>
  </div>

</template>

<style lang="scss" scoped>
.language-switch {
  --button-border-radius: 0;
  --button-justify-content: flex-start;
  --button-text-align: left;
}
</style>
