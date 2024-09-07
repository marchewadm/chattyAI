<script setup lang="ts">
import typewriterData from '@/assets/typewriterData.json';

import Layout from '@/components/custom/chat/Layout.vue';
import Textarea from '@/components/custom/chat/Textarea.vue';
import ButtonTopicSuggestion from '@/components/custom/button/ButtonTopicSuggestion.vue';

import { ref, onBeforeMount, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';

const target = ref<HTMLElement>();
const target2 = ref<HTMLElement>();

const buttonTopicSuggestionDataTitle: string[] = [];
const buttonTopicSuggestionDataText: string[] = [];

function createButtonTopicSuggestionData() {
  while (buttonTopicSuggestionDataTitle.length < 4) {
    let i = Math.floor(Math.random() * typewriterData.title.length);

    if (i === typewriterData.title.length) {
      i = 0;
    }

    if (buttonTopicSuggestionDataTitle.includes(typewriterData.title[i])) {
      continue;
    } else {
      buttonTopicSuggestionDataTitle.push(typewriterData.title[i]);
      buttonTopicSuggestionDataText.push(typewriterData.text[i]);
    }
  }
}

onBeforeMount(() => {
  createButtonTopicSuggestionData();
});

onMounted(() => {
  createButtonTopicSuggestionData();

  useMotion(target, {
    initial: {
      opacity: 0,
      y: 100
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });

  useMotion(target2, {
    initial: {
      opacity: 0,
      y: 50
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });
});
</script>

<template>
  <Layout>
    <template #chat>
      <div class="w-1/2 mx-auto flex h-full justify-center items-center">
        <h1 class="text-2xl font-medium tracking-tight" ref="target">How can I help you today?</h1>
      </div>
    </template>
    <template #textarea>
      <Textarea />
      <div class="absolute w-full grid grid-cols-2 gap-2 bottom-full mb-4 px-6" ref="target2">
        <ButtonTopicSuggestion
          v-for="(_, index) in buttonTopicSuggestionDataTitle"
          :key="index"
          :buttonTitle="buttonTopicSuggestionDataTitle[index]"
          :buttonText="buttonTopicSuggestionDataText[index]"
        />
      </div>
    </template>
  </Layout>
</template>
