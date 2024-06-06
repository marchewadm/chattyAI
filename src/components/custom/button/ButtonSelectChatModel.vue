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
const { aiModel, aiModels } = storeToRefs(chatStore);
</script>

<template>
  <Select v-model="aiModel">
    <SelectTrigger class="dark:border-gray-700">
      <SelectValue placeholder="Select model" class="pr-2" />
    </SelectTrigger>
    <SelectContent class="dark:bg-gray-900 dark:border-gray-700">
      <SelectGroup>
        <SelectLabel>Available models</SelectLabel>
        <SelectItem v-for="(aiModel, index) in aiModels" :value="aiModel.value" :key="index">
          {{ aiModel.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
