import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', () => {
  const activePassphraseDialog = ref<'confirm' | 'generate'>('confirm');
  const displayPassphraseDialog = ref(false);

  function togglePassphraseDialog() {
    displayPassphraseDialog.value = !displayPassphraseDialog.value;

    // If user has already generated a passphrase, show the confirm dialog
    // Otherwise, show the generate dialog

    // If user has generated passphrase, but decided to reset it and cancel, show the confirm dialog
    activePassphraseDialog.value = 'confirm';
  }

  return { activePassphraseDialog, displayPassphraseDialog, togglePassphraseDialog };
});
