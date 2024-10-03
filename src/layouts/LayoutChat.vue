<script setup lang="ts">
import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
</script>

<template>
  <main class="grid chat-layout">
    <AlertDialogPassphraseContainer />
  </main>
</template>

<style scoped>
.chat-layout {
  grid-template-columns: auto 1fr;
}
</style>
