<template>
    <div>
        <div class="shadow-xl rounded-md hidden md:block">
            <div v-if="getUsersRequestIsRunning" class="flex justify-center p-5">
                <span  class="loading loading-dots loading-lg"></span>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="table table-xs table-zebra">
                    <thead>
                        <tr class="bg-base-200">
                            <th class="font-bold py-2 text-sm rounded-s-xs">Nome</th>
                            <th class="font-bold py-2 text-sm">@usuario</th>
                            <th class="font-bold py-2 text-sm">E-mail</th>
                            <th class="font-bold py-2 text-sm">CPF</th>
                            <th class="font-bold py-2 text-sm">Data de nascimento</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody class="text-sm">
                        <tr v-for="user in users" :key="user.id.toString().concat('md')">
                            <td class="p-2">{{ user.nome }}</td>
                            <td class="p-2">{{ user.username }}</td>
                            <td class="p-2">{{ user.email }}</td>
                            <td class="p-2">{{ user.cpf }}</td>
                            <td class="p-2">{{ format(user.dataNascimento, "dd/MM/yyyy") }}</td>
                            <td class="md:space-x-1 space-y-1 md:space-y-0">
                                <button class="btn btn-sm" @click="editUser(user)">
                                    <i class="pi pi-user-edit"></i>
                                </button>

                                <button type="button" class="btn btn-sm btn-error" @click="openDialogConfirmDeleteUser(user)">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <dialog id="dialogConfirmDeleteUser" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Atenção</h3>
                <p class="py-4">Confirmar a deleção do usuário "<b>{{ selectedUser?.nome }}</b>"?</p>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-ghost" @click="clearSelectedUser">Cancelar</button>
                        <button type="button" @click="voidFunction" class="btn btn-error ms-2">
                            Confirmar <i class="pi pi-trash"></i>
                        </button>
                    </form>
                </div>
            </div>
        </dialog>

        <dialog id="dialogUpdateUser" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="text-lg font-bold">Atualização de usuário</h3>
                <p class="mb-5">Preencha as seguintes informações</p>

                <FormUser action="update" :user="selectedToUpdate" :schema="updateSchema" @whenSubmittingData="updateUserDatahandler">
                    <template v-slot:footer>
                        <div class="mt-5 flex justify-end gap-3 px-2">
                            <button :disabled="putUsersRequestIsRunning" type="button" class="btn btn-ghost" @click="closeDialogUpdateUser">Cancelar</button>
                            <button :disabled="putUsersRequestIsRunning" type="submit" class="btn btn-primary">
                                <span>{{ putUsersRequestIsRunning ? 'Atualizando' : 'Atualizar' }}</span>
                                <span v-if="putUsersRequestIsRunning" class="loading loading-spinner text-primary"></span>
                            </button>
                        </div>
                    </template>
                </FormUser>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue"
    import { format } from "date-fns"
    import useUser from "@/hooks/user/useUser"
    import type User from "@/types/User"
    import FormUser from "./../Form/index.vue"
    import { updateSchema } from "@/schemas/user/formSchema"
    import http from "@/services/http"
    import { toast } from "@steveyuowo/vue-hot-toast"

    const {
        getUsers,
        users,
        getUsersRequestIsRunning,
        putUser,
        putUsersRequestIsRunning
    } = useUser()

    const selectedUser = ref<User>(null)
    const selectedToUpdate = ref<User|undefined>()
    const getUserByIdRequestIsRunning = ref<boolean>(false)

    function openDialogConfirmDeleteUser(user: User) {
        const dialog = document.getElementById("dialogConfirmDeleteUser") as HTMLDialogElement
        dialog.showModal()

        selectedUser.value = user
    }

    async function editUser(user: User): Promise<void> {
        try {
            getUserByIdRequestIsRunning.value = true
            const request = await http.get("/api/usuario/buscar/".concat(user.id.toString()))

            if (request.status !== 200) {
                throw new Error("Erro ao buscar usuário")
            }

            const response = request.data.object

            user.role = response.tipos[0]
            selectedToUpdate.value = user
            openDialogUpdateUser()
        } catch (error) {
            toast.error("Erro ao buscar usuário")
        } finally {
            getUserByIdRequestIsRunning.value = false
        }
    }

    function clearSelectedUser(): void {
        selectedUser.value = null
    }

    function voidFunction(): void {}

    function closeDialogUpdateUser(): void {
        const dialog = document.getElementById("dialogUpdateUser") as HTMLDialogElement
        dialog.close()
    }

    function openDialogUpdateUser(): void {
        const dialog = document.getElementById("dialogUpdateUser") as HTMLDialogElement
        dialog.showModal()
    }

    function updateUserDatahandler({formData, validator}): void {
        formData.id = selectedToUpdate.value?.id
        putUser(formData, validator)
        closeDialogUpdateUser()
    }

    onMounted(getUsers)
</script>
