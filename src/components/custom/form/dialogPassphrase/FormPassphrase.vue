<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useRouter } from 'vue-router';
import { getApiKeysService } from '@/services/apiKeysService';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import passphraseSchema from './schemas/passphraseSchema';

import { useDialogStore } from '@/stores/dialogStore';

const { togglePassphraseDialog } = useDialogStore();

const formSchema = toTypedSchema(passphraseSchema);

const router = useRouter();

const form = useForm({
  validationSchema: formSchema
});

const onSubmit = form.handleSubmit(async (values) => {
  await getApiKeysService(values, router);
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-2">
    <FormField v-slot="{ componentField }" name="passphrase">
      <FormItem>
        <FormLabel>Enter your passphrase</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Your passphrase" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex gap-2 mt-2 ml-auto">
      <Button type="button" variant="outline" @click="togglePassphraseDialog">Cancel</Button>
      <Button type="button" variant="destructive" @click="$emit('resetPassphrase')">
        Reset my passphrase
      </Button>
      <Button type="submit">Continue</Button>
    </div>
  </form>
</template>
