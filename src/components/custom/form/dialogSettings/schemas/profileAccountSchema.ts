import * as z from 'zod';

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default z.object({
  // avatar: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     'Only .jpg, .jpeg, .png and .webp formats are supported.'
  //   ),
  name: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email')
});
