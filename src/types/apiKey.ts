export type ApiProvider = {
  value: string;
  label: string;
  aiModels: string[];
  isDisabled: boolean;
  apiProviderId: number;
};

export type ApiKey = {
  id: number;
  key: string | undefined;
  apiProvider: ApiProvider | undefined;
  isOpen: boolean;
  isRevealed: boolean;
};

export type GetApiProvidersResponse = {
  id: number;
  name: string;
  aiModels: string[];
};

export type ApiKeyData = {
  id: number;
  key: string;
  apiProviderId: number;
  apiProviderName: string;
  apiProviderLowercaseName: string;
};
