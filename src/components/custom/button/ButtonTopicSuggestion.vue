<script setup lang="ts">
import { Button } from '@/components/ui/button';

defineProps({
  buttonTitle: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  }
});
</script>

<template>
  <Button
    class="flex-col items-start h-fit dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-2xl"
    variant="outline"
  >
    <p>{{ buttonTitle }}</p>
    <p class="text-muted-foreground">{{ buttonText }}</p>
  </Button>
</template>
