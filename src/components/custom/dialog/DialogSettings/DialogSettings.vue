<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import DialogSettingsGeneral from '@/components/custom/dialog/DialogSettings/components/DialogSettingsGeneral.vue';
import DialogSettingsProfile from '@/components/custom/dialog/DialogSettings/components/DialogSettingsProfile.vue';
import DialogSettingsApiKeys from '@/components/custom/dialog/DialogSettings/components/DialogSettingsApiKeys.vue';

import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ref } from 'vue';

const activeTab = ref('general');

// TODO: Add aria-label;
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <ButtonIcon iconName="settings-outline" />
    </DialogTrigger>
    <DialogContent class="min-w-[600px]">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Customize your profile, set general settings and manage your API Keys
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div class="grid settings-layout h-[350px]">
        <div class="flex flex-col gap-y-2 mr-6">
          <ButtonIcon
            iconName="settings-outline"
            :isIconFirst="true"
            text="General"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'general' }"
            @click="activeTab = 'general'"
          />
          <ButtonIcon
            iconName="person-outline"
            :isIconFirst="true"
            text="Profile"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          />
          <ButtonIcon
            iconName="key-outline"
            :isIconFirst="true"
            text="API Keys"
            textClass="font-normal"
            size="sm"
            class="items-center gap-1 w-24 justify-start"
            :class="{ 'bg-secondary': activeTab === 'apiKeys' }"
            @click="activeTab = 'apiKeys'"
          />
        </div>
        <DialogSettingsGeneral v-if="activeTab === 'general'" />
        <DialogSettingsProfile v-if="activeTab === 'profile'" />
        <DialogSettingsApiKeys v-if="activeTab === 'apiKeys'" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.settings-layout {
  grid-template-columns: auto 1fr;
}
</style>
