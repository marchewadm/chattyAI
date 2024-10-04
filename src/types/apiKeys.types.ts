export type ApiProvider = {
  name: string;
  lowerCaseName: string;
  aiModels: string[];
  apiProviderId: number;
  isSelected: boolean;
};

export type ApiKeyState = {
  id: number;
  key?: string;
  apiProvider?: ApiProvider;
  isOpen: boolean;
  isRevealed: boolean;
};

export type ApiKeyDetails = {
  id: number;
  key: string;
  apiProviderId: number;
  apiProviderName: string;
  apiProviderLowerCaseName: string;
};
