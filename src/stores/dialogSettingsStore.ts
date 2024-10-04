import { ref } from 'vue';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { defineStore, storeToRefs } from 'pinia';
import type { DialogSettings } from '@/types/dialogSettings.types';

export const useDialogSettingsStore = defineStore('dialogSettings', () => {
  const dialogSettings = ref<DialogSettings>('general');

  const alertDialogStore = useAlertDialogStore();
  const { isPassphraseAlertDialog } = storeToRefs(alertDialogStore);

  const setDialogSettings = (dialog: DialogSettings) => {
    dialogSettings.value = dialog;
  };

  const onSwitchToApiKeys = () => {
    if (dialogSettings.value !== 'apiKeys') {
      isPassphraseAlertDialog.value = true;
    } else {
      dialogSettings.value = 'apiKeys';
    }
  };

  const onDialogSettingsToggle = (isDialogVisible: boolean) => {
    if (!isDialogVisible && dialogSettings.value === 'apiKeys') {
      dialogSettings.value = 'general';
    }
  };

  return {
    dialogSettings,
    setDialogSettings,
    onSwitchToApiKeys,
    onDialogSettingsToggle
  };
});
