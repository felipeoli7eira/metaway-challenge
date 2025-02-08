<template>
    <div>
        <Form
            :validationSchema="schema"
            @submit="validSubmit"
            @invalidSubmit="invalidSubmit"
            :initialValues="initialValues"
            :key="initialValues"
            v-slot="{errors}"
        >
            <div class="grid md:grid-cols-2">
                <label class="form-control p-1">
                    <div class="label p-1">
                        <span class="label-text">Tipo de usuário</span>
                    </div>

                    <Field :class="ckeckIfHasErrorInKey(errors, 'role', 'select')" name="role" as="select" class="select select-bordered w-full">
                        <option disabled selected>Selecione</option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_USER">Usuário comum</option>
                    </Field>
                    <div v-if="'role' in errors" class="label p-1">
                        <ErrorMessage name="role" class="label-text-alt text-red-400" />
                    </div>
                </label>

                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">Nome</span>
                    </div>
                    <Field
                        name="name"
                        type="text"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'name')"
                    />
                    <div v-if="'name' in errors" class="label p-1">
                        <ErrorMessage name="name" class="label-text-alt text-red-400" />
                    </div>
                </label>
            </div>

            <div class="grid md:grid-cols-3">
                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">E-mail</span>
                    </div>
                    <Field
                        name="email"
                        type="email"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'email')"
                    />
                    <div v-if="'email' in errors" class="label p-1">
                        <ErrorMessage name="email" class="label-text-alt text-red-400" />
                    </div>
                </label>

                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">Nome de usuário</span>
                    </div>
                    <Field
                        name="username"
                        type="text"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'username')"
                    />
                    <div v-if="'username' in errors" class="label p-1">
                        <ErrorMessage name="username" class="label-text-alt text-red-400" />
                    </div>
                </label>

                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">Data de nascimento</span>
                    </div>
                    <Field
                        type="date"
                        name="birthDate"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'birthDate')"
                    />

                    <div v-if="'birthDate' in errors" class="label p-1">
                        <ErrorMessage name="birthDate" class="label-text-alt text-red-400" />
                    </div>
                </label>
            </div>

            <div class="grid md:grid-cols-3">
                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">CPF</span>
                    </div>

                    <Field
                        type="text"
                        name="cpf"
                        v-mask="['###.###.###-##']"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'cpf')"
                    />

                    <div v-if="'cpf' in errors" class="label p-1">
                        <ErrorMessage name="cpf" class="label-text-alt text-red-400" />
                    </div>
                </label>

                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
                        <span class="label-text">Telefone</span>
                    </div>

                    <Field
                        type="text"
                        name="phone"
                        class="input input-bordered w-full"
                        :class="ckeckIfHasErrorInKey(errors, 'phone')"
                        v-mask="['(##) #####-####']"
                    />

                    <div v-if="'phone' in errors" class="label p-1">
                        <ErrorMessage name="phone" class="label-text-alt text-red-400" />
                    </div>
                </label>

                <label class="form-control p-1 w-fullborder">
                    <div class="label p-1">
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

                    <div v-if="'password' in errors" class="label p-1">
                        <ErrorMessage name="password" class="label-text-alt text-red-400" />
                    </div>
                </label>
            </div>

            <slot name="footer"></slot>

            <!-- <div class="actions border mt-5"> -->
                <!-- <button :disabled="postRequestIsRunning" @click="closeDialogCreateUser" id="modalCreateUserCloseAction" type="button" class="btn">Fechar</button>
                <button :disabled="postRequestIsRunning" type="submit" class="btn btn-primary">
                    {{ postRequestIsRunning ? 'Cadastrando' : 'Cadastrar' }} <span v-if="postRequestIsRunning" class="loading loading-spinner loading-sm"></span>
                </button> -->
            <!-- </div> -->
        </Form>
    </div>
</template>

<script setup lang="ts">
    import { defineProps, onMounted, defineEmits, ref, watch } from "vue"
    import useUser from "@/hooks/user/useUser"
    import type User from "@/types/User"

    // * props and configs
    const props = defineProps<{user?: User, action: string, schema: object}>()
    const emits = defineEmits(['whenSubmittingData'])
    const initialValues = ref()

    const {
        showPasswordAsPlainText,
        ckeckIfHasErrorInKey,

        formSchema,
        Form,
        Field,
        ErrorMessage
    } = useUser()

    function validSubmit(formData, validator): void {
        emits('whenSubmittingData', {formData, validator})
    }

    function invalidSubmit(errors): void {}

    watch(props, (newProps) => {
        console.log(newProps.user)
        if (props.action === "update") {
            initialValues.value = {
                name: newProps.user?.nome,
                username: newProps.user?.username,
                email: newProps.user?.email,
                phone: newProps.user?.telefone,
                password: "",
                birthDate: newProps.user?.dataNascimento,
                role: newProps.user?.role,
                cpf: newProps.user?.cpf
            }
        }
    })

    // onMounted(fillFormWithUserDataOrNot)
</script>
