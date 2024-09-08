<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import ButtonIconChatAction from '@/components/custom/button/ButtonIconChatAction.vue';
</script>

<template>
  <div class="relative">
    <Textarea
      placeholder="Type your message here..."
      class="dark:border-gray-700 h-10 p-4 resize-none rounded-2xl"
    />
    <div class="flex absolute left-full top-1/2 -translate-y-1/2">
      <ButtonIconChatAction iconName="send" />
      <ButtonIconChatAction iconName="mic" />
    </div>
  </div>
</template>
