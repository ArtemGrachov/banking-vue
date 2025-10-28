<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';

import { EMobileNavViews } from './constants';

import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import Main from './components/Main.vue';
import IconButton from '@/components/buttons/IconButton.vue';

const LanguageSwitch = defineAsyncComponent(() => import('./components/LanguageSwitch.vue'));

type Emits = FullScreenModalEmits;

const emit = defineEmits<Emits>();

const currentView = ref(EMobileNavViews.MAIN);

const viewHandler = (view: EMobileNavViews) => {
  currentView.value = view;
}

const showReturn = computed(() => currentView.value !== EMobileNavViews.MAIN);

const currentViewComponent = computed(() => {
  switch (currentView.value) {
    case EMobileNavViews.MAIN: {
      return Main;
    }
    case EMobileNavViews.LANGUAGE_SWITCH: {
      return LanguageSwitch;
    }
    default: {
      return null;
    }
  }
});

</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template v-if="showReturn" #close>
      <IconButton
        type="button"
        class="return-button"
        variant="primary"
        @click="viewHandler(EMobileNavViews.MAIN)"
      >
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </IconButton>
    </template>
    <div class="view">
      <component
        v-if="currentViewComponent"
        :is="currentViewComponent"
        @view="viewHandler"
        @return="viewHandler(EMobileNavViews.MAIN)"
        @close="emit('close')"
      />
    </div>
  </FullScreenModal>
</template>

<style lang="scss" scoped>
.view {
  margin: 0 var(--content-padding-negative);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  overflow-y: auto;
}

.return-button {
  --icon-button-height: var(--header-height);
  --icon-button-width: var(--header-height);
}
</style>
