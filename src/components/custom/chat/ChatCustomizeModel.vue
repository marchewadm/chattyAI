<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { Icon } from '@iconify/vue';
import { ComboboxLabel } from 'radix-vue';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';

import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();
const { aiModel, customInstructions, apiProvider, apiProviders } = storeToRefs(chatStore);

const isPopoverOpen = ref(false);
const isCardOpen = ref(false);
const cardRef = ref<HTMLDivElement | null>(null);

const toggleCard = () => {
  isCardOpen.value = !isCardOpen.value;
};

const onModelSelect = (selectedModel: string) => {
  const selectedProvider = apiProviders.value.find((apiProvider) =>
    apiProvider.aiModels.includes(selectedModel)
  );

  if (!selectedProvider) return;

  apiProvider.value = selectedProvider;
  aiModel.value = selectedModel;
  isPopoverOpen.value = false;
};

onKeyStroke('Escape', () => {
  if (isCardOpen.value) {
    toggleCard();
  }
});
</script>

<template>
  <div class="w-fit ml-auto">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonIcon
            iconName="adjustments-horizontal"
            @click="toggleCard"
            :variant="isCardOpen ? 'secondary' : 'ghost'"
          />
        </TooltipTrigger>
        <TooltipContent>Customize chat</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  <Card class="w-[350px] ml-auto absolute right-0 mr-2 mt-2" v-if="isCardOpen" ref="cardRef">
    <CardHeader>
      <CardTitle>Customize model</CardTitle>
      <CardDescription>
        Customize your chat model by selecting a model and setting custom instructions.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="mb-2">
        <Popover v-model:open="isPopoverOpen">
          <PopoverTrigger asChild>
            <ButtonIcon
              role="combobox"
              :aria-expanded="isPopoverOpen"
              :iconName="isPopoverOpen ? 'chevron-up' : 'chevron-down'"
              :text="aiModel ? aiModel : 'Select model'"
              size="default"
              variant="outline"
              class="w-full justify-between"
            />
          </PopoverTrigger>
          <PopoverContent class="w-[300px]">
            <Command>
              <CommandInput placeholder="Search models..." />
              <CommandEmpty>No models found.</CommandEmpty>
              <CommandList>
                <CommandGroup v-for="apiProvider in apiProviders" :key="apiProvider.apiProviderId">
                  <ComboboxLabel class="text-sm pl-2 text-gray-500 mb-1">{{
                    apiProvider.label
                  }}</ComboboxLabel>
                  <CommandItem
                    v-for="(model, index) in apiProvider.aiModels"
                    :key="index"
                    :value="model"
                    @select="onModelSelect(model)"
                  >
                    {{ model }}
                    <Icon icon="tabler:check" class="w-5 h-5 ml-auto" v-if="aiModel === model" />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Textarea
          v-model="customInstructions"
          placeholder="You can set custom instructions for your model here."
          class="max-h-[150px]"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button size="sm">Advanced settings</Button>
    </CardFooter>
  </Card>
</template>
