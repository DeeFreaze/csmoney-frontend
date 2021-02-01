<template>
  <div>
    <v-toolbar class="px-0" light>
      <v-toolbar-title>
        {{ $t('filter_management') }}
        <v-icon right>filter_list</v-icon>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider class="my-3"></v-divider>
    <v-sheet elevation="6">
      <v-tabs
        next-icon="chevron_right"
        prev-icon="chevron_left"
        show-arrows
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="(site, idx) in tradeSite"
          :key="idx"
          @click="currentTab = site.component"
        >
          <v-icon left>{{ site.icon }}</v-icon>
          {{ site.title }}
        </v-tab>
      </v-tabs>
        <component v-bind:is="currentTabComponent"></component>
    </v-sheet>
  </div>
</template>

<script>
import CSMoneyFilters from '@/views/dashboard/filters/csmoney/CSMoneyFilters'

export default {
  data() {
    return {
      tab: null,
      currentTab: CSMoneyFilters,
      tradeSite: [
        {
          value: "csmoney",
          title: 'CS Money',
          link: '/dashboard/filters/csmoney',
          icon: 'extension',
          component: CSMoneyFilters
        },
      ],
      tradeSiteTabs: [CSMoneyFilters],
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>