<script setup lang="ts">
import FormProfileAccount from '@/components/custom/form/dialogSettings/FormProfileAccount.vue';
import FormProfilePassword from '@/components/custom/form/dialogSettings/FormProfilePassword.vue';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
</script>

<template>
  <ScrollArea class="h-full">
    <Tabs default-value="account" class="pl-1 pr-3">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p class="text-xs text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
        <FormProfileAccount />
      </TabsContent>
      <TabsContent value="password">
        <p class="text-xs text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
        <FormProfilePassword />
      </TabsContent>
    </Tabs>
  </ScrollArea>
</template>
