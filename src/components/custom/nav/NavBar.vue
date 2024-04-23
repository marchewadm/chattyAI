<script setup lang="ts">
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';
import ButtonOpenChat from '@/components/custom/button/ButtonOpenChat.vue';
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
</script>

<template>
  <nav class="px-2 grid nav-layout min-w-64 max-w-64 h-screen">
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
  </nav>
</template>

<style scoped>
.nav-layout {
  grid-template-rows: auto 1fr auto;
}
</style>
