import * as z from 'zod';

import registerSchema from '@/components/custom/form/auth/schemas/registerSchema';
import loginSchema from '@/components/custom/form/auth/schemas/loginSchema';
import resetPasswordSchema from '@/components/custom/form/auth/schemas/resetPasswordSchema';
import profileAccountSchema from '@/components/custom/form/dialogSettings/schemas/profileAccountSchema';

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// PARTIALS
const partialProfileAccountSchema = profileAccountSchema.partial();
export type PartialProfileAccountData = z.infer<typeof partialProfileAccountSchema>;
