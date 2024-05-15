<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import profileAccountSchema from './schemas/profileAccountSchema';

const userStore = useUserStore();
const { name, email, avatar } = storeToRefs(userStore);

const formSchema = toTypedSchema(profileAccountSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: name.value || '',
    email: email.value || ''
  }
});

const onSubmit = form.handleSubmit((values) => {
  console.log(`Form submitted!\nValues: ${JSON.stringify(values)}`);
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-2 mt-4">
    <FormField v-slot="{ componentField }" name="avatar">
      <FormItem class="mx-auto">
        <FormControl>
          <Avatar class="w-20 h-20 self-center" v-bind="componentField">
            <AvatarImage :src="avatar || ''" />
            <AvatarFallback>{{ name?.charAt(0) }}</AvatarFallback>
          </Avatar>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>What is your name?</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Jane" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="jane.doe@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-fit ml-auto mt-2">Save changes</Button>
  </form>
</template>
