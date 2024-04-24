<script setup lang="ts">
import NavBar from '@/components/custom/nav/NavBar.vue';
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { Textarea } from '@/components/ui/textarea';

const aiModel = 'GPT-4';
</script>

<template>
  <div class="layout min-h-screen grid">
    <NavBar class="shadow-right" />
    <div class="grid chat-layout dark:bg-gray-900">
      <div></div>
      <div class="w-full my-4">
        <div class="w-1/2 mx-auto flex items-center gap-2">
          <Textarea
            :placeholder="`Message with ${aiModel}...`"
            class="resize-none h-10 p-4 dark:border-gray-700 rounded-2xl"
          />
          <ButtonIcon
            class="hover:scale-110 active:scale-110 transition-transform duration-200"
            iconName="mic"
            iconClass="h-6 w-6"
            :variant="null"
          />
          <ButtonIcon
            class="hover:scale-110 active:scale-110 transition-transform duration-200"
            iconName="send"
            iconClass="h-6 w-6"
            :variant="null"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  grid-template-columns: auto 1fr;
}

.chat-layout {
  grid-template-rows: 1fr auto;
}
</style>
