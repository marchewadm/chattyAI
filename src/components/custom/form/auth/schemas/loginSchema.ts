import * as z from 'zod';

export default z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email'),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});
