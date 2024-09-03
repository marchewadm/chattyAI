import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useEventBus } from '@vueuse/core';

import { handleAxiosError } from '@/utils/utils';

import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';

import { useToast } from '@/components/ui/toast';

import type { Router } from 'vue-router';
import type { ApiKeysData, PassphraseData } from '@/types/zodInferredTypes';
import type { ApiKeyData } from '@/types/apiKey';

// Set the prefix URL for the api keys routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/api-key`;

const { toast } = useToast();

export async function getApiKeysService(passphraseData: PassphraseData, router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { setUserApiKeysData } = useChatStore();
  const bus = useEventBus<string>('validatePassphraseOnGetApiKeys');

  try {
    const response = await axios.post<{ api_keys: ApiKeyData[] }>(`${prefixURL}`, passphraseData, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });

    bus.emit();
    setUserApiKeysData(response.data.api_keys);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateApiKeysService(apiKeysData: ApiKeysData, router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const bus = useEventBus<string>('validatePassphraseOnUpdateApiKeys');

  try {
    const url = `${prefixURL}/`;

    const response = await axios.patch<{ message: string }>(url, apiKeysData, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    bus.emit();

    toast({
      title: 'Success',
      description: response.data.message
    });
  } catch (err) {
    handleAxiosError(err, router);
  }
}
