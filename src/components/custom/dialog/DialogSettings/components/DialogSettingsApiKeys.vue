<script setup lang="ts">
import FormApiKeys from '@/components/custom/form/dialogSettings/FormApiKeys.vue';
import { ScrollArea } from '@/components/ui/scroll-area';

import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getApiKeysService } from '@/services/apiKeysService';

import { useChatStore } from '@/stores/chatStore';

const router = useRouter();
const { resetUserApiKeysData } = useChatStore();

// This check ensures that the data is loaded into userStore before rendering the FormApiKeys component.
// TODO: create a spinner component to show while the data is being fetched from the server.
const isApiKeysDataLoaded = ref(false);

onBeforeMount(async () => {
  await getApiKeysService(router);
  isApiKeysDataLoaded.value = true;
});

onUnmounted(() => {
  isApiKeysDataLoaded.value = false;
  resetUserApiKeysData();
});
</script>

<template>
  <ScrollArea class="h-full">
    <FormApiKeys v-if="isApiKeysDataLoaded" />
  </ScrollArea>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
