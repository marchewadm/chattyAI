<script setup lang="ts">
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import ButtonOpenChat from '@/components/custom/button/ButtonOpenChat.vue';
import DialogSettings from '@/components/custom/dialog/DialogSettings/DialogSettings.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useChatRoomStore } from '@/stores/chatRoomStore';

import { logoutUserService } from '@/services/authenticationService';

// TODO: Make composable from it!
const isChatsVisible = ref(true);

const router = useRouter();

const chatRoomStore = useChatRoomStore();
const { chatRooms } = storeToRefs(chatRoomStore);

const toggleChats = () => {
  isChatsVisible.value = !isChatsVisible.value;
};

const startNewChat = () => {
  router.push({ name: 'NewChat' });
};
</script>

<template>
  <aside class="flex h-screen">
    <nav class="p-2 border-r">
      <div class="h-1/2 flex flex-col gap-y-1 justify-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon
                iconName="message"
                :class="{ 'bg-secondary': isChatsVisible }"
                @click="toggleChats"
              />
            </TooltipTrigger>
            <TooltipContent side="right" :sideOffset="10">Chats</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon iconName="adjustments-horizontal" />
            </TooltipTrigger>
            <TooltipContent side="right" :sideOffset="10">Adjust model</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonColorMode />
            </TooltipTrigger>
            <TooltipContent side="right" :sideOffset="10">Color mode</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class="h-1/2 flex flex-col gap-y-1 justify-end">
        <DialogSettings />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon iconName="help" />
            </TooltipTrigger>
            <TooltipContent side="right" :sideOffset="10">Help</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon iconName="power" @click="logoutUserService(router)" />
            </TooltipTrigger>
            <TooltipContent side="right" :sideOffset="10">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
    <div class="overflow-y-auto flex flex-col gap-2 w-64 p-2 border-r" v-show="isChatsVisible">
      <ButtonIcon
        iconName="plus"
        size="default"
        variant="default"
        text="New chat"
        textClass="text-base tracking-tighter"
        class="w-full justify-between"
        @click="startNewChat"
      />
      <ButtonOpenChat
        v-for="chat in chatRooms"
        :key="chat.roomUuid"
        :chatTitle="chat.lastMessage"
        :chatRoomUuid="chat.roomUuid"
      />
      <p class="text-sm italic font-medium mt-5 mx-auto" v-show="chatRooms.length < 1">
        No chats yet.
      </p>
    </div>
  </aside>
</template>
