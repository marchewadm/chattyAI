export type ApiProvider = {
  value: string;
  label: string;
  isDisabled: boolean;
};

export type ApiKey = {
  id: number;
  key: string | undefined;
  apiProvider: ApiProvider | undefined;
  isOpen: boolean;
  isRevealed: boolean;
};

export type ApiProvidersData = Record<string, ApiProvider>;

export type ApiKeyData = {
  key: string;
  apiProvider: string;
};
