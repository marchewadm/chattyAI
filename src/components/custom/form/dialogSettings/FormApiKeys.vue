<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
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
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { createReusableTemplate, useMediaQuery, useEventBus } from '@vueuse/core';

import { updateApiKeysService } from '@/services/apiKeysService';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import apiKeysSchema from './schemas/apiKeysSchema';

import { useChatStore } from '@/stores/chatStore';

import {
  setApiKeyFormFields,
  onApiProviderSelect,
  addApiKey,
  removeApiKey,
  toggleRevealApiKey
} from './helpers/formApiKeysHelper';

const isPassphraseRequired = ref(false);

const router = useRouter();
const bus = useEventBus<string>('validatePassphraseOnUpdateApiKeys');

const chatStore = useChatStore();
const { apiProviders, apiKeys } = storeToRefs(chatStore);

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const formSchema = toTypedSchema(apiKeysSchema);
const { handleSubmit, setFieldValue, setValues, values } = useForm({
  validationSchema: formSchema
});

const onSubmit = handleSubmit(async (values) => {
  const filteredValues = values.apiKeys.filter((apiKey) => apiKey.key && apiKey.apiProviderId);

  await updateApiKeysService({ apiKeys: filteredValues, passphrase: values.passphrase }, router);
});

bus.on(() => {
  isPassphraseRequired.value = false;
});

onBeforeMount(async () => {
  await setApiKeyFormFields(setFieldValue);
});
</script>

<template>
  <form>
    <div class="flex flex-col gap-2 mb-4 py-1 pl-1 pr-3">
      <div
        class="grid api-keys-layout gap-2 items-center"
        v-for="(apiKey, index) in apiKeys"
        :key="apiKey.id"
      >
        <FormField :name="`apiKeys.${index}.apiKey`">
          <FormItem>
            <FormControl>
              <div class="relative flex items-center justify-end">
                <Input
                  :type="apiKey.isRevealed ? 'text' : 'password'"
                  placeholder="Your API Key"
                  v-model="apiKey.key"
                  class="pr-10"
                />
                <div class="absolute">
                  <ButtonIcon
                    type="button"
                    :iconName="apiKey.isRevealed ? 'eye-off' : 'eye'"
                    variant="ghost"
                    @click="toggleRevealApiKey(apiKey)"
                  />
                </div>
              </div>
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
          iconName="plus"
          class="w-8 h-8"
          size="icon"
          v-show="apiKey === apiKeys[apiKeys.length - 1]"
          @click="addApiKey(apiKey, setFieldValue)"
        />
        <ButtonIcon
          type="button"
          iconName="trash"
          class="w-8 h-8"
          size="icon"
          variant="destructive"
          v-show="apiKey !== apiKeys[apiKeys.length - 1]"
          @click="removeApiKey(apiKey.id, setValues, values)"
        />
      </div>
    </div>
    <div class="flex justify-end pr-3">
      <AlertDialog v-model:open="isPassphraseRequired">
        <AlertDialogTrigger as-child>
          <Button type="button">Save changes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Passphrase required</AlertDialogTitle>
            <AlertDialogDescription>
              To protect your API keys, please enter your passphrase before proceeding. This ensures
              that only authorized actions are performed on sensitive data.
            </AlertDialogDescription>
            <Separator />
          </AlertDialogHeader>
          <FormField v-slot="{ componentField }" name="passphrase">
            <FormItem>
              <FormLabel>Enter your passphrase</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your passphrase" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button @click="onSubmit">Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </form>
</template>

<style scoped>
.api-keys-layout {
  grid-template-columns: 1fr auto auto;
}
</style>
