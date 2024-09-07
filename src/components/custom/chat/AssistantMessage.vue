<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="col-span-2">
    <p class="leading-7">
      {{ message }}
    </p>
  </div>
</template>
