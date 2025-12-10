<script setup>
definePageMeta({
    layout: 'user-layout',
    middleware: guest,
});

import { onBeforeMount, ref } from 'vue';
import guest from '@/middleware/guest';
import { reloadNuxtApp } from 'nuxt/app';
import Cookies from 'js-cookie';

const showPassword = ref(false);
const config = useRuntimeConfig();
const email = ref("");
const password = ref("");

/**
 * Fetches CSRF Token from the backend before making further requests.
 * DO NOT SKIP THIS PROCESS.
 */
onBeforeMount(
    async () => {
        await $fetch("/sanctum/csrf-cookie", {
            method: "GET",
            credentials: "include",
            baseURL: config.public.apiAuth,
        })
    }
)
const login = async () => {
    try {

        const response = await $fetch('/customer/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            baseURL: config.public.apiAuth,
            body: { email: email.value, password: password.value, },
        });
        alert(response.message);
        email.value = "";
        password.value = "";
        reloadNuxtApp({ path: "/" });
    } catch (err) {
        if (err.status === 401) {
            alert(err.data.message);
        }
        if (err.status === 422 && err.data && err.data.error.email) {
            alert(err.data.error.email[0]);
        } else if (err.status === 422 && err.data && err.data.error.password) {
            alert(err.data.error.password[0]);
        } else {
            "Unknown Error:", err
        }
    }
}

</script>

<template>
    <UserLayout>

        <Head>
            <Title>Login - {{ $config.public.appName }}</Title>
            <Meta name="description" content="Login to your account to access exclusive features and content." />
        </Head>

        <div class="min-h-screen flex items-center justify-center">
            <div class="w-full max-w-xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <form class="space-y-6" @submit.prevent="login">
                    <div class="mb-5">
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" v-model="email" placeholder="support@example.com"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8047e5] focus:border-[#8047e5] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#8047e5] dark:focus:border-[#8047e5]"
                            required />
                    </div>
                    <div class="mb-5">
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8047e5] focus:border-[#8047e5] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#8047e5] dark:focus:border-[#8047e5]"
                            required />
                    </div>
                    <div class="flex items-start justify-between mb-5">
                        <div class="flex items-center">
                            <input id="showPassword" type="checkbox" v-model="showPassword"
                                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-[#8047e5] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#8047e5] dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            <label for="showPassword"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show
                                Password</label>
                        </div>
                        <NuxtLink href="/register"
                            class="text-sm text-blue-[#8047e5] hover:underline dark:text-[#8047e5]">
                            Don't have an account yet?
                        </NuxtLink>
                    </div>

                    <button type="submit"
                        class="text-white bg-[#8047e5] hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full uppercase px-5 py-2.5 text-center dark:bg-[#8047e5] dark:focus:ring-[#8047e5]">Login</button>
                </form>
            </div>
        </div>

    </UserLayout>

</template>
