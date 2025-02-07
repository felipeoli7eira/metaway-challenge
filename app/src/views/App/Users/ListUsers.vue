<template>
    <div id="list-users">
        <div class="shadow-xl rounded-md hidden md:block">
            <div v-if="listOfUser.length" class="overflow-x-auto">
                <table class="table table-xs diver-step-5--list-expenses-table">
                    <thead class="text-base">
                        <tr class="bg-base-200">
                            <th class="font-normal py-4 rounded-s-xs">Nome</th>
                            <th class="font-normal py-4">Nome de usuário</th>
                            <th class="font-normal py-4">E-mail</th>
                            <th class="font-normal py-4">CPF</th>
                            <th class="font-normal py-4">Data de nascimento</th>
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
                                <button class="btn btn-sm" @click="() => {}">
                                    <i class="pi pi-list"></i>
                                </button>

                                <button type="button" class="btn btn-sm" @click="() => openDialogConfirmDeleteUser(user)">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- dialogConfirmDelteUser -->
        <dialog id="dialogConfirmDeleteUser" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Atenção</h3>
                <p class="py-4">Confirmar a deleção do usuário "<b>{{ selectedUser?.nome }}</b>"?</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-ghost" @click="() => selectedUser = null">Cancelar</button>
                        <button type="button" @click="() => {}" class="btn btn-error ms-2">
                            Confirmar <i class="pi pi-trash"></i>
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue"
    import useUser from "./../../../hooks/user/useUser"
    import { format } from "date-fns"
    import User from "../../../types/User"

    const {
        getUsers,
        listOfUser
    } = useUser()

    const selectedUser = ref<User>(null)

    function openDialogConfirmDeleteUser(user: User) {
        const dialog = document.getElementById("dialogConfirmDeleteUser") as HTMLDialogElement
        dialog.showModal()

        selectedUser.value = user
    }

    onMounted(getUsers)
</script>

<style scoped>
    table thead tr th:first-child {
        border-start-start-radius: 5px !important;
    }

    table thead tr th:last-child {
        border-start-end-radius: 5px !important;
    }
</style>
