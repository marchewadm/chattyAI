<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';

defineProps({
  chatTitle: {
    type: String,
    required: true
  },
  chatRoomUuid: {
    type: String,
    required: true
  }
});
</script>

<template>
  <Button variant="ghost" class="justify-start" as-child>
    <RouterLink :to="{ name: 'ActiveChat', params: { room_uuid: chatRoomUuid } }">
      {{ chatTitle }}
    </RouterLink>
  </Button>
</template>
