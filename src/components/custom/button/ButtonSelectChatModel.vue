<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();
const { aiModel } = storeToRefs(chatStore);
</script>

<template>
  <Select defaultValue="gpt-3.5-turbo" v-model="aiModel">
    <SelectTrigger class="dark:border-gray-700">
      <SelectValue placeholder="Select a model" class="pr-2" />
    </SelectTrigger>
    <SelectContent class="dark:bg-gray-900 dark:border-gray-700">
      <SelectGroup>
        <SelectLabel>Available models</SelectLabel>
        <SelectItem value="GPT-4">GPT-4</SelectItem>
        <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
