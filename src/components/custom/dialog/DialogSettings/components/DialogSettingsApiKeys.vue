<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { ref } from 'vue';

interface Status {
  value: string;
  label: string;
}

interface ApiKey {
  id: number;
  apiKey: string | undefined;
  status: Status | null;
  isOpen: boolean;
}

const { toast } = useToast();
const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px');

const statuses: Status[] = [
  {
    value: 'gpt-3.5',
    label: 'GPT-3.5'
  },
  {
    value: 'gpt-4',
    label: 'GPT-4'
  }
];

const apiKeys = ref<ApiKey[]>([
  {
    id: 0,
    apiKey: undefined,
    status: null,
    isOpen: false
  }
]);

function onStatusSelect(status: Status, id: number) {
  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (index !== -1) {
    apiKeys.value[index].status = status;
    apiKeys.value[index].isOpen = false;
  }
}

function addApiKey(apiKey: string | undefined, status: Status | null) {
  if (apiKey && status) {
    apiKeys.value.push({
      id: apiKeys.value.length,
      apiKey: undefined,
      status: null,
      isOpen: false
    });
  } else {
    toast({
      title: 'Error',
      description: 'Please provide a valid API key first!',
      variant: 'destructive'
    });
  }
}

function removeApiKey(id: number) {
  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);

  if (index !== -1) {
    apiKeys.value.splice(index, 1);
  }
}
</script>

<template>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-2 mb-4 py-1 pl-1 pr-3">
      <div
        class="grid api-keys-layout gap-2 items-center"
        v-for="apiKey in apiKeys"
        :key="apiKey.id"
      >
        <Input type="text" placeholder="Your API Key" v-model="apiKey.apiKey" required />
        <div>
          <DefineTemplate>
            <Command>
              <CommandInput placeholder="Filter models..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="status of statuses"
                    :key="status.value"
                    :value="status.value"
                    @select="onStatusSelect(status, apiKey.id)"
                  >
                    {{ status.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DefineTemplate>

          <Popover v-if="isDesktop" v-model:open="apiKey.isOpen">
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-[150px] justify-start">
                {{ apiKey.status ? apiKey.status.label : '+ Select model' }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0" align="start">
              <ReuseTemplate />
            </PopoverContent>
          </Popover>

          <Drawer v-else>
            <DrawerTrigger as-child>
              <Button variant="outline" class="w-[150px] justify-start">
                {{ apiKey.status ? apiKey.status.label : '+ Select model' }}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div class="mt-4 border-t">
                <ReuseTemplate />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <ButtonIcon
          iconName="add-outline"
          class="w-8 h-8"
          size="icon"
          v-show="apiKey === apiKeys[apiKeys.length - 1]"
          @click="addApiKey(apiKey.apiKey, apiKey.status)"
        />
        <ButtonIcon
          iconName="trash-outline"
          class="w-8 h-8"
          size="icon"
          variant="destructive"
          v-show="apiKey !== apiKeys[apiKeys.length - 1]"
          @click="removeApiKey(apiKey.id)"
        />
      </div>
    </div>
    <div></div>
  </ScrollArea>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
