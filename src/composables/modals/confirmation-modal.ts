import { defineAsyncComponent, type ComputedRef, type Ref } from 'vue';
import { useModal } from 'vue-final-modal';

const ConfirmationModal = defineAsyncComponent(() => import('@/components/modals/ConfirmationModal.vue'));

type ConfirmationCallback = (confirm: boolean) => void;

export const useConfirmationModal = (question: Ref<string> | ComputedRef<string>) => {
  const callbacks: Array<ConfirmationCallback> = [];

  const { open: openConfirmationModal, close: closeConfirmationModal } = useModal({
    component: ConfirmationModal,
    attrs: {
      onClose: (confirm) => {
        callbacks.forEach(cb => cb(confirm))
        closeConfirmationModal();
      },
    },
    slots: {
      default: question,
    },
  });

  return () => {
    let resolve;
    openConfirmationModal();
    const promise = new Promise<boolean>(res => resolve = res);
    callbacks.push(confirm => resolve!(confirm));
    return promise;
  }
}