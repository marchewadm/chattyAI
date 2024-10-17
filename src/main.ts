import '@/assets/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue';
import router from './router';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);
const pinia = createPinia();

app.use(MotionPlugin);
app.use(autoAnimatePlugin);
app.use(VueDOMPurifyHTML);
app.use(pinia);
app.use(router);

app.mount('#app');
