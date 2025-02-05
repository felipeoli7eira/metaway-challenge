<template>
    <div class="flex flex-col white:bg-slate-50 gap-5 h-screen w-screen items-center justify-center">
        <form action="" class="flex items-center flex-col w-72">
            <h1 class="text-3xl mb-9">Criar uma conta</h1>

            <label class="input input-bordered flex items-center gap-2 w-full mb-2">
                <i class="pi pi-at"></i>
                <input type="text" class="grow" placeholder="E-mail" />
            </label>

            <label class="input input-bordered flex items-center gap-2 w-full">
                <i class="pi pi-key"></i>
                <input type="password" class="grow" placeholder="Senha" />
            </label>

            <nav class="flex items-center justify-end gap-3 w-full">
                <p class="m-0">Já está cadastrado?</p>
                <router-link :to="{ name: 'signin' }" class="btn p-0 btn-link no-underline hover:no-underline font-normal text-red-500">LogIn</router-link>
            </nav>

            <AppButton
                label="Concluir cadastro"
                theme="red"
                :isLink="true"
                :to="{name: 'app.index'}"
                className="w-full font-normal text-base"
            />

            <div class="divider divider-neutral mb-1">Ou</div>

            <div class="my-6 space-y-2 w-full">
                <button type="button" class="flex items-center font-normal justify-center w-full btn btn-neutral text-white">
                    <i class="pi pi-google text-base"></i>
                    <p>Cadastro com a conta Google</p>
                </button>
                <button type="button" class="flex items-center font-normal justify-center w-full btn btn-neutral text-white">
                    <i class="pi pi-microsoft text-base"></i>
                    <p>Cadastro com a conta Microsoft</p>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import AppButton from './../../components/AppButton/index.vue'
</script>
