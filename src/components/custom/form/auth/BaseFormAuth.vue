<script setup lang="ts">
import { handleAuthFormTypeChange } from '@/utils/utils';
import type { PropType } from 'vue';
import type { AuthFormType } from '@/types/auth';

defineProps({
  footerAuthFormType: {
    type: String as PropType<AuthFormType>,
    required: true
  }
});
</script>

<template>
  <div class="w-4/5 py-10 mx-auto flex items-center justify-center z-50 md:w-full md:p-0">
    <div class="w-[350px] mx-auto grid gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">
          <slot name="formHeader"></slot>
        </h1>
        <p class="text-balance text-muted-foreground">
          <slot name="formSubHeader"></slot>
        </p>
      </div>
      <div class="grid gap-4">
        <slot name="formBody"></slot>
      </div>
      <div class="mt-4 text-sm text-center">
        <p class="inline">
          <slot name="formFooterText"></slot>
        </p>
        <button class="underline" @click="handleAuthFormTypeChange(footerAuthFormType)">
          <slot name="formFooterButton"></slot>
        </button>
      </div>
    </div>
  </div>
</template>
