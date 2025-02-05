<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <Form
      :initialValues="initialValues"
      @submit="submit"
      @invalidSubmit="invalidSubmit"
      :validationSchema="validationSchema"
      class="flex items-center flex-col">
        <ImageLogo size="lg" />

      <label
        for="username"
        class="input input-bordered flex items-center gap-2 mt-5"
        :class="{ 'input-error': errors?.username }">
            <i class="pi pi-at"></i>
            <Field
                :disabled="requestIsRunning"
                name="username"
                id="username"
                value=""
                type="text"
                class="grow"
                placeholder="Nome de usuário"
                maxlength="20"
            />
      </label>
      <ErrorMessage class="label-text text-left w-full mb-3 text-red-500 mt-1" name="username" />

      <label
        for="password"
        class="input input-bordered flex items-center gap-2 mt-2"
        :class="{ 'input-error': errors?.password }">
            <i class="pi pi-key"></i>
            <Field
                :disabled="requestIsRunning"
                name="password"
                id="password"
                value=""
                type="password"
                class="grow"
                placeholder="******"
            />
      </label>
      <ErrorMessage class="label-text text-left w-full mb-3 text-red-500 mt-1" name="password" />

      <AppButton
        label="Entrar no app"
        theme="white"
        type="submit"
        className="w-full mt-4"
        :isLoading="requestIsRunning"
        :disabled="requestIsRunning"
      />
    </Form>
  </div>
</template>

<script setup lang="ts">
import AppButton from "./../../components/AppButton/index.vue";
import ImageLogo from "./../../components/ImageLogo/index.vue";
import useSignIn from "./../../hooks/signin/useSignIn";

const {
  initialValues,
  invalidSubmit,
  submit,
  validationSchema,
  Form,
  Field,
  ErrorMessage,
  errors,
  requestIsRunning,
} = useSignIn();
</script>
