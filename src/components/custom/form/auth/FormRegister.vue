<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import registerSchema from './schemas/registerSchema';

import { createUserService } from '@/services/authenticationService';

const formSchema = toTypedSchema(registerSchema);

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit(async (values) => {
  await createUserService(values);
});
</script>

<template>
  <BaseFormAuth footerAuthFormType="login">
    <template #formHeader>Create an account</template>
    <template #formSubHeader>Fill out the form below to create your account</template>
    <template #formBody>
      <form @submit="onSubmit" class="grid gap-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>What is your name?</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Jane" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jane.doe@example.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password2">
          <FormItem>
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">Sign up</Button>
      </form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <ButtonThirdPartyAccess iconName="brand-google-filled" text="Sign up with Google" />
      <ButtonThirdPartyAccess iconName="brand-github" text="Sign up with GitHub" />
    </template>
    <template #formFooterText>Already have an account? </template>
    <template #formFooterButton>Sign in</template>
  </BaseFormAuth>
</template>
