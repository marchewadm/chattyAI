<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

defineProps({
  iconName: {
    type: String,
    required: true
  }
});
</script>

<template>
  <ButtonIcon
    class="hover:scale-110 active:scale-110 transition-transform duration-200"
    :iconName="iconName"
    iconClass="h-6 w-6"
    :variant="null"
  />
</template>
