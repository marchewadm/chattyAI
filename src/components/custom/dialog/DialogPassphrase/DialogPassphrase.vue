<script setup lang="ts">
import DialogPassphraseConfirmation from './components/DialogPassphraseConfirm.vue';
import DialogPassphraseGenerator from './components/DialogPassphraseGenerator.vue';

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialogStore';
import { useUserStore } from '@/stores/userStore';

const dialogStore = useDialogStore();
const userStore = useUserStore();

const { displayPassphraseDialog, activePassphraseDialog } = storeToRefs(dialogStore);
const { isPassphrase } = storeToRefs(userStore);

const { togglePassphraseDialog } = dialogStore;
</script>

<template>
  <AlertDialog :open="displayPassphraseDialog">
    <AlertDialogContent
      @escape-key-down="togglePassphraseDialog"
      @interact-outside="togglePassphraseDialog"
    >
      <DialogPassphraseConfirmation
        v-if="activePassphraseDialog === 'confirm' && isPassphrase"
        @generate-passphrase="activePassphraseDialog = 'generate'"
      />
      <DialogPassphraseGenerator
        v-else-if="!isPassphrase || activePassphraseDialog === 'generate'"
      />
    </AlertDialogContent>
  </AlertDialog>
</template>
