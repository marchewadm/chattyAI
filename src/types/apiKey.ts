export type ApiProvider = {
  value: string;
  label: string;
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

export type ApiProvidersData = {
  id: number;
  name: string;
};

export type ApiKeyData = {
  id: number;
  key: string;
  apiProviderId: number;
  apiProviderName: string;
  apiProviderLowercaseName: string;
};
