import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/components/ui/toast';
import { toRawDeep } from '@/utils/utils';
import type { ApiProvider, ApiKey } from '@/types/apiKey';

export async function setApiKeyFormFields(setFieldValue: Function) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);

  apiKeys.value.forEach((apiKey) => {
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      apiProvider: apiKey.apiProvider?.value
    });
  });
}

export function onApiProviderSelect(apiProvider: ApiProvider, id: number) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);

  if (apiProvider.isDisabled) return;

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (!(index !== -1)) return; // TODO: check with if (index === -1) return;

  apiKeys.value[index].apiProvider = apiProvider;
  apiKeys.value[index].isOpen = false;

  // Disable the selected AI model, so it can't be selected again if the key is in use
  apiProvider.isDisabled = true;
}

export function addApiKey(apiKey: ApiKey, setFieldValue: Function) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);
  const { toast } = useToast();

  if (apiKey.key && apiKey.apiProvider) {
    // If new API key was successfully added, create a new empty input field
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      apiProvider: apiKey.apiProvider.value
    });

    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      apiProvider: undefined,
      isOpen: false,
      isRevealed: false
    });
  } else {
    toast({
      title: 'Error',
      description: 'Please provide a valid API key first',
      variant: 'destructive'
    });
  }
}

export function removeApiKey(id: number, setValues: Function, values: any) {
  const chatStore = useChatStore();
  const { apiKeys, apiProviders } = storeToRefs(chatStore);

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (index === -1) return;

  const indexApiProvider = apiProviders.value.findIndex(
    (apiProvider) => apiProvider.value === apiKeys.value[index].apiProvider?.value
  );

  apiProviders.value[indexApiProvider].isDisabled = false;

  apiKeys.value.splice(index, 1);

  const rawValues = structuredClone(toRawDeep(values));
  rawValues.apiKeys?.splice(index, 1);

  setValues(rawValues);
}

export function toggleRevealApiKey(apiKey: ApiKey) {
  if (!apiKey.key) return;

  if (!apiKey.isRevealed) {
    apiKey.isRevealed = true;
  } else {
    apiKey.isRevealed = false;
  }
}
