export type AiModel = {
  value: string;
  label: string;
  isDisabled: boolean;
};

export type ApiKey = {
  id: number;
  key: string | undefined;
  aiModel: AiModel | undefined;
  isOpen: boolean;
};

export type AiModelsData = Record<string, AiModel>;

export type ApiKeyData = {
  key: string;
  aiModel: string;
};
