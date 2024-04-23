<script setup lang="ts">
import { Button } from '@/components/ui/button';

defineProps({
  chatTitle: {
    type: String,
    required: true
  }
});
</script>

<template>
  <Button variant="ghost" class="justify-start">
    <span class="truncate">{{ chatTitle }}</span>
  </Button>
</template>
