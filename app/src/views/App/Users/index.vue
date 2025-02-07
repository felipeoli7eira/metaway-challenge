<template>
    <div id="users">
        <div class="flex justify-between">
            <PageHeader title="Usuários" description="Nesta página é possível ver todos os usuários cadastrados por você" />

            <button type="button" onclick="modalCreateUser.showModal()" class="btn btn-primary">Novo usuário</button>
        </div>

        <div class="mt-5">
            <ListUsers />
        </div>

        <!-- modalCreateUser -->
        <dialog id="modalCreateUser" class="modal">
            <Form
                class="modal-box w-11/12 max-w-5xl"
                v-slot="{errors}"
                @submit="postUser"
                @invalidSubmit="invalidPostSubmit"
                :validationSchema="PostUserSchema"
                id="formCreateUser"
            >
                <h3 class="text-lg font-bold">Cadastro de usuário</h3>
                <p>Preencha as informações do novo usuário</p>

                <div class="grid md:grid-cols-2">
                    <label class="form-control p-2">
                        <div class="label">
                            <span class="label-text">Tipo de usuário</span>
                        </div>
                        <Field :class="ckeckIfHasErrorInKey(errors, 'role', 'select')" name="role" as="select" class="select select-bordered w-full">
                            <option disabled selected>Selecione</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_USER">Usuário comum</option>
                        </Field>
                        <div v-if="'role' in errors" class="label">
                            <ErrorMessage name="role" class="label-text-alt text-red-400" />
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Nome</span>
                        </div>
                        <Field
                            name="name"
                            type="text"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'name')"
                        />
                        <div v-if="'name' in errors" class="label">
                            <ErrorMessage name="name" class="label-text-alt text-red-400" />
                        </div>
                    </label>
                </div>

                <div class="grid md:grid-cols-3">
                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">E-mail</span>
                        </div>
                        <Field
                            name="email"
                            type="email"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'email')"
                        />
                        <div v-if="'email' in errors" class="label">
                            <ErrorMessage name="email" class="label-text-alt text-red-400" />
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Nome de usuário</span>
                        </div>
                        <Field
                            name="username"
                            type="text"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'username')"
                        />
                        <div v-if="'username' in errors" class="label">
                            <ErrorMessage name="username" class="label-text-alt text-red-400" />
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Data de nascimento</span>
                        </div>
                        <Field
                            type="date"
                            name="birthDate"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'birthDate')"
                        />

                        <div v-if="'birthDate' in errors" class="label">
                            <ErrorMessage name="birthDate" class="label-text-alt text-red-400" />
                        </div>
                    </label>
                </div>

                <div class="grid md:grid-cols-3">
                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">CPF</span>
                        </div>

                        <Field
                            type="text"
                            name="cpf"
                            v-mask="['###.###.###-##']"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'cpf')"
                        />

                        <div v-if="'cpf' in errors" class="label">
                            <ErrorMessage name="cpf" class="label-text-alt text-red-400" />
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Telefone</span>
                        </div>

                        <Field
                            type="text"
                            name="phone"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'phone')"
                            v-mask="['(##) #####-####']"
                        />

                        <div v-if="'phone' in errors" class="label">
                            <ErrorMessage name="phone" class="label-text-alt text-red-400" />
                        </div>
                    </label>

                    <label class="form-control p-2 w-fullborder">
                        <div class="label">
                            <span class="label-text">Senha</span>
                            <span class="label-text cursor-pointer" @click="showPasswordAsPlainText = !showPasswordAsPlainText">
                                <i v-if="!showPasswordAsPlainText" class="pi pi-eye"></i>
                                <i v-else class="pi pi-eye-slash"></i>
                            </span>
                        </div>

                        <Field
                            :type="showPasswordAsPlainText ? 'text' : 'password'"
                            name="password"
                            class="input input-bordered w-full"
                            :class="ckeckIfHasErrorInKey(errors, 'phone')"
                            maxlength="20"
                        />

                        <div v-if="'password' in errors" class="label">
                            <ErrorMessage name="password" class="label-text-alt text-red-400" />
                        </div>
                    </label>
                </div>

                <div class="modal-action">
                    <button :disabled="postRequestIsRunning" @click="closeDialogCreateUser" id="modalCreateUserCloseAction" type="button" class="btn">Fechar</button>
                    <button :disabled="postRequestIsRunning" type="submit" class="btn btn-primary">
                        {{ postRequestIsRunning ? 'Cadastrando' : 'Cadastrar' }} <span v-if="postRequestIsRunning" class="loading loading-spinner loading-sm"></span>
                    </button>
                </div>
            </Form>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
    import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue"
    import useUser from "./../../../hooks/user/useUser"
    import ListUsers from "./ListUsers.vue"

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
