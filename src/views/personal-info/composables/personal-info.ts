import { computed, ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IPersonalInfo } from '@/types/models/personal-info';

import { mockRequest } from '@/utils/mock-request';

const MOCK_DATA: IPersonalInfo = {
  fullName: 'John Doe',
  country: 'Ukraine',
  address: 'Kyiv, Test str., 35, 408',
  idNumber: 'АБ111222',
}

export const usePersonalInfo = () => {
  const data = ref<IPersonalInfo | null>(null);
  const getStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const getData = async () => {
    try {
      statusMessage.value = null;
      getStatus.value = EStatus.PROCESSING;

      data.value = (await mockRequest<IPersonalInfo>(MOCK_DATA))!;
      getStatus.value = EStatus.SUCCESS;

      return data.value;
    } catch (err) {
      getStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
      throw err;
    }
  }

  const isProcessing = computed(() => {
    return getStatus.value === EStatus.PROCESSING;
  });

  const isError = computed(() => {
    return getStatus.value === EStatus.ERROR;
  });

  return {
    data,
    getStatus,
    statusMessage,
    isProcessing,
    isError,
    getData,
  };
}
