<script setup lang="ts">
import ButtonChatTextareaAction from '@/components/custom/button/ButtonChatTextareaAction.vue';
import { Textarea } from '@/components/shadcn/textarea';
import { ref, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useFocus } from '@vueuse/core';

const emit = defineEmits<{
  sendMessage: [message: string];
}>();

const messageRef = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const sendMessage = () => {
  if (!messageRef.value) return;

  emit('sendMessage', messageRef.value);
  messageRef.value = '';
};

const setFocusOnTextarea = () => useFocus(textareaRef, { initialValue: true });

onMounted(() => {
  setFocusOnTextarea();
});

onBeforeRouteUpdate(() => {
  setFocusOnTextarea();
});
</script>

<template>
  <div class="relative">
    <Textarea
      placeholder="Type your message here..."
      class="h-10 p-4 rounded-2xl resize-none dark:border-gray-700"
      ref="textareaEl"
      v-model="messageRef"
      @keydown.enter.prevent="sendMessage"
    />
    <div class="hidden absolute top-1/2 left-full -translate-y-1/2 md:flex">
      <ButtonChatTextareaAction
        iconName="send-2"
        @click="sendMessage"
      />
      <ButtonChatTextareaAction iconName="microphone" />
    </div>
  </div>
</template>
