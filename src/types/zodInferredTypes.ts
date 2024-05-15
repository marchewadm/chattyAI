import * as z from 'zod';

import registerSchema from '@/components/custom/form/auth/schemas/registerSchema';
import loginSchema from '@/components/custom/form/auth/schemas/loginSchema';
import resetPasswordSchema from '@/components/custom/form/auth/schemas/resetPasswordSchema';

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
