<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useModal } from 'vue-final-modal';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Dropdown from '@/components/dropdowns/Dropdown.vue';
import Input from '@/components/inputs/Input.vue';
import Select from '@/components/inputs/Select.vue';

const SelectModal = defineAsyncComponent(() => import('@/components/modals/DefaultModal.vue'));
const ConfirmationModal = defineAsyncComponent(() => import('@/components/modals/ConfirmationModal.vue'));
const AlertModal = defineAsyncComponent(() => import('@/components/modals/AlertModal.vue'));

const selectValue = ref(2);
const selectOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' },
];

const { open: openTestModal, close: closeTestModal } = useModal({
  component: SelectModal,
  attrs: {
    onClose: () => closeTestModal(),
  },
});

const { open: openConfirmationModal, close: closeConfirmationModal } = useModal({
  component: ConfirmationModal,
  attrs: {
    onClose: (confirm) => {
      console.log({ confirm });
      closeConfirmationModal();
    },
  },
  slots: {
    default: 'Test content',
  },
});

const { open: openAlertModal, close: closeAlertModal } = useModal({
  component: AlertModal,
  attrs: {
    onClose: () => closeAlertModal(),
  },
  slots: {
    default: 'Test alert',
  },
});
</script>

<template>
  <div class="page">
    <h1>
      Banking Demo App
    </h1>
    <p>
      <strong>
        Locale message {{ $t('test') }}
      </strong>
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nobis autem eum, illum enim debitis eligendi quia. Ullam nobis officiis excepturi vero? Harum temporibus culpa consectetur voluptatibus aut, explicabo et!
    </p>
    <h2>
      Heading 2
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis et sint voluptates. Vitae vel ipsam, saepe ipsa quia quod nostrum. Non molestiae excepturi et maiores eaque labore quae eos?
    </p>
    <h3>
      Heading 3
    </h3>
    <p class="secondary">
      <a href="#">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a> Esse facere ullam reiciendis officia. Quam, mollitia repellat eos ex maiores perferendis iure porro eum neque blanditiis in necessitatibus ipsum doloribus molestiae.
    </p>
    <h4>
      Heading 4
    </h4>
    <p class="secondary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veniam doloribus quibusdam sint in harum fuga repudiandae, quis facilis soluta reiciendis veritatis nostrum ipsam, recusandae assumenda delectus iusto tempore eum.
    </p>
    <h5>
      Heading 5
    </h5>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. <a href="#">Consequuntur consequatur</a> dolorem odio alias, magni asperiores praesentium aliquam numquam, doloremque deleniti necessitatibus quos enim modi voluptatibus molestias ducimus et quis ipsum.
    </p>
    <h6>
      Heading 6
    </h6>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus neque omnis sed aspernatur culpa doloremque explicabo qui, fugiat quas. Tempora facere et magni obcaecati animi natus nihil odio, porro consequuntur?
    </p>
    <Button as="a" href="#" variant="primary">
      Link primary button
    </Button>
    <Button as="a" href="#">
      Link default button
    </Button>
    <Button variant="primary">
      Primary button
    </Button>
    <Button variant="primary" disabled>
      Primary button (disabled)
    </Button>
    <Button>
      Default button
    </Button>
    <Button disabled>
      Default button (disabled)
    </Button>
    <Button variant="primary" :is-processing="true">
      Primary button processing
    </Button>
    <Button :is-processing="true">
      Default button processing
    </Button>
    <form v-on:submit.prevent>
      <FormStatus>
        Custom form status
      </FormStatus>
      <FormStatus status="error" />
      <FormStatus status="success" />
      <FormStatus status="success">
        Custom success text
      </FormStatus>
      <FormField :label-attrs="{ for: 'input-default' }">
        <template #label>Default</template>
        <Input id="input-default" type="text" />
      </FormField>
      <FormField :label-attrs="{ for: 'input-invalid' }">
        <template #label>Invalid</template>
        <Input id="input-invalid" type="text" class="invalid" />
      </FormField>
      <FormField :label-attrs="{ for: 'input-valid' }">
        <template #label>Valid</template>
        <Input id="input-valid" type="text" class="valid" />
      </FormField>
      <Button variant="primary">
        Submit
      </Button>
    </form>
    <Dropdown>
      <template #toggle>
        Dropdown
      </template>
      Dropdown content
    </Dropdown>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cupiditate porro asperiores accusantium, magnam animi impedit, atque laboriosam debitis ipsum est consectetur nostrum. Quidem accusamus corporis minus optio quo sit.
    </p>
    <Input type="text" />
    <Select
      v-model:value="selectValue"
      :options="selectOptions"
      trackBy="value"
      label="label"
      input-label="Test select"
    ></Select>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem nobis nam illo, praesentium in reiciendis nostrum dignissimos voluptatem officiis alias at aliquam consequuntur tempora architecto sequi ea accusantium reprehenderit voluptas.
    </p>
    <Button @click="openTestModal">
      Test modal
    </Button>
    <Button @click="openConfirmationModal">
      Confirmation modal
    </Button>
    <Button @click="openAlertModal">
      Alert modal
    </Button>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;

.page {
  @include layout.page();
}

.secondary {
  @include texts.secondary();
}
</style>
