<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { useToast } from '@/components/ui/toast';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const { toast } = useToast();
const { store } = useColorMode();

const handleToast = () => {
  toast({
    title: 'Success',
    description: 'Your chats have been deleted successfully'
  });
};
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center">
      <p class="text-sm">Default theme</p>
      <Select :defaultValue="store" v-model="store">
        <SelectTrigger class="w-24 ml-auto">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available themes</SelectLabel>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="auto">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Separator />
    <div class="flex items-center">
      <p class="text-sm">Default LLM</p>
      <Select defaultValue="GPT-3.5">
        <SelectTrigger class="w-24 ml-auto">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available models</SelectLabel>
            <SelectItem value="GPT-4">GPT-4</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Separator />
    <div class="flex items-center">
      <p class="text-sm">Delete all chats</p>
      <Button variant="destructive" class="w-24 ml-auto" @click="handleToast">Delete</Button>
    </div>
  </div>
</template>
