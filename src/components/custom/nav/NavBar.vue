<script setup lang="ts">
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';
import ButtonOpenChat from '@/components/custom/button/ButtonOpenChat.vue';
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
</script>

<template>
  <nav class="px-2 grid nav-layout min-w-64 max-w-64 h-screen relative">
    <div class="py-2">
      <ButtonIcon
        iconName="open-outline"
        size="default"
        text="New chat"
        textClass="text-base font-semibold"
        class="w-full justify-between"
      />
    </div>
    <div class="chats flex flex-col gap-2 overflow-y-scroll">
      <ButtonOpenChat chatTitle="Lorem ipsum dolor sit amet consectetur." />
      <ButtonOpenChat chatTitle="Asperiores rerum commodi, provident et facere at!" />
    </div>
    <div class="py-2 mt-auto flex items-center justify-between">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <ButtonIcon iconName="settings-outline" />
      <ButtonColorMode />
      <ButtonIcon iconName="power-outline" />
    </div>
    <div
      class="py-6 pl-2 pr-6 cursor-pointer absolute left-full top-1/2 -translate-y-1/2 toggle-navbar"
    >
      <div
        class="border-l-2 h-2 transition-transform duration-150 rounded-t-full border-l-secondary-foreground"
      ></div>
      <div
        class="border-l-2 h-2 transition-transform duration-150 rounded-b-full border-l-secondary-foreground"
      ></div>
    </div>
  </nav>
</template>

<style scoped>
.nav-layout {
  grid-template-rows: auto 1fr auto;
}

.toggle-navbar:hover div:first-child {
  transform: rotate(15deg);
}

.toggle-navbar:hover div:last-child {
  transform: rotate(-15deg);
}
</style>
