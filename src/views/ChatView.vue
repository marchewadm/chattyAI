<script setup lang="ts">
import NavBar from '@/components/custom/nav/NavBar.vue';
import ButtonIconChatAction from '@/components/custom/button/ButtonIconChatAction.vue';
import ButtonTopicSuggestion from '@/components/custom/button/ButtonTopicSuggestion.vue';
import ButtonSelectChatModel from '@/components/custom/button/ButtonSelectChatModel.vue';

import typewriterData from '@/assets/typewriterData.json';

import { Textarea } from '@/components/ui/textarea';

import { onBeforeMount, onMounted, ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const { aiModel } = storeToRefs(chatStore);

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

import { Toaster } from '@/components/ui/toast';

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
  <Toaster />
  <div class="min-h-screen grid layout">
    <NavBar class="shadow-right" />
    <div class="grid container-layout dark:bg-gray-900">
      <div class="w-fit mt-2 ml-2">
        <ButtonSelectChatModel />
      </div>
      <div class="w-full my-4">
        <div class="w-1/2 mx-auto h-full">
          <div class="w-full h-full grid chat-layout">
            <h1
              class="text-2xl font-medium tracking-tighter justify-self-center self-center"
              ref="target"
            >
              How can I help you today?
            </h1>
            <div class="relative">
              <Textarea
                :placeholder="`Message with ${aiModel}`"
                class="resize-none h-10 p-4 dark:border-gray-700 rounded-2xl"
              />
              <div class="flex absolute left-full top-1/2 -translate-y-1/2">
                <ButtonIconChatAction iconName="mic" />
                <ButtonIconChatAction iconName="send" />
              </div>
              <div
                class="absolute grid grid-cols-2 w-full gap-2 bottom-full mb-4 px-6"
                ref="target2"
              >
                <ButtonTopicSuggestion
                  v-for="(_, index) in buttonTopicSuggestionDataTitle"
                  :key="index"
                  :buttonTitle="buttonTopicSuggestionDataTitle[index]"
                  :buttonText="buttonTopicSuggestionDataText[index]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  grid-template-columns: auto 1fr;
}

.container-layout {
  grid-template-rows: auto 1fr;
}

.chat-layout {
  grid-template-rows: 1fr auto auto;
}
</style>
