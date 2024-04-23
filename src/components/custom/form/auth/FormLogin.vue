<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { handleAuthFormTypeChange } from '@/utils/utils';
</script>

<template>
  <BaseFormAuth footerAuthFormType="register">
    <template #formHeader>Welcome back</template>
    <template #formSubHeader>Enter your credentials below to log in</template>
    <template #formBody>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="jane.doe@example.com" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password">Password</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  class="text-sm underline flex"
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
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" class="w-full">Sign in</Button>
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
