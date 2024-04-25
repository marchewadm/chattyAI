<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

import { ref } from 'vue';

const { toast } = useToast();
const activeTab = ref('profile');

const handleToast = () => {
  toast({
    title: 'Settings saved',
    description: 'Your settings have been saved successfully!'
  });
};

// Customizacja profilu, tzn. zmiana zdjęcia, nazwy użytkownika, maila i hasła
// Podstawowa customizacja LLM, tzn jakis tam tekst o nim, możliwość wyboru defaultowego LLM,
// customizacja konkretnego modelu LLM czyli np. API Key

// TODO: add aria-label;
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
          Customize your profile, set general settings and manage your API Keys.
        </DialogDescription>
      </DialogHeader>
      <Separator :decorative="true" />
      <div class="grid settings-layout">
        <div class="flex flex-col gap-y-2 mr-6">
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
        <div v-if="activeTab === 'profile'">
          <!-- Profile settings -->
          <h1>profile</h1>
        </div>
        <div v-if="activeTab === 'general'">
          <!-- General settings -->
          <h1>general</h1>
        </div>
        <div v-if="activeTab === 'apiKeys'">
          <!-- API Keys settings -->
          <h1>API Keys</h1>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="handleToast">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.settings-layout {
  grid-template-columns: auto 1fr;
}
</style>
