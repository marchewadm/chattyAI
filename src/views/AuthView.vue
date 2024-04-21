<script setup lang="ts">
import LoginForm from '@/components/custom/form/LoginForm.vue';
import RegisterForm from '@/components/custom/form/RegisterForm.vue';
import ResetPasswordForm from '@/components/custom/form/ResetPasswordForm.vue';
import WaveDividerSvg from '@/components/custom/svg/WaveDividerSvg.vue';

import { useColorMode } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';
import { delay, toggleColorMode } from '@/utils/utils';
import typewriterData from '@/assets/typewriterData.json';

import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const mode = useColorMode();
const authStore = useAuthStore();

const typewriterTitleArray = [...typewriterData.title];
const typewriterTextArray = [...typewriterData.text];

const { authFormType } = storeToRefs(authStore);
const fadeOut = ref(false);
const fadeIn = ref(false);
const typewriterTitle = ref('');
const typewriterText = ref('');

// Typewriter effect
const typeText = async () => {
  // Get a random index from the array
  let i = Math.floor(Math.random() * typewriterTitleArray.length);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    fadeOut.value = false;
    fadeIn.value = true;
    typewriterTitle.value = typewriterTitleArray[i];
    typewriterText.value = '';

    for (const char of typewriterTextArray[i]) {
      typewriterText.value += char;

      // Random delay between typing each character, it will look more natural
      await delay(Math.random() * 50 + 20);
    }

    await delay(3500);
    fadeOut.value = true;
    fadeIn.value = false;
    await delay(700);

    i++;

    // Reset the index if it's equal to the length of the array
    if (i === typewriterTextArray.length) {
      i = 0;
    }
  }
};

onMounted(async () => {
  await typeText();
});
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2 relative">
    <div class="p-2 grid grid-rows-auto-1fr">
      <p>!!! LOGO PLACEHOLDER !!!</p>
      <div class="self-center w-5/6 ml-10">
        <h1
          class="text-3xl font-semibold tracking-tighter"
          :class="{
            'fade-out-base fade-out-slower': fadeOut,
            'fade-in-base fade-in-faster': fadeIn
          }"
        >
          {{ typewriterTitle }}
        </h1>
        <p
          class="h-20 text-2xl tracking-tight"
          :class="{
            'fade-out-base fade-out-faster': fadeOut,
            'fade-in-base fade-in-slower': fadeIn
          }"
        >
          {{ typewriterText }}<span class="cursor">|</span>
        </p>
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
      <LoginForm v-if="authFormType === 'login'" />
      <RegisterForm v-else-if="authFormType === 'register'" />
      <ResetPasswordForm v-else />
    </div>
    <WaveDividerSvg />
  </div>
</template>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

.fade-in-base {
  opacity: 1;
  transform: translateY(-20px);
}

.fade-in-faster {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-in-slower {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-out-base {
  opacity: 0;
  transform: translateY(20px);
}

.fade-out-faster {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-out-slower {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
