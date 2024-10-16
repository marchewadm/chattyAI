<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div
    class="w-fit max-w-full bg-secondary py-2 px-4 rounded-2xl break-words col-start-2 justify-self-end"
  >
    <p class="leading-7">
      {{ message }}
    </p>
  </div>
</template>
