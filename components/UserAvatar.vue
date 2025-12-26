<script setup>
import { useCustomerInfoStore } from '@/stores/customerInfo';
import { reloadNuxtApp, useRuntimeConfig } from 'nuxt/app';

const { customerInfo } = useCustomerInfoStore();
const config = useRuntimeConfig();
// helper for avatar initials
const initials = computed(() => {
    return customerInfo.name
        .split(' ')
        .map(s => s[0]?.toUpperCase() ?? '')
        .join('')
        .slice(0, 2)
})

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
};

const logout = async () => {
    const confirm = window.confirm("Sure you wanna logout?")
    if (confirm) {
        try {
            const xsrfToken = getCookie('XSRF-TOKEN');

            const response = await axios.post(
                `${config.public.apiAuth}/customer/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );
            alert(response.data.message);
            return reloadNuxtApp({ path: "/login" });
        } catch (err) {
            if (err) {
                throw err;
            }
        }

    }
    return;
}
</script>

<template>

    <button id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"
        class="relative hover:cursor-pointer inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
        <span class="font-medium text-gray-600 dark:text-gray-300">{{ initials }}</span>
    </button>

    <!-- Dropdown menu -->
    <div id="userDropdown"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-800 dark:divide-gray-600">
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div class="font-medium truncate">{{ customerInfo.name }}</div>
            <div class="truncate">{{ customerInfo.email }}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
                <NuxtLink to="/profile"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile
                </NuxtLink>
            </li>
            <li>
                <button @click="logout"
                    class="inline-flex w-full px-4 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log
                    Out</button>
            </li>
        </ul>
    </div>

</template>