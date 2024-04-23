<script setup lang="ts">
import NavBar from '@/components/custom/nav/NavBar.vue';
</script>

<template>
  <div class="layout min-h-screen grid">
    <NavBar />
    <div class="bg-muted"></div>
  </div>
</template>

<style scoped>
.layout {
  grid-template-columns: auto 1fr;
}
</style>
