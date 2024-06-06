import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AiModel, AiModelsData, ApiKey, ApiKeyData } from '@/types/apiKey';

export const useChatStore = defineStore('chat', () => {
  const aiModel = ref<string>('GPT-3.5'); // TODO: use localstorage to save default LLM
  const aiModels = ref<AiModel[]>([]);
  const apiKeys = ref<ApiKey[]>([]);

  function setAiModelsData(aiModelsData: AiModelsData) {
    for (const key of Object.keys(aiModelsData)) {
      aiModels.value.push(aiModelsData[key]);
    }
  }

  function setUserApiKeysData(userApiKeysData: ApiKeyData[]) {
    if (userApiKeysData) {
      userApiKeysData.forEach((apiKey) => {
        apiKeys.value.push({
          id: apiKeys.value.length,
          key: apiKey.key,
          aiModel: aiModels.value.find((aiModel) => aiModel.value === apiKey.aiModel),
          isOpen: false
        });
      });
    }

    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      aiModel: undefined,
      isOpen: false
    });
  }

  function resetUserApiKeysData() {
    apiKeys.value = [];
  }

  return { aiModel, aiModels, apiKeys, setAiModelsData, setUserApiKeysData, resetUserApiKeysData };
});
