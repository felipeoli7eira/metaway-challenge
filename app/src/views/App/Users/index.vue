<template>
    <div>
        <div class="flex justify-between">
            <PageHeader title="Usuários" description="Nesta página é possível ver todos os usuários cadastrados por você" />
            <button type="button" onclick="dialogCreateUser.showModal()" class="btn btn-primary">Novo usuário</button>
        </div>

        <div class="mt-5">
            <Table></Table>
        </div>

        <!-- dialogCreateUser -->
        <dialog id="dialogCreateUser" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="text-lg font-bold">Cadastro de usuário</h3>
                <p>Preencha as seguintes informações</p>

                <FormUser action="create" :schema="createSchema" @whenSubmittingData="createNewUserHandler">
                    <template v-slot:footer>
                        <div class="mt-5 flex justify-end gap-3 px-2">
                            <button :disabled="postRequestIsRunning" type="button" class="btn btn-ghost" @click="closeModalCreateNewUser">Cancelar</button>
                            <button :disabled="postRequestIsRunning" type="submit" class="btn btn-primary">
                                <span>{{ postRequestIsRunning ? 'Cadastrando' : 'Cadastrar' }}</span>
                                <span v-if="postRequestIsRunning" class="loading loading-spinner text-primary"></span>
                            </button>
                        </div>
                    </template>
                </FormUser>
            </div>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
    import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue"
    import useUser from "./../../../hooks/user/useUser"
    import Table from "./components/Table/index.vue"
    import FormUser from "./components/Form/index.vue"
    import { createSchema } from "@/schemas/user/formSchema"

    const {
        postUser,
        postRequestIsRunning
    } = useUser()

    function closeModalCreateNewUser(): void {
        const modal = document.getElementById("dialogCreateUser") as HTMLDialogElement
        modal.close()
    }

    function createNewUserHandler({formData, validator}): void {
        postUser(formData, validator)
    }
</script>
