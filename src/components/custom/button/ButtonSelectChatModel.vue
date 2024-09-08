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
const { apiProvider, apiProviders } = storeToRefs(chatStore);
</script>

<template>
  <Select v-model="apiProvider">
    <SelectTrigger class="dark:border-gray-700">
      <SelectValue placeholder="Select model" class="pr-2" />
    </SelectTrigger>
    <SelectContent class="dark:bg-gray-900 dark:border-gray-700">
      <SelectGroup v-for="apiProvider in apiProviders" :key="apiProvider.apiProviderId">
        <SelectLabel>{{ apiProvider.label }}</SelectLabel>
        <SelectItem v-for="(aiModel, index) in apiProvider.aiModels" :value="aiModel" :key="index">
          {{ aiModel }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
