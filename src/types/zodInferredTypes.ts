import * as z from 'zod';

import registerSchema from '@/components/custom/form/auth/schemas/registerSchema';
import loginSchema from '@/components/custom/form/auth/schemas/loginSchema';
import resetPasswordSchema from '@/components/custom/form/auth/schemas/resetPasswordSchema';
import profileAccountSchema from '@/components/custom/form/dialogSettings/schemas/profileAccountSchema';
import profilePasswordSchema from '@/components/custom/form/dialogSettings/schemas/profilePasswordSchema';
import apiKeysSchema from '@/components/custom/form/dialogSettings/schemas/apiKeysSchema';
import passphraseSchema from '@/components/custom/form/dialogPassphrase/schemas/passphraseSchema';

// Authentication service
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// User service
const partialProfileAccountSchema = profileAccountSchema.partial();

export type PartialProfileAccountData = z.infer<typeof partialProfileAccountSchema>;
export type ProfilePasswordData = z.infer<typeof profilePasswordSchema>;

// Api Keys service
export type ApiKeysData = z.infer<typeof apiKeysSchema>;
export type PassphraseData = z.infer<typeof passphraseSchema>;
