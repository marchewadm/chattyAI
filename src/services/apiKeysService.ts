import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { handleAxiosError } from '@/utils/utils';
import { getApiKeysClient } from '@/api/apiKeysClient';
import type { Passphrase } from '@/types/passphrase.types';
import type { Router } from 'vue-router';

export async function getApiKeysService(passphraseData: Passphrase, router: Router) {
  try {
    const userStore = useUserStore();
    const { accessToken } = storeToRefs(userStore);
    const { setUserApiKeys } = userStore;

    const response = await getApiKeysClient(passphraseData, accessToken.value!);
    setUserApiKeys(response.data.apiKeysDetails);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
