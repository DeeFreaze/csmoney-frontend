<template>
  <div>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :max-height="'calc(100vh - ' + $vuetify.application.top + 'px - ' + $vuetify.application.footer + 'px)'"
          src="../../assets/main-background.png"
          lazy-src="../../assets/main-background.png"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="blue--text mx-auto"
                justify="center"
              >
                <v-col
                  class="blue--text text-center"
                  cols="12"
                  tag="h1"
                >
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    class="font-weight-light"
                  >
                    {{ $t('WELCOME_TO') }}
                  </span>
                  <br>
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                    class="font-weight-black"
                  >
                    CSGOTRADE
                  </span>
                  <br>
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    class="font-weight-light"
                  >
                    {{ greetedUser() }}
                  </span>
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  color="primary"
                  @click="$vuetify.goTo('#features')"
                >
                  <v-icon style="transform: rotate(90deg);">double_arrow</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="features">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">{{ $t('CSGOTRADE_FEATURES') }}</h2>

        <v-responsive
          class="mx-auto mb-12"
          width="56"
        >
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ icon, title, text }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card
              class="py-12 px-4"
              color="grey lighten-5"
              flat
            >
              <v-theme-provider dark>
                <div>
                  <v-avatar
                    color="primary"
                    size="88"
                  >
                    <v-icon
                      large
                      v-text="icon"
                    ></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="$t(title)"
              ></v-card-title>

              <v-card-text
                class="subtitle-1"
                v-text="$t(text)"
              >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="py-12"></div>
    </section>

    <section id="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
      >
        <v-container fill-height>
          <v-row class="mx-auto">
            <v-col
              v-for="[value, title] of stats"
              :key="title"
              cols="12"
              md="3"
            >
              <div class="text-center">
                <div
                  class="display-3 font-weight-black mb-4"
                  v-text="value"
                ></div>

                <div
                  class="title font-weight-regular text-uppercase"
                  v-text="title"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>
  </div>
</template>

<script>
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';

export default {
  data() {
    return {
      features: [
        {
          icon: 'groups',
          title: 'VIBRANT_COMMUNITY',
          text:  'VIBRANT_COMMUNITY_DESC'
        },
        {
          icon: 'update',
          title: 'FREQUENT_UPDATES',
          text: 'FREQUENT_UPDATES_DESC'
        },
        {
          icon: 'support_agent',
          title: 'LONG_TERM_SUPPORT',
          text:  'LONG_TERM_SUPPORT_DESC'
        },
      ],
      stats: [
        [this.$t('ms_03'), this.$t('DATA_RECEIVING_SPEED')],
        [this.$t('ms_02'), this.$t('OBJECT_HANDLING')],
        ['1', this.$t('MONITORED_SERVICES')],
        ['10+', this.$t('TABLE_FEATURES')],
      ],
    };
  },
  methods: {
    greetedUser() {
      const userProfile = readUserProfile(this.$store);
      if (userProfile) return userProfile.steam_user_name;
    }
  },
}
</script>

<style scoped>
</style>