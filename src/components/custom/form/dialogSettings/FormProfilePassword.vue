<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import profilePasswordSchema from './schemas/profilePasswordSchema';

const formSchema = toTypedSchema(profilePasswordSchema);

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit((values) => {
  console.log(`Form submitted!\nValues: ${JSON.stringify(values)}`);
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-2 mt-4">
    <FormField v-slot="{ componentField }" name="currentPassword">
      <FormItem>
        <FormLabel>Current password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="newPassword">
      <FormItem>
        <FormLabel>New password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="newPassword2">
      <FormItem>
        <FormLabel>Confirm password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-fit ml-auto mt-2">Save changes</Button>
  </form>
</template>
