<template>
    <div>
        <div class="shadow-xl rounded-md hidden md:block">
            <div v-if="listOfUser.length" class="overflow-x-auto">
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
                        <tr v-for="user in listOfUser" :key="user.id.toString().concat('md')">
                            <td class="p-2">{{ user.nome }}</td>
                            <td class="p-2">{{ user.username }}</td>
                            <td class="p-2">{{ user.email }}</td>
                            <td class="p-2">{{ user.cpf }}</td>
                            <td class="p-2">{{ format(user.dataNascimento, "dd/MM/yyyy") }}</td>
                            <td class="md:space-x-1 space-y-1 md:space-y-0">
                                <button class="btn btn-sm" @click="() => editUser(user)">
                                    <i class="pi pi-user-edit"></i>
                                </button>

                                <button type="button" class="btn btn-sm btn-error" @click="() => openDialogConfirmDeleteUser(user)">
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
                        <button class="btn btn-ghost" @click="cancelDeleteUser">Cancelar</button>
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
                <p>Preencha as seguintes informações</p>

                <FormUser :user="selectedUserToUpdate" @whenSubmittingData="() => {}">
                    <template v-slot:footer>
                        <div class="mt-5 flex justify-end gap-3 px-2">
                            <button type="button" class="btn btn-ghost" @click="closeModalUpdateUser">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Atulizar usuário</button>
                        </div>
                    </template>
                </FormUser>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, nextTick } from "vue"
    import { format } from "date-fns"
    import useUser from "@/hooks/user/useUser"
    import type User from "@/types/User"
    import FormUser from "./../Form/index.vue"

    const {
        getUsers,
        listOfUser
    } = useUser()

    const selectedUser = ref<User>(null)
    const selectedUserToUpdate = ref<{
        name: string,
        birthDate: string,
        cpf: string,
        email: string,
        id?: number,
        role: string,
        phone: string,
        password: string

    }>({
        name: "xxxx",
        birthDate: "",
        cpf: "",
        email: "",
        id: 0,
        role: "",
        phone: "",
        password: ""
    })

    function openDialogConfirmDeleteUser(user: User) {
        const dialog = document.getElementById("dialogConfirmDeleteUser") as HTMLDialogElement
        dialog.showModal()

        selectedUser.value = user
    }

    function openDialogUpdateUser(): void {
        const dialog = document.getElementById("dialogUpdateUser") as HTMLDialogElement
        dialog.showModal()
    }

    function selectUser(user: User) : void {
        selectedUser.value = user
    }

    function editUser(user: User): void {
        selectedUserToUpdate.value = {
            name: user.nome,
            birthDate: user.dataNascimento,
            cpf: user.cpf,
            email: user.email,
            id: user.id,
            role: user.role,
            phone: user.telefone,
            password: "",
        }

        openDialogUpdateUser()
    }

    function cancelDeleteUser(): void {
        selectedUser.value = null
    }

    function voidFunction(): void {}

    function closeModalUpdateUser(): void {
        const modal = document.getElementById("dialogUpdateUser") as HTMLDialogElement
        modal.close()
    }

    onMounted(getUsers)
</script>
