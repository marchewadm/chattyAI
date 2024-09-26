<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useClipboard } from '@vueuse/core';
import { useDialogStore } from '@/stores/dialogStore';
import { useUserStore } from '@/stores/userStore';
import { updateUserPassphraseService } from '@/services/userService';

const { copy } = useClipboard();
const { toast } = useToast();
const { togglePassphraseDialog } = useDialogStore();

const userStore = useUserStore();
const { isPassphrase } = storeToRefs(userStore);

const router = useRouter();

const isRevealed = ref(false);
const isPassphraseGenerated = ref(false);
const inputRef = ref<string>('');

const copyToClipboard = () => {
  copy(inputRef.value);
  togglePassphraseDialog();
  isPassphrase.value = true;

  toast({
    title: 'Success',
    description: 'Your passphrase has been copied to the clipboard'
  });
};

const generatePassphrase = async () => {
  const passphrase = await updateUserPassphraseService(router);

  if (passphrase) {
    inputRef.value = passphrase;
    isPassphraseGenerated.value = true;
  }
};
</script>

<template>
  <AlertDialogHeader>
    <AlertDialogTitle>Passphrase required</AlertDialogTitle>
    <AlertDialogDescription>
      To protect your API keys, you need to generate a secure passphrase to encrypt your data.
      Remember to store this passphrase securely as it will be required to access your data.
    </AlertDialogDescription>
    <Separator />
    <div class="relative flex items-center justify-end">
      <Input
        :type="isRevealed ? 'text' : 'password'"
        placeholder="Your generated passphrase"
        class="pr-10"
        readonly
        v-model="inputRef"
      />
      <div class="absolute">
        <ButtonIcon
          type="button"
          :iconName="isRevealed ? 'eye-off' : 'eye'"
          variant="ghost"
          @click="isRevealed = !isRevealed"
        />
      </div>
    </div>
    <AlertDialogFooter class="mt-2">
      <AlertDialogCancel @click="togglePassphraseDialog">Cancel</AlertDialogCancel>
      <AlertDialogAction v-if="!isPassphraseGenerated" @click="generatePassphrase">
        Generate passphrase
      </AlertDialogAction>
      <AlertDialogAction v-else @click="copyToClipboard">Copy and close</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogHeader>
</template>
