import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';
import ToastPlugin from 'vue-toast-notification';

import { setupI18n } from '@/i18n';
import { setupRouter } from '@/router';

import App from './App.vue';

import 'vue-final-modal/style.css';
import './styles/main.scss';

const app = createApp(App)

app.use(createPinia());

const i18n = setupI18n();
const router = setupRouter({ i18n });

app.use(i18n);
app.use(router);
app.use(createVfm());
app.use(ToastPlugin);

app.mount('#app');
