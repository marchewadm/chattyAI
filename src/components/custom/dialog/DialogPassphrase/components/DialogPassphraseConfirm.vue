<script setup lang="ts">
import FormPassphrase from '@/components/custom/form/dialogPassphrase/FormPassphrase.vue';

import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';

import { ref } from 'vue';

const displayAlertDialog = ref(false);

const toggleAlertDialog = () => {
  displayAlertDialog.value = !displayAlertDialog.value;
};
</script>

<template>
  <AlertDialogHeader>
    <AlertDialogTitle>Passphrase required</AlertDialogTitle>
    <AlertDialogDescription>
      To protect your API keys, please enter your passphrase before proceeding. This ensures that
      only authorized actions are performed on sensitive data.
    </AlertDialogDescription>
    <Separator />
  </AlertDialogHeader>
  <FormPassphrase @reset-passphrase="toggleAlertDialog" />
  <AlertDialog :open="displayAlertDialog">
    <AlertDialogContent
      @escape-key-down="toggleAlertDialog"
      @pointer-down-outside="toggleAlertDialog"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Resetting your passphrase will delete all your API keys from
          our servers and you will need to add them again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="toggleAlertDialog">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="$emit('generatePassphrase')">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
