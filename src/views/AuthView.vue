<script setup lang="ts">
import FormLogin from '@/components/custom/form/auth/FormLogin.vue';
import FormRegister from '@/components/custom/form/auth/FormRegister.vue';
import FormResetPassword from '@/components/custom/form/auth/FormResetPassword.vue';
import AnimatedWave from '@/components/custom/animated/AnimatedWave.vue';
import AnimatedTypewriter from '@/components/custom/animated/AnimatedTypewriter.vue';

import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

import { useColorMode } from '@vueuse/core';
import { toggleColorMode } from '@/utils/utils';

import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const mode = useColorMode();
const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2 relative">
    <div class="p-2 grid grid-rows-auto-1fr">
      <p>!!! LOGO PLACEHOLDER !!!</p>
      <div class="self-center w-5/6 ml-10">
        <AnimatedTypewriter />
      </div>
    </div>
    <div class="grid grid-rows-auto-1fr">
      <div class="p-2 flex gap-1 justify-end">
        <Button
          variant="ghost"
          @click="authFormType = authFormType === 'login' ? 'register' : 'login'"
        >
          <template v-if="authFormType === 'login'">Sign up</template>
          <template v-else>Sign in</template>
        </Button>
        <Button variant="ghost" @click="toggleColorMode">
          <Icon
            :icon="mode === 'light' ? 'ion:moon-outline' : 'ion:sunny-outline'"
            class="h-[1.2rem] w-[1.2rem]"
          />
        </Button>
      </div>
      <FormLogin v-if="authFormType === 'login'" />
      <FormRegister v-else-if="authFormType === 'register'" />
      <FormResetPassword v-else />
    </div>
    <AnimatedWave />
  </div>
</template>
