<script setup lang="ts">
import NavigationChat from '@/components/custom/navigation/NavigationChat.vue';
import SidebarChatOpen from '@/components/custom/sidebar/SidebarChatOpen.vue';
import SidebarChatCustomizeModel from '@/components/custom/sidebar/SidebarChatCustomizeModel.vue';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

const chatSidebarStore = useChatSidebarStore();
const { isSidebarVisible } = storeToRefs(chatSidebarStore);
</script>

<template>
  <aside class="flex h-screen">
    <NavigationChat />
    <div
      class="overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
      :class="{
        'w-72 p-2 opacity-100 border-r': isSidebarVisible,
        'w-0 p-0 opacity-0': !isSidebarVisible
      }"
    >
      <div class="min-w-[270px]">
        <SidebarChatOpen />
        <SidebarChatCustomizeModel />
      </div>
    </div>
  </aside>
</template>
