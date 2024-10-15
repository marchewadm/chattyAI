<script setup lang="ts">
import { delay } from '@/utils/utils';
import { ref, computed, onMounted } from 'vue';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/base16/material.css';

const props = defineProps<{
  message: string;
  isAnimated?: boolean;
}>();

const displayedWordCount = ref(0);
const messageWords = ref<string[]>(props.message.split(' '));

const md: MarkdownIt = new MarkdownIt({
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs p-4 rounded-md my-1"><code>' +
          hljs.highlight(str, { language: lang }).value +
          '</code></pre>'
        );
      } catch (err) {
        console.error('Error highlighting code:', err);
      }
    }

    return (
      '<pre class="hljs p-4 rounded-md my-1"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  }
});

const typewriter = async () => {
  for (let i = 0; i < messageWords.value.length; i++) {
    displayedWordCount.value = i + 1;
    await delay(Math.random() * 80 + 20);
  }
};

const renderedMessage = computed(() => {
  if (props.isAnimated) {
    const partialMessage = messageWords.value.slice(0, displayedWordCount.value).join(' ');
    return md.render(partialMessage);
  } else {
    return md.render(props.message);
  }
});

onMounted(async () => {
  if (props.isAnimated) {
    await typewriter();
  }
});
</script>

<template>
  <div class="col-span-2">
    <div
      class="assistant-message leading-7"
      v-dompurify-html="renderedMessage"
    ></div>
  </div>
</template>

<style>
.assistant-message hr {
  @apply my-4;
}

.assistant-message ol,
.assistant-message ul {
  @apply pl-5;
}

.assistant-message ol {
  @apply list-decimal;
}

.assistant-message ul {
  @apply list-disc;
}

code:not(pre code) {
  @apply bg-secondary p-1 rounded-md;
}
</style>
