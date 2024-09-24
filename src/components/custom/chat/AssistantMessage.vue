<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { delay } from '@/utils/utils';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/material.css';

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

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  isAnimated: {
    type: Boolean,
    default: false
  }
});

const visibleWords = ref(0);
const wordsArray = ref<string[]>(props.message.split(' '));

const typewriter = async () => {
  for (let i = 0; i < wordsArray.value.length; i++) {
    visibleWords.value = i + 1;
    await delay(Math.random() * 80 + 20);
  }
};

const renderedMessage = computed(() => {
  if (props.isAnimated) {
    const partialMessage = wordsArray.value.slice(0, visibleWords.value).join(' ');
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
    <div class="assistant-message leading-7" v-html="renderedMessage"></div>
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
