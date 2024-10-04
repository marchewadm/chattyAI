<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/shadcn/button';

defineProps<{
  chatTitle: string;
  chatRoomUuid: string;
}>();
</script>

<template>
  <Button
    variant="ghost"
    asChild
  >
    <RouterLink
      activeClass="bg-secondary"
      :to="{ name: 'ActiveChat', params: { room_uuid: chatRoomUuid } }"
    >
      <span class="w-full truncate tracking-tight">
        {{ chatTitle }}
      </span>
    </RouterLink>
  </Button>
</template>
