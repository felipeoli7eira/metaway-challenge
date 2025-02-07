<template>
    <div id="users">
        <div class="flex justify-between">
            <PageHeader title="Usuários" description="Nesta página é possível ver todos os usuários cadastrados por você" />
            <button type="button" onclick="dialogCreateUser.showModal()" class="btn btn-primary">Novo usuário</button>
        </div>

        <div class="mt-5">
            <!-- <FormUser :user="{}" @whenSubmittingData="updateUserHandler">
                <template v-slot:footer>
                    <div class="mt-5 flex justify-end gap-3 px-2">
                        <button type="button" class="btn btn-ghost" @click="closeModalCreateNewUser">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Confirmar alterações</button>
                    </div>
                </template>
            </FormUser> -->
            <Table />
        </div>

        <!-- dialogCreateUser -->
        <dialog id="dialogCreateUser" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="text-lg font-bold">Cadastro de usuário</h3>
                <p>Preencha as seguintes informações</p>

                <FormUser @whenSubmittingData="createNewUserHandler">
                    <template v-slot:footer>
                        <div class="mt-5 flex justify-end gap-3 px-2">
                            <button type="button" class="btn btn-ghost" @click="closeModalCreateNewUser">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Cadastrar usuário</button>
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
    import { ref } from "vue"
    import type User from "@/types/User"

    const selectedUser = ref<User|undefined>()

    function closeModalCreateNewUser(): void {
        const modal = document.getElementById("dialogCreateUser") as HTMLDialogElement
        modal.close()
    }

    function createNewUserHandler(formData): void {
        console.clear()
        console.log('createNewUserHandler')
        console.log(formData)
    }

    function updateUserHandler(formData): void {
        console.clear()
        console.log('updateUserHandler')
        console.log(formData)
    }

    function getUserData(): void {
    }

    const {
        Form,
        Field,
        ErrorMessage,
        ckeckIfHasErrorInKey,
        postUser,
        postRequestIsRunning,
        invalidPostSubmit,
        PostUserSchema,
        showPasswordAsPlainText,
        closeDialogCreateUser
    } = useUser()
</script>
