<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import CardModelSettingsGeneral from '@/components/custom/card/CardModelSettingsGeneral.vue';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from '@/components/shadcn/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import { ref, computed } from 'vue';

const isCardVisible = ref(false);
const isAdvancedSettings = ref(false);

const toggleAdvancedSettings = () => {
  isAdvancedSettings.value = !isAdvancedSettings.value;
};

const getButtonVariant = computed(() => {
  return isCardVisible.value ? 'secondary' : 'ghost';
});

const getButtonSettingsName = computed(() => {
  return isAdvancedSettings.value ? 'General settings' : 'Advanced settings';
});
</script>

<template>
  <Popover v-model:open="isCardVisible">
    <PopoverAnchor asChild>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <ButtonIcon
                iconName="adjustments-horizontal"
                :variant="getButtonVariant"
              />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent
            align="end"
            side="bottom"
          >
            Adjust model
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverAnchor>
    <PopoverContent
      align="end"
      side="bottom"
      class="rounded-lg"
    >
      <div class="p-1">
        <div class="mb-4 flex flex-col gap-y-1.5">
          <h3 class="text-base font-semibold leading-none tracking-tight">Adjust model</h3>
          <p class="text-sm text-muted-foreground">
            Customize the model settings to fit your needs.
          </p>
          <Separator />
        </div>
        <div class="mb-4">
          <CardModelSettingsGeneral v-if="!isAdvancedSettings" />
        </div>
        <div>
          <Button
            size="sm"
            @click="toggleAdvancedSettings"
          >
            {{ getButtonSettingsName }}
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
