import Vue from 'vue';
import Vuetify from 'vuetify';

// Translation provided by Vuetify (typescript)
import en from 'vuetify/src/locale/en'
import ru from 'vuetify/src/locale/ru'

import CSMoney from '@/assets/icons/CSMoney.vue'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, ru },
    current: 'en',
  },

  icons: {
    iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    values: {
      csmoney: { // name of our custom icon
        component: CSMoney // our custom component
      },
    },
  },
});
