<script setup lang="ts">
import { computed } from 'vue';
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
  }
});

const renderedMessage = computed(() => {
  return md.render(props.message);
});
</script>

<template>
  <div class="col-span-2">
    <p class="leading-7" v-html="renderedMessage"></p>
  </div>
</template>
