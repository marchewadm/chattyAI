<script setup lang="ts">
import typewriterData from '@/assets/typewriterData.json';
import LayoutChat from '@/layouts/LayoutChat.vue';
import TextareaChat from '@/components/custom/textarea/TextareaChat.vue';
import ButtonChatTopicSuggestion from '@/components/custom/button/ButtonChatTopicSuggestion.vue';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import { postChatHistoryService } from '@/services/chatHistoryService';

const greetingHeadingRef = ref<HTMLHeadingElement | null>(null);
const buttonsContainerRef = ref<HTMLDivElement | null>(null);

const router = useRouter();

const buttonTopicTitles: string[] = [];
const buttonTopicDescriptions: string[] = [];

const generateRandomButtonTopicSuggestions = () => {
  const uniqueIndices = new Set<number>();

  while (uniqueIndices.size < 4) {
    const i = Math.floor(Math.random() * typewriterData.title.length);

    if (!uniqueIndices.has(i)) {
      uniqueIndices.add(i);
      buttonTopicTitles.push(typewriterData.title[i]);
      buttonTopicDescriptions.push(typewriterData.text[i]);
    }
  }
};

const onSendMessage = async (message: string) => {
  const response = await postChatHistoryService({ message }, router);

  if (response) {
    router.push({ name: 'ChatActive', params: { room_uuid: response.roomUuid } });
  }
};

const onSelectTopicSuggestion = async (topicIndex: number) => {
  const message = `${buttonTopicTitles[topicIndex]} ${buttonTopicDescriptions[topicIndex]}`;
  await onSendMessage(message);
};

onBeforeMount(() => {
  generateRandomButtonTopicSuggestions();
});

onMounted(() => {
  // TODO: Consider improving these animations
  useMotion(greetingHeadingRef, {
    initial: {
      opacity: 0,
      y: 50
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });

  useMotion(buttonsContainerRef, {
    initial: {
      opacity: 0,
      y: 25
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });
});
</script>

<template>
  <LayoutChat>
    <template #chatContent>
      <div class="h-full w-1/2 mx-auto flex justify-center items-center">
        <h1
          class="text-2xl font-medium tracking-tight"
          ref="greetingHeadingRef"
        >
          How can I help you today?
        </h1>
      </div>
    </template>
    <template #textareaContent>
      <TextareaChat @sendMessage="onSendMessage" />
      <div
        class="absolute w-full px-6 mb-4 bottom-full grid grid-cols-2 gap-2"
        ref="buttonsContainerRef"
      >
        <ButtonChatTopicSuggestion
          v-for="(_, index) in buttonTopicTitles"
          :key="index"
          :topicTitle="buttonTopicTitles[index]"
          :topicDescription="buttonTopicDescriptions[index]"
          @click="onSelectTopicSuggestion(index)"
        />
      </div>
    </template>
  </LayoutChat>
</template>
