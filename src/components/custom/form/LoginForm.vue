<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
        <h1 class="text-3xl font-bold">Welcome back</h1>
        <p class="text-balance text-muted-foreground">Enter your credentials below to log in</p>
      </div>
      <div class="grid gap-4">
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
                  <button class="text-sm underline flex" @click="authFormType = 'resetPassword'">
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
        <Button variant="outline" class="w-full flex gap-2 items-center">
          <Icon icon="ion:logo-google" class="h-[1.2rem] w-[1.2rem]" />
          <span>Sign in with Google</span>
        </Button>
        <Button variant="outline" class="w-full flex gap-2 items-center">
          <Icon icon="ion:logo-github" class="h-[1.2rem] w-[1.2rem]" />
          <span>Sign in with GitHub</span>
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <button class="underline" @click="authFormType = 'register'">Sign up</button>
      </div>
    </div>
  </div>
</template>
