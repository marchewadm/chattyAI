<script setup lang="ts">
import CardModelSettingsContainer from '@/components/custom/card/CardModelSettingsContainer.vue';
import SidebarChatOptions from '@/components/custom/sidebar/SidebarChatOptions.vue';
import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

const chatContainer = ref<HTMLDivElement | null>(null);

const resizeObserver = new ResizeObserver(() => scrollChatToBottom());

const scrollChatToBottom = () => {
  if (!chatContainer.value) return;

  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

const handleObserverConnect = () => {
  if (!chatContainer.value) return;

  for (const child of chatContainer.value.children) {
    resizeObserver.observe(child);
  }
};

const handleObserverDisconnect = () => {
  resizeObserver.disconnect();
};

onMounted(() => {
  handleObserverConnect();
});

onBeforeRouteLeave(() => {
  handleObserverDisconnect();
});

onBeforeRouteUpdate(() => {
  handleObserverDisconnect();
  handleObserverConnect();
});
</script>

<template>
  <main class="grid chat-layout">
    <AlertDialogPassphraseContainer />
    <SidebarChatOptions />
    <div
      class="relative h-screen dark:bg-gray-900 flex flex-col overflow-y-auto"
      ref="chatContainer"
    >
      <div class="sticky w-full bg-white dark:bg-inherit pt-2 px-2 top-0 z-10">
        <div class="w-fit ml-auto">
          <CardModelSettingsContainer />
        </div>
      </div>
      <div class="w-full flex-grow">
        <slot name="chatContent"></slot>
      </div>
      <div class="sticky w-full bg-white dark:bg-inherit bottom-0 z-10">
        <div class="relative w-1/2 py-3 mx-auto">
          <slot name="textarea"></slot>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.chat-layout {
  grid-template-columns: auto 1fr;
}
</style>
