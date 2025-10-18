<script setup lang="ts">
import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';

</script>

<template>
  <div class="page">
    <h1>
      Banking Demo App
    </h1>
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
