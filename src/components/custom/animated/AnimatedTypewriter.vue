<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { delay } from '@/utils/utils';
import typewriterData from '@/assets/typewriterData.json';

const typewriterTitlesArray = [...typewriterData.title];
const typewriterTextsArray = [...typewriterData.text];

const fadeOut = ref(false);
const fadeIn = ref(false);
const typewriterTitle = ref('');
const typewriterText = ref('');

// Typewriter effect
const typeText = async () => {
  // Get a random index from the array so that each time the page loads, it will begin with a different title.
  let i = Math.floor(Math.random() * typewriterTitlesArray.length);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    fadeOut.value = false;
    fadeIn.value = true;
    typewriterTitle.value = typewriterTitlesArray[i];
    typewriterText.value = '';

    for (const char of typewriterTextsArray[i]) {
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
    if (i === typewriterTextsArray.length) {
      i = 0;
    }
  }
};

onMounted(async () => {
  await typeText();
});
</script>

<template>
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
