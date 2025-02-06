<template>
  <div id="profile">
    <div class="mb-5">
      <PageHeader title="Meu cadastro" description="Atualize seus dados cadastrais por aqui" />
    </div>

    <Form
      @submit="submitUpdate"
      @invalidSubmit="invalidSubmitUpdate"
      :validationSchema="updateProfileFormSchema"
      :initialValues="initialValues"
      :key="initialValues"
      class="max-w-screen-lg mx-auto flex flex-col gap-6"
    >
      <label class="form-control w-full">
        <div class="mb-2">
          <span class="text-red-500">*</span> <span>Nome</span>
        </div>

        <Field name="name" type="text" class="input input-bordered w-full" placeholder="..." />

        <div class="label">
          <span class="label-text-alt text-sm text-red-500">
            <ErrorMessage name="name" />
          </span>
        </div>
      </label>


      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">Atualizar</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue"
  import useProfile from "./../../../hooks/profile/useProfile"
  import { onMounted } from "vue"

  const {
    get,
    data,
    requestIsRunning,
    initialValues,
    Form,
    Field,
    ErrorMessage,
    submitUpdate,
    invalidSubmitUpdate,
    updateProfileFormSchema
  } = useProfile()

  onMounted(get)
</script>
