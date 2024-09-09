<script setup lang="ts">
import NavBar from '@/components/custom/nav/NavBar.vue';
import ChatCustomizeModel from '@/components/custom/chat/ChatCustomizeModel.vue';
</script>

<template>
  <div class="grid layout">
    <NavBar class="shadow-right z-20" />
    <div class="dark:bg-gray-900 h-screen flex flex-col overflow-y-auto relative">
      <div class="bg-white dark:bg-inherit w-full pt-2 px-2 sticky top-0 z-10">
        <ChatCustomizeModel />
      </div>
      <div class="w-full flex-grow">
        <slot name="chat"></slot>
      </div>
      <div class="bg-white dark:bg-inherit w-full sticky bottom-0 z-10">
        <div class="w-1/2 mx-auto py-3 relative">
          <slot name="textarea"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  grid-template-columns: auto 1fr;
}
</style>
