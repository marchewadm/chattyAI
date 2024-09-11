import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ApiProvider, GetApiProvidersResponse, ApiKey, ApiKeyData } from '@/types/apiKey';
import type { GetChatHistoryResponse, ChatHistory } from '@/types/chatHistory';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<ApiProvider>(); // TODO: use localstorage to save default LLM preference
  const apiProviders = ref<ApiProvider[]>([]);
  const apiKeys = ref<ApiKey[]>([]);
  const chatHistory = ref<ChatHistory[]>([]);
  const aiModel = ref<string>();
  const customInstructions = ref<string>('You are a helpful assistant.');

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
    // TODO: create new ref value for aiModel, now it's using apiProvider ref value which is not correct, my bad, I'm almost sleeping

    apiProvider.value = apiProviders.value.find((apiProvider) =>
      apiProvider.aiModels.includes(chatHistoryData.aiModel)
    );
    aiModel.value = chatHistoryData.aiModel;
    customInstructions.value = chatHistoryData.customInstructions;

    chatHistoryData.messages.forEach((message) => {
      chatHistory.value.push(message);
    });
  }

  function resetUserApiKeysData() {
    apiKeys.value = [];
  }

  function resetChatHistoryData() {
    aiModel.value = undefined;
    customInstructions.value = 'You are a helpful assistant.';
    chatHistory.value = [];
  }

  return {
    apiProvider,
    apiProviders,
    apiKeys,
    chatHistory,
    aiModel,
    customInstructions,
    setApiProvidersData,
    setUserApiKeysData,
    setChatHistoryData,
    resetUserApiKeysData,
    resetChatHistoryData
  };
});
