<script setup lang="ts">
import LoginForm from '@/components/custom/form/LoginForm.vue';
import RegisterForm from '@/components/custom/form/RegisterForm.vue';
import ResetPasswordForm from '@/components/custom/form/ResetPasswordForm.vue';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';
import { useColorMode } from '@vueuse/core';

import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const mode = useColorMode();
const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);

const typewriterTitleArray = [
  'Find a solution',
  'Recommend a workout routine',
  'Suggest a weekend getaway',
  'Help me choose a gift',
  'Share travel tips',
  'Recommend a podcast',
  'Tell me a bedtime story'
];

const typewriterTextArray = [
  "for a problem I've been facing, I need to resolve it quickly",
  'to help me stay fit and healthy',
  'for a short trip with friends, somewhere relaxing',
  "for my friend's birthday, something unique",
  'for my upcoming trip, any advice would be appreciated',
  "that's educational and entertaining",
  'that will help me drift off to sleep peacefully'
];

// Typewriter effect
const fadeOut = ref(false);
const fadeIn = ref(false);
const typewriterTitle = ref('');
const typewriterText = ref('');

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const typeText = async () => {
  let i = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    fadeOut.value = false;
    fadeIn.value = true;
    typewriterTitle.value = typewriterTitleArray[i];
    typewriterText.value = '';

    for (const char of typewriterTextArray[i]) {
      typewriterText.value += char;
      await delay(Math.random() * 50 + 20); // Random delay between 20ms and 70ms
    }

    await delay(3500);
    fadeOut.value = true;
    fadeIn.value = false;
    await delay(700); // Wait for the fade-out animation to finish

    i++;
    if (i === typewriterTextArray.length) {
      i = 0; // Reset the index if it's equal to the length of the array
    }
  }
};

// Toggle color mode
const toggleColorMode = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark';
};

onMounted(async () => {
  await typeText();
});
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2">
    <div class="bg-secondary p-2 grid grid-rows-auto-1fr">
      <p>!!! LOGO PLACEHOLDER !!!</p>
      <div class="self-center w-5/6">
        <h1
          class="text-3xl font-semibold tracking-tighter"
          :class="{ 'fade-out-second-variant': fadeOut, 'fade-in': fadeIn }"
        >
          {{ typewriterTitle }}
        </h1>
        <p class="text-2xl h-20" :class="{ 'fade-out': fadeOut, 'fade-in-second-variant': fadeIn }">
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
  </div>
</template>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

.fade-in {
  opacity: 1;
  transform: translateY(-20px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-in-second-variant {
  opacity: 1;
  transform: translateY(-20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-out {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-out-second-variant {
  opacity: 0;
  transform: translateY(20px);
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
