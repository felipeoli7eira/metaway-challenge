<template>
    <div id="users">
        <div class="flex justify-between">
            <PageHeader title="Usuários" description="Nesta página é possível ver todos os usuários cadastrados por você" />

            <button type="button" onclick="modalCreateUser.showModal()" class="btn btn-primary">Novo usuário</button>
        </div>

        <!-- modal create user -->
        <dialog id="modalCreateUser" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="text-lg font-bold">Cadastro de usuário</h3>
                <p>Preencha as informações do novo usuário</p>

                <div class="grid md:grid-cols-2">
                    <label class="form-control p-2">
                        <div class="label">
                            <span class="label-text">Tipo de usuário</span>
                        </div>
                        <select class="select select-bordered w-full">
                            <option disabled selected>Clique e selecione</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_USER">Usuário comum</option>
                        </select>
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Nome</span>
                        </div>
                        <input type="text" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>
                </div>

                <div class="grid md:grid-cols-3">
                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">E-mail</span>
                        </div>
                        <input type="text" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Nome de usuário</span>
                        </div>
                        <input type="text" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Data de nascimento</span>
                        </div>
                        <input type="date" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>
                </div>

                <div class="grid md:grid-cols-3">
                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">CPF</span>
                        </div>
                        <input type="text" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Telefone</span>
                        </div>
                        <input type="text" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Senha de acesso</span>
                        </div>
                        <input type="date" placeholder="..." class="input input-bordered w-full" />
                        <div class="label">
                            <span class="label-text-alt text-red-400">Campo obrigatório</span>
                        </div>
                    </label>
                </div>

                <div class="modal-action">
                    <form method="dialog" class="flex gap-3">
                        <!-- if there is a button, it will close the modal -->
                        <button type="button" class="btn">Fechar</button>
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
    import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue"
    import { onMounted } from "vue"
</script>
