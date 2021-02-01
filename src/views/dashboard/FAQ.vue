<template>
  <div>
    <v-container fluid>
      <CSMoneyDescription />
    </v-container>
  </div>
</template>

<script>
import CSMoneyDescription from '@/views/dashboard/FAQ/CSMoneyDescription.vue';

export default {
  data() {
    return {
      csmoneyDescriptionPanelStatus: [] // Description panel
    };
  },
  components: {
    CSMoneyDescription,
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style scoped>
</style>
