import { useEventBus } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { useDialogSettingsStore } from '@/stores/dialogSettingsStore';

export function usePassphraseValidationBus() {
  const passphraseValidationBus = useEventBus<string>('passphraseValidationBus');

  const alertDialogStore = useAlertDialogStore();
  const dialogSettingsStore = useDialogSettingsStore();

  const { setDialogSettings } = dialogSettingsStore;
  const { isPassphraseAlertDialog } = storeToRefs(alertDialogStore);

  function emitSuccess() {
    passphraseValidationBus.emit();
  }

  function onSuccess() {
    passphraseValidationBus.on(() => {
      isPassphraseAlertDialog.value = false;
      setDialogSettings('apiKeys');
    });
  }

  return {
    emitSuccess,
    onSuccess
  };
}
