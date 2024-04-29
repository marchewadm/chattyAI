<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { handleAuthFormTypeChange } from '@/utils/utils';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import loginSchema from './schemas/loginSchema';

const formSchema = toTypedSchema(loginSchema);

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit((values) => {
  console.log(`Form submitted!\nValues: ${JSON.stringify(values)}`);
});
</script>

<template>
  <BaseFormAuth footerAuthFormType="register">
    <template #formHeader>Welcome back</template>
    <template #formSubHeader>Enter your credentials below to log in</template>
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
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <div class="flex items-center justify-between">
              <FormLabel>Password</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      class="text-sm underline flex"
                      type="button"
                      @click="handleAuthFormTypeChange('resetPassword')"
                    >
                      Forgot your password?
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Don't worry, you can reset it with ease!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">Sign in</Button>
      </form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <ButtonThirdPartyAccess iconName="logo-google" text="Sign in with Google" />
      <ButtonThirdPartyAccess iconName="logo-github" text="Sign in with GitHub" />
    </template>
    <template #formFooterText>Don't have an account? </template>
    <template #formFooterButton>Sign up</template>
  </BaseFormAuth>
</template>
