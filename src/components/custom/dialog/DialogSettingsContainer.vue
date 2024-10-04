<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import DialogSettingsGeneral from '@/components/custom/dialog/DialogSettingsGeneral.vue';
import DialogSettingsProfile from '@/components/custom/dialog/DialogSettingsProfile.vue';
import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
import { Separator } from '@/components/shadcn/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';
import { storeToRefs } from 'pinia';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { useDialogSettingsStore } from '@/stores/dialogSettingsStore';

const alertDialogStore = useAlertDialogStore();
const dialogSettingsStore = useDialogSettingsStore();

const { $reset } = alertDialogStore;

const { setDialogSettings, onSwitchToApiKeys, onDialogSettingsToggle } = dialogSettingsStore;
const { dialogSettings } = storeToRefs(dialogSettingsStore);
</script>

<template>
  <Dialog @update:open="onDialogSettingsToggle">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <ButtonIcon iconName="settings" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          :sideOffset="10"
        >
          Settings
        </TooltipContent>
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
      <div class="h-[360px] grid settings-layout">
        <div class="mr-6 flex flex-col gap-y-2">
          <ButtonIcon
            iconName="settings"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'general' }"
            @click="setDialogSettings('general')"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">General</span>
            </template>
          </ButtonIcon>
          <ButtonIcon
            iconName="user"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'profile' }"
            @click="setDialogSettings('profile')"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">Profile</span>
            </template>
          </ButtonIcon>
          <ButtonIcon
            iconName="key"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'apiKeys' }"
            @click="onSwitchToApiKeys"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">API Keys</span>
            </template>
          </ButtonIcon>
        </div>
        <DialogSettingsGeneral v-show="dialogSettings === 'general'" />
        <DialogSettingsProfile v-show="dialogSettings === 'profile'" />
        <!-- <DialogSettingsProfile v-if="activeTab === 'profile'" />
        <DialogSettingsApiKeys v-if="activeTab === 'apiKeys'" /> -->
      </div>
      <AlertDialogPassphraseContainer />
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.settings-layout {
  grid-template-columns: auto 1fr;
}
</style>
