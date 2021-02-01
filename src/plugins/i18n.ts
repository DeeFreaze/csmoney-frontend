import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en: en,
    ru: ru
  }
});

const translate = (key: string) => {
  if (!key) {
    return '';
  }
  return i18n.t(key);
};

export { i18n, translate}; //export above method