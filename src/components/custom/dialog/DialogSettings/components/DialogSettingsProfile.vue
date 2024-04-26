<script setup lang="ts">
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const { toast } = useToast();

const handleToast = () => {
  toast({
    title: 'Success',
    description: 'Your profile has been updated successfully!'
  });
};
</script>

<template>
  <Tabs default-value="account">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p class="text-xs text-muted-foreground">
        Make changes to your account here. Click save when you're done.
      </p>
      <div class="flex flex-col gap-4 mt-4">
        <Avatar class="w-20 h-20 self-center">
          <AvatarImage src="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div class="grid gap-2">
          <Label for="name">What is your name?</Label>
          <Input id="name" type="text" placeholder="Jane" required />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="jane.doe@example.com" required />
        </div>
      </div>
    </TabsContent>
    <TabsContent value="password">
      <p class="text-xs text-muted-foreground">
        Change your password here. After saving, you'll be logged out.
      </p>
      <div class="flex flex-col gap-4 mt-4">
        <div class="grid gap-2">
          <Label for="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" required />
        </div>
        <div class="grid gap-2">
          <Label for="newPassword">New password</Label>
          <Input id="newPassword" type="password" required />
        </div>
        <div class="grid gap-2">
          <Label for="newPassword2">Confirm password</Label>
          <Input id="newPassword2" type="password" required />
        </div>
      </div>
    </TabsContent>
    <div class="flex justify-end mt-4">
      <Button type="submit" @click="handleToast">Save changes</Button>
    </div>
  </Tabs>
</template>
