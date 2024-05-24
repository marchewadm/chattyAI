<script setup lang="ts">
// --- IMPORTS ---
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
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

import { ref } from 'vue';
import { toRawDeep } from '@/utils/utils';

import { createReusableTemplate, useMediaQuery } from '@vueuse/core';

import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
// --------------------------------------------------------------

// --- INTERFACES ---
interface AiModel {
  value: string;
  label: string;
  disabled: boolean;
}

interface ApiKey {
  id: number;
  key: string | undefined;
  aiModel: AiModel | null;
  isOpen: boolean;
}
// --------------------------------------------------------------

// --- CONSTANTS ---
const aiModels = ref<AiModel[]>([
  {
    value: 'gpt-3.5',
    label: 'GPT-3.5',
    disabled: false
  }
]);
const apiKeys = ref<ApiKey[]>([
  {
    id: 0,
    key: undefined,
    aiModel: null,
    isOpen: false
  }
]);

const { toast } = useToast();
const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');
// --------------------------------------------------------------

// --- FUNCTIONS ---
const onAiModelSelect = (aiModel: AiModel, id: number) => {
  if (aiModel.disabled) return;

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (!(index !== -1)) return;

  apiKeys.value[index].aiModel = aiModel;
  apiKeys.value[index].isOpen = false;
  aiModel.disabled = true;
};

const addApiKey = (apiKey: ApiKey) => {
  if (apiKey.key && apiKey.aiModel) {
    // If new API key was successfully added, create a new empty input field
    setFieldValue(`apiKeys.${apiKey.id}`, {
      apiKey: apiKey.key,
      aiModel: apiKey.aiModel.value
    });

    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      aiModel: null,
      isOpen: false
    });
  } else {
    toast({
      title: 'Error',
      description: 'Please provide a valid API key first',
      variant: 'destructive'
    });
  }
};

const removeApiKey = (id: number) => {
  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);

  if (index === -1) return;

  const indexAiModel = aiModels.value.findIndex(
    (aiModel) => aiModel.value === apiKeys.value[index].aiModel?.value
  );

  aiModels.value[indexAiModel].disabled = false;

  apiKeys.value.splice(index, 1);

  const rawValues = structuredClone(toRawDeep(values));
  rawValues.apiKeys?.splice(index, 1);

  setValues(rawValues);
};

// --- FORM ---
const formSchema = toTypedSchema(
  z.object({
    apiKeys: z
      .array(
        z.object({
          apiKey: z.string().min(1).optional(),
          aiModel: z.string().optional()
        })
      )
      .refine(
        (apiKeys) => {
          return apiKeys.every((apiKey) => {
            return !apiKey.apiKey || (apiKey.apiKey && apiKey.aiModel);
          });
        },
        {
          message: 'Please provide a valid API key and select a model',
          path: ['apiKeys']
        }
      )
  })
);
const { handleSubmit, setFieldValue, setValues, values } = useForm({
  validationSchema: formSchema
});
const onSubmit = handleSubmit((values) => {
  const validApiKeys = values.apiKeys.filter((apiKey) => apiKey.apiKey && apiKey.aiModel);

  console.log(validApiKeys);
});
</script>

<template>
  <ScrollArea class="h-full">
    <form @submit="onSubmit">
      <div class="flex flex-col gap-2 mb-4 py-1 pl-1 pr-3">
        <div
          class="grid api-keys-layout gap-2 items-center"
          v-for="(apiKey, index) in apiKeys"
          :key="apiKey.id"
        >
          <FormField :name="`apiKeys.${index}.apiKey`">
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Your API Key" v-model="apiKey.key" />
              </FormControl>
            </FormItem>
          </FormField>
          <div>
            <DefineTemplate>
              <Command>
                <CommandInput placeholder="Filter models..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      v-for="aiModel in aiModels"
                      :key="aiModel.value"
                      :value="aiModel.value"
                      :disabled="aiModel.disabled"
                      @select="onAiModelSelect(aiModel, apiKey.id)"
                    >
                      {{ aiModel.label }}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DefineTemplate>

            <FormField name="aiModel">
              <FormItem>
                <Popover v-if="isDesktop" v-model:open="apiKey.isOpen">
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button variant="outline" class="w-[150px] justify-start">
                        {{ apiKey.aiModel ? apiKey.aiModel.label : '+ Select model' }}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="w-[200px] p-0" align="start">
                    <ReuseTemplate />
                  </PopoverContent>
                </Popover>

                <Drawer v-else>
                  <DrawerTrigger as-child>
                    <FormControl>
                      <Button variant="outline" class="w-[150px] justify-start">
                        {{ apiKey.aiModel ? apiKey.aiModel.label : '+ Select model' }}
                      </Button>
                    </FormControl>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div class="mt-4 border-t">
                      <ReuseTemplate />
                    </div>
                  </DrawerContent>
                </Drawer>
              </FormItem>
            </FormField>
          </div>
          <ButtonIcon
            type="button"
            iconName="add-outline"
            class="w-8 h-8"
            size="icon"
            v-show="apiKey === apiKeys[apiKeys.length - 1]"
            @click="addApiKey(apiKey)"
          />
          <ButtonIcon
            type="button"
            iconName="trash-outline"
            class="w-8 h-8"
            size="icon"
            variant="destructive"
            v-show="apiKey !== apiKeys[apiKeys.length - 1]"
            @click="removeApiKey(apiKey.id)"
          />
        </div>
      </div>
      <div class="flex justify-end pr-3">
        <Button>Save changes</Button>
      </div>
    </form>
  </ScrollArea>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
