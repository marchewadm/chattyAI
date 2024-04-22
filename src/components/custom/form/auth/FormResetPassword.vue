<script setup lang="ts">
import BaseFormAuth from '@/components/custom/form/auth/BaseFormAuth.vue';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
</script>

<template>
  <BaseFormAuth footerAuthFormType="login">
    <template #formHeader>Reset your password</template>
    <template #formSubHeader>We will send you an email with instructions</template>
    <template #formBody>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="jane.doe@example.com" required />
      </div>
      <Button type="submit" class="w-full">Submit</Button>
    </template>
    <template #formFooterText>I've changed my mind, </template>
    <template #formFooterButton>take me back!</template>
  </BaseFormAuth>
</template>
