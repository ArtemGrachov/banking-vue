<script setup lang="ts">
import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import NavMenu from '@/components/nav/NavMenu.vue';

type Emits = FullScreenModalEmits;

const emit = defineEmits<Emits>();

</script>

<template>
  <FullScreenModal @close="emit('close')">
    <NavMenu class="nav-menu" @navigate="emit('close')" />
  </FullScreenModal>
</template>

<style lang="scss" scoped>
.nav-menu {
  margin: 0 var(--content-padding-negative);
}
</style>
