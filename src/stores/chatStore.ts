import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ApiProvider, ApiProvidersData, ApiKey, ApiKeyData } from '@/types/apiKey';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<string>(); // TODO: use localstorage to save default LLM preference
  const apiProviders = ref<ApiProvider[]>([]);
  const apiKeys = ref<ApiKey[]>([]);

  function setApiProvidersData(apiProvidersData: ApiProvidersData[]) {
    apiProvidersData.forEach((apiProvider) => {
      apiProviders.value.push({
        value: apiProvider.name.toLowerCase(),
        label: apiProvider.name,
        isDisabled: false,
        apiProviderId: apiProvider.id
      });
    });
  }

  function setUserApiKeysData(userApiKeysData: ApiKeyData[]) {
    if (userApiKeysData) {
      userApiKeysData.forEach((apiKey) => {
        const apiProvider = apiProviders.value.find(
          (apiProvider) => apiProvider.value === apiKey.apiProviderLowercaseName
        );

        if (!apiProvider) {
          return;
        }

        // Disable the api provider if the user has already added an api key for it to prevent duplicates
        apiProvider.isDisabled = true;

        apiKeys.value.push({
          id: apiKeys.value.length,
          key: apiKey.key,
          apiProvider,
          isOpen: false,
          isRevealed: false
        });
      });
    }

    // Add an empty api key object to the array
    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      apiProvider: undefined,
      isOpen: false,
      isRevealed: false
    });
  }

  function resetUserApiKeysData() {
    apiKeys.value = [];
  }

  return {
    apiProvider,
    apiProviders,
    apiKeys,
    setApiProvidersData,
    setUserApiKeysData,
    resetUserApiKeysData
  };
});
