import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';

import { setupI18n } from '@/i18n';
import { setupRouter } from '@/router';

import App from './App.vue';

import 'vue-final-modal/style.css';
import './styles/main.scss';

const app = createApp(App)

const i18n = setupI18n();
const router = setupRouter({ i18n });

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(createVfm());

app.mount('#app');
