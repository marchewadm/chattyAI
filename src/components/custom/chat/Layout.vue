<script setup lang="ts">
import NavBar from '@/components/custom/nav/NavBar.vue';
import ButtonSelectChatModel from '@/components/custom/button/ButtonSelectChatModel.vue';
</script>

<template>
  <!-- <div class="min-h-screen grid layout">
    <NavBar class="shadow-right" />
    <div class="grid container-layout dark:bg-gray-900">
      <div class="w-fit mt-2 ml-2">
        <ButtonSelectChatModel />
      </div>
      <div class="w-full my-4">
        <slot></slot>
      </div>
    </div>
  </div> -->
  <div class="grid layout">
    <NavBar class="shadow-right z-20" />
    <div class="container-layout h-screen overflow-y-auto dark:bg-gray-900 relative">
      <div class="sticky top-0 w-full pt-2 pl-2 bg-white dark:bg-inherit z-10">
        <div class="w-fit">
          <ButtonSelectChatModel />
        </div>
      </div>
      <div class="w-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  grid-template-columns: auto 1fr;
}

/* .container-layout {
  grid-template-rows: auto 1fr;
} */
</style>
