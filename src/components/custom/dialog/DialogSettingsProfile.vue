<script setup lang="ts">
import FormProfileAccountDetails from '@/components/custom/form/FormProfileAccountDetails.vue';
import FormProfileChangePassword from '@/components/custom/form/FormProfileChangePassword.vue';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
</script>

<template>
  <ScrollArea class="h-full">
    <Tabs
      default-value="account"
      class="pl-1 pr-3"
    >
      <TabsList class="w-full grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p class="text-xs text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
        <FormProfileAccountDetails />
      </TabsContent>
      <TabsContent value="password">
        <p class="text-xs text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
        <FormProfileChangePassword />
      </TabsContent>
    </Tabs>
  </ScrollArea>
</template>
