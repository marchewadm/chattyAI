<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="bg-secondary w-fit px-4 py-2 rounded-2xl col-start-2 justify-self-end">
    <p class="leading-7">
      {{ message }}
    </p>
  </div>
</template>
