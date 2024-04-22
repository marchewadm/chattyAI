<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';

import { Icon } from '@iconify/vue';
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
      <Button variant="outline" class="w-full flex gap-2 items-center">
        <Icon icon="ion:logo-google" class="h-[1.2rem] w-[1.2rem]" />
        <span>Sign up with Google</span>
      </Button>
      <Button variant="outline" class="w-full flex gap-2 items-center">
        <Icon icon="ion:logo-github" class="h-[1.2rem] w-[1.2rem]" />
        <span>Sign up with GitHub</span>
      </Button>
    </template>
    <template #formFooterText>Already have an account? </template>
    <template #formFooterButton>Sign in</template>
  </BaseFormAuth>
</template>
