import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/components/ui/toast';
import { toRawDeep } from '@/utils/utils';
import type { AiModel, ApiKey } from '@/types/apiKey';

export async function setApiKeyFormFields(setFieldValue: Function) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);

  apiKeys.value.forEach((apiKey) => {
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      aiModel: apiKey.aiModel?.value
    });
  });
}

export function onAiModelSelect(aiModel: AiModel, id: number) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);

  if (aiModel.isDisabled) return;

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (!(index !== -1)) return; // TODO: check with if (index === -1) return;

  apiKeys.value[index].aiModel = aiModel;
  apiKeys.value[index].isOpen = false;

  // Disable the selected AI model, so it can't be selected again if the key is in use
  aiModel.isDisabled = true;
}

export function addApiKey(apiKey: ApiKey, setFieldValue: Function) {
  const chatStore = useChatStore();
  const { apiKeys } = storeToRefs(chatStore);
  const { toast } = useToast();

  if (apiKey.key && apiKey.aiModel) {
    // If new API key was successfully added, create a new empty input field
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      aiModel: apiKey.aiModel.value
    });

    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      aiModel: undefined,
      isOpen: false
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
  const { apiKeys, aiModels } = storeToRefs(chatStore);

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (index === -1) return;

  const indexAiModel = aiModels.value.findIndex(
    (aiModel) => aiModel.value === apiKeys.value[index].aiModel?.value
  );

  aiModels.value[indexAiModel].isDisabled = false;

  apiKeys.value.splice(index, 1);

  const rawValues = structuredClone(toRawDeep(values));
  rawValues.apiKeys?.splice(index, 1);

  setValues(rawValues);
}
