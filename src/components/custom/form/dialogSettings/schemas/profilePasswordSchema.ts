import * as z from 'zod';

export default z
  .object({
    currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword2: z.string().min(8, { message: 'Password must be at least 8 characters long' })
  })
  .refine((data) => data.newPassword === data.newPassword2, {
    message: 'Passwords do not match',
    path: ['newPassword2']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from the current one',
    path: ['newPassword']
  });
