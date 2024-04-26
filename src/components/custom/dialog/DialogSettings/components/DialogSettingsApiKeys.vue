<script lang="ts" setup>
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ScrollArea } from '@/components/ui/scroll-area';

interface Status {
  value: string;
  label: string;
}

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

const [UseTemplate, StatusList] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const isOpen = ref(false);
const selectedStatus = ref<Status | null>(null);

function onStatusSelect(status: Status) {
  selectedStatus.value = status;
  isOpen.value = false;
}
</script>

<template>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-2 mb-4 py-1 pl-1 pr-3">
      <div class="grid api-keys-layout gap-2 items-center">
        <Input type="text" placeholder="Your API Key" />
        <div>
          <UseTemplate>
            <Command>
              <CommandInput placeholder="Filter models..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="status of statuses"
                    :key="status.value"
                    :value="status.value"
                    @select="onStatusSelect(status)"
                  >
                    {{ status.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </UseTemplate>

          <Popover v-if="isDesktop" v-model:open="isOpen">
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-[150px] justify-start">
                {{ selectedStatus ? selectedStatus.label : '+ Select model' }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0" align="start">
              <StatusList />
            </PopoverContent>
          </Popover>

          <Drawer v-else v-model:open="isOpen">
            <DrawerTrigger as-child>
              <Button variant="outline" class="w-[150px] justify-start">
                {{ selectedStatus ? selectedStatus.label : '+ Select model' }}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div class="mt-4 border-t">
                <StatusList />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <ButtonIcon iconName="add-outline" class="w-8 h-8" size="icon" />
        <ButtonIcon iconName="trash-outline" class="w-8 h-8" size="icon" variant="destructive" />
      </div>
    </div>
    <div class="flex justify-end pr-3">
      <Button type="submit">Save changes</Button>
    </div>
  </ScrollArea>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto auto;
}
</style>
