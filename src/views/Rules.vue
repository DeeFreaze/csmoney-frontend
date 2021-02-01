<template>
  <div>
    <v-container fluid>
      <v-card class="ma-12 px-12 my-6">
        <v-card-title class="pb-2">
          <div class="headline">{{ $t('terms_and_conditions_of_use') }}</div>
          <v-layout align-center justify-center>
            <v-spacer></v-spacer>
            <span class="font-weight-light primary--text">{{ $t('preferred_language') }}</span>
            <i18n></i18n>
          </v-layout>
        </v-card-title>
        <v-divider ></v-divider>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('terms_and_conditions_of_use_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('terms_and_conditions_of_use_2_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('terms_used_in_these_rules') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('terms_used_in_these_rules_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('terms_used_in_these_rules_2_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('registration') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('registration_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('registration_2_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('registration_3_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('registration_4_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('license') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('license_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('license_2_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('status_of_the_terms_of_use') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('status_of_the_terms_of_use_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('status_of_the_terms_of_use_2_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('status_of_the_terms_of_use_3_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('status_of_the_terms_of_use_4_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('csgo_trade_site_status') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('csgo_trade_site_status_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('csgo_trade_site_status_1_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('denial_of_responsibility') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('denial_of_responsibility_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('denial_of_responsibility_2_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('denial_of_responsibility_3_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('payment_for_software_products') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('payment_for_software_products_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('payment_for_software_products_2_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('return_of_software_products') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('return_of_software_products_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('return_of_software_products_2_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('return_of_software_products_3_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('return_of_software_products_4_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('return_of_software_products_5_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('return_of_software_products_6_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('warranties_and_liability') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal pb-0">
          <span class="black--text">{{ $t('warranties_and_liability_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('warranties_and_liability_2_section') }}</span>
        </v-card-subtitle>

        <v-card-title class="pb-6">
          <div class="headline">{{ $t('final_provisions') }}</div>
        </v-card-title>
        <v-card-subtitle class="font-weight-normal">
          <span class="black--text">{{ $t('final_provisions_1_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('final_provisions_2_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('final_provisions_3_section') }}</span>
          <br> <br>
          <span class="black--text">{{ $t('final_provisions_4_section') }}</span>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import i18n from '@/components/i18n.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    i18n,
  },
};
</script>

<style scoped>
  .container--fluid {
      max-width: 69%;
  }
</style>
