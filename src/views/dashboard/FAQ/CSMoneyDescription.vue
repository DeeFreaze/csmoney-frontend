<template>
  <div>
    <v-container fluid >
      <v-expansion-panels v-model="csmoneyDescriptionPanelStatus" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header class="headline">
            {{ $t('table_description') }}
            <v-icon class="justify-start" right color="indigo darken-4">table_chart</v-icon>
          </v-expansion-panel-header>
          <v-divider ></v-divider>
          <v-expansion-panel-content class="py-4">
            <v-layout class="pb-4">
              <span class="font-weight-medium text-h4">{{ $t('table_description_filtration_1_section') }}</span>
            </v-layout>

            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_filtration_2_section') }}
            </v-alert>
            <v-layout class="justify-center pb-4">
              <v-img
                class="rounded-lg"
                :max-width="'calc(100vh - 30%)'"
                src="@/assets/FAQ/csmoneytable/filter-form.png"
                lazy-src="@/assets/FAQ/csmoneytable/filter-form.png"
              ></v-img>
            </v-layout>

            <v-alert
              outlined
              icon="info"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_filtration_4_section') }} 
              <ul>
                <li>{{ $t('table_description_filtration_5_section') }}
                  <ul>
                    <li>{{ $t('table_description_filtration_5_section_li_1') }}</li>
                    <li>{{ $t('table_description_filtration_5_section_li_2') }}</li>
                    <li>{{ $t('table_description_filtration_5_section_li_3') }}</li>
                  </ul>
                </li>
              </ul>
              {{ $t('table_description_filtration_6') }}
            </v-alert>

            <v-alert
              outlined
              type="warning"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_filtration_3_section') }}
            </v-alert>
            <v-divider></v-divider>
            <br/>
            <v-layout class="pb-4">
              <span class="font-weight-medium text-h4">{{ $t('table_description_using_filters') }}</span>
            </v-layout>
            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_using_filters_1_section') }}
            </v-alert>
            <v-layout class="justify-center pb-4">
              <v-img
                class="rounded-lg"
                src="@/assets/FAQ/csmoneytable/add-button.png"
                lazy-src="@/assets/FAQ/csmoneytable/add-button.png"
              ></v-img>
            </v-layout>
            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_using_filters_2_section') }}
            </v-alert>
            <v-layout class="justify-center pb-4">
              <v-img
                class="rounded-lg"
                src="@/assets/FAQ/csmoneytable/edit-filter.png"
                lazy-src="@/assets/FAQ/csmoneytable/edit-filter.png"
              ></v-img>
            </v-layout>
            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_description_using_filters_3_section') }}
            </v-alert>

            <v-divider></v-divider>
            <br/>
            <v-layout class="pb-4">
              <span class="font-weight-medium text-h4">{{ $t('top_toolbar') }}</span>
            </v-layout>
            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('top_toolbar_1_section') }}
              <ul>
                <li>{{ $t('top_toolbar_7_section') }}</li>
                <li>{{ $t('top_toolbar_8_section') }}</li>
                <li>{{ $t('top_toolbar_2_section') }}</li>
                <li>{{ $t('top_toolbar_3_section') }}</li>
                <li>{{ $t('top_toolbar_4_section') }}</li>
                <li>{{ $t('top_toolbar_5_section') }}</li>
                <li>{{ $t('top_toolbar_6_section') }}</li>
              </ul>
            </v-alert>
            <v-alert
              outlined
              icon="info"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('top_toolbar_live_hint') }}
            </v-alert>
            <v-layout class="justify-center pb-4">
              <v-img
                class="rounded-lg"
                src="@/assets/FAQ/csmoneytable/live-status.png"
                lazy-src="@/assets/FAQ/csmoneytable/live-status.png"
              ></v-img>
            </v-layout>

            <v-divider></v-divider>
            <br/>
            <v-layout class="pb-4">
              <span class="font-weight-medium text-h4">{{ $t('table') }}</span>
            </v-layout>
            <v-alert
              outlined
              type="success"
              color="primary"
              prominent
              elevation="4"
              border="left"
            >
              {{ $t('table_1_section') }}
            </v-alert>
            <v-divider></v-divider>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>

export default {
  data() {
    return {
      csmoneyDescriptionPanelStatus: [0], // Description panel
    };
  },
  beforeMount() {
    if (localStorage.csmoneyDescriptionPanelStatus) {
      this.csmoneyDescriptionPanelStatus = localStorage.csmoneyDescriptionPanelStatus === [0] ? [0] : [];
    }
  },
  watch: {
    csmoneyDescriptionPanelStatus(newCsmoneyDescriptionPanelStatus) {
      localStorage.csmoneyDescriptionPanelStatus = newCsmoneyDescriptionPanelStatus;
    },
  },
};
</script>

