import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { PassphraseAlertDialog } from '@/types/alertDialog.types';

export const useAlertDialogStore = defineStore('alertDialog', () => {
  // const passphraseAlertDialog = ref<PassphraseAlertDialog>('create');
  const passphraseAlertDialog = ref<PassphraseAlertDialog>('validate');
  // const isPassphraseAlertDialog = ref(false);
  const isPassphraseAlertDialog = ref(true);

  const $reset = () => {
    passphraseAlertDialog.value = 'create';
    isPassphraseAlertDialog.value = false;
  };

  const setPassphraseAlertDialog = (alertDialog: PassphraseAlertDialog) => {
    passphraseAlertDialog.value = alertDialog;
  };

  return {
    passphraseAlertDialog,
    isPassphraseAlertDialog,
    $reset,
    setPassphraseAlertDialog
  };
});
