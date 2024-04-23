<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
</script>

<template>
  <BaseFormAuth footerAuthFormType="login">
    <template #formHeader>Create an account</template>
    <template #formSubHeader>Fill out the form below to create your account</template>
    <template #formBody>
      <div class="grid gap-2">
        <Label for="name">What is your name?</Label>
        <Input id="name" type="text" placeholder="Jane" required />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="jane.doe@example.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div class="grid gap-2">
        <Label for="password2">Confirm your password</Label>
        <Input id="password2" type="password" required />
      </div>
      <Button type="submit" class="w-full">Sign up</Button>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <ButtonThirdPartyAccess iconName="logo-google" text="Sign up with Google" />
      <ButtonThirdPartyAccess iconName="logo-github" text="Sign up with GitHub" />
    </template>
    <template #formFooterText>Already have an account? </template>
    <template #formFooterButton>Sign in</template>
  </BaseFormAuth>
</template>
