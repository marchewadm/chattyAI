import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ApiProvider, ApiProvidersData, ApiKey, ApiKeyData } from '@/types/apiKey';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<string>(); // TODO: use localstorage to save default LLM preference
  const apiProviders = ref<ApiProvider[]>([]);
  const apiKeys = ref<ApiKey[]>([]);

  function setApiProvidersData(apiProvidersData: ApiProvidersData) {
    for (const key of Object.keys(apiProvidersData)) {
      apiProviders.value.push(apiProvidersData[key]);
    }
  }

  function setUserApiKeysData(userApiKeysData: ApiKeyData[]) {
    if (userApiKeysData) {
      userApiKeysData.forEach((apiKey) => {
        apiKeys.value.push({
          id: apiKeys.value.length,
          key: apiKey.key,
          apiProvider: apiProviders.value.find(
            (apiProvider) => apiProvider.value === apiKey.apiProvider
          ),
          isOpen: false
        });
      });
    }

    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      apiProvider: undefined,
      isOpen: false
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
