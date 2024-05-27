export type AiModel = {
  value: string;
  label: string;
  isDisabled: boolean;
};

export type ApiKey = {
  id: number;
  key: string | undefined;
  aiModel: AiModel | null;
  isOpen: boolean;
};
