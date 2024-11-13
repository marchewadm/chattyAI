<script setup lang="ts">
defineProps<{
  message: string;
  imageUrl?: string;
}>();
</script>

<template>
  <div class="col-start-2 justify-self-end">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="mb-2 rounded-lg cursor-pointer hover:opacity-70 transition-opacity duration-200"
      v-viewer
    />
    <div class="ml-auto w-fit max-w-full bg-secondary py-2 px-4 rounded-2xl break-words">
      <p class="leading-7">
        {{ message }}
      </p>
    </div>
  </div>
</template>
