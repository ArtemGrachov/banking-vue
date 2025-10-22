<script setup lang="ts">
import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';

</script>

<template>
  <form @submit.prevent>
    <FormStatus status="error">
      Custom error text
    </FormStatus>
    <FormField :label-attrs="{ for: 'full_name' }">
      <template #label>
        {{ $t('form_common.full_name') }}
      </template>
      <Input id="full_name" />
    </FormField>
    <FormField :label-attrs="{ for: 'email' }">
      <template #label>
        {{ $t('form_common.email') }}
      </template>
      <Input id="email" />
    </FormField>
    <FormField :label-attrs="{ for: 'phone_number' }">
      <template #label>
        {{ $t('form_common.phone_number') }}
      </template>
      <Input id="phone_number" />
    </FormField>
    <Button type="submit" variant="primary">
      {{ $t('form_common.submit') }}
    </Button>
  </form>
</template>
