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
      v-slot="{errors}"
    >
      <label class="w-full">
        <div class="mb-2">
          <span>Nome de usuário</span>
        </div>

        <Field
          name="username"
          type="text"
          maxlength="20"
          class="input input-bordered w-full"
          placeholder="@nomeDeUsuario"
          :class="ckeckIfHasErrorInKey(errors, 'username')"
        />

        <div v-if="'username' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="username" />
        </div>
      </label>

      <label class="w-full">
        <div class="mb-2">
          <span>E-mail</span>
        </div>

        <Field
          type="email"
          name="email"
          class="input input-bordered w-full"
          placeholder="seu@email.com"
          :class="ckeckIfHasErrorInKey(errors, 'email')"
        />

        <div v-if="'email' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="email" />
        </div>
      </label>

      <label class="w-full">
        <div class="mb-2">
          <span>CPF</span>
        </div>

        <Field
          type="text"
          name="cpf"
          v-mask="['###.###.###-##']"
          placeholder="000.000.000-00"
          class="input input-bordered w-full"
          :class="ckeckIfHasErrorInKey(errors, 'cpf')"
        />

        <div v-if="'cpf' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="cpf" />
        </div>
      </label>

      <label class="w-full">
        <div class="mb-2">
          <span>Data de nascimento</span>
        </div>

        <Field
          type="date"
          name="birthDate"
          class="input input-bordered w-full"
          :class="ckeckIfHasErrorInKey(errors, 'birthDate')"
        />

        <div v-if="'birthDate' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="birthDate" />
        </div>
      </label>

      <label class="w-full">
        <div class="mb-2">
          <span>Telefone</span>
        </div>

        <Field
          type="text"
          name="phone"
          class="input input-bordered w-full"
          :class="ckeckIfHasErrorInKey(errors, 'phone')"
          v-mask="['(##) #####-####']"
        />

        <div v-if="'phone' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="phone" />
        </div>
      </label>

      <label class="w-full">
        <div class="mb-2">
          <span>Nome</span>
        </div>

        <Field
          type="text"
          name="name"
          class="input input-bordered w-full"
          placeholder="..."
          maxlength="20"
          :class="ckeckIfHasErrorInKey(errors, 'name')"
        />

        <div v-if="'name' in errors" class="label">
          <ErrorMessage class="label-text-alt text-sm text-red-500" name="name" />
        </div>
      </label>

      <div>
        <div class="mb-2">
          <span>Senha</span>
        </div>

        <label class="input input-bordered flex items-center gap-2" :class="ckeckIfHasErrorInKey(errors, 'password')">
          <Field
            :type="showPasswordAsPlainText ? 'text' : 'password'"
            class="grow"
            name="password"
            placeholder="******"
          />

          <button type="button" @click="showPasswordAsPlainText = !showPasswordAsPlainText">
            <i v-if="!showPasswordAsPlainText" class="pi pi-eye"></i>
            <i v-else class="pi pi-eye-slash"></i>
          </button>
        </label>
      </div>

      <div v-if="initialValues.roles.length" role="alert" class="alert alert-info rounded-md max-w-screen-lg mx-auto mb-5 text-sm">
        <span>Seu(s) tipo(s) de usuário não podem ser alterado(s). Seu(s) tipo(s): <span class="badge rounded-md badge-neutral">{{ initialValues.roles.map(r => UserRoleEnum[r]).join(', ') }}</span></span>
      </div>

      <div v-if="initialValues.roles.length" class="flex justify-end">
        <button type="submit" class="btn btn-primary">
          <span>{{ putRequestIsRunning ? 'Atualizando' : 'Atualizar' }}</span>
          <span v-if="putRequestIsRunning" class="loading loading-spinner"></span>
        </button>
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
    putRequestIsRunning,

    initialValues,
    Form,
    Field,
    ErrorMessage,
    submitUpdate,
    invalidSubmitUpdate,
    updateProfileFormSchema,
    showPasswordAsPlainText,
    UserRoleEnum,
    ckeckIfHasErrorInKey
  } = useProfile()

  onMounted(get)
</script>
