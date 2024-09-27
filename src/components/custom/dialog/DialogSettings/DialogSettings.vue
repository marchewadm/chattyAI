<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import DialogPassphrase from '../DialogPassphrase/DialogPassphrase.vue';
import DialogSettingsGeneral from '@/components/custom/dialog/DialogSettings/components/DialogSettingsGeneral.vue';
import DialogSettingsProfile from '@/components/custom/dialog/DialogSettings/components/DialogSettingsProfile.vue';
import DialogSettingsApiKeys from '@/components/custom/dialog/DialogSettings/components/DialogSettingsApiKeys.vue';

import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialogStore';

import { useEventBus } from '@vueuse/core';

const dialogStore = useDialogStore();
const { displayPassphraseDialog } = storeToRefs(dialogStore);
const { togglePassphraseDialog } = dialogStore;

const activeTab = ref<'general' | 'profile' | 'apiKeys'>('general');

const bus = useEventBus<string>('validatePassphraseOnGetApiKeys');

bus.on(() => {
  activeTab.value = 'apiKeys';
  togglePassphraseDialog();
});

const hideApiKeysTab = (isDialogVisible: boolean) => {
  if (!isDialogVisible && activeTab.value === 'apiKeys') {
    activeTab.value = 'general';
  }
};

// TODO: Add aria-label;
</script>

<template>
  <Dialog @update:open="hideApiKeysTab">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <ButtonIcon iconName="settings" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" :sideOffset="10">Settings</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <DialogContent class="min-w-[600px]">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Customize your profile, set general settings and manage your API Keys
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div class="grid settings-layout h-[360px]">
        <div class="flex flex-col gap-y-2 mr-6">
          <ButtonIcon
            iconName="settings"
            :isIconFirst="true"
            text="General"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'general' }"
            @click="activeTab = 'general'"
          />
          <ButtonIcon
            iconName="user"
            :isIconFirst="true"
            text="Profile"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          />
          <ButtonIcon
            iconName="key"
            :isIconFirst="true"
            text="API Keys"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'apiKeys' }"
            @click="
              activeTab !== 'apiKeys' ? (displayPassphraseDialog = true) : (activeTab = 'apiKeys')
            "
          />
        </div>
        <DialogSettingsGeneral v-if="activeTab === 'general'" />
        <DialogSettingsProfile v-if="activeTab === 'profile'" />
        <DialogSettingsApiKeys v-if="activeTab === 'apiKeys'" />
        <DialogPassphrase />
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.settings-layout {
  grid-template-columns: auto 1fr;
}
</style>
