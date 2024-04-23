<script setup lang="ts">
import FormLogin from '@/components/custom/form/auth/FormLogin.vue';
import FormRegister from '@/components/custom/form/auth/FormRegister.vue';
import FormResetPassword from '@/components/custom/form/auth/FormResetPassword.vue';
import AnimatedWave from '@/components/custom/animated/AnimatedWave.vue';
import AnimatedTypewriter from '@/components/custom/animated/AnimatedTypewriter.vue';
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';

import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);
</script>

<template>
  <div class="p-2 w-full min-h-screen relative flex flex-col">
    <nav class="flex justify-between items-center">
      <a href="#" class="text-2xl font-medium tracking-tighter">TestChat</a>
      <div class="flex gap-1">
        <Button
          variant="ghost"
          @click="authFormType = authFormType === 'login' ? 'register' : 'login'"
        >
          <template v-if="authFormType === 'login'">Sign up</template>
          <template v-else>Sign in</template>
        </Button>
        <ButtonColorMode />
      </div>
    </nav>
    <div
      class="relative flex-grow grid items-center justify-center md:grid-cols-2 md:justify-normal md:mx-10"
    >
      <div class="w-5/6 hidden md:block">
        <AnimatedTypewriter />
      </div>
      <FormLogin v-if="authFormType === 'login'" />
      <FormRegister v-else-if="authFormType === 'register'" />
      <FormResetPassword v-else />
    </div>
    <AnimatedWave />
  </div>
</template>
