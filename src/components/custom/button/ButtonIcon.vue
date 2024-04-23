<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

import type { PropType } from 'vue';
import type { ButtonVariant } from '@/types/button';
import type { ButtonSize } from '@/types/button';

const iconPrefix = 'ion';

defineProps({
  iconName: {
    type: String,
    required: true
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'ghost'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'icon'
  },
  text: {
    type: String
  },
  textClass: {
    type: String
  }
});
</script>

<template>
  <Button :variant="variant" :size="size">
    <span :="{ class: textClass }" v-if="text">{{ text }}</span>
    <Icon :icon="`${iconPrefix}:${iconName}`" class="h-[1.2rem] w-[1.2rem]" />
  </Button>
</template>
