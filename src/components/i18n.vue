<template>
  <v-menu bottom offset-y>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text >
        <v-icon left dark>translate</v-icon>
        {{ locale }}
        <v-icon right dark>arrow_drop_down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in dropdown_languages"
        :key="index"
        @click="setLocale(item.value)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      locale: 'English',
      dropdown_languages: [
        { title: 'English', value: 'en' },
        { title: 'Русский', value: 'ru' }
      ]
    };
  },
  beforeMount() {
    if (localStorage.locale && localStorage.locale === 'English') {
      this.locale = 'English';
      this.$i18n.locale = 'en';
      this.$vuetify.lang.current = 'en';
    }
    if (localStorage.locale && localStorage.locale === 'Русский') {
      this.locale = 'Русский';
      this.$i18n.locale = 'ru';
      this.$vuetify.lang.current = 'ru';
    }
  },
  computed: {},
  watch: {
    locale(newLocale) {
      localStorage.locale = newLocale;
    }
  },
  methods: {
    setLocale(locale) {
      if (locale === 'en') {
        this.locale = 'English';
        this.$i18n.locale = locale;
        this.$vuetify.lang.current = locale;
      }

      if (locale === 'ru') {
        this.locale = 'Русский';
        this.$i18n.locale = locale;
        this.$vuetify.lang.current = locale;
      }
    }
  }
};
</script>