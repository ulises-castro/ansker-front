import Vue from 'vue';
import VueI18n from 'vue-i18n';

import es from './es';
import en from './en';

const messages = {
  es,
  en,
};

Vue.use(VueI18n);

export const language = new VueI18n({
  locale: 'es',
  messages,
});
