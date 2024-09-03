<script setup lang="ts">
import FormApiKeys from '@/components/custom/form/dialogSettings/FormApiKeys.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { onUnmounted } from 'vue';
import { useChatStore } from '@/stores/chatStore';

const { resetUserApiKeysData } = useChatStore();

// This check ensures that the data is loaded into userStore before rendering the FormApiKeys component.
// TODO: create a spinner component to show while the data is being fetched from the server.

onUnmounted(() => {
  resetUserApiKeysData();
});
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
