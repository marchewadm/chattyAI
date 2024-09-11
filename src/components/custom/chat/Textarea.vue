<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import ButtonIconChatAction from '@/components/custom/button/ButtonIconChatAction.vue';

import { ref } from 'vue';

const message = ref('');

const sendMessage = () => {
  if (!message.value) {
    return;
  }

  emit('sendMessage', message.value);
  message.value = '';
};

const emit = defineEmits(['sendMessage']);
</script>

<template>
  <div class="relative">
    <Textarea
      placeholder="Type your message here..."
      class="dark:border-gray-700 h-10 p-4 resize-none rounded-2xl"
      v-model="message"
      @keydown.enter.prevent="sendMessage"
    />
    <div class="flex absolute left-full top-1/2 -translate-y-1/2">
      <ButtonIconChatAction iconName="send" @click="sendMessage" />
      <ButtonIconChatAction iconName="mic" />
    </div>
  </div>
</template>
