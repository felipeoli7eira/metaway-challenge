<template>
    <nav class="flex flex-col gap-4 justify-between p-5 w-24 md:w-60 overflow-y-auto overflow-x-hidden">
        <div class="top-menu-items flex flex-col gap-1">
            <ImageLogo size="md" />

            <div class="my-5"></div>

            <router-link v-for="(item,index) in primaryMenuItems" :key="index" class="btn relative btn-active" :to="item.to">
                <span class="maker-activated absolute"></span>
                <div class="flex md:w-full items-center md:gap-3">
                    <i :class="item.icon"></i>
                    <span class="hidden md:block">{{ item.label }}</span>
                </div>
            </router-link>
        </div>

        <div class="bottom-menu-item">
            <button type="button" class="btn btn-active w-full" @click="signOut">
                <div class="flex md:w-full items-center md:gap-3">
                    <i class="pi pi-sign-out"></i> <span class="hidden md:block">LogOut</span>
                </div>
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
    import ImageLogo from './../../components/ImageLogo/index.vue'
    import useSignOut from './../../hooks/signout/useSignOut'

    const { signOut } = useSignOut()

    type MenuItem = {
        label: string,
        to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric,
        icon: string
    }

    const primaryMenuItems: MenuItem[] = [
        {
            label: 'Home',
            to: {
                name: 'app.index'
            },
            icon: 'pi pi-th-large text-lg'
        },
        {
            label: 'Meu cadastro',
            to: {
                name: 'app.profile'
            },
            icon: 'pi pi-id-card text-lg'
        },
        {
            label: 'Usuários',
            to: {
                name: 'app.users'
            },
            icon: 'pi pi-user text-lg'
        },
        {
            label: 'Pessoas',
            to: {
                name: 'app.people'
            },
            icon: 'pi pi-users text-lg'
        },
        {
            label: 'Contatos',
            to: {
                name: 'app.contacts'
            },
            icon: 'pi pi-address-book text-lg'
        },

    ]
</script>

<style scoped>
    .maker-activated {
        height: 80%;
        width: 5px;
        left: 0;
        border-radius: 0.5rem;
        background-color: transparent;
    }

    .btn.router-link-exact-active .maker-activated {
        background-color: #42B883;
    }
</style>
