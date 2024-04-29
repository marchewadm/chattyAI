<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';

import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import resetPasswordSchema from './schemas/resetPasswordSchema';

const { toast } = useToast();

const formSchema = toTypedSchema(resetPasswordSchema);

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit((values) => {
  console.log(`Form submitted!\nValues: ${JSON.stringify(values)}`);
  toast({
    title: 'Success',
    description: 'An email has been sent to you with instructions to reset your password'
  });
});
</script>

<template>
  <BaseFormAuth footerAuthFormType="login">
    <template #formHeader>Reset your password</template>
    <template #formSubHeader>We will send you an email with instructions</template>
    <template #formBody>
      <form @submit="onSubmit" class="grid gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jane.doe@example.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">Submit</Button>
      </form>
    </template>
    <template #formFooterText>I've changed my mind, </template>
    <template #formFooterButton>take me back!</template>
  </BaseFormAuth>
</template>
