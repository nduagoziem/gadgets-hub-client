<script setup>
definePageMeta({
    layout: 'user-layout',
    middleware: guest,
});

import { ref } from 'vue';
import guest from '@/middleware/guest';

const showPassword = ref(false);
const config = useRuntimeConfig();
const name = ref("");
const email = ref("");
const password = ref("");

/**
 * Fetches CSRF Token from the backend before making further requests.
 * DO NOT SKIP THIS PROCESS.
 */
onMounted(
    async () => {
        await $fetch(`sanctum/csrf-cookie`, {
            method: "GET",
            credentials: "include",
            baseURL: config.public.apiAuth,
        })
    }
)

const register = async () => {
    try {
        const response = await $fetch('/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
            },
            credentials: 'include',
            baseURL: config.public.apiAuth,
            body: { name: name.value, email: email.value, password: password.value, },
        });
        alert(response.message);
        name.value = "";
        email.value = "";
        password.value = "";
        reloadNuxtApp({ path: "/" });
    } catch (err) {
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
            <Title>Register - {{ $config.public.appName }}</Title>
            <Meta name="description" content="Create an account to access exclusive features and content." />
        </Head>

        <div class="min-h-screen flex items-center justify-center">
            <div class="w-full max-w-xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <form class="space-y-6" @submit.prevent="register">
                    <div class="mb-5">
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" v-model="name" placeholder="John Doe"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8047e5] focus:border-[#8047e5] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#8047e5] dark:focus:border-[#8047e5]"
                            required />
                    </div>

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
                                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#8047e5] dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            <label for="showPassword"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show
                                Password</label>
                        </div>
                        <NuxtLink to="/login" class="text-sm text-blue-[#8047e5] hover:underline dark:text-[#8047e5]">
                            Already registered?
                        </NuxtLink>
                    </div>

                    <button type="submit"
                        class="text-white bg-[#8047e5] hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-[#8047e5] font-medium rounded-lg uppercase text-sm w-full px-5 py-2.5 text-center dark:bg-[#8047e5] dark:focus:ring-[#8047e5]">Create
                        Account</button>
                </form>
            </div>
        </div>

    </UserLayout>

</template>
