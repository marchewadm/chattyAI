<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { handleAuthFormTypeChange } from '@/utils/utils';

import { useRouter } from 'vue-router';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import loginSchema from './schemas/loginSchema';

import { loginUserService } from '@/services/authenticationService';

const formSchema = toTypedSchema(loginSchema);

const router = useRouter();
const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit(async (values) => {
  await loginUserService(values, router);
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
      <ButtonThirdPartyAccess iconName="brand-google-filled" text="Sign in with Google" />
      <ButtonThirdPartyAccess iconName="brand-github" text="Sign in with GitHub" />
    </template>
    <template #formFooterText>Don't have an account? </template>
    <template #formFooterButton>Sign up</template>
  </BaseFormAuth>
</template>
