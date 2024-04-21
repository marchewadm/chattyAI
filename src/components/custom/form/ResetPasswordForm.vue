<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { authFormType } = storeToRefs(authStore);
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Reset your password</h1>
        <p class="text-balance text-muted-foreground">
          We will send you an email with instructions
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="jane.doe@example.com" required />
        </div>
        <Button type="submit" class="w-full">Submit</Button>
      </div>
      <div class="mt-4 text-center text-sm">
        I've changed my mind,
        <button class="underline" @click="authFormType = 'login'">take me back!</button>
      </div>
    </div>
  </div>
</template>
