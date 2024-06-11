<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { createReusableTemplate, useMediaQuery } from '@vueuse/core';

import { updateApiKeysService } from '@/services/apiKeysService';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import apiKeysSchema from './schemas/apiKeysSchema';

import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';

import {
  setApiKeyFormFields,
  onApiProviderSelect,
  addApiKey,
  removeApiKey
} from './helpers/formApiKeysHelper';

const router = useRouter();

const chatStore = useChatStore();
const { apiProviders, apiKeys } = storeToRefs(chatStore);

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const formSchema = toTypedSchema(apiKeysSchema);
const { handleSubmit, setFieldValue, setValues, values } = useForm({
  validationSchema: formSchema
});

const onSubmit = handleSubmit(async (values) => {
  const filteredValues = values.apiKeys.filter((apiKey) => apiKey.key && apiKey.apiProvider);

  await updateApiKeysService({ apiKeys: filteredValues }, router);
});

onBeforeMount(async () => {
  await setApiKeyFormFields(setFieldValue);
});
</script>

<template>
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
                    v-for="apiProvider in apiProviders"
                    :key="apiProvider.value"
                    :value="apiProvider.value"
                    :disabled="apiProvider.isDisabled"
                    @select="onApiProviderSelect(apiProvider, apiKey.id)"
                  >
                    {{ apiProvider.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DefineTemplate>

          <FormField name="apiProvider">
            <FormItem>
              <Popover v-if="isDesktop" v-model:open="apiKey.isOpen">
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button variant="outline" class="w-[150px] justify-start">
                      {{ apiKey.apiProvider ? apiKey.apiProvider.label : '+ Select model' }}
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
                      {{ apiKey.apiProvider ? apiKey.apiProvider.label : '+ Select model' }}
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
          @click="addApiKey(apiKey, setFieldValue)"
        />
        <ButtonIcon
          type="button"
          iconName="trash-outline"
          class="w-8 h-8"
          size="icon"
          variant="destructive"
          v-show="apiKey !== apiKeys[apiKeys.length - 1]"
          @click="removeApiKey(apiKey.id, setValues, values)"
        />
      </div>
    </div>
    <div class="flex justify-end pr-3">
      <Button>Save changes</Button>
    </div>
  </form>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
