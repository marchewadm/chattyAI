import * as z from 'zod';

export default z.object({
  apiKeys: z
    .array(
      z.object({
        key: z.string().min(1).optional(),
        aiModel: z.string().optional()
      })
    )
    .refine((apiKeys) => {
      return apiKeys.every((apiKey) => {
        return !apiKey.key || (apiKey.key && apiKey.aiModel);
      });
    })
});
