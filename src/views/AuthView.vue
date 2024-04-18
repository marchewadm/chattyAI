<script setup lang="ts">
import LoginForm from '@/components/custom/form/LoginForm.vue';
import RegisterForm from '@/components/custom/form/RegisterForm.vue';
import ResetPasswordForm from '@/components/custom/form/ResetPasswordForm.vue';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';
import { useColorMode } from '@vueuse/core';

import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const mode = useColorMode();
const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2">
    <div class="bg-muted"></div>
    <div class="grid grid-rows-auto-1fr">
      <div class="p-2 flex gap-1 justify-end">
        <Button
          variant="ghost"
          @click="authFormType = authFormType === 'login' ? 'register' : 'login'"
        >
          <template v-if="authFormType === 'login'">Sign up</template>
          <template v-else>Sign in</template>
        </Button>
        <Button variant="ghost" @click="mode = mode === 'dark' ? 'light' : 'dark'">
          <Icon
            :icon="mode === 'light' ? 'ion:moon-outline' : 'ion:sunny-outline'"
            class="h-[1.2rem] w-[1.2rem]"
          />
        </Button>
      </div>
      <LoginForm v-if="authFormType === 'login'" />
      <RegisterForm v-else-if="authFormType === 'register'" />
      <ResetPasswordForm v-else />
    </div>
  </div>
</template>
