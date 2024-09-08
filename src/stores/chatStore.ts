import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ApiProvider, GetApiProvidersResponse, ApiKey, ApiKeyData } from '@/types/apiKey';
import type { GetChatHistoryResponse, ChatHistory } from '@/types/chatHistory';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<string>(); // TODO: use localstorage to save default LLM preference
  const apiProviders = ref<ApiProvider[]>([]);
  const apiKeys = ref<ApiKey[]>([]);
  const chatHistory = ref<ChatHistory[]>([]);

  function setApiProvidersData(apiProvidersData: GetApiProvidersResponse[]) {
    apiProviders.value = apiProvidersData.map((apiProvider) => {
      return {
        value: apiProvider.name.toLowerCase(),
        label: apiProvider.name,
        aiModels: apiProvider.aiModels,
        isDisabled: false,
        apiProviderId: apiProvider.id
      };
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

  function setChatHistoryData(chatHistoryData: GetChatHistoryResponse) {
    chatHistoryData.messages.forEach((message) => {
      chatHistory.value.push(message);
    });
  }

  function resetUserApiKeysData() {
    apiKeys.value = [];
  }

  function resetChatHistoryData() {
    chatHistory.value = [];
  }

  return {
    apiProvider,
    apiProviders,
    apiKeys,
    chatHistory,
    setApiProvidersData,
    setUserApiKeysData,
    setChatHistoryData,
    resetUserApiKeysData,
    resetChatHistoryData
  };
});
