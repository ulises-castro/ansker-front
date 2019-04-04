import VueI18n from 'vue-i18n';

import es from './es';
import en from './en';

const messages = {
  es,
  en,
};

export default language = new VueI18n({
  locale: 'es',
  messages,
});
