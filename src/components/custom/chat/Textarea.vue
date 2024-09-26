<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import ButtonIconChatAction from '@/components/custom/button/ButtonIconChatAction.vue';

import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useFocus } from '@vueuse/core';

const message = ref('');
const textareaEl = ref<HTMLTextAreaElement | null>(null);

const sendMessage = () => {
  if (!message.value) return;

  emit('sendMessage', message.value);
  message.value = '';
};

const emit = defineEmits(['sendMessage']);

const useFocusOnTextarea = () => useFocus(textareaEl, { initialValue: true });

onMounted(() => {
  useFocusOnTextarea();
});

onBeforeRouteUpdate(() => {
  useFocusOnTextarea();
});
</script>

<template>
  <div class="relative">
    <Textarea
      placeholder="Type your message here..."
      class="dark:border-gray-700 h-10 p-4 resize-none rounded-2xl"
      v-model="message"
      ref="textareaEl"
      @keydown.enter.prevent="sendMessage"
    />
    <div class="flex absolute left-full top-1/2 -translate-y-1/2">
      <ButtonIconChatAction iconName="send-2" @click="sendMessage" />
      <ButtonIconChatAction iconName="microphone" />
    </div>
  </div>
</template>
