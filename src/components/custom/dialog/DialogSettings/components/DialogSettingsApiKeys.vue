<script setup lang="ts">
import FormApiKeys from '@/components/custom/form/dialogSettings/FormApiKeys.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
</script>

<template>
  <ScrollArea class="h-full">
    <FormApiKeys />
  </ScrollArea>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
