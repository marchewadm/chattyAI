<script setup lang="ts">
// import { onBeforeMount } from 'vue';
import ButtonIconChatAction from '@/components/custom/button/ButtonIconChatAction.vue';
import { Textarea } from '@/components/ui/textarea';

import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const { chatHistory } = storeToRefs(chatStore);

import NavBar from '@/components/custom/nav/NavBar.vue';
import ButtonSelectChatModel from '@/components/custom/button/ButtonSelectChatModel.vue';
</script>

<template>
  <!-- <div class="grid layout">
    <NavBar class="shadow-right z-20" />
    <div class="container-layout h-screen overflow-y-auto dark:bg-gray-900 relative">
      <div class="sticky top-0 w-full pt-2 pl-2 bg-white dark:bg-inherit z-10">
        <div class="w-fit">
          <ButtonSelectChatModel />
        </div>
      </div>
      <div class="w-full">
        <div class="w-1/2 mx-auto h-full overflow-y-auto">
          <div class="w-full h-full chat-layout">
            <div class="grid message-layout grid-cols-2 auto-rows-min gap-y-4">
              <div class="bg-secondary px-4 py-2 rounded-2xl col-start-2 w-fit justify-self-end">
                <p class="leading-7">
                  elohttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_api
                </p>
              </div>
              <div class="col-span-2">
                <p class="leading-7">
                  tetetehttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apite
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sticky bottom-0 z-10 bg-white dark:bg-inherit">
        <div class="w-1/2 mx-auto p-2">
          <Textarea
            placeholder="Type your message here..."
            class="resize-none h-10 p-4 dark:border-gray-700 rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div> -->
  <div class="grid layout">
    <NavBar class="shadow-right z-20" />
    <div class="container-layout overflow-y-auto dark:bg-gray-900 relative flex flex-col h-screen">
      <div class="sticky top-0 w-full pt-2 pl-2 bg-white dark:bg-inherit z-10">
        <div class="w-fit">
          <ButtonSelectChatModel />
        </div>
      </div>
      <div class="w-full flex-grow">
        <div class="w-1/2 mx-auto overflow-y-auto">
          <div class="w-full chat-layout">
            <div class="grid message-layout grid-cols-2 auto-rows-min gap-y-4">
              <div class="bg-secondary px-4 py-2 rounded-2xl col-start-2 w-fit justify-self-end">
                <p class="leading-7">
                  elohttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_api
                </p>
              </div>
              <div class="col-span-2">
                <p class="leading-7">
                  tetetehttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apite
                </p>
              </div>
              <div class="bg-secondary px-4 py-2 rounded-2xl col-start-2 w-fit justify-self-end">
                <p class="leading-7">
                  elohttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_api
                </p>
              </div>
              <div class="col-span-2">
                <p class="leading-7">
                  tetetehttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apihttps://github.com/marchewadm/chattyai_backend/tree/feat/openai_apite
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sticky bottom-0 z-10 bg-white dark:bg-inherit">
        <div class="w-1/2 mx-auto p-2">
          <Textarea
            placeholder="Type your message here..."
            class="resize-none h-10 p-4 dark:border-gray-700 rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .chat-layout {
  grid-template-rows: 1fr auto;
} */

.layout {
  grid-template-columns: auto 1fr;
}

.message-layout {
  grid-template-columns: 1fr 1fr;
}
</style>
