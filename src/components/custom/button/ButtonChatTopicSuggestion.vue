<script setup lang="ts">
import { Button } from '@/components/shadcn/button';

defineProps<{
  topicTitle: string;
  topicDescription: string;
}>();
</script>

<template>
  <Button
    variant="outline"
    class="h-fit rounded-2xl dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 flex-col items-start"
  >
    <span>{{ topicTitle }}</span>
    <span class="text-muted-foreground">{{ topicDescription }}</span>
  </Button>
</template>
