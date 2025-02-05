<template>
  <div id="home">
    <div class="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-start md:items-center">
      <PageHeader title="Contatos salvos" description="Nesta página é possível ver todos os contatos cadastrados por você" />

      <button class="btn flex items-center gap-3" onclick="modalAddContact.showModal()">
        <i class="pi pi-plus"></i>
        <span>Novo contato</span>
      </button>
    </div>

    <!-- modalAddContact -->
    <dialog id="modalAddContact" class="modal">
      <Form
        method="dialog"
        :initialValues="initialValuesFormCreate"
        @submit="submit"
        @invalidSubmit="invalidSubmit"
        :validationSchema="postSchema"
        class="modal-box w-6/12 max-w-5xl">
          <h3 class="text-lg font-bold">Novo contato</h3>

          <p class="my-1 mb-5 font-thin">Preencha as informações do novo contato</p>

          <div class="grid md:grid-cols-2 gap-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Nome</span>
              </div>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="..."
                :disabled="requestPostIsRunning"
                class="input input-bordered"
                :class="{'input-error': formErrors?.name}"
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">E-mail</span>
              </div>
              <Field
                value=""
                id="email"
                type="email"
                name="email"
                placeholder="..."
                :disabled="requestPostIsRunning"
                class="input input-bordered w-full"
                :class="{'input-error': formErrors?.email}"
              />
            </label>
          </div>

          <div class="w-full md:col-span-2">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Documento</span>
              </div>

              <Field
                value=""
                type="text"
                id="document"
                name="document"
                v-mask="['###.###.###-##']"
                placeholder="000.000.000-00"
                :disabled="requestPostIsRunning"
                class="input input-bordered w-full"
                :class="{'input-error': formErrors?.document}"
              />
            </label>
          </div>

          <div class="modal-action">
            <button
              id="modalAddContactCloseAction"
              onclick="modalAddContact.close()"
              class="btn btn-ghost"
              type="button">Cancelar
            </button>

            <AppButton
              label="Cadastrar"
              theme="white"
              type="submit"
              :isLoading="requestPostIsRunning"
              :disabled="requestPostIsRunning"
            />
          </div>
      </Form>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue";

  import usePost from "./../../../hooks/contact/usePost";
</script>
