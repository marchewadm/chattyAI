<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/vue';

import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Create an account</h1>
        <p class="text-balance text-muted-foreground">
          Fill out the form below to create your account
        </p>
      </div>
      <div class="grid gap-4">
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
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <button class="underline" @click="authFormType = 'login'">Sign in</button>
      </div>
    </div>
  </div>
</template>
