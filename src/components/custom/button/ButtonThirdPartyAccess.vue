<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

defineProps({
  iconName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <ButtonIcon
    :iconName="iconName"
    :isIconFirst="true"
    variant="outline"
    size="default"
    :text="text"
    class="w-full flex gap-2 items-center"
  />
</template>
